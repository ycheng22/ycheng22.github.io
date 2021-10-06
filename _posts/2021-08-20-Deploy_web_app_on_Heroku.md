---
title: 'Deploy Web App on Heroku'
date: 2021-08-20
header:
  # image: "/images/heroku_blogs/heroku_image.png"
  # caption: "A beautiful photo"
  teaser: "/images/heroku_blogs/heroku_image.png"
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

App web: <https://yc-web1.herokuapp.com/>

**Contents:**
- [1. Simple web](#1-simple-web)
- [2. Create virtual environment](#2-create-virtual-environment)
- [3. Deploy app to Heroku](#3-deploy-app-to-heroku)

## 1. Simple web

Check below code through the link:

<https://github.com/ycheng22/Build_10_Real_World_Applicatoins/tree/main/Sec21_App4_Personal_Web/Mysite/Demo>

- script1.py
  ```python
  #run in cmd: python .\script1.py

  from flask import Flask, render_template

  app = Flask(__name__)

  @app.route('/') #http://localhost:5000/
  def home():
      return render_template("home.html") #must put home.html under folder "template"

  @app.route('/about/') #http://localhost:5000/about
  def about():
      return render_template("about.html")

  if __name__ == "__main__":
      app.run(debug=True)
  ```
- home.html
- about.html
- layout.html

<!-- <script src="https://github.com/ycheng22/Build_10_Real_World_Applicatoins/blob/main/Sec21_App4_Personal_Web/Mysite/Demo/script1.py"></script> -->


**Web**
![name](/images/heroku_blogs/home_page.png)
fig 1: Home Page

![name](/images/heroku_blogs/about_page.png)
fig 2: About Page

## 2. Create virtual environment

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

## 3. Deploy app to Heroku
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
