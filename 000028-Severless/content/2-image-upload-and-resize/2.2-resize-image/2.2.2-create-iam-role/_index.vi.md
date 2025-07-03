---
title: "Tạo IAM Role cho Lambda ResizeImage"
date: "`r Sys.Date()`"
weight: 2
chapter: false
pre: " <b> 2.2.2. </b> "
---

#### Mục tiêu

Trong phần này, bạn sẽ tạo một **IAM Role** dành riêng cho hàm Lambda **resize-image**.  
Hàm này sẽ thực hiện các thao tác sau:

- **Đọc ảnh gốc** từ S3 bucket **upload-originals-fcj**
- **Resize ảnh** và **ghi ảnh kết quả** vào S3 bucket **resize-image-fcj**

Để đảm bảo hệ thống tuân thủ nguyên tắc **"Least Privilege"** (ít quyền nhất cần thiết), chúng ta sẽ tạo một **IAM Policy tùy chỉnh**, chỉ cấp quyền **đọc từ bucket ảnh gốc** và **ghi vào bucket ảnh đã resize**.

---

#### Tạo IAM Policy tùy chỉnh cho Lambda Resize

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home)  
   → Chọn **Policies** ở menu bên trái

2. Nhấn nút **Create policy**

3. Chuyển sang tab **JSON**, dán đoạn cấu hình sau vào:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::upload-originals-fcj/*"
    },
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::resize-image-fcj/*"
    }
  ]
}
```

4. Nhấn Next , và trong phần **Policy details**  nhập thông tin

- **Policy name** : `ResizeImageLambdaS3Policy`
- **Description - optional** :`ResizeImageLambdaS3Policy `

5. Cuối cùng cuộn xuống và nhấn **Create policy** để hoàn tất.

### Các bước tạo IAM Role

1. Tiếp theo,  Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Sau đó ,chọn Roles ở menu bên trái.

2. Chọn **Create role**.

3. Trong phần **Trusted entity type**, chọn `AWS service`

4. Ở phần **Use case**, chọn `Lambda`

5. Bấm **Next**.

6. Trong phần **Permissions policies**, tìm và gán quyền `ResizeImageLambdaS3Policy`  
  
7. Bấm **Next**, đặt tên cho role, ví dụ: `lambda-resize-image-role`

8. Bấm **Create role** để hoàn tất.

#### Kết quả

Sau khi hoàn tất, bạn sẽ thấy một IAM Role mới có tên **lambda-resize-image-role** xuất hiện trong phần **Roles** của IAM Console.

Role này đã được cấu hình để cho phép hàm Lambda **resize-image** upload ảnh trực tiếp vào bucket **resize-image-fcj** với quyền **PutObject**, tuân thủ nguyên tắc bảo mật **ít quyền nhất cần thiết (least privilege)**.