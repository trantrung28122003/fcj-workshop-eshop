---
title : "Hàm Lambda tạo hoặc cập nhập dữ liệu"
date :  "`r Sys.Date()`"
weight : 1
chapter : false
pre : " <b> 4.1. </b> "
---

### Tổng quan

Trong bước này, chúng ta sẽ triển khai hàm Lambda có tên **Create_Book** – dùng để tạo hoặc cập nhật dữ liệu vào DynamoDB. Hàm này được viết bằng **Node.js** và sử dụng quyền truy cập DynamoDB thông qua một IAM Role phù hợp.


###  Tạo IAM Role cho Lambda

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home) → chọn **Create role**
2. Ở phần **Trusted entity type**: chọn `AWS service`
3. Trong mục **Use case**: chọn `Lambda`
4. Nhấn **Next**, sau đó **gán quyền**:
   - Tìm và chọn policy: `AmazonDynamoDBFullAccess`  
   *(hoặc tự tạo policy riêng nếu muốn kiểm soát kỹ quyền truy cập)*
5. Đặt tên cho Role, ví dụ: `lambda-dynamodb-role`
6. Nhấn **Create role**

---

### ⚙️ Bước 2: Tạo hàm Lambda

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home) → chọn **Functions** → bấm **Create function**

   ![Ảnh minh họa: Create function](images/lambda-create-button.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**

3. Điền thông tin:

   - **Function name**: `Create_Book`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

   ![Ảnh minh họa: cấu hình cơ bản Lambda](images/lambda-basic-info.png)

{{% notice note %}}
Hiện tại Lambda đã hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**, v.v.  
Ở hướng dẫn này ta sử dụng **Node.js 22.x** – phiên bản mới, hiệu năng cao hơn và nhiều tính năng hiện đại hơn Node.js 18.x.
{{% /notice %}}

---

### 🔐 Bước 3: Gán IAM Role

Tại mục **Change default execution role**:

- Chọn: `Use an existing role`
- Sau đó chọn IAM Role bạn đã tạo, ví dụ: `lambda-dynamodb-role`

   ![Ảnh minh họa: chọn IAM Role](images/lambda-select-role.png)

---

### ✅ Bước 4: Tạo và chuẩn bị mã nguồn

1. Nhấn **Create function**
2. Sau khi tạo xong, bạn sẽ được chuyển đến giao diện chỉnh sửa mã nguồn

> **Tuy nhiên:** Do Lambda hiện chưa hỗ trợ tốt Node.js 22 cho trình sửa trực tiếp, bạn nên viết mã trên máy local và nén `.zip` để upload (sẽ hướng dẫn ở phần tiếp theo).

{{% notice tip %}}
Bạn cần cài các thư viện (như `@aws-sdk/client-dynamodb`) bằng `npm install` tại local, sau đó nén toàn bộ mã + `node_modules` và upload lên Lambda.
{{% /notice %}}

---