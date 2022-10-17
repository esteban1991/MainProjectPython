# -*- coding: utf-8 -*-

"""

    This file is part of the Core API project.

    Copyright (c) 2022 QvaLT. All wrongs reserved

    For the full copyright and license information, please view the LICENSE
    file that was distributed with this source code.

"""

from __future__ import unicode_literals

"""
Production Configurations
- Use Minio for storing static files and uploaded media
- Use mailgun to send emails
- Use Redis for cache
"""

from .base import *  # noqa

# DEBUG
# ------------------------------------------------------------------------------
DEBUG = False
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

# SITE CONFIGURATION
# ------------------------------------------------------------------------------
# Hosts/domain names that are valid for this site
# See https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ['localhost']

INSTALLED_APPS += ['gunicorn' ]

# Cors headers
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = (
#     # 'https://abacoos.arjonapaintservices.com',
# )

