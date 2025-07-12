---
title: "Lambda Functions to Get Data"
date: "`r Sys.Date()`"
weight: 4
chapter: false
pre: " <b> 4.4. </b> "
---

#### Overview

In this step, we will implement the following Lambda functions:

- A Lambda function named **get-product** – used to **retrieve product data** from DynamoDB.  
- A Lambda function named **get-category** – used to **retrieve category data** from DynamoDB.

These functions are written in **Node.js 22.x** and use a pre-created **IAM Role** with permissions to access DynamoDB.

{{% notice note %}}
In this workshop, each "get" Lambda handles **both listing all items and retrieving a single item by ID**.  
That means you only need **one Lambda function** for both types of queries.
{{% /notice %}}

---

#### Create `get-product` Lambda Function in AWS Console

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), and click **Create function**.

![Create function](/images/4-deploy-lambda-function/4.4-get-lambda-function/01.png)

2. On the **Create function** screen, select **Author from scratch**, and in the **Basic information** section, enter:

- **Function name**: `get-product`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Set function info](/images/4-deploy-lambda-function/4.4-get-lambda-function/02.png)

{{% notice note %}}
AWS Lambda supports various languages like **Java**, **.NET**, **Python**, and **Node.js**.  
In this workshop, we use **Node.js 22.x** – the latest version with better performance and modern syntax support.
{{% /notice %}}

3. In **Change default execution role**:

- Choose: `Use an existing role`
- Select the IAM Role you created, e.g., `lambda-dynamodb-role`
- Click **Create function**

![Assign role](/images/4-deploy-lambda-function/4.4-get-lambda-function/03.png)

{{% notice warning %}}
Currently, **Lambda does not support inline ESM editing** (i.e., `import/export`) for Node.js 22.x.  
You must prepare the source code and libraries **locally**, then upload as a **.zip file**.
{{% /notice %}}

---

### Option 1: Use Prebuilt `.zip` (Recommended)

> Use this if you want a quick deployment without building anything locally.

1. Download the prebuilt ZIP:  
[**get-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-product-lambda.zip)

2. In AWS Console:

- Go to the **get-product** function
- Under **Code**, click **Upload from → .zip file**

![Upload ZIP](/images/4-deploy-lambda-function/4.4-get-lambda-function/04.png)

- Choose `get-product-lambda.zip` and click **Save**

![Save ZIP](/images/4-deploy-lambda-function/4.4-get-lambda-function/05.png)

3. Click **Deploy**

![Deploy Lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/06.png)

4. Update the **Environment Variables**:

- `REGION`: your AWS region
- `TABLE_NAME`: DynamoDB table name
- `ORIGINAL_BUCKET`: S3 bucket for original images
- `RESIZED_BUCKET`: S3 bucket for resized images

Make sure these values match your actual configuration.

{{% notice note %}}
When editing code in the **AWS Console**, remember to click **Deploy** after changes.
{{% /notice %}}

---

### Option 2: Build and Zip Locally

1. Download the source code:  
[**get-product-source.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-product-source.zip)

2. Follow the build instructions here:  
[GetPresignedUrl Lambda Function](2.1.1-create-presignedurl-lambda-function/)

{{% notice info %}}
This section explains how to install libraries and zip your Lambda code for deployment.
{{% /notice %}}

---

#### Create `get-category` Lambda Function in AWS Console

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), and click **Create function**.

![Create function](/images/4-deploy-lambda-function/4.4-get-lambda-function/01.png)

2. On the **Create function** screen, select **Author from scratch**, and in the **Basic information** section, enter:

- **Function name**: `get-category`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Set function info](/images/4-deploy-lambda-function/4.4-get-lambda-function/07.png)

{{% notice note %}}
AWS Lambda supports various languages like **Java**, **.NET**, **Python**, and **Node.js**.  
We are using **Node.js 22.x** for modern syntax and optimal performance.
{{% /notice %}}

3. In **Change default execution role**:

- Choose: `Use an existing role`
- Select your IAM Role (e.g., `lambda-dynamodb-role`)
- Click **Create function**

![Assign role](/images/4-deploy-lambda-function/4.4-get-lambda-function/08.png)

{{% notice warning %}}
Lambda currently **does not support inline ESM editing** for Node.js 22.x.  
You must prepare the code locally and upload a zipped version.
{{% /notice %}}

---

### Option 1: Use Prebuilt `.zip` (Recommended)

1. Download the ZIP:  
[**get-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-category-lambda.zip)

2. In AWS Console:

- Go to the **get-category** function
- Under **Code**, click **Upload from → .zip file**

![Upload ZIP](/images/4-deploy-lambda-function/4.4-get-lambda-function/09.png)

- Choose the ZIP file and click **Save**

![Save ZIP](/images/4-deploy-lambda-function/4.4-get-lambda-function/10.png)

3. Click **Deploy**

![Deploy Lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/11.png)

4. Update the **Environment Variables**:

- `REGION`: your AWS region
- `TABLE_NAME`: your DynamoDB table name
- `ORIGINAL_BUCKET`: S3 bucket for original images
- `RESIZED_BUCKET`: S3 bucket for resized images

Ensure these values match your environment.

{{% notice note %}}
When editing code in the **AWS Console**, remember to click **Deploy** after changes.
{{% /notice %}}

---

### Option 2: Build and Zip Locally

1. Download the source code:  
[**get-category-source.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-category-source.zip)

2. Follow the build instructions here:  
[GetPresignedUrl Lambda Function](2.1.1-create-presignedurl-lambda-function/)

{{% notice info %}}
That section explains how to build and zip the Lambda function for manual deployment.
{{% /notice %}}
