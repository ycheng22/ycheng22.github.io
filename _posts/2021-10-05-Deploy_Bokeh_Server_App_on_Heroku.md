---
title: 'Deploy_Bokeh_Server_App_on_Heroku'
date: 2021-10-05
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

Summary: deploy Bokeh server app on Heroku.

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/main/_posts/2021-10-05-Deploy_Bokeh_Server_App_on_Heroku.md).

App web: <https://yc-bokeh-server.herokuapp.com/>

**Contents:**
- [1. Introduction](#1-introduction)

## 1. Introduction

According to Bokeh's introduction on [widgets](https://docs.bokeh.org/en/latest/docs/user_guide/interaction/widgets.html):

There are two ways to use a widget’s functionality:

- A `CustomJS` callback. This approach will work in standalone HTML documents or Bokeh server apps.

- Use `bokeh serve` to start a Bokeh server and set up event handlers with `.on_change` (or for some widgets, `.on_click`).

The standalone method has been tried at [here](https://ycheng22.github.io/2020_Houston_flights_delay_dashboard/).

Now let's try `bokeh serve` method.


```
📦Demo
 ┣ 📂data
 ┃ ┗ 📜Hou_flights.csv
 ┣ 📂scripts
 ┃ ┣ 📂__pycache__
 ┃ ┃ ┣ 📜routes.cpython-37.pyc
 ┃ ┃ ┗ 📜routes.cpython-38.pyc
 ┃ ┣ 📜routes.py
 ┃ ┗ 📜__init__.py
 ┣ 📜main.py
 ┣ 📜Procfile
 ┣ 📜requirements.txt
 ┗ 📜runtime.txt
 ```
