---
title : "Image Upload And Resize"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 2. </b> "
---

#### Overview

Image processing is a common requirement in modern systems such as social networks, e-commerce platforms, and user profile management.

However, to ensure that images are uploaded **securely**, and then **automatically processed and resized**, the system needs to follow a well-designed architecture:

- A direct upload flow that does not rely on backend intermediaries (reduces server load)
- Automatic processing using **S3 Event Trigger + AWS Lambda**
- Separation of original and optimized images

In this chapter, you will build a complete workflow for **uploading images from the client and processing them automatically using AWS**. Specifically:

- The image is **uploaded directly from the frontend** to S3 using a **Presigned URL**
- Once the upload is complete, **S3 automatically triggers a Lambda function**
- The Lambda function **resizes the image** and stores it in a separate destination bucket
- The resized image is then ready to be used in the frontend with optimized dimensions and size

#### Objectives

- Enable clients (web/mobile) to upload images directly using **Presigned URLs**
- Automatically resize images after upload using **Lambda Function + Sharp**
- Store the resized image in a destination S3 bucket ready for frontend usage

---

#### Main Steps

1. [Upload Orginal Image](2.1-upload-original-image/)
2. [Resize Image](2.2-resize-image/)
