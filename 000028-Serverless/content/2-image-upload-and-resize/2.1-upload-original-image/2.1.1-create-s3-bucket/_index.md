---
title: "Create S3 Bucket"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 2.1.1. </b> "
---

#### Objective

In this step, you will create an **S3 Bucket** to store the original images uploaded from the frontend. This is the foundation for image processing in the following steps.

---

#### Steps to Manually Create an S3 Bucket

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) and click the **Create bucket** button.

   ![Illustration: Create S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/01.png)

2. In the **General configuration** section, enter the following details:

- **Bucket name**: `upload-originals-fcj`

- **AWS Region**: Choose a **single AWS region** for deploying your entire architecture (Lambda, S3, DynamoDB, etc.) to reduce latency and simplify permission configurations.  
  *(Example: Asia Pacific (Singapore) ap-southeast-1)*

- **Bucket type**: General purpose (default)

{{% notice info %}}
  **Note**: The bucket name must be **globally unique** and **cannot contain spaces or special characters**.
{{% /notice %}}

3. In the **Block Public Access settings** section, keep the default settings (all boxes checked) to **prevent public access**.

   > This bucket will store original images, which will be accessed via **Presigned URLs** — no need to make the bucket public.

4. Finally, scroll down and click **Create bucket** to complete the setup.

---

#### Result

Once completed, you will see the `upload-originals-fcj` bucket listed. This bucket will be used in Lambda functions to generate Presigned URLs and process images.
