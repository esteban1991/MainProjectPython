#
#  Created on Wed Dec 14 2022
#
#  Copyright (c) 2022 QvaLT. All wrongs reserved.
#
#  This file is part of the Core API project.
#
#  For the full copyright and license information, please view the LICENSE
#  file that was distributed with this source code.                
#


# quickstart.schema.py

import graphene

from app.kpis.schema import KpiMutation,  KpiQuery
from app.users.schema import AuthQuery, AuthMutation

class Query(AuthQuery, KpiQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, KpiMutation, graphene.ObjectType):
    pass  
  
  
schema = graphene.Schema(query=Query, mutation=Mutation)
