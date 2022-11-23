# quickstart.schema.py

import graphene

from kpis.schema import KpiMutation,  KpiQuery
from users.schema import AuthQuery, AuthMutation

class Query(AuthQuery, KpiQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, KpiMutation, graphene.ObjectType):
    pass  
  
  
schema = graphene.Schema(query=Query, mutation=Mutation)
