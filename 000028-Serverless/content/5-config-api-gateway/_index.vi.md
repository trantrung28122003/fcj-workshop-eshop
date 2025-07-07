---
title : "Thiết lập API Gateway"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 5. </b> "
---

#### **Tổng quan**

Để các Lambda function có thể được gọi từ frontend (hoặc Postman, curl...), chúng ta cần thiết lập một lớp API trung gian — đó chính là **Amazon API Gateway**.

**API Gateway** đóng vai trò như "cửa ngõ" giúp client (người dùng) tương tác với backend Lambda một cách **bảo mật**, **rõ ràng** và có **tổ chức**.

Trong phần này, chúng ta sẽ:

- **Tạo REST API** mới có tên `eshop-fcj`
- Gắn từng **resource** (ví dụ: `/products`, `/products/{id}`) vào Lambda tương ứng
- Thiết lập các **method** như `GET`, `POST`, `PUT`, `DELETE`
- Kích hoạt **CORS** để frontend có thể gọi được từ trình duyệt
- Kiểm thử **API** với Postman

Khi hoàn tất, bạn sẽ có một **hệ thống API hoàn chỉnh** có thể dùng để triển khai một frontend gọi đến chúng.

---


#### Các bước chính

1. [Tạo API Gateway](5.1-create-api-gateway/)
2. [Tạo tài nguyên và phương thức](5.2-create-resource-and-method/)
3. [Kích hoạt CORS](5.3-enable-cros/)
4. [Kiểm tra các API bằng Postman](5.4-test-apis-with-postman/)
