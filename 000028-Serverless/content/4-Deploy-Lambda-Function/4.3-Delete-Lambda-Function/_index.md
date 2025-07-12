---
title: "Delete Product Data with Lambda Function"
date: "`r Sys.Date()`"
weight: 3
chapter: false
pre: " <b> 4.3. </b> "
---

#### Overview

In this step, we will implement the following Lambda functions:

- A Lambda function named **delete-product** – used to **delete product data** from DynamoDB.  
- A Lambda function named **delete-category** – used to **delete category data** from DynamoDB.

These functions are written in **Node.js 22.x** and use a pre-created **IAM Role** to access DynamoDB.

---

#### Create `delete-product` Lambda Function on AWS Console

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), and click **Create function**.

![Create function](/images/4-deploy-lambda-function/4.3-delete-lambda-function/01.png)

2. On the **Create function** screen, select **Author from scratch**, and fill in:

- **Function name**: `delete-product`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Set function info](/images/4-deploy-lambda-function/4.3-delete-lambda-function/02.png)

{{% notice note %}}
AWS Lambda currently supports multiple languages like **Java**, **.NET**, **Python**, and **Node.js**.  
Here, we use **Node.js 22.x** for better performance and modern syntax support.
{{% /notice %}}

3. Under **Change default execution role**:

- Choose: `Use an existing role`
- Select the role, e.g., `lambda-dynamodb-and-s3-role`
- Click **Create function**

![Assign role](/images/4-deploy-lambda-function/4.3-delete-lambda-function/03-01.png)

{{% notice warning %}}
Lambda currently **does not support inline editing with ESM (import/export)** in Node.js 22.x.  
You need to **prepare the code locally** and **upload as a ZIP file**.
{{% /notice %}}

---

### Option 1: Use Prebuilt `.zip` File

> Recommended for quick deployment without local setup. Provided by the workshop.

1. Download prebuilt ZIP file: [**delete-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.3-delete-lambda-function/delete-product-lambda.zip)

2. Then:

- Go to the **delete-product** Lambda function
- In the **Code** section, click **Upload from** → **.zip file**

![Upload zip](/images/4-deploy-lambda-function/4.3-delete-lambda-function/04.png)

- Choose `delete-product-lambda.zip`, then click **Save**

![Save zip](/images/4-deploy-lambda-function/4.3-delete-lambda-function/05.png)

3. Click **Deploy** after uploading

![Deploy function](/images/4-deploy-lambda-function/4.3-delete-lambda-function/06.png)

4. Set the environment variables:

- `REGION`: your AWS region
- `TABLE_NAME`: your DynamoDB table name
- `ORIGINAL_BUCKET`: S3 bucket for original images
- `RESIZED_BUCKET`: S3 bucket for resized images

Ensure these match your actual resources.

{{% notice note %}}
If you edit the code in the **AWS Console**, don’t forget to click **Deploy** after changes.
{{% /notice %}}

---

### Option 2: Build Locally

1. Download the source: [**delete-product-source.zip**](/attachments/4-deploy-lambda-function/4.3-delete-lambda-function/delete-product-source.zip)

2. Follow the local build guide at:  
[GetPresignedUrl Lambda Function](2.1.1-create-presignedurl-lambda-function/)

{{% notice info %}}
That section includes step-by-step instructions on how to build and zip your Lambda code locally.
{{% /notice %}}

---

#### Create `delete-category` Lambda Function on AWS Console

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), and click **Create function**.

![Create function](/images/4-deploy-lambda-function/4.3-delete-lambda-function/01.png)

2. On the **Create function** screen, select **Author from scratch**, and fill in:

- **Function name**: `delete-category`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Set function info](/images/4-deploy-lambda-function/4.3-delete-lambda-function/07.png)

{{% notice note %}}
AWS Lambda currently supports multiple languages like **Java**, **.NET**, **Python**, and **Node.js**.  
Here, we use **Node.js 22.x** for better performance and modern syntax support.
{{% /notice %}}

3. Under **Change default execution role**:

- Choose: `Use an existing role`
- Select the role, e.g., `lambda-dynamodb-role`
- Click **Create function**

![Assign role](/images/4-deploy-lambda-function/4.3-delete-lambda-function/08.png)

{{% notice warning %}}
Lambda currently **does not support inline editing with ESM (import/export)** in Node.js 22.x.  
You need to **prepare the code locally** and **upload as a ZIP file**.
{{% /notice %}}

---

### Option 1: Use Prebuilt `.zip` File

1. Download ZIP file: [**delete-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.3-delete-lambda-function/delete-category-lambda.zip)

2. Go to the **delete-category** Lambda function

- Under **Code**, click **Upload from → .zip file**

![Upload zip](/images/4-deploy-lambda-function/4.3-delete-lambda-function/09.png)

- Choose the downloaded file and click **Save**

![Save zip](/images/4-deploy-lambda-function/4.3-delete-lambda-function/10.png)

3. Click **Deploy**

![Deploy function](/images/4-deploy-lambda-function/4.3-delete-lambda-function/11.png)

4. Set the environment variables:

- `REGION`: your AWS region
- `TABLE_NAME`: your DynamoDB table name

Ensure these values match your configurations.

{{% notice note %}}
If you edit the code in the **AWS Console**, don’t forget to click **Deploy** after changes.
{{% /notice %}}

---

### Option 2: Build Locally

1. Download the source: [**delete-category-source.zip**](/attachments/4-deploy-lambda-function/4.3-delete-lambda-function/delete-category-source.zip)

2. Follow the local build guide at:  
[GetPresignedUrl Lambda Function](2.1.1-create-presignedurl-lambda-function/)

{{% notice info %}}
That section includes step-by-step instructions on how to build and zip your Lambda code locally.
{{% /notice %}}
