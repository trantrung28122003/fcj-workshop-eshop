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

##### **Tạo tài nguyên (resource) cho product để triển kahi các lambda về product**

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

##### Thêm phương thức (Method) cho tài nguyên (Resource)

Ví dụ thêm phương thức **POST** cho `/product`:

1. Chọn resource `/product` trong phần **Resource** trong API, sau đó chọn **Create Method**

2. Trong **Method details**, nhập các thông tin sau:

- **Method type** : `POST`

- **Integration type** : `Lambda function`

- **Lambda function** : Chọn vùng chứa lamda đã triển khai và chọn lambda tương ứng ,  ví dụ: `create-product`

- Bật chế độ **Lambda proxy integration** 

{{% notice info %}}
Lưu ý: Trong dự án này, các API nhận dữ liệu dạng **JSON body**, do đó **bắt buộc phải bật Lambda Proxy Integration**.
{{% /notice %}}


3. Cuộn xuống dưới và hoàn tất chọn **Create method**


Ví dụ thêm phương thức **GET** cho `/product` nhưng có **ID truyền vào**:

1. Trong API **eshop-fcj** , chọn **Create Resource**,

2. Trong **Resource details**:

- **Resource Path**: `/products`

- **Resource Name**: `{id}`
   
3. Nhấn **Create Resource**

4. Chọn resource `/products` trong phần **Resource** trong API, sau đó chọn Resource con `{id}`, rồi chọn **Create Method**

5. Trong **Method details**, nhập các thông tin sau:

- **Method type** : `GET`

- **Integration type** : `Lambda function`

- Bật chế độ **Lambda proxy integration** 

- **Lambda function** : Chọn vùng chứa lamda đã triển kahi avf chọn lmada tương ứng ,ví dụ: `get-product`


---
Thực hiện tương tự cho các phương thức và tài nguyên khác tương tự 

| Resource Path        | Resource Name     | Method | Mô tả chức năng                | Lambda tương ứng         |
|----------------------|-------------------|--------|--------------------------------|--------------------------|
| `/`                  | `products`        | POST   | Tạo mới sản phẩm               | `create-product`         |
| `/`                  | `products`        | GET    | Lấy danh sách sản phẩm         | `get-product`            |
| `/products`          | `{id}`            | GET    | Lấy sản phẩm theo ID           | `get-product`            |
| `/products`          | `{id}`            | DELETE | Xoá sản phẩm theo ID           | `delete-product`         |
| `/`                  | `categories`      | POST   | Tạo danh mục sản phẩm          | `create-category`        |
| `/`                  | `categories`      | GET    | Lấy danh sách danh mục         | `create-category`        |
| `/categories`        | `{id}`            | GET    | Lấy danh mục theo ID           | `create-category`        |
| `/categories`        | `{id}`            | DELETE | Xóa danh mục theo ID           | `create-category`        |
| `/`                  | `upload-image`    | POST   | Tạo URL upload ảnh             | `get-presigned-url`      |


{{% notice warning %}}
Bạn cần thực hiện lại các bước trên để tạo từng tài nguyên với các phương thức tưng ứng còn lại theo bảng trên nếu muốn frontend gọi được API đó!
{{% /notice %}}


