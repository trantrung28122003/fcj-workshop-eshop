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

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn **Create function**.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/16.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**.Và trong phần **Basic information**, nhập các thông tin:

- **Function name**: `resize-image`
- **Runtime**: `Node.js 22.x`
- **Architecture**: `x86_64`

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/17.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,...  
Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới nhất, hiệu năng cao và hỗ trợ cú pháp hiện đại hơn so với Node.js 18.x.
{{% /notice %}}

3. Ở phần **Change default execution role**:

- Chọn: `Use an existing role`
- Sau đó chọn **IAM Role** bạn đã tạo, ví dụ: `lambda-resize-image-role`
- Cuối cùng chọn **Create function**

Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/18.png)

---

#### Triển khai mã nguồn cho Lambda resize-image

Bạn có thể chọn **một trong hai cách sau** để triển khai Lambda:

##### **Cách 1: Dùng tệp đã build sẵn (nhanh, tiện lợi)**
> Khuyên dùng nếu bạn muốn triển khai nhanh mà không cần cài đặt gì thêm. tại này WS đã build sẵn

1. Tải file `.zip` đã **build** sẵn tại đây: [**resize-image.zip**](/attachments/2-image-upload-and-resize/2.2-resize-image/resize-image-lambda.zip)

2. Sau khi tải tệp đã build xong, thực hiện các bước sau :

- Vào **AWS Lambda**,  chọn hàm **resize-image**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/21.png)

- sau đó chọn **`resize-image-lambda.zip`** vừa tạo.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/22.png)

3. Sau khi tải tệp lên xong , thì chọn **deloy**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/23.png)

Xác nhận lại handler của lambda: index.handler 
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/24.png)

4. Tiếp theo, cuộn xuống dưới xem phần hướng dẫn **Cấu hình Trigger từ S3 cho Lambda resize-image**

##### **Cách 2: Tự chuẩn bị mã nguồn và thư viện**
>  Dành cho bạn nào muốn tự tay build hoặc học thêm.

1. Tải mã nguồn mẫu tại đây: [**resize-image-source.zip**](/attachments/2-image-upload-and-resize/2.2-resize-image/resize-image-source.zip)

2. Sau khi giải nén, bạn sẽ thấy các file sau:

   - `index.mjs`: chứa logic xử lý của Lambda
   - `package.json`: khai báo thư viện cần thiết

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/19.png)

**Lưu ý**
Trong WS này sử dụng **sharp** để xử lý ảnh :
- Là một native module nên sẽ được biên dịch theo hệ điều hành.

- Lambda sử dụng môi trường Amazon Linux 2, khác hoàn toàn với Windows/macOS.

- Nếu bạn cài sharp trên máy cá nhân (Windows), khi deploy lên Lambda sẽ gặp lỗi như ``Error: Cannot find module 'sharp'``
{{% notice warning %}}
Để đảm bảo sharp hoạt động đúng, bạn phải sử dụng Docker với image Lambda chính thức của AWS để cài đặt các dependencies.
{{% /notice %}}

3. Mở **PowerShell** tại thư mục chứa file Lambda và chạy lệnh sau:

```bash
docker run --rm -v "${PWD}:/app" -w /app node:22 bash -c "npm instal sharp"
```
![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/20.png)
Nếu bạn dùng **CMD**, thay bằng:

```bash
docker run --rm -v "%cd%:/var/task" -w /var/task public.ecr.aws/lambda/nodejs20.x bash -c "npm install sharp"
```

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/19.png)


4. Nén mã nguồn để upload lên Lambda

- Truy cập vào thư mục **resize-image-source**

- Chọn tất cả các tệp và thư mục bên trong: **index.mjs**,  **package.json**, **node_modules/**

- Giải nén chúng ra một tệp có tên `resize-image-lambda.zip`
![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/21-01.png)


5. Sau khi nén xong tệp xong

- Vào **AWS Lambda**,  chọn hàm **resize-image**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/21.png)

- sau đó chọn **`resize-image-lambda.zip`** vừa tạo.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/22.png)

7. Sau khi tải tệp lên xong , thì chọn **deloy**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/23.png)


Xác nhận lại handler của lambda: index.handler 
{{% notice tip %}}
Handler của Lambda có dạng: <TÊN_FILE>.<TÊN_HÀM>
{{% /notice %}}

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/24.png)
---

#### Cấu hình Trigger từ S3 cho Lambda resize-image

Sau khi bạn đã upload source code và thiết lập xong hàm Lambda resize-image, tiếp theo bạn cần cấu hình **Trigger từ S3** để mỗi khi một ảnh được upload lên bucket, Lambda sẽ được **tự động gọi và thực hiện resize.**

1. Vào trang chi tiết hàm Lambda **resize-image**, chuyển sang tab **Configuration** và sau đó chọn phần **Triggers**, chọn **Add trigger**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/25.png)

2. Trong **Trigger configuration**, chọn dịch vụ **S3 Bucket**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/26.png)

3. Trong **Trigger configuration** nhập các thông tin sau

- **Bucket**: Tên bucket chứa ảnh gốc , ví dụ : `upload-originals`

- **Event types** : `All object create events`

- **Prefix** (optional): nhập nếu ảnh được upload vào thư mục con, ví dụ: images/originals/

- **Suffix** (optional): giới hạn định dạng file ảnh cần xử lý

- Đánh dấu vào ô  **I acknowledge that using the same S3 bucket for both input and output is not recommended and that this configuration can cause recursive invocations, increased Lambda usage, and increased costs.**

- Cuối cùng nhấn **Add** để hoàn tất.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/27.png)

**Trong workshop này**, bạn cần tạo **2 trigger** riêng biệt:

- **Trigger 1:** Suffix = `.jpg`

- **Trigger 2:** Suffix = `.png`

Tương tự như **Trigger 1:** Suffix = `.jpg`, tạo **Trigger 2:** Suffix = `.png` :

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/28.png)

{{% notice info %}}
Với mỗi S3 trigger trong Lambda chỉ cho phép một Suffix duy nhất. và trong workshop này sẽ tạo hai trigger : .jpg và .png
{{% /notice %}}

Việc khai báo rõ `Suffix` là rất quan trọng, giúp Lambda chỉ xử lý đúng **các file ảnh**, tránh lỗi và tiết kiệm chi phí vận hành.

#### Kết quả

Sau khi hoàn tất cấu hình trigger, bạn có thể kiểm tra lại tại giao diện S3 Bucket mà bạn đã chọn làm nguồn kích hoạt.

1. Truy cập vào **S3 Console**, chọn **bucket** chứa ảnh gốc (ví dụ: **upload-originals-fcj**). Sau đó, chuyển sang tab **Properties** của bucket.

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/29.png)

2. Kéo xuống phần **Event notifications**, bạn sẽ thấy danh sách các **event trigger** đã được cấu hình. Mỗi **event** tương ứng với một **Suffix** như .jpg hoặc .png.

3. Tại đây, bạn sẽ thấy các **event notification** gửi đến **Lambda function resize-image.**

![Ảnh minh họa: Tạo hàm lambda](/images/2-image-upload-and-resize/2.2-resize-image/30.png)
