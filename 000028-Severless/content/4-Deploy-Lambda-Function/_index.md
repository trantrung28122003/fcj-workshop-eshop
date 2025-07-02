---
title : "Deloy Lambda Functions"
date : "`r Sys.Date()`"
weight : 4
chapter : false
pre : " <b> 4. </b> "
---

#### Overview

After setting up the data storage system using DynamoDB, the next step is to build **AWS Lambda functions** to handle the core business logic of your application. Each function corresponds to a specific data operation, such as creating, updating, deleting, or retrieving data from the database.

Lambda is a **serverless compute service** provided by AWS, allowing you to run code without managing servers. You focus solely on writing your application logic while AWS automatically handles scaling, availability, and billing based on actual usage.


#### Purpose of Lambda Functions

In this system, we will implement three basic types of Lambda functions:

- **Create/Update functions**: Add new or modify existing records in DynamoDB (e.g. products or categories).
- **Delete functions**: Remove records from the database — either by hard delete or soft delete.
- **Get functions**: Retrieve specific data by `id`, or return a list of items to display in the frontend.

These Lambda functions can be integrated with **API Gateway** to build RESTful APIs, or triggered by events from other services such as **S3**, **EventBridge**, etc.

---

#### Main Steps

1. [Create or Update Lambda Function](4.1-create-or-update-lambda-function/)
2. [Delete Lambda Function](4.2-delete-lambda-function/)
3. [Get Lambda Function](4.3-get-lambda-function/)
