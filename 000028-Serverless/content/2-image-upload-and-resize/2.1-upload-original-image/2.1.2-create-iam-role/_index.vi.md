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

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Chọn **Policies** ở menu bên trái. Sau đó chọn **Create policy**

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.1-upload-original-image/05.png)

2. Trong giao diện **Create policy**, chuyển sang tab **JSON** dán đoạn sau vào, và **thay `<your-bucket-name>` bằng tên bucket thực tế của bạn**
- ví dụ: `upload-originals-fcj` vừa tạo bucket nãy.

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

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.1-upload-original-image/06.png)

3. Chọn **Next** , và trong phần **Policy details**  nhập thông tin

- **Policy name** : `S3PutOriginalImagePolicy`
- **Description - optional** :`S3PutOriginalImagePolicy `


![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.1-upload-original-image/07.png)

4. Cuối cùng cuộn xuống và nhấn **Create policy** để hoàn tất.

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.1-upload-original-image/08.png)

### Các bước tạo IAM Role

1. Tiếp theo,  Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Chọn **Roles** ở menu bên trái và sau đó Chọn **Create role**. 

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.1-upload-original-image/09.png)


2. Trong phần **Trusted entity type** chọn `AWS service` và  phần **Use case**  chọn `Lambda`

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.1-upload-original-image/10.png)

3. Trong phần **Permissions policies**, tìm và gán quyền `S3PutOriginalImagePolicy` và chọn **Next**

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.1-upload-original-image/11.png)

4. Trong phần **"Name, review, and create"** đặt tên cho role, ví dụ: `lambda-upload-original-role`

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.1-upload-original-image/12.png)

5. Bấm **Create role** để hoàn tất.

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.1-upload-original-image/13.png)

#### Kết quả

Sau khi hoàn tất, bạn sẽ thấy một IAM Role mới có tên **lambda-upload-original-role** xuất hiện trong phần **Roles** của IAM Console.

Role này đã được cấu hình để cho phép hàm Lambda **get-presigned-url** upload ảnh trực tiếp vào bucket **upload-originals-fcj** với quyền **PutObject**, tuân thủ nguyên tắc bảo mật **ít quyền nhất cần thiết (least privilege)**.
