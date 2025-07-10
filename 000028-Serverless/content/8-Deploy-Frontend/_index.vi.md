---
title : "Triển khai Frontend"
date :  "`r Sys.Date()`" 
weight : 8
chapter : false
pre : " <b> 8. </b> "
---

#### Tổng quan
Tiếp theo, triển khai **frontend** (giao diện người dùng) của ứng dụng web hiện đại lên **AWS S3 và CloudFront**, đảm bảo người dùng cuối có thể truy cập thông qua Internet với tốc độ nhanh, bảo mật và ổn định.

Ứng dụng **frontend** ở đây thường là S**ingle Page Application (SPA)** được xây dựng bằng **React**, **Angular** hoặc **Vue**. Sau khi build hoàn tất, mã nguồn tĩnh sẽ được upload lên S3 và sử dụng CloudFront làm CDN để phân phối nội dung hiệu quả toàn cầu.

#### Nội dung chính

#### Tạo bucket để tải file web lên

1. Truy cập vào [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) và nhấn nút **Create bucket**.

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/01.png)

2. Tại phần **General configuration**, nhập các thông tin sau:

- **AWS Region**: Nên chọn một khu vực AWS duy nhất để triển khai toàn bộ kiến trúc (Lambda, S3, DynamoDB,...) nhằm giảm độ trễ và đơn giản hóa cấu hình phân quyền(ví dụ: Asia Pacific (Singapore) ap-southeast-1)

- **Bucket type**: General purpose (mặc định)

- **Bucket name**: `fe-easyshop-fcj`

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/02.png)

{{% notice info %}}
  **Lưu ý**: Tên bucket phải là **duy nhất trên toàn cầu** và **không chứa khoảng trắng hoặc ký tự đặc biệt**.
{{% /notice %}}

3. Ở phần **Block Public Access settings**,

- Bỏ chọn **Block all public access**

- Đánh dấu vào ô **I acknowledge that the current settings might result in this bucket and the objects within becoming public**.

4. Cuối cùng, cuộn xuống và nhấn **Create bucket** để hoàn tất.

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/03.png)


#### up load file forne end len s3
Upload mã frontend lên S3
Truy cập vào bucket bạn đã tạo (ví dụ: fe-easyshop-fcj) trong AWS S3 Console.

Nhấn Upload, chọn:

File index.html và các file gốc (ví dụ: vite.svg, favicon.ico) từ thư mục dist.

Toàn bộ thư mục assets/ hoặc các thư mục con chứa mã tĩnh (CSS, JS, images).

✅ Chú ý:

Không upload cả thư mục dist, mà chỉ upload nội dung bên trong nó (giữ đúng cấu trúc gốc).

Đảm bảo file index.html nằm ở gốc bucket, không nằm trong thư mục con.

Nhấn Upload để hoàn tất.

{{% notice info %}}

Kiểm tra lại sau khi upload: vào bucket, bạn phải thấy index.html và thư mục assets/ nằm ngang hàng nhau.

Nếu thiếu index.html ở root, website sẽ báo lỗi 403 hoặc 404 khi truy cập.
{{% /notice %}}



````json

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::fe-easyshop-fcj/*"
    }
  ]
}

````