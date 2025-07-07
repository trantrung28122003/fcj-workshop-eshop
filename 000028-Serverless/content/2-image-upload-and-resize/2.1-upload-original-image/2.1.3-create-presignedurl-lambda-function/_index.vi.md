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

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/14.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**. Và trong phần **Basic information**, nhập các thông tin:

- **Function name**: `get-presigned-url`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/16.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,...  
Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới nhất, hiệu năng cao và hỗ trợ cú pháp hiện đại hơn so với Node.js 18.x.
{{% /notice %}}

3. Ở phần **Change default execution role**:

- Chọn: `Use an existing role`
- Sau đó chọn **IAM Role** bạn đã tạo, ví dụ: `lambda-upload-original-role`
- Cuối cùng chọn **Create function**

Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/17.png)

---

#### Triển khai mã nguồn cho Lambda get-presigned-url

Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

{{% notice info %}}
Hiện tại **Lambda chưa hỗ trợ trực tiếp trình soạn thảo ESM (import/export) cho Node.js 22.x**.  
Do đó, bạn cần chuẩn bị mã nguồn và thư viện **trên máy local**, sau đó **nén và upload thủ công**.
{{% /notice %}}

**Chuẩn bị mã nguồn và thư viện**

Bạn có thể chọn **một trong hai cách sau** để triển khai Lambda:

##### **Cách 1: Dùng tệp đã build sẵn (nhanh, tiện lợi)**
> Khuyên dùng nếu bạn muốn triển khai nhanh mà không cần cài đặt gì thêm. tại này WS đã build sẵn

1. Tải tệp `.zip` đã **build** sẵn tại đây: [**get-presigned-url-lambda.zip**](/attachments/2-image-upload-and-resize/2.1-upload-original-image/get-presigned-url-lambda.zip)

2. Sau khi tải tệp đã build xong, thực hiện các bước sau :

- Vào **AWS Lambda**,  chọn hàm **get-presigned-url**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/22.png)

- sau đó chọn **`get-presigned-url-lambda.zip`** vừa tạo.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/24.png)

3. Sau khi tải tệp lên xong , thì chọn **deloy**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/25.png)

##### **Cách 2: Tự chuẩn bị mã nguồn và thư viện**
>  Dành cho bạn nào muốn tự tay build hoặc học thêm.

1. Tải mã nguồn mẫu tại đây: [**get-presigned-url-source.zip**](/attachments/2-image-upload-and-resize/2.1-upload-original-image/get-presigned-url-source.zip)

2. Sau khi giải nén, bạn sẽ thấy các tệp sau:

   - `index.mjs`: chứa logic xử lý của Lambda
   - `package.json`: khai báo thư viện cần thiết

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/18.png)

3. Mở Terminal hoặc Command Prompt tại thư mục chứa các tệp này và chạy lệnh:

```bash
npm install 
```
![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/19.png)


4. Nén mã nguồn để upload lên Lambda

- Truy cập vào thư mục **get-presigned-url-source**

- Chọn tất cả các tệp và thư mục bên trong: **index.mjs**,  **package.json**, **node_modules/**

- Giải nén chúng ra một tệp có tên `get-presigned-url-lambda.zip`

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/20.png)

5. Sau khi nén xong tệp xong

- Vào **AWS Lambda**,  chọn hàm **get-presigned-url**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/22.png)

- sau đó chọn **`get-presigned-url-lambda.zip`** vừa tạo.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/24.png)

7. Sau khi tải tệp lên xong , thì chọn **deloy**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/25.png)

##### **Xác nhận lại handler của lambda: index.handler **
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.1-upload-original-image/26.png)




