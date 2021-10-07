---
title: 'Build Data Collector Web App (Flask, PostgreSQL)'
date: 2021-09-12
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/20210912_web_app_pythonanywhere/pythonanywhere_image.png"
tags:
  - Web
  - Flask
  - PostgreSQL
  - Database
  - Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Build Data Collector Web App with `Flask` and `PostgreSQL`, deploy the app to [pythonanywhere](https://www.pythonanywhere.com/).

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/main/_posts/2021-09-12-Build_Data_Collector_Web_App.md)

App web: <http://ycheng.pythonanywhere.com/>

**Contents:**
- [1. Introduction](#1-introduction)
- [2. Front-end code](#2-front-end-code)
- [3. Creating virtual environment](#3-creating-virtual-environment)
- [4. Creating the PostGreSQL Database Model](#4-creating-the-postgresql-database-model)
- [5. Send email to the participant](#5-send-email-to-the-participant)
- [6. Back-end code](#6-back-end-code)
- [7. Deploying the database web app online](#7-deploying-the-database-web-app-online)


## 1. Introduction

In this blog, a web app is created, it can collect user email and height, then send the participant's `height`, `average height` of all participants, and `number of participants` to the participant.

The data will be recorded in PostgreSQL database, when this app works fine locally, it's deployed to live server: `pythonanywhere.com`.

Overview of folder structure:
```
📦Database_web_app
 ┣ 📂static
 ┃ ┗ 📜main.css
 ┣ 📂templates
 ┃ ┣ 📜index.html
 ┃ ┗ 📜success.html
 ┣ 📜add_table_manually.py
 ┣ 📜app.py
 ┣ 📜send_email.py
 ┗ 📜test_sqlalchemy.py
```

## 2. Front-end code

`./templates/index.html`

![name](/images/20210912_web_app_pythonanywhere/index.png)

`./templates/success.html`

![name](/images/20210912_web_app_pythonanywhere/suc_code.png)

Main page: 

![name](/images/20210912_web_app_pythonanywhere/pythonanywhere_image.png)

Main page when input duplicated email:

![name](/images/20210912_web_app_pythonanywhere/duplicate_.png)

Success page:

![name](/images/20210912_web_app_pythonanywhere/success.png)

## 3. Creating virtual environment 

The details about creating virtual environment can be found in this blog: [Deploy Web App on Heroku](https://ycheng22.github.io/Deploy_web_app_on_Heroku/) section 2. 

Necessary packages:
- flask
- psycopg2
- flask_sqlalchemy

## 4. Creating the PostGreSQL Database Model
 Note: the `PostgreSQL` has to be installed before moving forward.

**Method 1:**

```python
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql://postgres:1992@localhost/height_collector'
db = SQLAlchemy(app)
db.create_all()
```
*Note:* the above method doesn't work in my case.

**Method 2:**

`add_table_manually.py`
```python
from flask import Flask, render_template, request
#from flask.ext.sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql://postgres:1992@localhost/height_collector'
db = SQLAlchemy(app)

class Data(db.Model):
    __tablename__ = "data"
    id = db.Column(db.Integer, primary_key=True)
    email_ = db.Column(db.String(120), unique=True)
    height_ = db.Column(db.Integer)

    def __init__(self, email_, height_):
        self.email_ = email_
        self.height_ = height_

db.create_all() 
#db.create_all() was after db = SQLAlchemy(app), 
#before class Data(db.Model),Error: column "email_" of relation "data" does not exist
#so move to here
data = Data('a@a.com', 110)
db.session.add(data)
db.session.commit()
```
*Note:* This works for me.

The created table:

![name](/images/20210912_web_app_pythonanywhere/pdAdmin.png)

## 5. Send email to the participant

`send_email.py`
```python
from email.mime.text import MIMEText
import smtplib

def send_email(email, height, ave_height, count):
    from_email = "mygmail@gmail.com"
    from_passowrd = "mypassword"
    to_email = email

    subject = "Height data"
    message = "Hey there, your height is <strong>%s</strong>. \
        Average height of all is <strong>%s</strong> and that is calculated out \
        <strong>%s</strong> of people." % (height, ave_height, count)
    
    msg = MIMEText(message, 'html')
    msg['subject'] = subject
    msg['To'] = to_email
    msg['From'] = from_email

    gmail = smtplib.SMTP('smtp.gmail.com', 587)
    gmail.ehlo()
    gmail.starttls()
    gmail.login(from_email, from_passowrd)
    gmail.send_message(msg)
```

<!-- The email:

![name](/images/20210912_web_app_pythonanywhere/.png) -->

## 6. Back-end code

`app.py`
```python
from flask import Flask, render_template, request
#from flask.ext.sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
from send_email import send_email
from sqlalchemy.sql import func

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql://postgres:1992@localhost/height_collector'
db = SQLAlchemy(app)
#db.create_all()

class Data(db.Model):
    __tablename__ = "data"
    id = db.Column(db.Integer, primary_key=True)
    email_ = db.Column(db.String(120), unique=True)
    height_ = db.Column(db.Integer)

    def __init__(self, email_, height_):
        self.email_ = email_
        self.height_ = height_

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/success", methods=['POST'])
def success():
    if request.method == "POST":
        email = request.form["email_name"]
        height = request.form["height_name"]
        if db.session.query(Data).filter\
            (Data.email_==email).count() == 0: #avoid duplicated email
            data = Data(email, height)
            db.session.add(data)
            db.session.commit()
            ave_height = db.session.query(func.avg(Data.height_)).scalar()
            ave_height = round(ave_height, 1)
            count = db.session.query(Data.height_).count() #num of records
            #send_email(email, height, ave_height, count)
            return render_template("success.html")
    return render_template('index.html', 
            text="Email already exits, try different one!") #display on index.html {{text | safe}}

if __name__ == '__main__':
    app.debug = True
    app.run(port = 5001)
```

## 7. Deploying the database web app online

- Creating an account at [`pythonanywhere`](https://www.pythonanywhere.com/) before moving forward.
- The web address will be: [ycheng.pythonanywhere.com](http://ycheng.pythonanywhere.com/)
- Go to `Files`, under folder `mysite`, upload files:
  
  ![name](/images/20210912_web_app_pythonanywhere/mysite.png)

  - `flask_app.py` will hold the code we typed in `app.py`.
  - Click `New directory` to create `templates` folder, `static` folder, and upload files. 
- Go to `Web`
  ![name](/images/20210912_web_app_pythonanywhere/web.png)
- Go to `Database`, create and connect to `MySQL` database
  ![name](/images/20210912_web_app_pythonanywhere/db.png)
  - create database, name is `height_collector`
  - set password
- Click the `Start a console on:ycheng$height_collector` to go to MySQL commnd
  - Create columns:
  
    `CREATE TABLE data (id SERIAL PRIMARY KEY, email_ VARCHAR(120), height_ INT);`

    ![name](/images/20210912_web_app_pythonanywhere/create_table.png)
- Connect to the database, snippet of `flask_app.py`: 
  ```python
  from flask import Flask, render_template, request
  from flask_sqlalchemy import SQLAlchemy
  from send_email import send_email
  from sqlalchemy.sql import func

  app = Flask(__name__)
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://ycheng:mypassword@ycheng.mysql.pythonanywhere-services.com/ycheng$height_collector'
  db = SQLAlchemy(app)
  ```
 *Note:* Note: no space in the string.
- Go to webs, reload web, go the web address, it should work now.
- Go to `Web`, open `Error` Log to debug
- 
![name](/images/20210912_web_app_pythonanywhere/debug.png)

