---
title: 'Deploy PostgreSQL on Heroku'
date: 2021-08-30
header:
  # image: "/images/heroku_blogs/heroku_image.png"
  # caption: "A beautiful photo"
  teaser: "/images/heroku_blogs/heroku_image.png"
tags:
- PostgreSQL
- Heroku
- Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: deploy PostgreSQL on Heroku and ingest Data using Pandas and SQLAlchemy.

Reference: <https://towardsdatascience.com/deploy-free-postgresql-database-in-heroku-and-ingest-data-8002c574a57d>.

Check this blog on [github]().

**Contents:**
- [1. Introduction](#1-introduction)
- [2. Generate and store Heroku token](#2-generate-and-store-heroku-token)
  - [2.1 Generate Heroku token](#21-generate-heroku-token)
    - [2.1.1 Method 1: browser](#211-method-1-browser)
    - [2.1.2 Method 2: Heroku CLI](#212-method-2-heroku-cli)
  - [2.1 Store Heroku token to environment](#21-store-heroku-token-to-environment)

## 1. Introduction

## 2. Generate and store Heroku token

### 2.1 Generate Heroku token

#### 2.1.1 Method 1: browser

Go to `Account settings → Applications` . Under the `Authorizations` section, click on `Create authorizations` . You have to give a `description` in the opened window and set the `expiry time` or just set no expiry for the token (by leaving the box blank).

#### 2.1.2 Method 2: Heroku CLI

`heroku authorizations:create`

![name](/images/heroku_blogs/token.png)

### 2.1 Store Heroku token to environment

on linux: `export HEROKU_API_KEY=<your_token>`

on windows: `setx HEROKU_API_KEY=<your_token>`

- check it in command window: `echo %HEROKU_API_KEY%`

- check it in python: 
  ```python
  import os
  os.environ["HEROKU_API_KEY"]
  ```

..To be continue










