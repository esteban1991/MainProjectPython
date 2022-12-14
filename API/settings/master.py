# -*- coding: utf-8 -*-
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


from __future__ import unicode_literals

"""
Production Configurations
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
ALLOWED_HOSTS = ["localhost","127.0.0.1"]

INSTALLED_APPS += ['gunicorn', ]

# Cors headers
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = (
    'http://localhost:3000',
    'http://127.0.0.1:3000',
)

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": os.environ.get('REDIS_CACHE_LOCATION', 'redis://redis:6379/1'),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient"
        },
        "KEY_PREFIX": os.environ.get('REDIS_CACHE_KEY_PREFIX', 'CORE'),
    }
}

# Cache time to live is 15 minutes.
CACHE_TTL = 60 * 15

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"
