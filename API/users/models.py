from django.db import models
from django.contrib.auth.models import AbstractUser



class CustomUser(AbstractUser):

    email = models.EmailField(blank=False, max_length=254, verbose_name="email address")
    companyname = models.TextField(blank=True, default = "my company", max_length=100, verbose_name="companyname")
    
    USERNAME_FIELD = "username"  # e.g: "username", "email"
    EMAIL_FIELD = "email"  # e.g: "email", "primary_email"
    COMPANYNAME_FIELD = "companyname"  # e.g: "email", "primary_email"
    
    
