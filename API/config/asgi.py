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
ASGI config for quickstart project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os
from dotenv import load_dotenv

from django.core.asgi import get_asgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.' + os.environ.get('ENV'))

application = get_asgi_application()
