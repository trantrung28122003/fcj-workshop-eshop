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

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/01.png)

2. Ở màn hình **Set up resources for your application**, trong phần **Define your application**, điền các thông tin:

- **Application type**: `Single-page application (SPA)`

- **Name your application**: `eshop-client-no-secret`

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/02.png)

{{% notice info %}}
Trong workshop này, frontend sẽ gọi trực tiếp đến Cognito để xác thực, vì vậy nên chọn loại `Single-page application (SPA)` để **KHÔNG tạo client secret**, giúp đơn giản hóa khi tích hợp từ frontend hoặc Postman.
{{% /notice %}}


3. Cuộn xuống phần **Configure options**, thiết lập như sau:

- **Sign-in options**: Chọn `Email` để người dùng đăng nhập bằng email.

- Sau đó nhấn **Create user directory** để tạo User Pool.

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/03.png)

{{% notice note %}}
Bạn có thể bật thêm xác minh `email`, `phone number` nếu cần.  
Ngoài ra, tại phần **Required attributes for sign-up**, bạn có thể thêm các thuộc tính người dùng như `name`, `birthdate`, `address` để thu thập thêm thông tin.
{{% /notice %}}

4. Sau khi tạo **User Pool** xong, quay lại trang **Cognito**, chọn **User Pool** bạn vừa tạo và vào **App clients** trong **Applications** bạn sẽ tahsya App Client vừa tạo 

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/04.png)

6. vào chi tiết App Client vừa tạo và chọn **Edit**.

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/05.png)

7. Trong phần **Authentication flows**, bật:

- **ALLOW_USER_AUTH**:Cho phép chọn nhiều loại flow xác thực.

- **ALLOW_USER_PASSWORD_AUTH**: Cho phép đăng nhập bằng username/password (bắt buộc nếu bạn gọi API từ Postman hoặc frontend).

- **ALLOW_REFRESH_TOKEN_AUTH**:Cho phép lấy refresh_token để gia hạn phiên làm việc.

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/06.png)

8. Cuối cùng, cuộn xuống và nhấn **Save changes** để hoàn tất cấu hình.

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/07.png)

9. Thiết lập xác minh người dùng thông qua email, Trong userpool đã tạo ở menu trái, chọn vào mục **Sign-up** , Sau đó nhấn nút **Edit** tại phần **Attribute verification and user account confirmation**

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/08.png)

10. Trong phần **Edit attribute verification and user account confirmation**, chọn các mục sau:

- `Allow Cognito to automatically send messages to verify and confirm - Recommended`

- `Send email message, verify email address`

- `Keep original attribute value active when an update is pending – Recommended`

- Sau đó chọn **Save changes**

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/09.png)


11. Trong userpool đã tạo ở menu trái, chọn **Message templates** và ở bảng **Message templates**, chọn `Verification message` → nhấn **Edit**

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/10.png)

12. Trong phần **Edit verification message** cấu hình như sau:

- **Verification type**: `Code`
- **Email subject**: `Mã xác minh đăng ký tài khoản`
- **Email message**:
```html
<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial,sans-serif; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Logo & Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #06bbcc 0%, #2E86C1 100%); padding: 30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:normal;">
                Chào mừng đến với <strong>eSHOP-FCJ</strong>
              </h1>
            </td>
          </tr>

          <!-- Nội dung chính -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height:1.6;">
              <p>Xin chào <strong>Bạn!</strong>,</p>
              <p>
                Để hoàn tất đăng ký tài khoản, vui lòng nhập mã xác minh bên dưới:
              </p>

              <!-- Button-like code box -->
              <p style="text-align:center; margin: 30px 0;">
                <span style="
                  display:inline-block;
                  background-color:#06bbcc;
                  color:#ffffff;
                  font-size:28px;
                  font-weight:bold;
                  padding:15px 30px;
                  border-radius:6px;
                  border:2px solid #06bbcc;
                  letter-spacing:4px;
                ">
                  {{####}}
                </span>
              </p>

              <p style="color:#7f8c8d; font-size:14px; text-align:center;">
                Mã này sẽ <strong>hết hạn sau 5 phút</strong>.
              </p>

           
              <p style="margin-top:30px;">
                Chúng tôi luôn cam kết bảo vệ thông tin và quyền riêng tư của bạn.
              </p>

              <p style="margin-top:30px;">
                Trân trọng,<br>
                <em>Đội ngũ eSHOP-FCJ</em>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f0f2f5; padding:20px 30px; text-align:center; font-size:12px; color:#95a5a6;">
              © 2024 eSHOP-FCJ.  
              <a href="https://your-domain.com" style="color:#06bbcc; text-decoration:none;">Visit our site</a> |
              <a href="mailto:support@your-domain.com" style="color:#06bbcc; text-decoration:none;">support@eshopfcj.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table><table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial,sans-serif; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          
          <!-- Logo & Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #06bbcc 0%, #2E86C1 100%); padding: 30px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:normal;">
                Chào mừng đến với <strong>eSHOP-FCJ</strong>
              </h1>
            </td>
          </tr>

          <!-- Nội dung chính -->
          <tr>
            <td style="padding: 30px; color: #333333; font-size: 16px; line-height:1.6;">
              <p>Xin chào <strong>Bạn!</strong>,</p>
              <p>
                Để hoàn tất đăng ký tài khoản, vui lòng nhập mã xác minh bên dưới:
              </p>

              <!-- Button-like code box -->
              <p style="text-align:center; margin: 30px 0;">
                <span style="
                  display:inline-block;
                  background-color:#06bbcc;
                  color:#ffffff;
                  font-size:28px;
                  font-weight:bold;
                  padding:15px 30px;
                  border-radius:6px;
                  border:2px solid #06bbcc;
                  letter-spacing:4px;
                ">
                  {{####}}
                </span>
              </p>

              <p style="color:#7f8c8d; font-size:14px; text-align:center;">
                Mã này sẽ <strong>hết hạn sau 5 phút</strong>.
              </p>

           
              <p style="margin-top:30px;">
                Chúng tôi luôn cam kết bảo vệ thông tin và quyền riêng tư của bạn.
              </p>

              <p style="margin-top:30px;">
                Trân trọng,<br>
                <em>Đội ngũ eSHOP-FCJ</em>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f0f2f5; padding:20px 30px; text-align:center; font-size:12px; color:#95a5a6;">
              © 2024 eSHOP-FCJ.  
              <a href="https://your-domain.com" style="color:#06bbcc; text-decoration:none;">Visit our site</a> |
              <a href="mailto:support@your-domain.com" style="color:#06bbcc; text-decoration:none;">support@eshopfcj.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
```

![Ảnh minh họa: Tạo UserPool](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/11.png)