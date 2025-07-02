---
title : "Hàm Lambda tạo hoặc cập nhập dữ liệu"
date :  "`r Sys.Date()`"
weight : 1
chapter : false
pre : " <b> 4.1. </b> "
---

### Tổng quan

Trong bước này, chúng ta sẽ triển khai hàm Lambda có tên **Create_Book** – dùng để tạo hoặc cập nhật dữ liệu vào DynamoDB.

Hàm này được viết bằng **Node.js** và sử dụng quyền truy cập DynamoDB thông qua một IAM Role phù hợp.

---

### Bước 1: Tạo IAM Role cho Lambda Function

Trước khi tạo hàm Lambda, bạn cần tạo một IAM Role với quyền truy cập DynamoDB. Các bước:

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home#/roles) và chọn phần Roles trong **Access management** **Create role**.
2. Ở phần **Trusted entity type**, chọn: `AWS service`.
3. Ở mục **Use case**, chọn: `Lambda`.
4. Bấm **Next** và gán quyền:
   - Tìm và chọn policy: `AmazonDynamoDBFullAccess` *(hoặc tạo policy riêng nếu cần giới hạn quyền)*.
5. Đặt tên Role, ví dụ: `lambda-dynamodb-role`.
6. Bấm **Create role**.

---

### Bước 2: Tạo Lambda Function

1. Truy cập vào [AWS Lambda Console](https://console.aws.amazon.com/lambda/home) và chọn **Functions** từ thanh điều hướng trái, sau đó nhấn **Create function**.

   ![Ảnh minh họa: nút Create function](images/lambda-create-button.png)

2. Ở phần **Create function**, chọn tab **Author from scratch**.

3. Trong mục **Basic information**, nhập:

   - **Function name**: `Create_Book`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

   ![Ảnh minh họa: cấu hình cơ bản](images/lambda-basic-info.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,... Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới và tối ưu hơn so với Node.js 18.x.
{{% /notice %}}

---

### Bước 3: Gán IAM Role cho Lambda

Trong phần **Change default execution role**:

- Chọn **Use an existing role**
- Sau đó chọn IAM Role đã tạo ở bước trước, ví dụ: `lambda-dynamodb-role`

![Ảnh minh họa: chọn IAM role cho Lambda](images/lambda-select-role.png)

---

Sau khi hoàn tất, nhấn **Create function** để khởi tạo. Lambda sẽ chuyển sang giao diện chỉnh sửa code để bạn bắt đầu lập trình logic xử lý.

---

👉 Bạn cần mình viết tiếp phần code xử lý lưu dữ liệu vào DynamoDB bên trong Lambda không? Mình có thể thêm chi tiết cấu trúc bảng, cách dùng `PutItemCommand`, v.v.
