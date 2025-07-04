---
title: "Tạo IAM Role cho Lambda GetPresignedUrl"
date: "`r Sys.Date()`"
weight: 2
chapter: false
pre: " <b> 2.1.1. </b> "
---

#### Mục tiêu

Trong phần này, bạn sẽ tạo một **IAM Role** cho Lambda **GetPresignedUrl**.

Hàm Lambda này sẽ sinh ra **Presigned URL** để **upload ảnh gốc vào S3** thông qua quyền ghi (**PutObject**).  

Để tuân thủ nguyên tắc **"Least Privilege"**, ta sẽ **tạo một IAM Policy tùy chỉnh** chỉ cấp quyền ghi vào bucket vừa tạo để lưu ảnh gốc **upload-originals-fcj**.

---

#### Các bước tạo IAM Policy CHo IAM Role (Custom)

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Sau đó ,chọn **Policies** ở menu bên trái.

2. Chọn **Create policy** → chuyển sang tab **JSON**

3. Dán đoạn sau vào, và **thay `<your-bucket-name>` bằng tên bucket thực tế của bạn**, ví dụ: `upload-originals-fcj` vừa tạo bucket nãy.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
```
4. Nhấn Next , và trong phần **Policy details**  nhập thông tin

- **Policy name** : `S3PutOriginalImagePolicy`
- **Description - optional** :`S3PutOriginalImagePolicy `

5. Cuối cùng cuộn xuống và nhấn **Create policy** để hoàn tất.


### Các bước tạo IAM Role

1. Tiếp theo,  Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Sau đó ,chọn **Roles** ở menu bên trái.

2. Chọn **Create role**.

3. Trong phần **Trusted entity type**, chọn `AWS service`

4. Ở phần **Use case**, chọn `Lambda`

5. Bấm **Next**.

6. Trong phần **Permissions policies**, tìm và gán quyền `S3PutOriginalImagePolicy`  
  
7. Bấm **Next**, đặt tên cho role, ví dụ: `lambda-upload-original-role`

8. Bấm **Create role** để hoàn tất.

#### Kết quả

Sau khi hoàn tất, bạn sẽ thấy một IAM Role mới có tên **lambda-upload-original-role** xuất hiện trong phần **Roles** của IAM Console.

Role này đã được cấu hình để cho phép hàm Lambda **get-presigned-url** upload ảnh trực tiếp vào bucket **upload-originals-fcj** với quyền **PutObject**, tuân thủ nguyên tắc bảo mật **ít quyền nhất cần thiết (least privilege)**.
