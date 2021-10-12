---
title: 'Django & Bootstrap Blog and Translator App'
date: 2021-09-20
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/20210920_django_blog_app/demo.png"
tags:
  - Web
  - Django
  - Bootstrap
  - Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Build Django and Bootstrap Blog and Translator App.

Check this blog on [github](#)

**Contents:**
- [1. Introduction](#1-introduction)
- [2. Initialize the project](#2-initialize-the-project)
  - [2.1 Install virtual environment](#21-install-virtual-environment)
  - [2.2 Initialize Django](#22-initialize-django)
- [3. Creating a Superuser for the Project](#3-creating-a-superuser-for-the-project)
- [4. Setting up an Empty Django Blog App](#4-setting-up-an-empty-django-blog-app)


## 1. Introduction

In this blog, a blog app which uses Django and Bootstrap was created, a translator was added in this app.

Overview of folder structure:
```

```

## 2. Initialize the project
### 2.1 Install virtual environment

Install virtual environment in the project folder: 

```python
python -m venv env
```

Activate the new virtual environment and install `Django`.

You can find details about installing and activate virtual environment in this [blog](https://ycheng22.github.io/Deploy_web_app_on_Heroku/).

### 2.2 Initialize Django

In the current folder, run

```python
django-admin startproject mysite .
```

A folder `mysite` and file `manage.py` will be created in the current folder.

Start the server:

```python
python manage.py runserver
```

The address is: 

```
http://127.0.0.1:8000/
```

According to the warning, run

```python
python manage.py migrate
``` 

This will create file `db.sqlite3`. Django uses `sqlite3` as default database.

To read the `db.sqlite3` file, the software [`db browser`](https://sqlitebrowser.org/) is a good choice.

## 3. Creating a Superuser for the Project

Still in virtual environment, Create superuser:

```python
python manage.py createsuperuser
```

![name](/images/20210920_django_blog_app/superuser.png)

Set username, email, password.

Start server

```python
python manage.py runserver
```
Go to `http://127.0.0.1:8000/admin`

Input your just created username and password.

![name](/images/20210920_django_blog_app/superuser_login.png)

Then login: 

![name](/images/20210920_django_blog_app/superuser_login_in.png)

## 4. Setting up an Empty Django Blog App

Create an empty Django blog app, run

```python
python manage.py startapp blog
```

A folder `blog` will be created.

In the settings `./mysite/settings.py`, add `blog`

![name](/images/20210920_django_blog_app/setting_blog.png)

