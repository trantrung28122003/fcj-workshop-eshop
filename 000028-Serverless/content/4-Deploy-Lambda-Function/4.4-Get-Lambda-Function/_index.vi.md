---
title : "Hàm Lambda lấy dữ liệu"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 4.4. </b> "
---

#### Tổng quan

Trong bước này, chúng ta sẽ triển khai hàm các: 
- Lambda có tên **get-product**– dùng để **lấy dữ liệu** sản phẩm vào DynamoDB.  

- Lambda có tên **get-category** – dùng để **lấy danh mục** vào DynamoDB.

Hàm này được viết bằng **Node.js 22.x** và sử dụng quyền truy cập DynamoDB thông qua một **IAM Role** đã tạo sẵn.


{{% notice note %}}
Trong Workshop này, mỗi hàm Lambda get sẽ xử lý cả hai chức năng: lấy toàn bộ danh sách và lấy một mục theo ID. 
Nghĩa là chỉ cần một Lambda cho cả hai loại truy vấn.
{{% /notice %}}

---

#### Tạo hàm Lambda get-product trên AWS Console

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn **Functions**, sau đó bấm **Create function**.

   ![Ảnh minh họa: Create function](images/lambda-create-button.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**.

3. Trong phần **Basic information**, nhập các thông tin:

   - **Function name**: `get-product`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

   ![Ảnh minh họa: cấu hình cơ bản Lambda](images/lambda-basic-info.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,...  
Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới nhất, hiệu năng cao và hỗ trợ cú pháp hiện đại hơn so với Node.js 18.x.
{{% /notice %}}

4. Ở phần **Change default execution role**:

   - Chọn: `Use an existing role`
   - Sau đó chọn IAM Role bạn đã tạo, ví dụ: `lambda-dynamodb-role`

   ![Ảnh minh họa: chọn IAM Role](images/lambda-select-role.png)



Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

{{% notice warning %}}
Hiện tại **Lambda chưa hỗ trợ trực tiếp trình soạn thảo ESM (import/export) cho Node.js 22.x**.  
Do đó, bạn cần chuẩn bị mã nguồn và thư viện **trên máy local**, sau đó **nén và upload thủ công**.
{{% /notice %}}

**Chuẩn bị mã nguồn và thư viện**

5. Tải mã nguồn mẫu tại đây: 

- Tải mã nguồn tại đây [get-product-lambda.zip](/attachments/resize-image-lambda.zip)

6. Sau khi giải nén, bạn sẽ thấy các file sau:

   - `index.mjs`: chứa logic xử lý của Lambda
   - `package.json`: khai báo thư viện cần thiết

7. Mở Terminal hoặc Command Prompt tại thư mục chứa các file này và chạy lệnh:

```bash
npm install @aws-sdk/client-dynamodb uuid
```

9. Sau khi nén xong tệp xong

- Vào **AWS Lambda**,  chọn hàm **get-product**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

- Chọn **`get-product-lambda.zip`p** vừa tạo

Xác nhận lại handler của lambda: index.handler 
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}

---

#### Tạo hàm Lambda get-category trên AWS Console

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn **Functions**, sau đó bấm **Create function**.

   ![Ảnh minh họa: Create function](images/lambda-create-button.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**.

3. Trong phần **Basic information**, nhập các thông tin:

   - **Function name**: `get-category`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

   ![Ảnh minh họa: cấu hình cơ bản Lambda](images/lambda-basic-info.png)

4. Ở phần **Change default execution role**:

   - Chọn: `Use an existing role`
   - Sau đó chọn IAM Role bạn đã tạo, ví dụ: `lambda-dynamodb-role`

   ![Ảnh minh họa: chọn IAM Role](images/lambda-select-role.png)


**Chuẩn bị mã nguồn và thư viện**

5. Tải mã nguồn mẫu tại đây: **[Tải file tại đây](#)** *(link cần thay thế bằng link thực tế)*

6. Sau khi giải nén, bạn sẽ thấy các file sau:

   - `index.mjs`: chứa logic xử lý của Lambda
   - `package.json`: khai báo thư viện cần thiết

7. Mở Terminal hoặc Command Prompt tại thư mục chứa các file này và chạy lệnh:

```bash
npm install @aws-sdk/client-dynamodb uuid
```

8. Nén mã nguồn để upload lên Lambda
- Truy cập vào thư mục **get-category-lambda**

- Chọn tất cả các tệp và thư mục bên trong: **index.mjs**,  **package.json**, **node_modules/**

- Giải nén chúng ra một tệp có tên `get-category-lambda.zip`

9. Sau khi nén xong tệp xong

- Vào **AWS Lambda**,  chọn hàm **get-category**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

- Chọn **`get-category-lambda.zip`** vừa tạo

Xác nhận lại handler của lambda: index.handler 
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}

