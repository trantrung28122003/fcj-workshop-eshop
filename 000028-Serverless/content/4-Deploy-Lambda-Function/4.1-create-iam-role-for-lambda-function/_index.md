---
title: "Create IAM Role for Lambda Function"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

### Overview

Before deploying any Lambda function, you must create an **IAM Role** – which grants permission for the Lambda function to access other AWS services, such as **reading/writing data in DynamoDB**.  
In this section, we’ll grant appropriate permissions.

**IAM (Identity and Access Management)** acts as a permission layer, allowing Lambda to securely operate in your AWS environment.

---

### Steps to Create IAM Role for Lambda Functions Working with DynamoDB

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home). Select **Roles** from the left menu and click **Create role**.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/01.png)

2. Under **Trusted entity type**, select `AWS service`, and for **Use case**, choose `Lambda`.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/02.png)

3. In **Permissions policies**, search for and attach the `AmazonDynamoDBFullAccess` policy, then click **Next**.  
> *(You can also create a custom policy if you want stricter access control.)*

![Attach policy](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03.png)

4. In the **"Name, review, and create"** section, give your role a name, e.g., `lambda-dynamodb-role`.

![Review role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/04.png)

5. Click **Create role** to finish.

![Done](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/05.png)

---

### Create IAM Role for Lambda Functions that Interact with Both DynamoDB and S3

Unlike functions that only interact with DynamoDB, some functions (like the delete image function) need permission to delete images from S3.  
You’ll create a separate IAM Role with access to both **DynamoDB** and **S3**.

1. Again, go to the [IAM Console](https://console.aws.amazon.com/iam/home), choose **Roles** from the left menu and click **Create role**.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/01.png)

2. Under **Trusted entity type**, select `AWS service`, and for **Use case**, choose `Lambda`.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/02.png)

3. In **Permissions policies**, attach:

- `AmazonDynamoDBFullAccess`
- `AmazonS3FullAccess`

![Attach policy](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03.png)  
![Attach policy](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03-01.png)

- Then click **Next**  
> *(You can also create custom policies to enforce least-privilege access.)*

4. In the **"Name, review, and create"** section, name your role, e.g., `lambda-dynamodb-and-s3-role`.

![Review role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/04-01.png)

5. Click **Create role** to complete the process.

![Done](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/05.png)

---

### Role Reusability

This IAM Role can be reused across multiple Lambda functions that interact with DynamoDB, including:

- Create or update operations
- Deleting records
- Querying detail by ID or listing items

{{% notice tip %}}
In a production environment, it’s recommended to apply the **principle of least privilege** by creating custom IAM policies with specific actions only (e.g., `PutItem`, `GetItem`, `DeleteItem`) instead of using full access.
{{% /notice %}}
---
title: "Create IAM Role for Lambda Function"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

### Overview

Before deploying any Lambda function, you must create an **IAM Role** – which grants permission for the Lambda function to access other AWS services, such as **reading/writing data in DynamoDB**.  
In this section, we’ll grant appropriate permissions.

**IAM (Identity and Access Management)** acts as a permission layer, allowing Lambda to securely operate in your AWS environment.

---

### Steps to Create IAM Role for Lambda Functions Working with DynamoDB

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home). Select **Roles** from the left menu and click **Create role**.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/01.png)

2. Under **Trusted entity type**, select `AWS service`, and for **Use case**, choose `Lambda`.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/02.png)

3. In **Permissions policies**, search for and attach the `AmazonDynamoDBFullAccess` policy, then click **Next**.  
> *(You can also create a custom policy if you want stricter access control.)*

![Attach policy](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03.png)

4. In the **"Name, review, and create"** section, give your role a name, e.g., `lambda-dynamodb-role`.

![Review role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/04.png)

5. Click **Create role** to finish.

![Done](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/05.png)

---

### Create IAM Role for Lambda Functions that Interact with Both DynamoDB and S3

Unlike functions that only interact with DynamoDB, some functions (like the delete image function) need permission to delete images from S3.  
You’ll create a separate IAM Role with access to both **DynamoDB** and **S3**.

1. Again, go to the [IAM Console](https://console.aws.amazon.com/iam/home), choose **Roles** from the left menu and click **Create role**.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/01.png)

2. Under **Trusted entity type**, select `AWS service`, and for **Use case**, choose `Lambda`.

![Create IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/02.png)

3. In **Permissions policies**, attach:

- `AmazonDynamoDBFullAccess`
- `AmazonS3FullAccess`

![Attach policy](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03.png)  

![Attach policy](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03-01.png)

- Then click **Next**  
> *(You can also create custom policies to enforce least-privilege access.)*

4. In the **"Name, review, and create"** section, name your role, e.g., `lambda-dynamodb-and-s3-role`.

![Review role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/04-01.png)

5. Click **Create role** to complete the process.

![Done](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/05.png)

---

### Role Reusability

This IAM Role can be reused across multiple Lambda functions that interact with DynamoDB, including:

- Create or update operations
- Deleting records
- Querying detail by ID or listing items

{{% notice tip %}}
In a production environment, it’s recommended to apply the **principle of least privilege** by creating custom IAM policies with specific actions only (e.g., `PutItem`, `GetItem`, `DeleteItem`) instead of using full access.
{{% /notice %}}
