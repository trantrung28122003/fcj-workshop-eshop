---
title: "Create IAM Role for Lambda GetPresignedUrl"
date: "`r Sys.Date()`"
weight: 2
chapter: false
pre: " <b> 2.1.1. </b> "
---

#### Objective

In this section, you will create an **IAM Role** for the Lambda function **GetPresignedUrl**.

This Lambda function will generate a **Presigned URL** to **upload original images to S3** using the **PutObject** permission.

To follow the **principle of least privilege**, we will **create a custom IAM Policy** that only grants write permission to the specific bucket created earlier — **upload-originals-fcj**.

---

#### Steps to Create a Custom IAM Policy for the Role

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home), select **Policies** from the left menu, then click **Create policy**.

![Illustration: Create IAM Policy](/images/2-image-upload-and-resize/2.1-upload-original-image/05.png)

2. In the **Create policy** interface, switch to the **JSON** tab, paste the following snippet, and **replace `<your-bucket-name>` with your actual bucket name**  
   – e.g., `upload-originals-fcj`.

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
![Illustration: IAM Policy JSON](/images/2-image-upload-and-resize/2.1-upload-original-image/06.png)

3. Click **Next**, and under the **Policy details** section, fill in the following:

- **Policy name**: `S3PutOriginalImagePolicy`  
- **Description (optional)**: `S3PutOriginalImagePolicy`

![Illustration: Policy details](/images/2-image-upload-and-resize/2.1-upload-original-image/07.png)

4. Scroll down and click **Create policy** to finish.

![Illustration: Create policy confirmation](/images/2-image-upload-and-resize/2.1-upload-original-image/08.png)

---

### Steps to Create IAM Role

1. Next, go to the [IAM Console](https://console.aws.amazon.com/iam/home), select **Roles** from the left menu, and then click **Create role**.

![Illustration: Create IAM Role](/images/2-image-upload-and-resize/2.1-upload-original-image/09.png)

2. Under **Trusted entity type**, choose `AWS service`, and for **Use case**, select `Lambda`.

![Illustration: Select Lambda service](/images/2-image-upload-and-resize/2.1-upload-original-image/10.png)

3. In the **Permissions policies** step, search for and attach the `S3PutOriginalImagePolicy`, then click **Next**.

![Illustration: Attach policy to role](/images/2-image-upload-and-resize/2.1-upload-original-image/11.png)

4. Under the **"Name, review, and create"** section, name your role, e.g., `lambda-upload-original-role`.

![Illustration: Role naming](/images/2-image-upload-and-resize/2.1-upload-original-image/12.png)

5. Click **Create role** to complete the process.

![Illustration: Final role creation](/images/2-image-upload-and-resize/2.1-upload-original-image/13.png)

---

#### Result

Once completed, you will see a new IAM Role named **lambda-upload-original-role** listed in the **Roles** section of the IAM Console.

This role is configured to allow the **get-presigned-url** Lambda function to upload images directly to the **upload-originals-fcj** bucket with **PutObject** permission, following the **least privilege** security best practice.

