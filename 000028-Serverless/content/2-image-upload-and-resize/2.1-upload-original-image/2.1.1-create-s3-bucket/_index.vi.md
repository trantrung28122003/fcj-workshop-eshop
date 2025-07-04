---
title: "Tạo S3 Bucket"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 2.1.1. </b> "
---

#### Mục tiêu

Trong bước này, bạn sẽ tạo một **S3 Bucket** để lưu trữ ảnh gốc được upload từ frontend. Đây là tiền đề để thực hiện quá trình xử lý ảnh trong các bước tiếp theo.

---

#### Các bước tạo S3 Bucket thủ công

1. Truy cập vào [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) và nhấn nút **Create bucket**.

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/001.png)

2. Tại phần **General configuration**, nhập các thông tin sau:

- **AWS Region**: Nên chọn một khu vực AWS duy nhất để triển khai toàn bộ kiến trúc (Lambda, S3, DynamoDB,...) nhằm giảm độ trễ và đơn giản hóa cấu hình phân quyền(ví dụ: Asia Pacific (Singapore) ap-southeast-1)

- **Bucket type**: General purpose (mặc định)

- **Bucket name**: `upload-originals-fcj`

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/001.png)

{{% notice info %}}
  **Lưu ý**: Tên bucket phải là **duy nhất trên toàn cầu** và **không chứa khoảng trắng hoặc ký tự đặc biệt**.
{{% /notice %}}

3. Ở phần **Block Public Access settings**, giữ nguyên thiết lập mặc định (tất cả ô đều được chọn) để **ngăn truy cập công khai**.

   > Vì đây là bucket chứa ảnh gốc (original), hệ thống sẽ chỉ truy cập thông qua **Presigned URL**, không cần public.

4. Cuối cùng, cuộn xuống và nhấn **Create bucket** để hoàn tất.

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/003.png)

---

#### Kết quả

Sau khi hoàn tất, bạn sẽ thấy bucket **upload-originals-fcj** xuất hiện trong danh sách. Bucket này sẽ được sử dụng trong các Lambda function để tạo Presigned URL và xử lý ảnh.

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/004.png)

