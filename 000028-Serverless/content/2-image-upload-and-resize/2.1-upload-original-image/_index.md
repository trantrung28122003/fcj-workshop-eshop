---
title : "Upload Original Image"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 2.1. </b> "
---

#### Overview

The first step in the image processing workflow is to upload the **original image** from the frontend to **AWS S3**, in a **secure and efficient** manner.

To achieve this, you will use an **AWS Lambda function** to generate a **Presigned URL** – a temporary, secure link that allows the client to upload the image **directly to S3** without routing through a backend server or exposing sensitive credentials.

{{% notice note %}}
At this stage, **resizing or metadata processing is not handled** – the goal is solely to ensure that the original image is safely stored in S3.
{{% /notice %}}

---

#### Main Steps

1. [Create S3 Buckets](2.1.1-create-presignedURL-lambda-function/)
2. [Create IAM Role](2.1.3-create-iam-role/)
3. [Create PresignedURL Lambda Function](2.1.1-create-presignedurl-lambda-function/)
