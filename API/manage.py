from __future__ import unicode_literals

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


#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv

def main():
    # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    load_dotenv('.env')
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.' + os.environ.get('ENV'))
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
