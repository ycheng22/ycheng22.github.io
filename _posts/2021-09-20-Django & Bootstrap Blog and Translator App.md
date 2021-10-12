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

Check this blog on [github](https://ycheng22.github.io/Django-&-Bootstrap-Blog-and-Translator-App/)

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
- [10. Template Inheritance](#10-template-inheritance)
- [11. Adding translator app to previous app](#11-adding-translator-app-to-previous-app)
  - [11.1 Creating an Empty App Structure of the Translator](#111-creating-an-empty-app-structure-of-the-translator)
  - [11.2 Creating an HTML Form in Django](#112-creating-an-html-form-in-django)
  - [11.3 Configuring the URLs](#113-configuring-the-urls)
  - [11.4 Creating a Form](#114-creating-a-form)
  - [11.5 Getting and Processing User Input Through a Form](#115-getting-and-processing-user-input-through-a-form)
  - [11.6 Defining translator and add it to navbar](#116-defining-translator-and-add-it-to-navbar)


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

## 10. Template Inheritance

There are many same elements show up in each webpage, template inheritance can help us code less. The idea is code the repeat parts into `base.html`, then extend that in each html.

`base.html`

![name](/images/20210920_django_blog_app/base_html.png)

Note: `'home'` in above code `href="  "` is from `name` in `urls.py`.

`blog.html`

![name](/images/20210920_django_blog_app/blog_html2.png)

`about.html`

![name](/images/20210920_django_blog_app/about.png)

`index.html`

![name](/images/20210920_django_blog_app/index_html_ext.png)

## 11. Adding translator app to previous app

### 11.1 Creating an Empty App Structure of the Translator

In the project folder, run 
```
python manage.py startapp translator
```

Revise `mysite/settings.py`

![name](/images/20210920_django_blog_app/Mysite_settings_trans.png)


### 11.2 Creating an HTML Form in Django

Add `templates/translator.html`

![name](/images/20210920_django_blog_app/tran_html.png)

### 11.3 Configuring the URLs

In `mysite/urls.py`, add: 

![name](/images/20210920_django_blog_app/mysite_urls_tran.png)

Create `tranlator/urls.py`

```python
from . import views
from django.urls import path

urlpatterns = [
    path('', views.translator_view, name='translator_view')
]
```

### 11.4 Creating a Form

`translate/Views.py`

```python
from django.shortcuts import render

# Create your views here.

def translator_view(request):
    return render(request, 'translator.html')
```

Go to http://127.0.0.1:8000/translate/

![name](/images/20210920_django_blog_app/tran_view.png)

### 11.5 Getting and Processing User Input Through a Form

Revise `tranlate/views.py`

```python
from django.shortcuts import render
from . import translate
# Create your views here.

def translator_view(request):
    if request.method == 'POST':
        original_text = request.POST['my_textarea']
        output = translate.translate(original_text)
        return render(request, 'translator.html', 
            {'output_text':output, 'original_text':original_text})
    else:
        return render(request, 'translator.html')
```

### 11.6 Defining translator and add it to navbar

Add `translate/translate.py`

```python
from googletrans import Translator
#pip install googletran==4.0.0-rc1

def translate(text):
    translator = Translator()
    translation = translator.translate(text=text, dest='de')
    return translation.text
```

Add translator on navbar in `base.html`

![name](/images/20210920_django_blog_app/base_tran.png)

![name](/images/20210920_django_blog_app/trans_view.png)
