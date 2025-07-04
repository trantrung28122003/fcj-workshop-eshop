---
title : "Thiết lập API Gateway"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 5. </b> "
---

#### Tổng quan

**Amazon API Gateway** đóng vai trò như một **cổng vào** cho các client (frontend, Postman, ứng dụng mobile...) giao tiếp với hệ thống Lambda – giúp chúng ta xây dựng một hệ thống **RESTful API Serverless** hoàn chỉnh, dễ mở rộng, dễ quản lý và tiết kiệm chi phí.

Trong phần này, bạn sẽ cấu hình **API Gateway** để kết nối với các hàm Lambda đã triển khai như:

- Upload **sản phẩm**
- Upload **danh mục**
- Và các API khác trong hệ thống **quản lý ảnh**

---

#### Tạo API Gateway

Chúng ta sẽ thiết lập **API Gateway** để tương tác với các Lambda function đã tạo ở phần trước:

1. Mở bảng điều khiển [Amazon API Gateway](https://console.aws.amazon.com/apigateway/home) và chọn **Create an API**

2. Trong phần **Choose an API type**, cuộn xuống dưới và chọn **REST API**, sau đó bấm **Build**

3. Trong mục **API details**, nhập các thông tin sau:

    - **Chọn**: `New API`
    - **API name**: `eshop-fcj`
    - **Description (tuỳ chọn)**: `eshop-fcj`
    - **API endpoint type**: `Regional`
    - **IP address type**: `IPv4`

---

#### Các bước chính

1. [Tạo tài nguyên và phương thức](5.1-create-resource-and-method/)
2. [Kích hoạt CORS](5.2-enable-cros/)
3. [Kiểm tra các API bằng Postman](5.3-test-apis-with-postman/)
