---
title: "Create S3 Bucket"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 2.1.1. </b> "
---

#### Objective

In this step, you will create an **S3 Bucket** to store original images uploaded from the frontend. This serves as the foundation for image processing in later steps.

---

#### Steps to Manually Create an S3 Bucket

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) and click **Create bucket**.

![Illustration: Create S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/01.png)

2. In the **General configuration** section, fill in the following details:

- **AWS Region**: Choose a **single AWS region** to deploy all resources (Lambda, S3, DynamoDB, etc.) to reduce latency and simplify permission configuration  
  (e.g., Asia Pacific (Singapore) `ap-southeast-1`)

- **Bucket type**: General purpose (default)

- **Bucket name**: `upload-originals-fcj`

![Illustration: Create S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/02.png)

{{% notice info %}}
  **Note**: Bucket names must be **globally unique** and **cannot contain spaces or special characters**.
{{% /notice %}}

3. In the **Block Public Access settings** section, leave the default settings (all checkboxes selected) to **prevent public access**.

   > Since this bucket stores original images, access will be handled via **Presigned URLs**, so public access is not needed.

4. Scroll down and click **Create bucket** to complete the process.

![Illustration: Create S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/03.png)

5. After creating the bucket, open it and go to the **Permissions** tab.

![Illustration: S3 bucket permissions](/images/2-image-upload-and-resize/2.1-upload-original-image/03-01.png)

6. Scroll down to the **Cross-origin resource sharing (CORS)** section. Click **Edit** and paste the following configuration:
```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "GET",
            "POST"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
