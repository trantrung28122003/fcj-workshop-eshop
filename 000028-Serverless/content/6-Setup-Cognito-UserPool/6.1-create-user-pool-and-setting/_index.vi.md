---
title : "Tạo UserPool và cấu hình"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 6.1. </b> "
---

#### Tổng quan

**Amazon Cognito User Pool** là một dịch vụ quản lý danh tính người dùng, cho phép bạn tạo, **xác thực và quản lý người dùng** cho ứng dụng web hoặc mobile. Trong phần này, sẽ tạo **một User Pool** cơ bản để sử dụng trong các bước xác thực sau này.

#### Nội dung chính


1. Truy cập [Amazon Cognito Console](https://console.aws.amazon.com/cognito/home). Chọn **User pools** ở menu bên trái. Sau đó nhấn **Create user pool**.

2. Ở màn hình **Set up resources for your application**, trong phần **Define your application**, điền các thông tin:

- **Application type**: `Single-page application (SPA)`

- **Name your application**: `eshop-client-no-secret`

{{% notice info %}}
Trong workshop này, frontend sẽ gọi trực tiếp đến Cognito để xác thực, vì vậy nên chọn loại `Single-page application (SPA)` để **KHÔNG tạo client secret**, giúp đơn giản hóa khi tích hợp từ frontend hoặc Postman.
{{% /notice %}}

3. Cuộn xuống phần **Configure options**, thiết lập như sau:

- **Sign-in options**: Chọn `Email` để người dùng đăng nhập bằng email.

- Sau đó nhấn **Create user directory** để tạo User Pool.

{{% notice note %}}
Bạn có thể bật thêm xác minh `email`, `phone number` nếu cần.  
Ngoài ra, tại phần **Required attributes for sign-up**, bạn có thể thêm các thuộc tính người dùng như `name`, `birthdate`, `address` để thu thập thêm thông tin.
{{% /notice %}}

4. Sau khi tạo **User Pool** xong, quay lại trang **Cognito**, chọn **User Pool** bạn vừa tạo và vào **App clients** trong **Applications** bạn sẽ tahsya App Client vừa tạo 


6. vào chi tiết App Client vừa tạo và chọn **Edit**.

Trong phần **Authentication flows**, bật:

- **ALLOW_USER_AUTH**:Cho phép chọn nhiều loại flow xác thực.

- **ALLOW_USER_PASSWORD_AUTH**: Cho phép đăng nhập bằng username/password (bắt buộc nếu bạn gọi API từ Postman hoặc frontend).

- **ALLOW_REFRESH_TOKEN_AUTH**:Cho phép lấy refresh_token để gia hạn phiên làm việc.


7. Cuối cùng, cuộn xuống và nhấn **Save changes** để hoàn tất cấu hình.


8. Thiết lập xác minh người dùng thông qua email, Trong userpool đã tạo ở menu trái, chọn vào mục **Sign-up** , Sau đó nhấn nút **Edit** tại phần **Attribute verification and user account confirmation**

9. Trong phần **Edit attribute verification and user account confirmation**, chọn các mục sau:

- **Allow Cognito to automatically send messages to verify and confirm**
- **Send email message, verify email address**
- **Keep original attribute value active when an update is pending – Recommended**

10. Sau đó cuộn xuống và chọn **Save changes**


11. Trong userpool đã tạo ở menu trái, chọn **Message templates** và ở bảng **Message templates**, chọn `Verification message` → nhấn **Edit**

12. Trong phần **Edit verification message** cấu hình như sau:

- **Verification type**: `Code`
- **Email subject**: `Mã xác minh đăng ký tài khoản`
- **Email message**:

```txt
Chào mừng bạn đến với eSHOP-FCJ

Mã xác minh của bạn là: {{####}}  
Mã này sẽ hết hạn trong vòng 5 phút.

Trân trọng,
eShop-FCJ
```