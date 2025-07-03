---
title : "Tạo S3 Bucket"
date :  "`r Sys.Date()`" 
weight : 1 
chapter : false
pre : " <b> 2.2.1. </b> "
---


#### Mục tiêu

Trong bước này, bạn sẽ tạo một **S3 Bucket** dùng để lưu trữ ảnh **đã được resize** bởi Lambda function.  
Bucket này sẽ được sử dụng để phân tách ảnh gốc và ảnh đã tối ưu, đảm bảo hiệu suất và bảo mật cho frontend.

---

#### Các bước tạo S3 Bucket thủ công

1. Truy cập vào [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) và nhấn nút **Create bucket**.

   ![Ảnh minh họa: Tạo S3 bucket](images/s3-create-bucket-button.png)

2. Tại phần **General configuration**, nhập các thông tin sau:

- **Bucket name**: `resize-image-fcj`

- **AWS Region**: Sử dụng cùng khu vực với các service khác (Lambda, DynamoDB, v.v...) – ví dụ: **Asia Pacific (Singapore)** `ap-southeast-1`

- **Bucket type**: General purpose (mặc định)

{{% notice info %}}
**Lưu ý**: Tên bucket phải **duy nhất trên toàn cầu** và **không chứa khoảng trắng hoặc ký tự đặc biệt**.
{{% /notice %}}

3. Ở phần **Block Public Access settings**,

- Bỏ chọn **Block all public access**

- Đánh dấu vào ô **I acknowledge that the current settings might result in this bucket and the objects within becoming public**.

> Vì ảnh sau khi resize sẽ được sử dụng trực tiếp trong frontend (trình duyệt), nên cần mở quyền truy cập công khai cho ảnh.

4. Cuối cùng, cuộn xuống và nhấn **Create bucket** để hoàn tất.

---

#### ✅ Kết quả

Sau khi hoàn tất, bạn sẽ thấy bucket `resize-image-fcj` xuất hiện trong danh sách. Bucket này sẽ được sử dụng trong các Lambda function để xử lý và tối ưu ảnh vừa tải lên.

