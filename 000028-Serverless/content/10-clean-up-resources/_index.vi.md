---
title : "Dọn dẹp tài nguyên"
date :  "`r Sys.Date()`" 
weight : 10
chapter : false
pre : " <b> 10. </b> "
---

#### Tổng quan

Sau khi hoàn tất triển khai và kiểm thử hệ thống serverless, bạn nên **dọn dẹp toàn bộ tài nguyên AWS** để tránh phát sinh chi phí không cần thiết.

Trong workshop này, chúng ta đã tạo ra nhiều tài nguyên như:

- IAM Role (cho Lambda, API Gateway…)
- Lambda Functions
- DynamoDB Tables
- S3 Buckets (gốc và ảnh resize)
- Amazon API Gateway
- Amazon Cognito (User Pool, App Client…)
- Amazon CloudFront (nếu dùng với frontend hosting)

---

#### Nội dung chính
{{% notice info %}}
**Lưu ý:** Tên các tài nguyên (IAM role, bucket, API...) có thể khác nhau giữa mỗi người. Bạn nên kiểm tra kỹ lại tên trước khi xoá để tránh ảnh hưởng các dịch vụ khác không nằm trong workshop này.
{{% /notice %}}



#### 1. Xoá bảng DynamoDB

1. Truy cập [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) → Chọn:

- Bảng `Product`
- Bảng `Category`

2. Sau đó, chọn **Delete Table**

#### 2. Xoá Lambda Functions

1. Truy cập [Lambda Console](https://console.aws.amazon.com/lambda/home) → Xoá các hàm:

- `create-product`
- `create-category`
- `get-presigned-url`
- `resize-image`
- `delete-product`
- ...

2. Sau đó, chọn từng function , nhấn **Actions > Delete**

#### 3. Xoá S3 Buckets

1. Truy cập [S3 Console](https://s3.console.aws.amazon.com/s3/home)

- Bucket gốc: `upload-originals-fcj`
- Bucket resize: `resized-image-fcj`
- Bucket hosting frontend (nếu có)

> Trước khi xoá bucket, cần xoá toàn bộ **objects** bên trong

2. Sau đó, chọn **Delete bucket**

#### 4. Xoá Amazon API Gateway

Truy cập [API Gateway Console](https://console.aws.amazon.com/apigateway/home)

1. Chọn **API** như `easyshop-api` hoặc tên bạn đã đặt

2. Sau đó, chọn **Delete**

#### 5. Xoá Amazon Cognito

Truy cập [Cognito Console](https://console.aws.amazon.com/cognito/users/)

- Xoá **User pool**
- Xoá **App client**
- Xoá **Identity pool** (nếu có)


#### 6. Xoá Amazon CloudFront (nếu có)

Truy cập [CloudFront Console](https://console.aws.amazon.com/cloudfront/v3/home)

1.Chọn distribution dùng để phân phối frontend

2. Bấm **Disable** trước, sau đó mới **Delete**

#### 7. Xoá IAM Role và Policy

1. Truy cập [IAM Console](https://console.aws.amazon.com/iam/home#/roles), Tìm và xoá các role như:

- `lambda-dynamodb-role`
- `lambda-resize-image-role`
- `lambda-upload-original-role`

2. Chọn từng role , sau đó chọn **Delete role**

#### Kết luận

Dọn dẹp tài nguyên là bước cuối cùng giúp bạn:

- Tránh phát sinh chi phí không mong muốn
- Giữ tài khoản AWS gọn gàng, sạch sẽ
- Đảm bảo tuân thủ chính sách bảo mật (xoá quyền, xoá role không còn dùng)
