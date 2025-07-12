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

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/01.png)

2. Tại phần **General configuration**, nhập các thông tin sau:

- **AWS Region**: Nên chọn một khu vực AWS duy nhất để triển khai toàn bộ kiến trúc (Lambda, S3, DynamoDB,...) nhằm giảm độ trễ và đơn giản hóa cấu hình phân quyền(ví dụ: Asia Pacific (Singapore) ap-southeast-1)

- **Bucket type**: General purpose (mặc định)

- **Bucket name**: `upload-originals-fcj`

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/02.png)

{{% notice info %}}
  **Lưu ý**: Tên bucket phải là **duy nhất trên toàn cầu** và **không chứa khoảng trắng hoặc ký tự đặc biệt**.
{{% /notice %}}

3. Ở phần **Block Public Access settings**, giữ nguyên thiết lập mặc định (tất cả ô đều được chọn) để **ngăn truy cập công khai**.

   > Vì đây là bucket chứa ảnh gốc (original), hệ thống sẽ chỉ truy cập thông qua **Presigned URL**, không cần public.

4. Cuối cùng, cuộn xuống và nhấn **Create bucket** để hoàn tất.

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/03.png)


5. Sau khi tạo xong, vào bucket vừa tạo chọn tab **Permissions**

![Ảnh minh họa: Tạo S3 bucket](/images/2-image-upload-and-resize/2.1-upload-original-image/03-01.png)

6. Sau đó cuộn xuống phần **Cross-origin resource sharing (CORS)** để cấu hình cho phép các **domain** khác có thể truy cập được, chọn **Edit** và dán đoạn sau vào 
```json 
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "GET",
            "POST"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
]
```

![Illustration: Configure CORS](/images/2-image-upload-and-resize/2.1-upload-original-image/03-02.png)

---

#### Result

Once completed, you will see the **upload-originals-fcj** bucket listed. This bucket will be used by Lambda functions to generate Presigned URLs and process images.

![Illustration: S3 bucket created](/images/2-image-upload-and-resize/2.1-upload-original-image/04.png)

