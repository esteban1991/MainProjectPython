# CORE - API

This project was created with [Django](https://www.djangoproject.com/) and implements a [Graphql](https://graphql.org/) API.

## Installation

> **If you want to use Docker to run this API, you don't need to do this step.**

### Installing dependencies

First, upgrade PIP package.

```bash
pip install --upgrade pip
```

Install package dependencies using:

```bash
pip install -r ./requirements/develop.txt
```

### Configure environment variables

Create `.env` file in the project root folder with the `.env.sample` variables. Optionally, you can rename `.env.sample`
file to `.env`.

### Create test user

Use this command to create a test user with admin permissions:

```bash
DJANGO_SUPERUSER_USERNAME=admin \
DJANGO_SUPERUSER_PASSWORD=admin \
DJANGO_SUPERUSER_EMAIL=qvalt.devadmin@gmail.com \
python manage.py createsuperuser --noinput
```

### Loading example data ***(optional)***

To load some sample data use this command:

```bash
python manage.py load_data
```

### Run on local server

Run the development server using:

```bash
python manage.py runserver 0.0.0.0:8000
```

Open [http://localhost:8000/graphql/](http://localhost:8000/graphql/) with your browser to see the result.

## GraphQL

Puede consultar la referencia de Authorization API en https://django-graphql-auth.readthedocs.io/en/latest/api/
Algunos ejemplos más usados en GraphQL.md

## Enjoy

