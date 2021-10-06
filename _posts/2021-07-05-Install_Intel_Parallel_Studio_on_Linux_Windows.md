---
title: 'Install_Intel_Parallel_Studio_on_Linux_Windows'
date: 2021-07-05
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
#   teaser: "/images/20210805_blog_pymol/show_session.png"
categories:
  - blog
tags:
  - Intel
  - Fortran
  - Linux
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Intel Parallel Studio is a powerful tool in many computational scenarios. 

In this blog, I will introduction how to install it and run Fortran code as an example. 

# 1. Install it on Linux

## 1.1 Download “intel parallel studio”

Go to this website to download, choose student,
https://software.intel.com/en-us/parallel-studio-xe/choose-download,
register and login with username and password, download full packcage.

## 1.2 Installation guide

Reference: https://software.intel.com/sites/default/files/parallel-studio-xe-2020-install-guide-lin_2.pdf
Refer to 3.2 2 Installation Through Command Line Interface (CLI) in above guide.

- Cd to the download folder, unzip the software package
- Cd to the folder, bash install.sh
- Then, follow the instructions to install
- set the environment variables
    After installation, follow the instruction to set the environment variables by sourcing the environment script
    https://software.intel.com/en-us/get-started-with-fortran-compiler-for-linux-parallel-studio-xe

    ![name](/images/install_intel_pack/prerequisite.png)
    fig 1: Set the environment variables


- Cd intel/parallel_studio_xe_2020.0.088/bin

- Source psxevars.sh

## 1.3 Test fortran compiler

**Test hello world**

Name a file `hello_for.f90`

```fortran
print *, "Hello, world" 
end
```

Cd to the code’s folder, 

`ifort hello_for.f90`

`./a.out`

![name](/images/install_intel_pack/ifortran.png)
fig 2: Test fortran compiler

**Test mkl**

cd to the fortran code which calls mkl, compile it:

```bash
ifort main.f90 -lmkl_intel_lp64 -lmkl_sequential -lmkl_core -lpthread -lm
```

![name](/images/install_intel_pack/ifortran_mkl.png)
fig 3: Test mkl

Build successed, which means mkl is called successfully. 

# 2. Run Fortran code on windows

## 2.1 Install visual studio

## 2.2 Download Intel parallel studio

Go to the website, https://software.intel.com/en-us/parallel-studio-xe/choose-download#students, choose windows.

Login and download windows version. When download is done, go to the download folder and double click the software to install. 

Follow the instruction to install. 

## 2.3 Run Fortran code

When installation is done, start your visual studio, My visual studio is Microsoft visual studio 2019.

- Create a new project
- Choose the Empty Project with F

    ![name](/images/install_intel_pack/vs2.png)
    fig 4: Choose the Empty Project

- Input Project Name and Location, Create
- In the pop up window, choose Empty Project, OK

    ![name](/images/install_intel_pack/vs4.png)
    
    fig 5: Choose the Empty Project

- Right click source file, Add -> new item

    ![name](/images/install_intel_pack/vs6.png)
    fig 6: Add new item

- Add fortran file

    ![name](/images/install_intel_pack/vs7.png)
    fig 7: Add fortran file

- Right click the project name, then click properties

    ![name](/images/install_intel_pack/vs8.png) 
    
    fig 8: Project properties
    
- In the new window, click Fortran -> Libraries -> Use Intel Math Kernel Library ->choose Sequential,OK

    ![name](/images/install_intel_pack/vs9.png)
    fig 9: Fortran Libraries setting

- In same windown, Linker -> System -> SubSystem -> Consol, OK

    ![name](/images/install_intel_pack/vs10.png)
    fig 10: Linker System
    
- write fortran hellow world in `hello_for.f90`

    ```fortran
    print *, "Hello, world" 
    end
    ```
    
- Then click Build -> Build Solution, hopefully, it will success.

    ![name](/images/install_intel_pack/vs12.png)
    ![name](/images/install_intel_pack/vs13.png)
    fig 11: Build Solution

- Then click Debug -> Start Without Debugging to run the code

    ![name](/images/install_intel_pack/vs14.png)
    ![name](/images/install_intel_pack/vs15.png)
    
    fig 12: Run code
