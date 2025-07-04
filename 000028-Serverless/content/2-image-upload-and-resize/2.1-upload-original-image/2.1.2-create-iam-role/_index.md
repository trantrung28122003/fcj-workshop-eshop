---
title: "Create IAM Role for Lambda GetPresignedUrl"
date: "`r Sys.Date()`"
weight: 2
chapter: false
pre: " <b> 2.1.1. </b> "
---

#### Objective

In this section, you will create an **IAM Role** for the `GetPresignedUrl` Lambda function.

This Lambda function will generate a **Presigned URL** that allows the client to **upload original images to S3** using the `PutObject` permission.

To follow the **Principle of Least Privilege**, we’ll create a **custom IAM Policy** that only allows write access to a specific S3 bucket (e.g., `upload-originals-fcj`).

---

#### Steps to Create a Custom IAM Policy

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home) and select **Policies** from the left-hand menu.



2. Click **Create policy** → then switch to the **JSON** tab.

3. Paste the following policy and **replace `<your-bucket-name>` with your actual bucket name** (e.g., `upload-originals-fcj`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
```

4. Click **Next**, and in the **Policy details** section, fill in the following:

- **Policy name**: `S3PutOriginalImagePolicy`  
- **Description (optional)**: `S3PutOriginalImagePolicy`

5. Scroll down and click **Create policy** to complete.

---

#### Steps to Create an IAM Role

1. Next, go to the [IAM Console](https://console.aws.amazon.com/iam/home), then select **Roles** from the left-hand menu.

2. Click **Create role**.

3. In the **Trusted entity type** section, choose `AWS service`.

4. Under **Use case**, select `Lambda`.

5. Click **Next**.

6. In the **Permissions policies** step, search for and attach the policy named `S3PutOriginalImagePolicy`.

7. Click **Next**, and provide a name for your role, for example: `lambda-upload-original-role`.

8. Click **Create role** to finish.

#### Result

Once completed, you will see a new IAM Role named **lambda-upload-original-role** under the **Roles** section of the IAM Console.

This role is now configured to allow your Lambda function (**get-presigned-url**) to upload images directly to your S3 bucket **upload-originals-fcj** using the **PutObject** permission — following the principle of **least privilege**.
