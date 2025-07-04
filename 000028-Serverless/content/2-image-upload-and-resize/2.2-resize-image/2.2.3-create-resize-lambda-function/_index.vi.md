---
title : "Tạo hàm Lambda Resize"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 2.2.3. </b> "
---


#### Tổng quan

Trong bước này, bạn sẽ triển khai hàm Lambda có tên **resize-image**, với mục tiêu là tự động thay đổi kích thước và tối ưu dung lượng ảnh mỗi khi có ảnh mới được tải lên S3. Việc này giúp frontend truy cập ảnh nhanh hơn, giảm tải băng thông và tối ưu hiệu suất hiển thị.
Hàm này được viết bằng **Node.js 22.x** và sử dụng quyền truy cập S3 thông qua một **IAM Role** đã tạo từ bước trước.

#### Tạo hàm Lambda resize-image trên AWS Console

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
   - Sau đó chọn IAM Role bạn đã tạo, ví dụ: `lambda-resize-image-role`

   ![Ảnh minh họa: chọn IAM Role](images/lambda-select-role.png)

---

#### Triển khai mã nguồn cho Lambda resize-image

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

**Lưu ý**
Trong WS này sử dụng **sharp** để xử lý ảnh :
- Là một native module nên sẽ được biên dịch theo hệ điều hành.

- Lambda sử dụng môi trường Amazon Linux 2, khác hoàn toàn với Windows/macOS.

- Nếu bạn cài sharp trên máy cá nhân (Windows), khi deploy lên Lambda sẽ gặp lỗi như ``Error: Cannot find module 'sharp'``
{{% notice warning %}}
Để đảm bảo sharp hoạt động đúng, bạn phải sử dụng Docker với image Lambda chính thức của AWS để cài đặt các dependencies.
{{% /notice %}}

7. Mở Terminal hoặc Command Prompt tại thư mục chứa các file này và chạy lệnh:

```bash
docker run --rm -v "${PWD}:/app" -w /app node:22 bash -c "npm instal sharp"
```

8. Nén mã nguồn để upload lên Lambda
- Truy cập vào thư mục resize-image-lambda

- Chọn tất cả các tệp và thư mục bên trong: **index.mjs**,  **package.json**, **node_modules/**


- Giải nén chúng ra một tệp có tên `resize-image-lambda.zip`

9. Sau khi nén xong tệp xong

- Vào **AWS Lambda**,  chọn hàm **get-presigned-url**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

- Chọn **`get-presigned-url-lambda.zip`** vừa tạo.

Xác nhận lại handler của lambda: index.handler 
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}

---

#### Cấu hình Trigger từ S3 cho Lambda resize-image

Sau khi bạn đã upload source code và thiết lập xong hàm Lambda resize-image, tiếp theo bạn cần cấu hình **Trigger từ S3** để mỗi khi một ảnh được upload lên bucket, Lambda sẽ được **tự động gọi và thực hiện resize.**

1. Vào trang chi tiết hàm Lambda **resize-image**, chuyển sang tab **Configuration**

2. Trong phần **Triggers**, chọn **Add trigger**

3. Trong **Trigger configuration** chọn và nhập các thông tin sau

- **Select a source**:  `S3 Bucket`

- **Bucket**: Tên bucket chứa ảnh gốc , ví dụ : `upload-originals`

- **Event types** : `All object create events`

- **Prefix** (optional): nhập nếu ảnh được upload vào thư mục con, ví dụ: images/originals/

- **Suffix** (optional): giới hạn định dạng file ảnh cần xử lý

**Trong workshop này**, bạn cần tạo **2 trigger** riêng biệt:

- **Trigger 1:** Suffix = `.jpg`

- **Trigger 2:** Suffix = `.png`

{{% notice info %}}
Với mỗi S3 trigger trong Lambda chỉ cho phép một Suffix duy nhất. và trong workshop này sẽ tạo hai trigger : .jpg và .png
{{% /notice %}}

Việc khai báo rõ `Suffix` là rất quan trọng, giúp Lambda chỉ xử lý đúng **các file ảnh**, tránh lỗi và tiết kiệm chi phí vận hành.

4. Đánh dấu vào ô  **I acknowledge that using the same S3 bucket for both input and output is not recommended and that this configuration can cause recursive invocations, increased Lambda usage, and increased costs.**

5. Cuối cùng nhấn **Add** để hoàn tất.


#### Kết quả

Sau khi hoàn tất cấu hình trigger, bạn có thể kiểm tra lại tại giao diện S3 Bucket mà bạn đã chọn làm nguồn kích hoạt.

1. Truy cập vào S3 Console, chọn bucket chứa ảnh gốc (ví dụ: upload-originals).

2. Chuyển sang tab Properties của bucket.

3. Kéo xuống phần Event notifications, bạn sẽ thấy danh sách các event trigger đã được cấu hình. Mỗi event tương ứng với một Suffix như .jpg hoặc .png.

Tại đây, bạn sẽ thấy các event notification gửi đến Lambda function resize-image.
