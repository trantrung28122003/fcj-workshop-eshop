---
title: "Create IAM Role for Lambda ResizeImage"
date : "`r Sys.Date()`"
weight: 2
chapter: false
pre   : " <b> 2.2.2. </b> "
---

#### Objective

In this section, you will create an **IAM Role** specifically for the **resize-image** Lambda function.  
This function performs the following tasks:

- **Reads original images** from the S3 bucket **upload-originals-fcj**  
- **Resizes the images** and **writes the results** to the S3 bucket **resize-image-fcj**

To follow the **"Least Privilege"** principle, we will create a **custom IAM Policy** that only grants permission to **read from the original image bucket** and **write to the resized image bucket**.

---

#### Create Custom IAM Policy for Lambda Resize

##### Steps to Create Custom IAM Policy

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home), select **Policies** from the left-hand menu, then click **Create policy**.

![Illustration: Create IAM Policy](/images/2-image-upload-and-resize/2.2-resize-image/07.png)

2. Switch to the **JSON** tab and paste the following configuration:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListAndGetOnSource",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::<your-original-bucket-name>",
        "arn:aws:s3:::<your-original-bucket-name>/*"
      ]
    },
    {
      "Sid": "AllowPutOnDestination",
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::<your-resized-bucket-name>/*"
    }
  ]
}
```

![Illustration: Policy JSON](/images/2-image-upload-and-resize/2.2-resize-image/08-fetch.png)

{{% notice info %}}
**Note**: **your-original-bucket-name** refers to the bucket used for storing original images, and **your-resized-bucket-name** refers to the bucket used for storing resized images.
{{% /notice %}}

---

4. Click **Next**, and under the **Policy details** section, enter the following:

- **Policy name**: `ResizeImageLambdaS3Policy`  
- **Description (optional)**: `ResizeImageLambdaS3Policy`

![Illustration: Policy details](/images/2-image-upload-and-resize/2.2-resize-image/09.png)

5. Scroll down and click **Create policy** to finish.

![Illustration: Create policy confirmation](/images/2-image-upload-and-resize/2.2-resize-image/10.png)

---

### Steps to Create IAM Role

1. Next, go to the [IAM Console](https://console.aws.amazon.com/iam/home), select **Roles** from the left-hand menu, then click **Create role**.

![Illustration: Create IAM Role](/images/2-image-upload-and-resize/2.2-resize-image/11.png)

2. Under **Trusted entity type**, choose `AWS service`, and in the **Use case**, select `Lambda`.

3. In the **Permissions policies** step, search for and attach the `ResizeImageLambdaS3Policy` (you may see `S3PutOriginalImagePolicy` in the UI but skip it if unnecessary).

![Illustration: Attach policy](/images/2-image-upload-and-resize/2.2-resize-image/12.png)

4. Confirm the correct policy `ResizeImageLambdaS3Policy` is selected and click **Next**.

![Illustration: Selected policy](/images/2-image-upload-and-resize/2.2-resize-image/13.png)

5. In the **Name, review, and create** step, name the role – for example: `lambda-resize-image-role`.

![Illustration: Name the role](/images/2-image-upload-and-resize/2.2-resize-image/14.png)

6. Click **Create role** to complete.

![Illustration: Role created](/images/2-image-upload-and-resize/2.2-resize-image/15.png)

---

#### Result

Once completed, you will see a new IAM Role named **lambda-resize-image-role** listed under the **Roles** section of the IAM Console.

This role is configured to allow the **resize-image** Lambda function to upload images directly to the **resize-image-fcj** bucket using **PutObject** permission, in compliance with the **least privilege** security principle.

