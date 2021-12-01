---
title: 'Install_and_Use_Intel_oneAPI_Toolkit'
date: 2021-10-25
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/less_images/intel_oneAPI.jpg"
tags:
  - Intel oneAPI 
  - Visual Studio 2019
  - Fortran
  - Math Kernel Library
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Installing Intel oneAPI, run fortran code with calling Math Kernel Library on Visual Studio 2019.

**Contents:**
- [1. Introduction](#1-introduction)
- [2. Download and install](#2-download-and-install)
- [3. Run Fortran with calling `Math Kernel Library`](#3-run-fortran-with-calling-math-kernel-library)

## 1. Introduction
Intel has transitioned from providing `Intel® Parallel Studio XE` as a free tool to providing `Intel® oneAPI Toolkits` as a free tool. To run fortran code with calling Math Kernel Library on Visual Studio 2019, which was described in previous [blog](https://ycheng22.github.io/blog/Install_Intel_Parallel_Studio_on_Linux_Windows/#2-run-fortran-code-on-windows), `Intel® oneAPI Toolkits` has to be installed. 

## 2. Download and install
Download [Intel® oneAPI Base Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/base-toolkit-download.html), `Math Kernel Library` are included in it.

Select the Operating System, Distribution, Installer Type.

Then download without sign up.

Download [Intel® oneAPI HPC Toolkit](https://www.intel.com/content/www/us/en/developer/tools/oneapi/hpc-toolkit-download.html), `Intel® Fortran Compilers` are included in it.

Suppose the `Visual Studio 2019` has been installed, installing `Intel® oneAPI Base Toolkit` firstly, then install `Intel® oneAPI HPC Toolkit`.

## 3. Run Fortran with calling `Math Kernel Library`

The following procedures are the same, which have been described in this [blog](https://ycheng22.github.io/blog/Install_Intel_Parallel_Studio_on_Linux_Windows/#2-run-fortran-code-on-windows).
