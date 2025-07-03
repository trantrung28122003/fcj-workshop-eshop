---
title : "Tạo các tài nguyên và phương thức tương ứng"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

#### Tổng quan

Sau khi bạn đã tạo xong **API Gateway** (**eshop-fcj**), bước tiếp theo là khai báo **tài nguyên (resource)** và thiết lập **phương thức (method)** tương ứng để kết nối đến các hàm Lambda đã triển khai, như: tạo sản phẩm, lấy danh sách, xóa,...

---

#### Các bước tạo tài nguyên và phương thức

**Tạo tài nguyên (resource) cho product để triển kahi các lambda về product**

1. Truy cập vào API **eshop-fcj** vừa mới tạo

- Mở [API Gateway Console](https://console.aws.amazon.com/apigateway)

- Chọn API tên **eshop-fcj** vừa tạo

- chọn **Create Resource**,

2. Trong **Resource details**:

- **Resource Path**: `/`

- **Resource Name**: `Products`
   
3. Nhấn **Create Resource**


Tương tự, bạn có thể tạo thêm các tài nguyên khác với 

- Đối với category để thao tác với danh mục sản phẩm:
    - **Resource Path** `/`

    - **Resource Name** `category`

- Đối với upload-image để thao tác với việc tải các tệp ảnh:
    - **Resource Path** `/`

    - **Resource Name** `upload`

---

#### 3. Thêm phương thức (Method) cho resource

Ví dụ thêm phương thức **POST** cho `/product`:

1. Chọn resource `/product` trong cây bên trái
2. Nhấn **Actions** → chọn **Create Method**
3. Chọn **POST** → nhấn dấu check ✅
4. Cấu hình như sau:
   - **Integration type**: Lambda Function
   - **Use Lambda Proxy integration**: ✅ bật
   - **Lambda Function**: `create-product` *(tên hàm Lambda bạn đã tạo)*
5. Nhấn **Save**, sau đó **OK** để cấp quyền cho API Gateway gọi Lambda

---

##### 4. Thực hiện tương tự cho các phương thức khác

| Resource        | Method | Mô tả chức năng             | Lambda tương ứng         |
|----------------|--------|-----------------------------|--------------------------|
| `/product`     | POST   | Tạo mới sản phẩm            | `create-product`         |
| `/product`     | GET    | Lấy danh sách sản phẩm      | `get-product`            |
| `/product`     | DELETE | Xoá sản phẩm theo ID        | `delete-product`         |
| `/category`    | POST   | Tạo danh mục                | `create-category`        |
| `/upload-image`| POST   | Tạo URL upload ảnh          | `get-presigned-url`      |
| `/resize-image`| Trigger tự động qua S3              | Không cần gọi qua API    |

---

##### 5. Deploy API

1. Trên thanh menu **Actions**, chọn **Deploy API**
2. Tạo **Deployment stage** mới (nếu chưa có), ví dụ:
   - **Stage name**: `dev`
   - **Stage description**: `Dev environment`
3. Nhấn **Deploy**

Sau khi deploy thành công, bạn sẽ nhận được một URL như:

