# -*- coding: utf-8 -*-

"""

    This file is part of the Core API project.

    Copyright (c) 2022 QvaLT. All wrongs reserved

    For the full copyright and license information, please view the LICENSE
    file that was distributed with this source code.

"""

from __future__ import unicode_literals

import os
import django
from django.utils.encoding import force_str
django.utils.encoding.force_text = force_str
from pathlib import Path

from dotenv import load_dotenv





"""
Django settings forCore project.

Generated by 'django-admin startproject' using Django 3.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

# Build paths inside the project like this: BASE_DIR / 'subdir'.

BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load operating system environment variables and then prepare to use them
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECRET CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'ut$psxte+5)8q@lyd!8+y*_hbg)vgpwh8aj@lo=4w7d!*217rj')

# APP CONFIGURATION
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    # Default Django apps:
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Admin
    'django.contrib.admin',
]

THIRD_PARTY_APPS = [
    # 'graphene_django',
    # 'corsheaders',
    # 'rest_framework',
    # 'oauth2_provider',
    # 'django_filters',
    # 'phonenumber_field'

    "graphene_django",
    "graphql_jwt.refresh_token.apps.RefreshTokenConfig",
    "graphql_auth",
    "django_filters",
    'social_django',

]

LOCAL_APPS = [
    # custom users app
    # 'app.expenses',
    # 'app.incomes',
    # 'app.user',
    # 'app.common',
    "app.users",
    "app.kpis",
]

# See: https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# MIDDLEWARE CONFIGURATION
# ------------------------------------------------------------------------------
MIDDLEWARE = [
    # 'django.middleware.security.SecurityMiddleware',
    # 'django.contrib.sessions.middleware.SessionMiddleware',
    # 'corsheaders.middleware.CorsMiddleware',
    # 'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    # 'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.messages.middleware.MessageMiddleware',
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # 'oauth2_provider.middleware.OAuth2TokenMiddleware'
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",    
]

# TEMPLATE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        #'DIRS': [os.path.join(BASE_DIR, 'templates')],
        "DIRS": [],        
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': os.environ.get('DB_NAME', 'core'),
        'ENFORCE_SCHEMA': False,        
        'HOST': os.environ.get('DB_HOST', '127.0.0.1'),
        'PORT': os.environ.get('DB_PORT', 27017),
        # 'USER': os.environ.get('DB_USER', 'coreadmin'),
        # 'PASSWORD': os.environ.get('DB_PASSWORD', 'coreadmin'),        
    }
}

# GENERAL CONFIGURATION
# ------------------------------------------------------------------------------
# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/New_York'

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = 'en'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# STATIC FILE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = BASE_DIR / 'static'

# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = '/static/'

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = [

]

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# MEDIA CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = '/media/'

# URL Configuration
# ------------------------------------------------------------------------------
ROOT_URLCONF = "config.urls"

# See: https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = 'config.wsgi.application'

# PASSWORD VALIDATION
# https://docs.djangoproject.com/en/dev/ref/settings/#auth-password-validators
# ------------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        'OPTIONS': {
            'user_attributes': (
                'email', 'name'
            )
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },

    
]



# GraphQL
GRAPHENE = {
    "SCHEMA": "config.schema.schema",
    "MIDDLEWARE": ["graphql_jwt.middleware.JSONWebTokenMiddleware"],
}

AUTHENTICATION_BACKENDS = [
    "graphql_auth.backends.GraphQLAuthBackend",
    "django.contrib.auth.backends.ModelBackend",
    'social_core.backends.google.GoogleOAuth2',     
    'social_core.backends.facebook.FacebookOAuth2',      
    'social_core.backends.twitter.TwitterOAuth',    
]

GRAPHQL_JWT = {
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
    "JWT_ALLOW_ANY_CLASSES": [
        "graphql_auth.mutations.Register",
        "graphql_auth.mutations.VerifyAccount",
        "graphql_auth.mutations.ResendActivationEmail",
        "graphql_auth.mutations.SendPasswordResetEmail",
        "graphql_auth.mutations.PasswordReset",
        "graphql_auth.mutations.ObtainJSONWebToken",
        "graphql_auth.mutations.VerifyToken",
        "graphql_auth.mutations.RefreshToken",
        "graphql_auth.mutations.RevokeToken",
        "graphql_auth.mutations.VerifySecondaryEmail",
    ],
}


GRAPHQL_AUTH = {
    'LOGIN_ALLOWED_FIELDS': ['email', 'username'],
    # 'EMAIL_FROM': 'gisycu@gmail.com'
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# URL Prefix
URL_PREFIX = ''

PAGE_SIZE = 20

API_PAGE_SIZE = 20

SERVER_URL = os.environ.get('SERVER_URL', '')

AUTH_USER_MODEL = "users.CustomUser"

# SMTP Server
MAIL_HOST = os.environ.get('MAIL_SERVER', 'localhost')

# SMTP Port. Default 25.
# 25 = SMTP
# 465 = SMTPS
# 587 = Submission
MAIL_PORT = 25

# SMTP User
MAIL_HOST_USER = ''

# SMTP User Password.
MAIL_HOST_PASSWORD = ''

# STARTTLS.
MAIL_USE_TLS = False

MAIL_ATTACHMENT_IMAGES = []

# FROM
# DEFAULT_FROM_EMAIL = 'info@outboss.io'
# FROM_EMAIL = 'no-reply@outboss.io'
# SUPPORT_EMAIL = 'support@outboss.io'

SOCIAL_AUTH_PIPELINE = [
    # Get the information we can about the user and return it in a simple
    # format to create the user instance later. On some cases the details are
    # already part of the auth response from the provider, but sometimes this
    # could hit a provider API.
    'social_core.pipeline.social_auth.social_details',

    # Get the social uid from whichever service we're authing thru. The uid is
    # the unique identifier of the given user in the provider.
    'social_core.pipeline.social_auth.social_uid',

    # Verifies that the current auth process is valid within the current
    # project, this is where emails and domains whitelists are applied (if
    # defined).
    'social_core.pipeline.social_auth.auth_allowed',

    # Checks if the current social-account is already associated in the site.
    'social_core.pipeline.social_auth.social_user',

    # Make up a username for this person, appends a random string at the end if
    # there's any collision.
    'social_core.pipeline.user.get_username',

    # Send a validation email to the user to verify its email address.
    # Disabled by default.
    # 'social_core.pipeline.mail.mail_validation',

    # Associates the current social details with another user account with
    # a similar email address. Disabled by default.
    # 'social_core.pipeline.social_auth.associate_by_email',

    # Create a user account if we haven't found one yet.
    'social_core.pipeline.user.create_user',

    # Create the record that associates the social account with the user.
    'social_core.pipeline.social_auth.associate_user',

    # Populate the extra_data field in the social record with the values
    # specified by settings (and the default ones like access_token, etc).
    'social_core.pipeline.social_auth.load_extra_data',

    # Update the user record with any changed info from the auth service.
    'social_core.pipeline.user.user_details',
]


SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ.get('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY', default='')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET =  os.environ.get('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET', default='')

SOCIAL_AUTH_FACEBOOK_KEY =  os.environ.get('SOCIAL_AUTH_FACEBOOK_KEY', default='')
SOCIAL_AUTH_FACEBOOK_SECRET =  os.environ.get('SOCIAL_AUTH_FACEBOOK_SECRET', default='')

SOCIAL_AUTH_TWITTER_KEY =  os.environ.get('SOCIAL_AUTH_TWITTER_KEY', default='')
SOCIAL_AUTH_TWITTER_SECRET =  os.environ.get('SOCIAL_AUTH_TWITTER_SECRET', default='')


