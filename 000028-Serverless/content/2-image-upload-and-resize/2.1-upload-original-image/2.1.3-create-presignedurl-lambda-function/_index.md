---
title : "Create Lambda Function GetPresignedUrl"
date  : "`r Sys.Date()`"
weight: 3
chapter: false
pre   : " <b> 2.1.3. </b> "
---

#### Overview

In this step, you will deploy a Lambda function named **get-presigned-url**, whose purpose is to generate a **Presigned URL** that allows the frontend to upload images directly to the S3 bucket for original images.  
This function is written in **Node.js 22.x** and uses an **IAM Role** (created earlier) to access S3.

---

#### Create the get-presigned-url Lambda Function via AWS Console

1. Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select **Functions**, then click **Create function**.

![Illustration: Create Lambda function](/images/2-image-upload-and-resize/2.1-upload-original-image/14.png)

2. On the **Create function** screen, choose **Author from scratch**, and in the **Basic information** section, enter:

- **Function name**: `get-presigned-url`  
- **Runtime**: `Node.js 22.x`  
- **Architecture**: `x86_64`

![Illustration: Create Lambda function](/images/2-image-upload-and-resize/2.1-upload-original-image/16.png)

{{% notice note %}}
Currently, AWS Lambda supports several languages including **Java**, **.NET**, **Python**, **Node.js**,...  
In this tutorial, we use **Node.js 22.x** — the latest version with higher performance and modern syntax compared to Node.js 18.x.
{{% /notice %}}

3. In the **Change default execution role** section:

- Choose: `Use an existing role`  
- Then select the IAM Role created earlier, e.g., `lambda-upload-original-role`  
- Finally, click **Create function**

Once created, Lambda will redirect to the code editor screen.

![Illustration: Lambda function created](/images/2-image-upload-and-resize/2.1-upload-original-image/17-fetch.png)

---

#### Deploy Lambda Source Code for get-presigned-url

Once the function is created, Lambda will open the code editor.

{{% notice info %}}
Currently, **Node.js 22.x does not support direct editing with ESM (import/export) syntax** in the console.  
Therefore, you need to **prepare the source code and dependencies locally**, then **zip and upload manually**.
{{% /notice %}}

---

### Prepare Source Code and Dependencies

You can choose **one of the following two methods** to deploy the Lambda function:

---

##### **Option 1: Use Pre-built ZIP File (Quick and Easy)**  
> Recommended for quick deployment without extra setup — this workshop provides a pre-built version.

1. Download the pre-built `.zip` file here: [**get-presigned-url-lambda.zip**](/attachments/2-image-upload-and-resize/2.1-upload-original-image/get-presigned-url-lambda.zip)

2. After downloading the ZIP file:

- Go to **AWS Lambda**, select the **get-presigned-url** function  
- In the **Code** section, click **Upload from**, then select **.zip file**

![Illustration: Upload ZIP file](/images/2-image-upload-and-resize/2.1-upload-original-image/22.png)

- Select the downloaded `get-presigned-url-lambda.zip`

![Illustration: Select ZIP file](/images/2-image-upload-and-resize/2.1-upload-original-image/24.png)

3. After uploading, click **Deploy**

![Illustration: Deploy Lambda code](/images/2-image-upload-and-resize/2.1-upload-original-image/25.png)

---

##### **Option 2: Build from Source Code Manually**  
> For users who want to learn and build from scratch.

1. Download the source code here: [**get-presigned-url-source.zip**](/attachments/2-image-upload-and-resize/2.1-upload-original-image/get-presigned-url-source.zip)

2. After extracting, you’ll see the following files:

- `index.mjs`: contains the Lambda logic  
- `package.json`: declares required libraries

![Illustration: Source structure](/images/2-image-upload-and-resize/2.1-upload-original-image/18.png)

3. Open a terminal or command prompt inside the folder and run:

```bash
npm install
```

![Illustration: Install dependencies](/images/2-image-upload-and-resize/2.1-upload-original-image/19.png)

---

4. Zip the source code for Lambda

- Navigate to the **get-presigned-url-source** directory  
- Select all the following items: **index.mjs**, **package.json**, and **node_modules/**  
- Compress them into a single ZIP file named `get-presigned-url-lambda.zip`

![Illustration: Zip source files](/images/2-image-upload-and-resize/2.1-upload-original-image/20.png)

---

5. After creating the ZIP file:

- Go to **AWS Lambda**, and select the **get-presigned-url** function  
- In the **Code** section, click **Upload from**, then select **.zip file**

![Illustration: Upload ZIP file](/images/2-image-upload-and-resize/2.1-upload-original-image/22.png)

- Select the newly created file: **`get-presigned-url-lambda.zip`**

![Illustration: Select ZIP file](/images/2-image-upload-and-resize/2.1-upload-original-image/24.png)

---

6. Once the file is uploaded, click **Deploy**

![Illustration: Deploy function](/images/2-image-upload-and-resize/2.1-upload-original-image/25.png)

---

##### **Verify Lambda Handler: index.handler**
{{% notice tip %}}
The Lambda handler must follow the format: `<FILENAME>.<FUNCTION_NAME>`  
In this case: `index.handler`
{{% /notice %}}

![Illustration: Confirm handler](/images/2-image-upload-and-resize/2.1-upload-original-image/26.png)

