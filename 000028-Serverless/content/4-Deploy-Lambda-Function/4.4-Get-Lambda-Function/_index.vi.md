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

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn **Create function**.

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/01.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**. và trong phần **Basic information**, nhập các thông tin:

   - **Function name**: `get-product`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/02.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,...  
Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới nhất, hiệu năng cao và hỗ trợ cú pháp hiện đại hơn so với Node.js 18.x.
{{% /notice %}}

3. Ở phần **Change default execution role**:

   - Chọn: `Use an existing role`
   - Sau đó chọn **IAM Role** bạn đã tạo, ví dụ: `lambda-dynamodb-role`
   - Cuối cùng chọn **Create function**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/03.png)

Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

{{% notice warning %}}
Hiện tại **Lambda chưa hỗ trợ trực tiếp trình soạn thảo ESM (import/export) cho Node.js 22.x**.  
Do đó, bạn cần chuẩn bị mã nguồn và thư viện **trên máy local**, sau đó **nén và upload thủ công**.
{{% /notice %}}

**Chuẩn bị mã nguồn và thư viện**

Bạn có thể chọn **một trong hai cách sau** để triển khai Lambda:

##### **Cách 1: Dùng tệp đã build sẵn (nhanh, tiện lợi)**
> Khuyên dùng nếu bạn muốn triển khai nhanh mà không cần cài đặt gì thêm. tại này WS đã build sẵn

1. Tải file `.zip` đã **build** sẵn tại đây: [**get-product-lambda.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-product-lambda.zip)

2. Sau khi tải tệp đã build xong, thực hiện các bước sau :

- Vào **AWS Lambda**,  chọn hàm **get-product**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/04.png)

- sau đó chọn **`get-product-lambda.zip`** vừa tạo. Và chọn **save**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/05.png)

3. Sau khi tải tệp lên xong , thì chọn **deloy**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/06.png)


Sau khi deploy tệp .zip, bạn cần **kiểm tra và cập nhật** lại các biến môi trường (Environment Variables) trong phần cấu hình Lambda:

**REGION**: vùng AWS mà bạn đã tạo tài nguyên

**TABLE_NAME**: tên bảng DynamoDB đã tạo trước đó

**ORGINAL_BUCKET**: tên bucket chứa ảnh gốc

**RESIZED_BUCKET**: tên bucket chứa ảnh đã resize

Hãy chắc chắn rằng các **giá trị này khớp với những gì bạn đã cấu hình trong các bước trước** , nếu không Lambda sẽ không hoạt động chính xác.

{{% notice note %}}
Khi bạn chỉnh sửa code ngay trong giao diện **AWS Lambda** thì nhớ **deloy** sau khi sửa xong
{{% /notice %}}


##### **Cách 2: Tự chuẩn bị mã nguồn và thư viện**
>  Dành cho bạn nào muốn tự tay build hoặc học thêm.

1. Tải mã nguồn mẫu tại đây: [**get-product-source.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-product-source.zip)

2. Sau đó, bạn có thể xem hướng dẫn build và cài đặt thư viện tại:
[Tạo hàm Lambda GetPresignedUrl](2.1.1-create-presignedurl-lambda-function/)

{{% notice info %}}
Trong phần tạo hàm Lambda GetPresignedUrl có chỉ rõ từng phần để triển khai build thư viện ở local
{{% /notice %}}

---

#### Tạo hàm Lambda get-category trên AWS Console

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn **Create function**.

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/01.png)

2. Ở màn hình **Create function**, chọn **Author from scratch**. và trong phần **Basic information**, nhập các thông tin:

   - **Function name**: `get-category`
   - **Runtime**: `Node.js 22.x`
   - **Architecture**: `x86_64`

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/07.png)

{{% notice note %}}
Hiện tại AWS Lambda hỗ trợ nhiều ngôn ngữ như **Java**, **.NET**, **Python**, **Node.js**,...  
Trong hướng dẫn này, ta sử dụng **Node.js 22.x** – phiên bản mới nhất, hiệu năng cao và hỗ trợ cú pháp hiện đại hơn so với Node.js 18.x.
{{% /notice %}}

3. Ở phần **Change default execution role**:

   - Chọn: `Use an existing role`
   - Sau đó chọn **IAM Role** bạn đã tạo, ví dụ: `lambda-dynamodb-role`
   - Cuối cùng chọn **Create function**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/08.png)

Sau khi nhấn **Create function**, Lambda sẽ chuyển sang giao diện chỉnh sửa mã.

{{% notice warning %}}
Hiện tại **Lambda chưa hỗ trợ trực tiếp trình soạn thảo ESM (import/export) cho Node.js 22.x**.  
Do đó, bạn cần chuẩn bị mã nguồn và thư viện **trên máy local**, sau đó **nén và upload thủ công**.
{{% /notice %}}

**Chuẩn bị mã nguồn và thư viện**

Bạn có thể chọn **một trong hai cách sau** để triển khai Lambda:

##### **Cách 1: Dùng tệp đã build sẵn (nhanh, tiện lợi)**
> Khuyên dùng nếu bạn muốn triển khai nhanh mà không cần cài đặt gì thêm. tại này WS đã build sẵn

1. Tải file `.zip` đã **build** sẵn tại đây: [**get-category-lambda.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-category-lambda.zip)

2. Sau khi tải tệp đã build xong, thực hiện các bước sau :

- Vào **AWS Lambda**,  chọn hàm **get-category**

- ở phần trang **Code**, bấm **Upload from**, sau đó chọn **.zip file**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/09.png)

- sau đó chọn **`get-category-lambda.zip`** vừa tạo. Và chọn **save**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/10.png)

3. Sau khi tải tệp lên xong , thì chọn **deloy**

![Ảnh minh họa: Tạo hàm lambda](/images/4-deploy-lambda-function/4.4-get-lambda-function/11.png)


Sau khi deploy tệp .zip, bạn cần **kiểm tra và cập nhật** lại các biến môi trường (Environment Variables) trong phần cấu hình Lambda:

**REGION**: vùng AWS mà bạn đã tạo tài nguyên

**TABLE_NAME**: tên bảng DynamoDB đã tạo trước đó

**ORGINAL_BUCKET**: tên bucket chứa ảnh gốc

**RESIZED_BUCKET**: tên bucket chứa ảnh đã resize

Hãy chắc chắn rằng các **giá trị này khớp với những gì bạn đã cấu hình trong các bước trước** , nếu không Lambda sẽ không hoạt động chính xác.

{{% notice note %}}
Khi bạn chỉnh sửa code ngay trong giao diện **AWS Lambda** thì nhớ **deloy** sau khi sửa xong
{{% /notice %}}


##### **Cách 2: Tự chuẩn bị mã nguồn và thư viện**
>  Dành cho bạn nào muốn tự tay build hoặc học thêm.

1. Tải mã nguồn mẫu tại đây: [**get-category-source.zip**](/attachments/4-deploy-lambda-function/4.4-get-lambda-function/get-category-source.zip)

2. Sau đó, bạn có thể xem hướng dẫn build và cài đặt thư viện tại:
[Tạo hàm Lambda GetPresignedUrl](2.1.1-create-presignedurl-lambda-function/)

{{% notice info %}}
Trong phần tạo hàm Lambda GetPresignedUrl có chỉ rõ từng phần để triển khai build thư viện ở local
{{% /notice %}}

---

