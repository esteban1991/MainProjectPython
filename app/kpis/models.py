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
