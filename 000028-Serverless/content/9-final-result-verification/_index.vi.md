---
title : "Kiểm tra kết quả cuối cùng trên giao diện "
date :  "`r Sys.Date()`" 
weight : 9
chapter : false
pre : " <b> 9. </b> "
---

#### Tổng quan
Sau khi đã triển khai thành công frontend lên S3 và cấu hình CloudFront, bạn hãy kiểm tra lại toàn bộ hệ thống bằng cách truy cập vào website test thử nha.

## Truy cập website frontend

#### Đăng nhập / Đăng ký

- Truy cập trang `/login` và `/register` để kiểm tra luồng xác thực người dùng.
- Đảm bảo kết nối với Cognito hoạt động bình thường.

**Trang đăng kí**
![Ảnh minh họa: kết quả](/images/9-final-result-verification/01.png)

**Trang đăng nhập**
![Ảnh minh họa: kết quả](/images/9-final-result-verification/02.png)
#### Trang Admin

- Đăng nhập bằng tài khoản **admin**
- Truy cập các trang như `/admin/products`, `/admin/categories`
- Kiểm tra xem có thể thêm, sửa, xoá sản phẩm không.

**Trang admin quản lý sản phẩm**

![Ảnh minh họa: kết quả](/images/9-final-result-verification/03.png)

**Trang admin quản danh mục**

![Ảnh minh họa: kết quả](/images/9-final-result-verification/04.png)

#### Trang người dùng

- Truy cập các trang ``, xem có hiện danh sách sản phẩm không

![Ảnh minh họa: kết quả](/images/9-final-result-verification/05.png)

### Trang báo lỗi (không có quyền)

- Đăng nhập bằng tài khoản **user thông thường**
- Truy cập vào trang `/admin` để xác minh rằng hệ thống hiển thị thông báo “Không có quyền truy cập”.

![Ảnh minh họa: kết quả](/images/9-final-result-verification/06.png)