---
title: "Create IAM Role for Lambda Function"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

### Overview

Before deploying any Lambda function, you need to create an **IAM Role** that grants the Lambda function permission to access other AWS services, such as **reading/writing data in DynamoDB**. In this guide, we will assign the necessary permissions for Lambda to interact with DynamoDB.

IAM (Identity and Access Management) acts as an authorization layer, allowing Lambda to operate securely within your AWS environment.

### Steps to Create an IAM Role

1. Navigate to the [IAM Console](https://console.aws.amazon.com/iam/home) and select **Roles** in the left-hand menu.  
2. Click **Create role**.  
3. Under **Trusted entity type**, choose **AWS service**.  
4. Under **Use case**, select **Lambda**.  
5. Click **Next**.  
6. In the **Permissions policies** section, search for and attach **AmazonDynamoDBFullAccess**.  
   *(You can also create a custom policy if you want to enforce stricter, more granular permissions.)*  
7. Click **Next**, then enter a name for your role, for example: `lambda-dynamodb-role`.  
8. Click **Create role** to finalize.

### Reusability

This IAM Role can be reused for multiple Lambda functions that interact with DynamoDB, such as:

- Creating or updating data  
- Deleting items  
- Querying items by ID or listing items  

{{% notice tip %}}
In production environments, follow the principle of least privilege by creating a custom IAM policy that grants only the specific permissions needed (e.g., `PutItem`, `GetItem`, `DeleteItem`) instead of using the full-access policy.
{{% /notice %}}
