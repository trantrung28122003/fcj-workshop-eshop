---
title : "Create Lambda Function Resize"
date  : "`r Sys.Date()`"
weight: 3
chapter: false
pre   : " <b> 2.2.3. </b> "
---

#### Overview

In this step, you will deploy a Lambda function named **resize-image**, with the purpose of **automatically resizing and optimizing images** every time a new image is uploaded to S3.  
This helps the frontend load images faster, reduce bandwidth usage, and improve rendering performance.  
The function is written in **Node.js 22.x** and uses an **IAM Role** created in the previous step to access S3.

---

#### Create Lambda Function resize-image via AWS Console

1. Go to the [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), then click **Create function**.

![Illustration: Create Lambda function](/images/2-image-upload-and-resize/2.2-resize-image/16.png)

2. On the **Create function** screen, choose **Author from scratch**, and fill in the following under **Basic information**:

- **Function name**: `resize-image`  
- **Runtime**: `Node.js 22.x`  
- **Architecture**: `x86_64`

![Illustration: Basic info](/images/2-image-upload-and-resize/2.2-resize-image/17.png)

{{% notice note %}}
AWS Lambda currently supports various runtimes including **Java**, **.NET**, **Python**, **Node.js**,...  
In this tutorial, we use **Node.js 22.x** — the latest version with better performance and modern syntax compared to Node.js 18.x.
{{% /notice %}}

3. Under **Change default execution role**:

- Select: `Use an existing role`  
- Then choose the IAM Role you created, e.g., `lambda-resize-image-role`  
- Finally, click **Create function**

Lambda will then redirect to the function editor interface.

![Lambda created](/images/2-image-upload-and-resize/2.2-resize-image/18.png)

---

#### Deploy Source Code for Lambda resize-image

You can choose **one of the following two methods** to deploy the Lambda:

---

##### **Option 1: Use Pre-built ZIP File (Quick & Easy)**  
> Recommended for quick deployment without setup. The pre-built package is ready for use.

1. Download the pre-built `.zip` here: [**resize-image.zip**](/attachments/2-image-upload-and-resize/2.2-resize-image/resize-image-lambda.zip)

2. Once downloaded:

- Go to **AWS Lambda**, select the **resize-image** function  
- In the **Code** section, click **Upload from**, then choose **.zip file**

![Upload ZIP](/images/2-image-upload-and-resize/2.2-resize-image/21.png)

- Select the `resize-image-lambda.zip` you downloaded

![Select ZIP](/images/2-image-upload-and-resize/2.2-resize-image/22.png)

3. After uploading, click **Deploy**

![Deploy ZIP](/images/2-image-upload-and-resize/2.2-resize-image/23.png)

**Verify the handler is:** `index.handler`  
{{% notice tip %}}
Lambda handlers follow the format: `<FILENAME>.<FUNCTION_NAME>`
{{% /notice %}}

![Verify handler](/images/2-image-upload-and-resize/2.2-resize-image/24.png)

Then, scroll down for the section **Configure S3 Trigger for Lambda resize-image**

---

##### **Option 2: Manually Build Source Code**
> For those who want to learn by building from scratch.

1. Download the sample source code here: [**resize-image-source.zip**](/attachments/2-image-upload-and-resize/2.2-resize-image/resize-image-source.zip)

2. After extracting, you’ll see:

- `index.mjs`: Lambda logic  
- `package.json`: Declares required dependencies

![Source files](/images/2-image-upload-and-resize/2.2-resize-image/19.png)

**Note:**  
This workshop uses **Sharp** for image processing.  
Since it's a native module, it must be compiled for the target runtime (Amazon Linux 2).

{{% notice warning %}}
If you install `sharp` on Windows/macOS and deploy it to Lambda, it will throw an error like:  
`Error: Cannot find module 'sharp'`  
You **must use Docker with AWS Lambda's official image** to install dependencies.
{{% /notice %}}

3. Open **PowerShell** in the source folder and run:

```bash
docker run --rm -v "${PWD}:/app" -w /app node:22 bash -c "npm install sharp"
```

If using **CMD**, run:

```bash
docker run --rm -v "%cd%:/var/task" -w /var/task public.ecr.aws/lambda/nodejs20.x bash -c "npm install sharp"
```

![Illustration: Source structure](/images/2-image-upload-and-resize/2.2-resize-image/19.png)

---

### 4. Zip the source code for Lambda

- Go to the **resize-image-source** directory  
- Select all files and folders: **index.mjs**, **package.json**, **node_modules/**  
- Compress them into a file named `resize-image-lambda.zip`

![Illustration: Zip files](/images/2-image-upload-and-resize/2.2-resize-image/21-01.png)

---

### 5. Upload the ZIP file to Lambda

- Go to **AWS Lambda**, select the **resize-image** function  
- In the **Code** section, click **Upload from**, then select **.zip file**

![Upload step](/images/2-image-upload-and-resize/2.2-resize-image/21.png)

- Select the `resize-image-lambda.zip` file you just created

![ZIP selected](/images/2-image-upload-and-resize/2.2-resize-image/22.png)

---

### 6. After the upload is complete, click **Deploy**

![Deploy function](/images/2-image-upload-and-resize/2.2-resize-image/23.png)

**Verify the Lambda handler is:** `index.handler`

{{% notice tip %}}
The Lambda handler must follow the format: `<FILENAME>.<FUNCTION_NAME>`
{{% /notice %}}

![Handler confirmation](/images/2-image-upload-and-resize/2.2-resize-image/24.png)

---

## Configure S3 Trigger for Lambda `resize-image`

After uploading the source code and setting up the `resize-image` Lambda function, you need to configure a **S3 Trigger** so that whenever a new image is uploaded, the Lambda function is **automatically invoked** to perform resizing.

---

### 1. Go to the **resize-image** Lambda function page, switch to the **Configuration** tab → choose **Triggers** → click **Add trigger**

![Add S3 trigger](/images/2-image-upload-and-resize/2.2-resize-image/25.png)

---

### 2. In **Trigger configuration**, select the **S3** service

![Select S3 service](/images/2-image-upload-and-resize/2.2-resize-image/26.png)

---

### 3. Fill in the configuration with the following details:

- **Bucket**: Name of the bucket that stores original images, e.g. `upload-originals`  
- **Event types**: `All object create events`  
- **Prefix** (optional): Only trigger when files are uploaded under a folder, e.g. `images/originals/`  
- **Suffix** (optional): Restrict the trigger to specific file extensions

- Check the box:  
**“I acknowledge that using the same S3 bucket for both input and output is not recommended and that this configuration can cause recursive invocations, increased Lambda usage, and increased costs.”**

- Finally, click **Add** to complete.

![Trigger settings](/images/2-image-upload-and-resize/2.2-resize-image/27.png)

---

### In this workshop, you will create **2 separate triggers**:

- **Trigger 1**: `Suffix = .jpg`  
- **Trigger 2**: `Suffix = .png`

Repeat the same steps to create **Trigger 2**:

![Create second trigger](/images/2-image-upload-and-resize/2.2-resize-image/28.png)

{{% notice info %}}
Each S3 trigger can only specify **one Suffix**.  
That’s why in this workshop, you need to create **two separate triggers**: one for `.jpg` and one for `.png`.
{{% /notice %}}

> Clearly specifying `Suffix` ensures that Lambda only processes **image files**, avoiding errors and reducing unnecessary cost.

---

## Result

Once the triggers are configured, you can verify them from the S3 bucket UI:

1. Go to the **S3 Console**, select the **bucket** that stores original images (e.g. `upload-originals-fcj`), then switch to the **Properties** tab

![S3 bucket properties](/images/2-image-upload-and-resize/2.2-resize-image/29.png)

2. Scroll down to the **Event notifications** section — you’ll see a list of **event triggers**  
   Each trigger corresponds to a file **suffix** like `.jpg` or `.png`

3. You will see the **event notifications** associated with the **resize-image Lambda function**

![Event notification list](/images/2-image-upload-and-resize/2.2-resize-image/30.png)

