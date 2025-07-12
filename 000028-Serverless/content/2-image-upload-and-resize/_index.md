---
title : "Image Upload and Optimization"
date  : "`r Sys.Date()`"
weight: 2 
chapter: false
pre   : " <b> 2. </b> "
---

#### Overview

Image processing is a common requirement in modern systems such as social networks, e-commerce platforms, and user profile management.

However, to ensure images are uploaded **securely** and then **automatically processed and optimized**, the system should include:

- A backend-less upload process (to reduce server load)  
- Automated processing using **S3 Event Trigger + AWS Lambda**  
- Clear separation between original and processed images  

In this chapter, you will set up a complete workflow to **upload images from the client and automatically process them using AWS**. Specifically:

- Images are **uploaded directly from the frontend** to S3 using a **Presigned URL**  
- Once the upload succeeds, **S3 triggers a Lambda function**  
- The Lambda function **resizes the image** and saves it to a different bucket  
- The resized image is then used in the frontend with optimized dimensions and size  

---

#### Objectives

- Enable clients (web/mobile) to upload images directly using a **Presigned URL**  
- Automatically resize images after upload using **Lambda Function + Sharp**  
- Save the resized image to a target bucket, ready for use in the frontend  

---

#### Main Steps

1. [Handle original image upload](2.1-upload-original-image/)  
2. [Resize and optimize the uploaded image](2.2-resize-image/)
