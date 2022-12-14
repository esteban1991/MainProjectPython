# core.schema.py

import graphene
import graphql_social_auth

from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations

from app.kpis.schema import CreateKpi, UpdateKpi, DeleteKpi, QueryKpi


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_change = mutations.PasswordChange.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    update_account = mutations.UpdateAccount.Field()
    send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    swap_emails = mutations.SwapEmails.Field()

    # django-graphql-jwt inheritances
    token_auth = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()




class Query(UserQuery, MeQuery, QueryKpi, graphene.ObjectType):
    pass


class Mutation(AuthMutation, graphene.ObjectType):
    create_kpi = CreateKpi.Field()
    update_kpi = UpdateKpi.Field()
    delete_kpi = DeleteKpi.Field()
    social_auth = graphql_social_auth.SocialAuth.Field()



schema = graphene.Schema(query=Query, mutation=Mutation)
