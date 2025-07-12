---
title: "Create or Update Lambda Functions"
date: "`r Sys.Date()`"
weight: 2
chapter: false
pre: " <b> 4.2. </b> "
---

#### Overview

In this section, we will implement the following Lambda functions:

- Two Lambda functions: **create-product**, **update-product** – used to **create or update product data** in DynamoDB.
- Two Lambda functions: **create-category**, **update-category** – used to **create or update category data** in DynamoDB.

These functions are written in **Node.js 22.x** and use access permissions via a pre-created **IAM Role**.

---

#### Create the `create-product` Lambda Function in AWS Console

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), and click **Create function**.

![Create function](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/01.png)

2. On the **Create function** screen, select **Author from scratch**. In the **Basic information** section, enter:

- **Function name**: `create-product`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Set function info](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/02.png)

{{% notice note %}}
AWS Lambda supports multiple runtimes including **Java**, **.NET**, **Python**, and **Node.js**.  
Here, we use **Node.js 22.x** – the latest version with better performance and modern syntax compared to Node.js 18.x.
{{% /notice %}}

3. Under **Change default execution role**:

- Select: `Use an existing role`
- Choose the IAM Role created earlier, e.g., `lambda-dynamodb-role`
- Click **Create function**

![Assign role](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/03.png)

{{% notice warning %}}
Currently, **Lambda doesn't support inline ESM editing for Node.js 22.x**.  
You need to prepare the code and dependencies **locally**, then **zip and upload manually**.
{{% /notice %}}

---

### Option 1: Use Prebuilt `.zip` File (Quick and Easy)
> Recommended if you want to deploy quickly without additional setup. Provided by the workshop.

1. Download the prebuilt `.zip` file here: [**create-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-product-lambda.zip)

2. Then:
- Go to the **create-product** Lambda function
- Under the **Code** tab, click **Upload from** → **.zip file**

![Upload code](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/04.png)

- Choose the `create-product-lambda.zip` file you just downloaded

![Select zip](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/05.png)

3. After uploading, click **Deploy**

![Deploy function](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/15.png)

4. Set environment variables:

- `REGION`: your AWS region
- `TABLE_NAME`: your DynamoDB table name
- `RESIZED_BUCKET`: S3 bucket name for resized images

Make sure these values match your actual resources; otherwise, the Lambda will not work correctly.

{{% notice note %}}
If you edit code directly in the **AWS Lambda Console**, don’t forget to **click Deploy** afterward.
{{% /notice %}}

---

### Option 2: Build and Upload Locally

1. Download the source code here: [**create-product-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-product-source.zip)

2. Follow build instructions in:
[Tạo hàm Lambda GetPresignedUrl](2.1.1-create-presignedurl-lambda-function/)

---

#### Create the `update-product` Lambda Function

Same steps as `create-product`:

- **Function name**: `update-product`
- Runtime: `Node.js 22.x`
- Architecture: `x86_64`
- IAM Role: `lambda-dynamodb-role`

1. Download prebuilt `.zip`: [**update-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-product-lambda.zip)

2. Upload to Lambda

![Upload](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/10.png)

![Save zip](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/11.png)

3. Click **Deploy**

![Deploy function](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/16.png)

4. Set environment variables:

- `REGION`
- `TABLE_NAME`
- `RESIZED_BUCKET`

{{% notice note %}}
If you edit code directly in the **AWS Lambda Console**, don’t forget to **click Deploy** afterward.
{{% /notice %}}

Optional:  
Download the source: [**update-product-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-product-source.zip)

---

#### Create the `create-category` Lambda Function

Same steps as above:

- **Function name**: `create-category`
- Runtime: `Node.js 22.x`
- Architecture: `x86_64`
- IAM Role: `lambda-dynamodb-role`

1. Download `.zip`: [**create-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-category-lambda.zip)

2. Upload the `.zip` file to the `create-category` Lambda

![Upload](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/13.png)

3. Set environment variables:

- `REGION`
- `TABLE_NAME`

Optional:  
Download the source: [**create-category-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-category-source.zip)

Build instructions: [GetPresignedUrl Lambda Guide](2.1.1-create-presignedurl-lambda-function/)

---

#### Create the `update-category` Lambda Function

Same steps as above:

- **Function name**: `update-category`
- Runtime: `Node.js 22.x`
- Architecture: `x86_64`
- IAM Role: `lambda-dynamodb-role`

1. Download `.zip`: [**update-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-category-lambda.zip)

2. Upload the `.zip` file to the `update-category` Lambda

![Upload](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/14.png)

3. Set environment variables:

- `REGION`
- `TABLE_NAME`

Optional:  
Download the source: [**update-category-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-category-source.zip)  
Build instructions: [GetPresignedUrl Lambda Guide](2.1.1-create-presignedurl-lambda-function/)
---
title: "Create or Update Lambda Functions"
date: "`r Sys.Date()`"
weight: 2
chapter: false
pre: " <b> 4.2. </b> "
---

#### Overview

In this section, we will implement the following Lambda functions:

- Two Lambda functions: **create-product**, **update-product** – used to **create or update product data** in DynamoDB.
- Two Lambda functions: **create-category**, **update-category** – used to **create or update category data** in DynamoDB.

These functions are written in **Node.js 22.x** and use access permissions via a pre-created **IAM Role**.

---

#### Create the `create-product` Lambda Function in AWS Console

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), and click **Create function**.

![Create function](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/01.png)

2. On the **Create function** screen, select **Author from scratch**. In the **Basic information** section, enter:

- **Function name**: `create-product`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Set function info](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/02.png)

{{% notice note %}}
AWS Lambda supports multiple runtimes including **Java**, **.NET**, **Python**, and **Node.js**.  
Here, we use **Node.js 22.x** – the latest version with better performance and modern syntax compared to Node.js 18.x.
{{% /notice %}}

3. Under **Change default execution role**:

- Select: `Use an existing role`
- Choose the IAM Role created earlier, e.g., `lambda-dynamodb-role`
- Click **Create function**

![Assign role](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/03.png)

{{% notice warning %}}
Currently, **Lambda doesn't support inline ESM editing for Node.js 22.x**.  
You need to prepare the code and dependencies **locally**, then **zip and upload manually**.
{{% /notice %}}

---

### Option 1: Use Prebuilt `.zip` File (Quick and Easy)
> Recommended if you want to deploy quickly without additional setup. Provided by the workshop.

1. Download the prebuilt `.zip` file here: [**create-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-product-lambda.zip)

2. Then:
- Go to the **create-product** Lambda function
- Under the **Code** tab, click **Upload from** → **.zip file**

![Upload code](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/04.png)

- Choose the `create-product-lambda.zip` file you just downloaded

![Select zip](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/05.png)

3. After uploading, click **Deploy**

![Deploy function](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/15.png)

4. Set environment variables:

- `REGION`: your AWS region
- `TABLE_NAME`: your DynamoDB table name
- `RESIZED_BUCKET`: S3 bucket name for resized images

Make sure these values match your actual resources; otherwise, the Lambda will not work correctly.

{{% notice note %}}
If you edit code directly in the **AWS Lambda Console**, don’t forget to **click Deploy** afterward.
{{% /notice %}}

---

### Option 2: Build and Upload Locally

1. Download the source code here: [**create-product-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-product-source.zip)

2. Follow build instructions in:
[Tạo hàm Lambda GetPresignedUrl](2.1.1-create-presignedurl-lambda-function/)

---

#### Create the `update-product` Lambda Function

Same steps as `create-product`:

- **Function name**: `update-product`
- Runtime: `Node.js 22.x`
- Architecture: `x86_64`
- IAM Role: `lambda-dynamodb-role`

1. Download prebuilt `.zip`: [**update-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-product-lambda.zip)

2. Upload to Lambda

![Upload](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/10.png)

![Save zip](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/11.png)

3. Click **Deploy**

![Deploy function](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/16.png)

4. Set environment variables:

- `REGION`
- `TABLE_NAME`
- `RESIZED_BUCKET`

{{% notice note %}}
If you edit code directly in the **AWS Lambda Console**, don’t forget to **click Deploy** afterward.
{{% /notice %}}

Optional:  
Download the source: [**update-product-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-product-source.zip)

---

#### Create the `create-category` Lambda Function

Same steps as above:

- **Function name**: `create-category`
- Runtime: `Node.js 22.x`
- Architecture: `x86_64`
- IAM Role: `lambda-dynamodb-role`

1. Download `.zip`: [**create-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-category-lambda.zip)

2. Upload the `.zip` file to the `create-category` Lambda

![Upload](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/13.png)

3. Set environment variables:

- `REGION`
- `TABLE_NAME`

Optional:  
Download the source: [**create-category-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/create-category-source.zip)

Build instructions: [GetPresignedUrl Lambda Guide](2.1.1-create-presignedurl-lambda-function/)

---

#### Create the `update-category` Lambda Function

Same steps as above:

- **Function name**: `update-category`
- Runtime: `Node.js 22.x`
- Architecture: `x86_64`
- IAM Role: `lambda-dynamodb-role`

1. Download `.zip`: [**update-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-category-lambda.zip)

2. Upload the `.zip` file to the `update-category` Lambda

![Upload](/images/4-deploy-lambda-function/4.2-create-or-update-lambda-function/14.png)

3. Set environment variables:

- `REGION`
- `TABLE_NAME`

Optional:  
Download the source: [**update-category-source.zip**](/attachments/4-deploy-lambda-function/4.2-create-or-update-lambda-function/update-category-source.zip)  
Build instructions: [GetPresignedUrl Lambda Guide](2.1.1-create-presignedurl-lambda-function/)
