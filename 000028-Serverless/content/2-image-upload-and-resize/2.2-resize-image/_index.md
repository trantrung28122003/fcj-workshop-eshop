---
title : "Resize Image"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 2.2. </b> "
---

#### Overview

After the original image has been successfully uploaded to S3, the next step is to **automatically optimize the image (resize)** to reduce its size and serve it more efficiently on the frontend.

Instead of letting the frontend handle image resizing (which may be slow, inconsistent, or insecure), we offload this task to the backend. This ensures it is **automated, consistent, and controllable** by using **AWS Lambda in combination with S3 Event Triggers**.

In this section, you will build a Lambda function responsible for:

- **Listening to S3 events** (when a new image is uploaded to the original bucket)
- **Downloading the original image**, resizing it using the `sharp` library
- **Saving the resized image** to a separate destination S3 bucket

This image processing approach offers several benefits:

- Ensures the frontend always receives optimized images
- Improves page load speed and user experience
- Reduces storage and bandwidth costs

---

#### Main Topics

1. [Create the Resize Lambda Function](2.2.1-create-resize-lambda-function/)  
2. [Create the S3 Buckets](2.2.2-create-s3-buckets/)  
3. [Create the IAM Role](2.2.3-create-iam-role/)  