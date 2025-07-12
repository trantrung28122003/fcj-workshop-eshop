---
title : "Deploying Lambda Functions"
date  : "r Sys.Date()" 
weight: 4
chapter: false
pre   : " <b> 4. </b> "
---

#### Overview

After setting up a data storage system using DynamoDB, the next step is to build **AWS Lambda functions** to handle the core business logic of your application. Each function will correspond to a specific data operation such as creating, updating, deleting, or retrieving data from the database.

Lambda is a serverless compute service provided by AWS that allows you to run code **without managing servers**. You only focus on the business logic, while AWS Lambda automatically handles scaling, event-driven execution, and pay-per-use billing.

---

#### Roles of Lambda Functions

In this system, we will implement three basic types of Lambda functions:

- **Create/Update functions**: Add or update product/category information in DynamoDB.  
- **Delete functions**: Permanently or softly delete records from the database.  
- **Get functions**: Retrieve detail by ID or return a list for frontend display.

These functions can be integrated into **API Gateway** to form a RESTful API or connected to other AWS events (e.g., successful S3 upload, user actions, etc.).

---

#### Preparation: Create an IAM Role for Lambda

Before creating Lambda functions, you must create an IAM Role that grants permission to access DynamoDB. This step is **mandatory** to allow Lambda functions to interact with the database.

Steps:

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home#/roles) → choose **Roles** → click **Create role**  
2. Under **Trusted entity type**, select: `AWS service`  
3. For **Use case**, choose: `Lambda`  
4. Click **Next** and attach the following permission:  
   - Search and select: `AmazonDynamoDBFullAccess` *(or use a custom policy to limit access)*  
5. Name the role, e.g.: `lambda-dynamodb-role`  
6. Click **Create role**

---

#### Main Steps

1. [Create IAM Role for Lambda Function](4.1-create-iam-role-for-lambda-function/)  
2. [Lambda Function to Create or Update Data](4.2-create-or-update-lambda-function/)  
3. [Lambda Function to Delete Data](4.3-delete-lambda-function/)  
4. [Lambda Function to Get Data](4.4-get-lambda-function/)
