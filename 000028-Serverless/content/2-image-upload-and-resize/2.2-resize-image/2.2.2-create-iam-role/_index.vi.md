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

#### Các bước tạo IAM Policy CHo IAM Role (Custom)

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Chọn **Policies** ở menu bên trái. Sau đó chọn **Create policy**

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.2-resize-image/07.png)


3. Chuyển sang tab **JSON**, dán đoạn cấu hình sau vào:

```json
{
	"Version": "2012-10-17",
	"Statement": [
	    {
            "Sid": "AllowListAndGetOnSource",
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::<your-original-bucket-name>",
                "arn:aws:s3:::<your-original-bucket-name>/*"
            ]
        },
        {
            "Sid": "AllowPutOnDestination",
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::<your-resized-bucket-name>/*"
        }
	]
}
```

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.2-resize-image/08.png)

{{% notice info %}}
Lưu ý: **your-original-bucket-name** là bucket dùng để lưu ảnh gốc, còn **your-resized-bucket-name** là bucket để lưu ảnh đã được resize.
{{% /notice %}}


4. Nhấn Next , và trong phần **Policy details**  nhập thông tin

- **Policy name** : `ResizeImageLambdaS3Policy`
- **Description - optional** :`ResizeImageLambdaS3Policy `

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.2-resize-image/09.png)

5. Cuối cùng cuộn xuống và nhấn **Create policy** để hoàn tất.

![Ảnh minh họa: Tạo IAM Policy](/images/2-image-upload-and-resize/2.2-resize-image/10.png)

### Các bước tạo IAM Role

1. Tiếp theo,  Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Chọn **Policies** ở menu bên trái. Sau đó chọn **Create policy**

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.2-resize-image/11.png)

3. Trong phần **Permissions policies**, tìm và gán quyền `S3PutOriginalImagePolicy` và chọn **Next**

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.2-resize-image/12.png)

6. Trong phần **Permissions policies**, tìm và gán quyền `ResizeImageLambdaS3Policy` và sau đso

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.2-resize-image/13.png) 
  
4. Trong phần **"Name, review, and create"** đặt tên cho role, ví dụ: `lambda-upload-original-role`

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.2-resize-image/14.png)

8. Bấm **Create role** để hoàn tất.

![Ảnh minh họa: Tạo IAM Role](/images/2-image-upload-and-resize/2.2-resize-image/15.png)

#### Kết quả

Sau khi hoàn tất, bạn sẽ thấy một IAM Role mới có tên **lambda-resize-image-role** xuất hiện trong phần **Roles** của IAM Console.

Role này đã được cấu hình để cho phép hàm Lambda **resize-image** upload ảnh trực tiếp vào bucket **resize-image-fcj** với quyền **PutObject**, tuân thủ nguyên tắc bảo mật **ít quyền nhất cần thiết (least privilege)**.