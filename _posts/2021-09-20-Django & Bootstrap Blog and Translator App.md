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
- [5. Setting up an Empty Django Blog App](#5-setting-up-an-empty-django-blog-app)
  - [5.1 Revise `./blog/models.py`](#51-revise-blogmodelspy)
  - [5.2 HTML Templates](#52-html-templates)
  - [5.3  Django Views](#53--django-views)
  - [5.4 URL Patterns](#54-url-patterns)
- [6. Creating Admin Interface Views](#6-creating-admin-interface-views)
- [7. Creating a Homepage](#7-creating-a-homepage)
- [8. Listing Blog Posts on the Homepage](#8-listing-blog-posts-on-the-homepage)
- [9. Adding Bootstrap to Django](#9-adding-bootstrap-to-django)


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

## 5. Setting up an Empty Django Blog App

### 5.1 Revise `./blog/models.py`

```python
from django.db import models
from django.contrib.auth.models import User

STATUS = ((0, 'Draft'), (1, 'Publish'))
# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=200, unique=True)
    #to means from other database, here is from User
    #on_delete=models.CASCADE means the post will be deleted if the use was deleted from database
    author = models.ForeignKey(to=User, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS, default=0)

    def __str__(self):
        return self.title
```

Then run

```
python manage.py makemigrations
python manage.py migrate
```

A table `blog_post` will be added to database `db.sqlite3`.

![name](/images/20210920_django_blog_app/db_table_create.png)


### 5.2 HTML Templates

In current folder, create new folder `templates`, create new file `blog.html` under the created folder,

`blog.html`

![name](/images/20210920_django_blog_app/blog_html1.png)

In `mysite/settings.py`, add

```python
import os
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
```

### 5.3  Django Views

Revise `blog/views.py`

```python
from django.shortcuts import render
from .models import Post

# Create your views here.

class BlogView:
    model = Post
    template_name = 'blog.html'
```

### 5.4 URL Patterns

Post a record into the database:

![name](/images/20210920_django_blog_app/db_record1.png)

Create `urls.py` under `blog`

`urls.py`

```python
from . import views
from django.urls import path

urlpatterns = [
    path('<slug:slug>', views.BlogView.as_view(), name='blog_view')
]
```
`path('<slug:slug>')` will search slug in each row in the database

Revise `mysite/urls.py`

![name](/images/20210920_django_blog_app/mysite_urls.png)

Revise `mysite/settings.py`

![name](/images/20210920_django_blog_app/mysite_settings_temp_dir.png)

## 6. Creating Admin Interface Views

Revise `blog/admin.py`

```python
from django.contrib import admin
from .models import Post

# Register your models here.
admin.site.register(Post)
```
Go to http://127.0.0.1:8000/admin/

![name](/images/20210920_django_blog_app/admin_post.png)

A new function `Posts` shows up.

Click `Add` at the right side of `Posts`, input above information, save.

Go to http://127.0.0.1:8000/cats

![name](/images/20210920_django_blog_app/blog_cats.jpg)


Revise `blog/admin.py`

```python
from django.contrib import admin
from .models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_created', 'author')

# Register your models here.
admin.site.register(Post, PostAdmin)
```
Now the post list will show blog` title, data_created, author`.

![name](/images/20210920_django_blog_app/blog_show.png)

## 7. Creating a Homepage

Create `index.html` under `templates`

```html
<!DOCTYPE html>
<html>
    <body>
        This is the homepage!
    </body>
</html>
```

Revise `blog/urls.py`

```python
from . import views
from django.urls import path

urlpatterns = [
    path('<slug:slug>', views.BlogView.as_view(), name='blog_view'),
    path('', views.HomeView.as_view(), name='home_view')
]
```

Revise `blog/views.py`

```python
from django.shortcuts import render
from .models import Post
from django.views import generic

# Create your views here.

class BlogView(generic.DetailView):
    model = Post
    template_name = 'blog.html'

#TemplateView used when you only need to render a 
#template without getting data from model
class HomeView(generic.TemplateView):
    template_name = 'index.html'
```

## 8. Listing Blog Posts on the Homepage

`index.html`

![name](/images/20210920_django_blog_app/index_html.png)

`urls.py`

```python
from . import views
from django.urls import path

urlpatterns = [
    path('<slug:slug>', views.BlogView.as_view(), name='blog_view'),
    path('about/', views.AboutView.as_view(), name='home_view'),
    path('', views.PostList.as_view(), name='home')
]
```

`views.py`

```python
from django.shortcuts import render
from .models import Post
from django.views import generic

# Create your views here.

class BlogView(generic.DetailView):
    model = Post
    template_name = 'blog.html'

#TemplateView used when you only need to render a 
#template without getting data from model
class AboutView(generic.TemplateView):
    template_name = 'about.html'

#order_by('-date_created'), - means reversed order
class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by('-date_created')
    template_name = 'index.html'    
```

![name](/images/20210920_django_blog_app/list_post.jpg)

## 9. Adding Bootstrap to Django

Refer to [Bootstrap introduction](https://getbootstrap.com/docs/5.1/getting-started/introduction/).

Add css and JavaScript library to `index.html`.

`blog/index.html`:

![name](/images/20210920_django_blog_app/index_html_bootstrap.png)

Now the homepage looks like this:

![name](/images/20210920_django_blog_app/list_post_bootstrap.png)




