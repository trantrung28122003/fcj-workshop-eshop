---
title : "Xử lý tải ảnh gốc"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 2.1. </b> "
---


#### Tổng quan

Ở bước đầu tiên của chuỗi xử lý ảnh, mục tiêu là tải ảnh gốc (**original image**) từ frontend lên AWS S3 **một cách bảo mật và hiệu quả**.

Để làm điều đó, bạn sẽ sử dụng một **AWS Lambda function** để tạo ra một **Presigned URL** – liên kết tạm thời cho phép client upload ảnh **trực tiếp lên S3** mà **không cần server trung gian** và **không lộ thông tin bảo mật**.

{{% notice note %}}
Giai đoạn này **chưa xử lý resize hay metadata** – đây chỉ là bước đầu tiên để đảm bảo ảnh gốc được lưu trữ an toàn trên S3.
{{% /notice %}}

---

#### Các bước chính

1. [Tạo hàm Lambda GetPresignedUrl](2.1.1-create-presignedurl-lambda-function/)
2. [Tạo S3 Buckets](2.1.2-create-s3-bucket/)
3. [Tạo IAM Role](2.1.3-create-iam-role/)