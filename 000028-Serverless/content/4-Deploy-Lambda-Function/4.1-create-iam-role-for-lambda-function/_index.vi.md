---
title: "Tạo IAM Role cho Lambda Function"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

### Tổng quan

Trước khi triển khai bất kỳ hàm Lambda nào, bạn cần tạo một **IAM Role** – giúp cấp quyền cho hàm Lambda có thể truy cập các dịch vụ AWS khác, chẳng hạn như **đọc/ghi dữ liệu từ DynamoDB**. Tỏng bài này sẽ cấp quyền ****

IAM (Identity and Access Management) hoạt động như một lớp phân quyền, cho phép Lambda hoạt động an toàn trong môi trường AWS của bạn.


### Các bước tạo IAM Role cho các hàm Lambda thao tác với DynamoDB

1. Tiếp theo,  Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Chọn **Roles** ở menu bên trái và sau đó Chọn **Create role**. 

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/01.png)

2. Trong phần **Trusted entity type** chọn `AWS service` và  phần **Use case**  chọn `Lambda`

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/02.png)

3. Trong phần **Permissions policies**, tìm và gán quyền `AmazonDynamoDBFullAccess` và chọn **Next**
> *(Bạn cũng có thể tạo policy riêng nếu muốn giới hạn quyền chặt chẽ hơn.)*

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03.png)

4. Trong phần **"Name, review, and create"** đặt tên cho role, ví dụ: `lambda-dynamodb-role`

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/04.png)

5. Bấm **Create role** để hoàn tất.

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/05.png)



### Các bước tạo IAM Role cho các hàm Lambda thao tác với DynamoDB và S3
Khác với các hàm chỉ thao tác với DynamoDB, có một hàm xóa cần thêm quyền xóa ảnh từ S3. Do đó, bạn cần tạo một IAM Role riêng với quyền kết hợp cả DynamoDB và S3.

1. Tiếp theo,  Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Chọn **Roles** ở menu bên trái và sau đó Chọn **Create role**. 

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/01.png)

2. Trong phần **Trusted entity type** chọn `AWS service` và  phần **Use case**  chọn `Lambda`

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/02.png)

3. Trong phần **Permissions policies**, tìm và gán quyền :

- `AmazonDynamoDBFullAccess` 
- `AmazonS3FullAccess`

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03.png)

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/03-01.png)

- chọn **Next**
> *(Bạn cũng có thể tạo policy riêng nếu muốn giới hạn quyền chặt chẽ hơn.)*


4. Trong phần **"Name, review, and create"** đặt tên cho role, ví dụ: `lambda-dynamodb-and-s3-role`

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/04-01.png)

5. Bấm **Create role** để hoàn tất.

![Ảnh minh họa: Tạo IAM Role](/images/4-deploy-lambda-function/4.1-create-iam-role-for-lambda-function/05.png)


### Tái sử dụng

IAM Role này có thể dùng lại cho nhiều Lambda function khác nhau thao tác với DynamoDB như:

- Tạo hoặc cập nhật dữ liệu
- Xóa bản ghi
- Truy vấn chi tiết theo ID hoặc lấy danh sách

{{% notice tip %}}
Trong môi trường production, nên sử dụng **nguyên tắc phân quyền tối thiểu** bằng cách tạo IAM policy riêng chỉ cấp quyền cần thiết (ví dụ: `PutItem`, `GetItem`, `DeleteItem`) thay vì dùng `FullAccess`.
{{% /notice %}}


