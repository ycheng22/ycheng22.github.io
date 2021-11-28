---
title: 'Imposing Structure to MongoDB by Mongoose Schema'
date: 2021-09-08
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/20210908_mongodb_mongoose/mongoose_mongodb.png"
tags:
  - MongoDB
  - Mongoose
  - JavaScript
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Imposing structure to MongoDB by Mongoose schema.

**Contents:**
- [1. Introduction](#1-introduction)
- [2. Installing Mongoose](#2-installing-mongoose)
- [3. Imposing structure by Mongoose Schema](#3-imposing-structure-by-mongoose-schema)

## 1. Introduction

MongoDB is a document database, noSQL database, no structure imposed on the document, which is a drawback.

Mongoose Schema can help us impose structure on documents.

```
📦mongodb
 ┗ 📂data
 📦node-mongoose
 ┣ 📂models
 ┃ ┗ 📜dishes.js
 ┣ 📜index.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜yarn.lock
```

## 2. Installing Mongoose

- Create a folder named `node-mongoose` and move into the folder, type `npm init` to initialize a `package.json` file.

    `package.json`
    ```
    {
    "name": "node-mongoose-db",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "ycheng",
    "license": "ISC",
    "dependencies": {
        "mongoose": "5.1.7"
    }
    }
    ```

 - Install Mongoose by typing the following at the prompt:

    `npm install mongoose@5.1.7 --save`

    or

    `yarn add mongoose@5.1.7`

## 3. Imposing structure by Mongoose Schema
- Create a sub-folder `models`, in the sub-folder, create `dishes.js`, 

    `dishes.js`
    ```js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const dishSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    },{
        timestamps: true
    });

    var Dishes = mongoose.model('Dish', dishSchema);

    module.exports = Dishes;
    ```

    `index.js`
    ```js
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const dishSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    },{
        timestamps: true
    });

    var Dishes = mongoose.model('Dish', dishSchema);

    module.exports = Dishes;
    ```



![name](/images/20210908_mongodb_mongoose/.png)



















