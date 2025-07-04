---
title : "Tạo hàm Lambda GetPresignedUrl"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 2.1.3. </b> "
---

#### Tổng quan

Trong bước này, bạn sẽ triển khai hàm Lambda có tên **get-presigned-url**, với mục tiêu là tạo ra một **Presigned URL** để frontend có thể upload ảnh trực tiếp lên S3 bucket ảnh gốc.  
Hàm này được viết bằng **Node.js 22.x** và sử dụng quyền truy cập S3 thông qua một **IAM Role** đã tạo từ bước trước.

#### Tạo hàm Lambda get-presigned-url trên AWS Console

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn **Functions**, sau đó bấm **Create function**.

   ![Ảnh minh họa: Create function](images/lambda-create-button.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**.

3. Trong phần **Basic information**, nhập các thông tin:

   - **Function name**: `get-presigned-url`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

   ![Ảnh minh họa: cấu hình cơ bản Lambda](images/lambda-basic-info.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,...  
Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới nhất, hiệu năng cao và hỗ trợ cú pháp hiện đại hơn so với Node.js 18.x.
{{% /notice %}}

4. Ở phần **Change default execution role**:

   - Chọn: `Use an existing role`
   - Sau đó chọn IAM Role bạn đã tạo, ví dụ: `lambda-upload-original-role`

   ![Ảnh minh họa: chọn IAM Role](images/lambda-select-role.png)

---

#### Triển khai mã nguồn cho Lambda get-presigned-url

Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

{{% notice info %}}
Hiện tại **Lambda chưa hỗ trợ trực tiếp trình soạn thảo ESM (import/export) cho Node.js 22.x**.  
Do đó, bạn cần chuẩn bị mã nguồn và thư viện **trên máy local**, sau đó **nén và upload thủ công**.
{{% /notice %}}

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
- Truy cập vào thư mục **get-presigned-url-lambda**

- Chọn tất cả các tệp và thư mục bên trong: **index.mjs**,  **package.json**, **node_modules/**

- Giải nén chúng ra một tệp có tên `get-presigned-url-lambda.zip`

9. Sau khi nén xong tệp xong

- Vào **AWS Lambda**,  chọn hàm **get-presigned-url**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

- Chọn **`get-presigned-url-lambda.zip`** vừa tạo.

Xác nhận lại handler của lambda: index.handler 
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}


