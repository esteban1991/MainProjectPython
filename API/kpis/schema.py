from django.utils import timezone

from graphene_django import DjangoObjectType
import graphene
from graphql import GraphQLError

from .models import Kpi
from users.models import CustomUser

from graphene.types import Scalar
from graphql.language import ast


class KpiType(DjangoObjectType):

    class Meta:
        model = Kpi
        # fields = ("deck",)


class CreateKpi(graphene.Mutation):
    kpi = graphene.Field(KpiType)

    class Arguments:
        name = graphene.String()
        description = graphene.String()
        value = graphene.Float()
        user_id = graphene.Int()


    def mutate(self, info, name, description, value, user_id):
        k = Kpi(name=name, description=description, value = value)
        u = CustomUser.objects.get(id=user_id)
        k.user = u
        k.date=timezone.now()
        k.save()
        return CreateKpi(kpi=k)


class UpdateKpi(graphene.Mutation):
    kpi = graphene.Field(KpiType)

    class Arguments:
        id = graphene.ID()

        name = graphene.String()
        description = graphene.String()
        value = graphene.Float()
        user_id = graphene.Int()


 
    def mutate(self, info, id, name, description, value, user_id):
        k = Kpi.objects.get(id=id)
        k.name = name
        k.description = description
        k.value = value
        u = CustomUser.objects.get(id=user_id)
        k.user = u        
        k.date=timezone.now()
        k.save()

        return UpdateKpi(kpi=k)


class DeleteKpi(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
       
    msg = graphene.String()
   
    @classmethod
    def mutate(cls, self, info, id):
        post = Kpi.objects.get(id=id).delete()
        return DeleteKpi(msg = "Kpi deleted Successfully")


class QueryKpi(graphene.ObjectType):


    kpis = graphene.List(KpiType)
    user_kpis = graphene.List(KpiType, user=graphene.Int())

    def resolve_user_kpis(self, info, user):
        return Kpi.objects.filter(user=user)

    def resolve_kpis(self, info):
        return Kpi.objects.all()

