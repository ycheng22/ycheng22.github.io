---
title: 'Communication from Node App to MongoDB'
date: 2021-09-07
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/20210907_node_mongodb/node_mongo.png"
tags:
  - MongoDB
  - Node
  - JavaScript
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Communication from Node application to MongoDB.

**Contents:**
- [1. Introduction](#1-introduction)
- [2. Introduction to MongoDB](#2-introduction-to-mongodb)
  - [2.1 Installation](#21-installation)
  - [2.2 Operation](#22-operation)

## 1. Introduction

MongoDB is a document database, noSQL database.

This blog records how to install MongoDB and how to communicate from Node application with a MongoDB server.

## 2. Introduction to MongoDB

### 2.1 Installation

Downloade `MongoDB Community Server` from here: <https://www.mongodb.com/try/download/community>.

Follow the instruction to install it. After installation, add folder `bin` to environment path.

The MongoDB Shell (`mongosh`) is not installed with MongoDB Server. You need to follow the [mongosh installation instructions](https://docs.mongodb.com/mongodb-shell/install/) to download and install mongosh separately.

### 2.2 Operation

- Create a folder named `mongodb` on your computer and create a subfolder under it named `data`.

- Move to the `mongodb` folder and then start the MongoDB server by typing the following at the prompt:

    `mongod --dbpath=data --bind_ip 127.0.0.1`

- Open another command window and then type the following at the command prompt to start the mongo REPL shell:

    `mongo`

- At the Mongo REPL prompt, type the following commands one by one and see the resulting behavior:

    ```
    db
    use conFusion
    db
    db.help()
    ```

- Create a collection named dishes, and insert a new dish document in the collection:

    `db.dishes.insertOne({ name: "Uthappizza", description: "Test" });`

- Print out the dishes in the collection, type:

    `db.dishes.find().pretty();`

    ![name](/images/20210907_node_mongodb/find_pretty.png)

- Learn the information encoded into the ObjectId by typing the following at the prompt:

    ```js
    var id = new ObjectId();
    id.getTimestamp();
    ```
    ![name](/images/20210907_node_mongodb/objectID.png)

- Type `exit` at the REPL prompt to exit the Mongo REPL.

