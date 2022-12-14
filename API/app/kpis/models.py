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

from django.utils import timezone

from djongo import models
from app.users.models import CustomUser




class Kpi(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    name = models.TextField()
    description = models.TextField()
    value = models.FloatField(default=0.00)
    date = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name
