---
title : "Create S3 Bucket"
date  : "`r Sys.Date()`"
weight: 1 
chapter: false
pre   : " <b> 2.2.1. </b> "
---

#### Objective

In this step, you will create an **S3 Bucket** to store images that have been **resized** by the Lambda function.  
This bucket is used to separate original images from optimized ones, ensuring both performance and security for the frontend.

---

#### Steps to Manually Create an S3 Bucket

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) and click **Create bucket**.

![Illustration: Create S3 bucket](/images/2-image-upload-and-resize/2.2-resize-image/01.png)

2. Under **General configuration**, enter the following details:

- **Bucket name**: `resize-image-fcj`  
- **AWS Region**: Use the same region as other services (Lambda, DynamoDB, etc.) – e.g., **Asia Pacific (Singapore)** `ap-southeast-1`  
- **Bucket type**: General purpose (default)

![Illustration: General configuration](/images/2-image-upload-and-resize/2.2-resize-image/02.png)

{{% notice info %}}
**Note**: Bucket names must be **globally unique** and **must not contain spaces or special characters**.
{{% /notice %}}

3. In the **Block Public Access settings** section:

- Uncheck **Block all public access**  
- Check the box **I acknowledge that the current settings might result in this bucket and the objects within becoming public**

![Illustration: Public access settings](/images/2-image-upload-and-resize/2.2-resize-image/03.png)

> Since the resized images will be displayed directly in the frontend (browser), public access is required.

4. Finally, scroll down and click **Create bucket** to complete the process.

![Illustration: Bucket created](/images/2-image-upload-and-resize/2.2-resize-image/04.png)

---

**Once the bucket is created, you need to attach a policy to allow public access to images stored in it.**

5. Open the newly created S3 bucket, go to the **Permissions** tab, then click **Edit** under **Bucket policy**.

![Illustration: Edit bucket policy](/images/2-image-upload-and-resize/2.2-resize-image/04-01.png)

6. Paste the following policy into the **Policy editor**.

![Illustration: Paste policy](/images/2-image-upload-and-resize/2.2-resize-image/04-02.png)

7. Scroll down and click **Save changes** to finish.

![Illustration: Save changes](/images/2-image-upload-and-resize/2.2-resize-image/04-03.png)

---

#### Result

Once completed, you will see the `resize-image-fcj` bucket appear in the list. This bucket will be used by Lambda functions to store resized and optimized images.

![Illustration: Final result](/images/2-image-upload-and-resize/2.2-resize-image/05.png)
