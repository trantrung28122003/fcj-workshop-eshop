---
title : "Kiểm tra API bằng Postman"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 6.2. </b> "
---

#### Tổng quan

Sau khi đã tạo **User Pool** và **App Client** (loại không có secret), chúng ta có thể kiểm tra các API của Amazon Cognito thông qua Postman như:

- **Đăng ký** người dùng mới (SignUp)
- **Xác minh** mã OTP (ConfirmSignUp)
- **Đăng nhập** và **nhận token** (InitiateAuth)

---

#### Nội dung chính

#### **Chú ý về việc gọi API đến Amazon Cognito**
Amazon Cognito sử dụng endpoint chung theo vùng: `https://cognito-idp.<region>.amazonaws.com/` 
> Ví dụ với Singapore:  https://cognito-idp.ap-southeast-1.amazonaws.com/

Tất cả **request** gửi tới **Cognito** đều cần phân biệt thông qua `ClientId`, đây là **mã định danh duy nhất cho từng App Client** thuộc **User Pool** của bạn.

##### **Cách lấy ClientID**

![Ảnh minh họa: Lấy clientID](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/01.png)

**Cấu hình chung khi gọi API Cognito với HEADER bắt buộc** 

| Key                      | Value                                              |
|--------------------------|----------------------------------------------------|
| `Content-Type`           | `application/x-amz-json-1.1`                       |
| `X-Amz-Target`           | Tên API mà bạn muốn gọi >ví dụ: `AWSCognitoIdentityProviderService.InitiateAuth` ,`AWSCognitoIdentityProviderService.SignUp`|

{{% notice warning %}}
Nếu thiếu `X-Amz-Target` hoặc ghi sai → Cognito sẽ trả về lỗi `UnknownOperationException` hoặc `BadRequest`.
{{% /notice %}}




#### **Đăng ký người dùng (SignUp)**

1. Trong giao diện **postman** nhập các thông tin sau: 

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn **phương thức** `POST` và Nhập URL là `https://cognito-idp.<YOUR-REGION>.amazonaws.com/`
> Thay `<YOUR-REGION>` bằng region thật bạn đang dùng, ví dụ: `ap-southeast-1`

- Trong phần **Header**:

    - **Content-Type**: `application/x-amz-json-1.1`

    - **X-Amz-Target**: `AWSCognitoIdentityProviderService.SignUp`

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/02.png)

2. Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:
```json
{
  "ClientId": "YOUR_APP_CLIENT_ID",
  "Username": "YOUR_USER_NAME",
  "Password": "YOUR_PASS_WORD",
  "UserAttributes": [
    {
      "Name": "email",
      "Value": "YOUR_EMAIL"
    },
    {
      "Name": "name",
      "Value": "YOUR_FULL_NAME"
    }
  ]
}
```

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/03.png)

3. Đợi kết quả trả về ở phần **body** dạng **JSON**.

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/04.png)

4. Kiểm tra tài khoản đã được thêm vào trong **users**.

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/06.png)

- Kiểm tra email mà bạn đã đăng ký. Bạn sẽ nhận được **mã xác minh** (OTP) từ Cognito để tiếp tục xác thực tài khoản ở bước kế tiếp.



#### **Xác minh người dùng (ConfirmSignUp)**

1. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn **phương thức** `POST` và Nhập URL là `https://cognito-idp.<YOUR-REGION>.amazonaws.com/`
> Thay `<YOUR-REGION>` bằng region thật bạn đang dùng, ví dụ: `ap-southeast-1`

- Trong phần **Header**:

    - **Content-Type**: `application/x-amz-json-1.1`

    - **X-Amz-Target**: `AWSCognitoIdentityProviderService.ConfirmSignUp`

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/07.png)



2. Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:
```json
{
  "ClientId": "YOUR_APP_CLIENT_ID",
  "Username": "YOUR_USER_NAME",
  "ConfirmationCode": "YOUR_CODE"
}
```

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/08.png)

3. Đợi kết quả trả về ở phần **body** dạng **JSON** và kết quả trả về kèm theo một **SESSION**

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/09.png)

4. **Kiểm tra tải khoản** đã được **xác thực** hay chưa.

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/10.png)

#### **Xác minh người dùng (InitiateAuth)**

1. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn **phương thức** `POST` và Nhập URL là `https://cognito-idp.<YOUR-REGION>.amazonaws.com/`
> Thay `<YOUR-REGION>` bằng region thật bạn đang dùng, ví dụ: `ap-southeast-1`

- Trong phần **Header**:

    - **Content-Type**: `application/x-amz-json-1.1`

    - **X-Amz-Target**: `AWSCognitoIdentityProviderService.InitiateAuth`

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/11.png)


2. Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:
```json
{
    "ClientId": "YOUR_APP_CLIENT_ID",
    "AuthFlow": "USER_PASSWORD_AUTH",
    "AuthParameters": {
        "USERNAME": "YOUR_USER_NAME",
        "PASSWORD": "YOUR_PASS_WORD"
    }
}
```

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/12.png)

3. Đợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin như: **AccessToken**, **IdToken**, **ExpiresIn**, **RefreshToken**, **TokenType**

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/13.png)