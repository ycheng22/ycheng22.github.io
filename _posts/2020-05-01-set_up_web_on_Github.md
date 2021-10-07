---
title: 'Set up Web on Github (Academicpages Template)'
date: 2020-05-01
header:
#   image: "/images/academicpages_template.png"
#   caption: "A beautiful photo"
  teaser: "/images/academicpages_template.png"
categories:
  - blog
tags:
  - Github Pages
  - academicpages
  - Web
  - Jekyll
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

In this blog, I record the process about setting up my website on Github.

* Tool: Github Desktop, VS Code.

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/main/_posts/2020-05-01-set_up_web_on_Github.md).

**Contents:**
- [1. Usefull resources](#1-usefull-resources)
- [2. Set up my web step by step](#2-set-up-my-web-step-by-step)
  - [2.1 Choose your favorite theme](#21-choose-your-favorite-theme)
  - [2.2 Customize the theme](#22-customize-the-theme)

# 1. Usefull resources

- GIthub Pages (https://pages.github.com/)
- Themes
    - https://pages.github.com/themes/
    - http://jekyllthemes.org/
    - https://jekyllthemes.io/
    - Others 
- [How to Create a Blog Using Jekyll and GitHub Pages on Windows](https://www.kiltandcode.com/2020/04/30/how-to-create-a-blog-using-jekyll-and-github-pages-on-windows/)

    *you don't need to install jekyll server if you don't need to compile markdown locally. Just push your changes to github, view the changes on your website address.
    

# 2. Set up my web step by step

## 2.1 Choose your favorite theme

Once you choose your favorite theme, fork its repo.   

I choose this academic theme (https://academicpages.github.io/). Fork it. 

Go to the repo in your Github, rename the repo's name to ``[your_name].github.io``.

## 2.2 Customize the theme

- Change profile: in file `_config.yml`, 

    * In **Site Settings** section, change *name, description, url*.

    * In **Site Author** section, change *name, avatar, bio, location*, and social media you want to add. 

- More words on social media: 

    * Add social media name or full link depends on the setting in `_includes/author-profile.html`.
    If the social media is not provided in the file, you can add a new code block into above html file.
    
        ![name](/images/web_social.png)
    
    * Change the `<i class="fas fa-link">` to add icon for your social media.
    
- Change top menu: in file `_data/navigation.yml`
    
    * Add or remove menu, for example:
    
        ```
        - title: "About me"
            url: /aboutme/
        ```
    * url will connect the markdown file `_pages/aboutme.md`, edit `aboutme.md` to change the contents. 

- Add new blog: `_posts/blog-demo.md`
    
    * Add new markdown file in the folder `_posts`
    
    * Add images to folder `images`
    
- Add attachments: `_publications/2009-10-01-paper-title-number-1.md`
    
    * Add the attachment to folder `files`
        ```
        [Download the file](http://ycheng22.github.io/files/paper1.pdf)
        ```

Run server locally:

`bundle install`

`bundle exec jekyll serve`

Address: <http://127.0.0.1:4000>


