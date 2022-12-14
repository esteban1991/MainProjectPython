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


"""
WSGI config for quickstart project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
from dotenv import load_dotenv

from django.core.wsgi import get_wsgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.' + os.environ.get('ENV'))

application = get_wsgi_application()
