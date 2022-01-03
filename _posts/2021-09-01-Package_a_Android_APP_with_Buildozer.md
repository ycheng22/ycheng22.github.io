---
title: 'Package a Android APP with Buildozer'
date: 2021-09-01
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/less_images/buildozer_blog.png"
tags:
  - Kivy 
  - Buildozer
  - Python
  - Mobile APP
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Package a Android APP with `Buildozer`.

**Contents:**
- [1. Introduction](#1-introduction)
- [2. The environment and the code](#2-the-environment-and-the-code)
  - [2.1 Installing solftware](#21-installing-solftware)
  - [2.2 Creating virtual environment](#22-creating-virtual-environment)
  - [2.3 The code](#23-the-code)
- [3. Packaging the APP](#3-packaging-the-app)
- [4. Some errors to be solved](#4-some-errors-to-be-solved)

## 1. Introduction

This blog records my first try with packaging python code to Andriod APP with `Buildozer`. Once the first packaging successfully, the following packaging process will be very smoothly without pain.

Right now `Buildozer` only works on linux, So linux system should be installed.

Recommends:
- Install Ubuntu in VirtualBox
- Develop the code with VScode

## 2. The environment and the code

### 2.1 Installing solftware

- VirtualBox <https://www.virtualbox.org/>
- Install Ubuntu20.04 in Virtualbox
- To save time, assign more processors with Ubuntu when packaging 
- Install VScode 

### 2.2 Creating virtual environment

Reference: <https://kivy.org/doc/stable/gettingstarted/installation.html>
- Creating virtual environment
- 
  `conda create -n envname python=3.9`

  or

  `python -m virtualenv envname`
- Activating the virtual env
  
  `conda activate envname`
- Installing Kivy 
  
  `python -m pip install kivy[base] kivy_examples`
- Installing Buildozer
  
  `pip install buildozer`

### 2.3 The code
Create a folder, and add `main.py` with below code.
This code is from 
<https://kivy.org/doc/stable/examples/gen__application__app_with_build__py.html>

```python
import kivy
kivy.require('1.0.7')

from kivy.app import App
from kivy.uix.button import Button

class TestApp(App):

    def build(self):
        # return a Button() as a root widget
        return Button(text='hello world')

if __name__ == '__main__':
    TestApp().run()
```

## 3. Packaging the APP

Move to the folder, run 

```
buildozer init
```
A file `buildozer.spec` has been created. Open the file, you can edit the app name, source file extensions, requirements, etc. 

After editing the .spec file, you can run below command to package the android app.

```
buildozer android debug
```

If everything workds fine, the final `apk` file will be in the `bin` folder. But that's not the case at mose time. 

## 4. Some errors to be solved

- `Git` not found
  ```
  sudo apt install git
  ```
- `java`, `javac` not found
  ```
  sudo apt install openjdk-11-jre-headless
  sudo apt install openjdk-11-jdk-headless
  ```
- `Cython` note found
  ```
  pip install Cython
  ```
- `autoconf, automake, libtoolize, libffi` not found

Try all below
  ```
  sudo apt-get install zliblg-dev

  sudo apt install autoconf
  sudo apt-get install automake autoconf libltdl-dev

  sudo apt install build-essential libltdl-dev libffi-dev libssl-dev
  ```
  
After any correting, run the package command as 
```
buildozer android clean debug
```


