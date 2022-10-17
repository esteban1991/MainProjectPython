# -*- coding: utf-8 -*-

"""

    This file is part of the Abacoos Core project.

    Copyright (c) 2022 QvaLt. All wrongs reserved

    For the full copyright and license information, please view the LICENSE
    file that was distributed with this source code.

"""

from __future__ import unicode_literals

import socket

"""
Local settings
- Run in Debug mode
- Use console backend for emails
- Add Django Debug Toolbar
- Add django-extensions as app
"""

from .base import *  # noqa

# DEBUG
# ------------------------------------------------------------------------------
DEBUG = True
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

# SITE CONFIGURATION
# ------------------------------------------------------------------------------
# Hosts/domain names that are valid for this site
# See https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ['localhost', '127.0.0.1' ]

# django-debug-toolbar
# ------------------------------------------------------------------------------
# MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', ]
# INSTALLED_APPS += ['debug_toolbar', ]

INTERNAL_IPS = ['127.0.0.1', '10.0.2.2', ]

# DEBUG_TOOLBAR_CONFIG = {
#     'DISABLE_PANELS': [
#         'debug_toolbar.panels.redirects.RedirectsPanel',
#     ],
#     'SHOW_TEMPLATE_CONTEXT': True,
# }

# django-extensions
# ------------------------------------------------------------------------------
#INSTALLED_APPS += ['django_extensions', 'graphql_playground']


# Cors headers
# CORS_ALLOW_CREDENTIALS = True
# CORS_ALLOWED_ORIGINS = (
#     'http://localhost:3000',
#     'http://127.0.0.1:3000',
# )


# SMTP Port. Default 25.
# 25 = SMTP
# 465 = SMTPS
# 587 = Submission
MAIL_PORT = 2500
