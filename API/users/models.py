from django.db import models
from django.contrib.auth.models import AbstractUser



class CustomUser(AbstractUser):

    email = models.EmailField(blank=False, max_length=254, verbose_name="email address")
    companyname = models.TextField(blank=True, default = "my company", max_length=100, verbose_name="companyname")
    navtheme = models.TextField(blank=True, default = "realDark", max_length=100, verbose_name="navtheme")
    colorprimary = models.TextField(blank=True, default = "#1890ff", max_length=100, verbose_name="colorprimary")

    USERNAME_FIELD = "username"  # e.g: "username", "email"
    EMAIL_FIELD = "email"  # e.g: "email", "primary_email"
    COMPANYNAME_FIELD = "companyname"  # e.g: "email", "primary_email"
    NAVTHEME_FIELD = "navtheme"  # e.g: "email", "primary_email"
    COLORPRIMARY_FIELD = "colorprimary"  # e.g: "email", "primary_email"
    
    
