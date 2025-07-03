---
title : "Create S3 Bucket"
date :  "`r Sys.Date()`" 
weight : 1 
chapter : false
pre : " <b> 2.2.1. </b> "
---

#### Objective

In this step, you will create an **S3 Bucket** to store images **that have been resized** by a Lambda function.  
This bucket will be used to separate original images from optimized ones, ensuring both performance and security for the frontend.

---

#### Steps to Create S3 Bucket Manually

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) and click on **Create bucket**.

   ![Illustration: Create S3 bucket](images/s3-create-bucket-button.png)

2. In the **General configuration** section, enter the following information:

- **Bucket name**: `resize-image-fcj`

- **AWS Region**: Use the same region as your other services (Lambda, DynamoDB, etc.) – for example: **Asia Pacific (Singapore)** `ap-southeast-1`

- **Bucket type**: General purpose (default)

{{% notice info %}}
**Note**: Bucket names must be **globally unique** and **must not contain spaces or special characters**.
{{% /notice %}}

3. In the **Block Public Access settings** section:

- Uncheck **Block all public access**

- Check the box **I acknowledge that the current settings might result in this bucket and the objects within becoming public**.

> Since resized images will be accessed directly from the frontend (browser), public access needs to be enabled.

4. Finally, scroll down and click **Create bucket** to finish.

---

#### ✅ Result

After completing the above steps, you will see the `resize-image-fcj` bucket listed.  
This bucket will be used by Lambda functions to store and serve optimized images that have just been uploaded.
