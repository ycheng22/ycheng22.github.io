---
title: 'Deploy_web_app_on_Heroku'
date: 2021-08-20
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  # teaser: "/images/20210805_blog_pymol/show_session.png"
tags:
- Bokeh
- Heroku
- Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: deploy web app on Heroku.

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/master/_posts/2021-08-20-Deploy_web_app_on_Heroku.md).

**Contents:**
- [Simple web](#simple-web)
- [Create virtual environment](#create-virtual-environment)
- [Deploy app on Heroku](#deploy-app-on-heroku)


## Simple web

Check below code through the link:
<https://github.com/ycheng22/Build_10_Real_World_Applicatoins/tree/main/Sec21_App4_Personal_Web/Mysite/Demo>
- script1.py
- home.html
- about.html
- layout.html

<script src="https://emgithub.com/ycheng22/Build_10_Real_World_Applicatoins/blob/main/Sec21_App4_Personal_Web/Mysite/Demo/script1.py"></script>

**Web**
![name](/images/heroku_blogs/home_page.png)
fig 1: Home Page

![name](/images/heroku_blogs/about_page.png)
fig 2: About Page

## Create virtual environment

To deploy the web, Create folder `Mysite`, move all necessary files to` Mysite/Demo`.

- Install virtualenv package:

  ```pip install virtualenv```.
- Create new virtual environment:

  ```python -m venv virtual```
- Activate the new virtualenv:

  change directory to virtual/Scripts, run ```activate```.

  *note:* windows cmd prompt can run `activate`, git cmd cannot.

- change directory to Demo

- Install necessary packages for this app:

  ```pip install flask```

  ```pip install pandas```

  .etc

- Run demo locally with new virtual env:

  ```python script1.py```

  The app will run at: http://127.0.0.1:5000/

## Deploy app on Heroku
- create Heroku account
- Install Heroku CLI
- Login Heroku in cmd prompt:

  In folder `Mysite/Demo`:

  ```heroku login```

  browser will open and click login.
- List your apps on Heroku:

  ```heroku apps```

- Create apps:

  ```heroku create app-name```

  Website address:  `app-name.herokuapp.com`
- Get a list of packages of the new virtual env

  ```pip freeze```

- Install gunicorn

  ```pip install gunicorn```

- Write packages info to `requirements.txt`

  ```\pip freeze > requirements.txt```

- Create `Procfile`(no file extension)

  ```web: gunicorn script1:app```
- Create `runtime.txt`, specify the python version, check the website <https://devcenter.heroku.com/articles/python-runtimes#supported-python-runtimes>

  ```python-3.9.6```
- Git

  ```bash
  git init
  git add .
  git commit -m "message"
  Heroku git:remote --app app-name
  git push heroku master
  ```

If everything works right, you can check your app at <https://yc-web1.herokuapp.com/>.

If something goes wrong, run ```heroku logs --tail```
