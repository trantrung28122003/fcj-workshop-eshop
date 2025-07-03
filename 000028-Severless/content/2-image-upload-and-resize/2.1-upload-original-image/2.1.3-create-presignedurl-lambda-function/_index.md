---
title : "Create GetPresigned Url Lamdba Function"
date : "`r Sys.Date()`"
weight : 3
chapter : false
pre : " <b> 2.1.3. </b> "
---


#### Overview

In this step, you will create a Lambda function named **get-presigned-url**, which is responsible for generating a **Presigned URL** so that the frontend(web or mobile app) can upload images directly to the original S3 bucket.  
This function is written in **Node.js 22.x** and uses S3 access permissions provided by an **IAM Role** created in the previous step.

---

#### Create the get-presigned-url Lambda Function via AWS Console

1. Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), click **Functions**, then click **Create function**.

   ![Illustration: Create function](images/lambda-create-button.png)

2. On the **Create function** screen, choose **Author from scratch**.

3. In the **Basic information** section, provide the following details:

   - **Function name**: `get-presigned-url`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

   ![Illustration: Basic configuration](images/lambda-basic-info.png)

{{% notice note %}}
AWS Lambda currently supports multiple languages including **Java**, **.NET**, **Python**, and **Node.js**.  
In this guide, we use **Node.js 22.x**, which offers better performance and more modern syntax than Node.js 18.x.
{{% /notice %}}

4. Under **Change default execution role**:

   - Choose: `Use an existing role`
   - Then select the IAM Role you created earlier, e.g., `lambda-upload-original-role`

   ![Illustration: Select IAM Role](images/lambda-select-role.png)

---

#### Deploy the Lambda Source Code

After clicking **Create function**, AWS will redirect you to the function's code editor.

{{% notice info %}}
Currently, **Lambda does not support editing ESM (import/export) code directly in the console for Node.js 22.x**.  
You need to prepare the source code and dependencies **on your local machine**, then **zip and upload it manually**.
{{% /notice %}}

---

### Prepare the Source Code and Dependencies

5. Download the sample source code here: **[Download sample files](#)** *(replace with actual link)*

6. Once extracted, the folder should include:

   - `index.mjs`: contains the Lambda logic
   - `package.json`: declares required dependencies

7. Open a terminal or command prompt in that folder and run:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

### 8. Package the source code to upload to Lambda

- Navigate to the **get-presigned-url** folder.
- Select all files and folders inside: **`index.mjs`**, **`package.json`**, and **`node_modules/`**.
- Compress them into a single file named `get-presigned-url-lambda.zip`.

### 9. After creating the ZIP file

- Go to **AWS Lambda** and select the **`get-presigned-url`** function.
- In the **Code** section, click **Upload from**, then choose **.zip file**.
- Select the **`get-presigned-url-lambda.zip`** file you just created.

Make sure the Lambda **handler** is set to: `index.handler`

{{% notice tip %}}
The Lambda handler follows the format: <FILE_NAME>.<FUNCTION_NAME>
In this case, index.handler means the file is index.mjs and it exports a function named handler.
{{% /notice %}}