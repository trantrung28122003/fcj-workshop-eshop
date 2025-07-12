---
title : "Thiết lập xác thực Cognito trong API Gateway"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 7.1. </b> "
---


#### Tổng quan

**Amazon Cognito** là dịch vụ quản lý người dùng, giúp xác thực (authentication) và cấp token bảo mật (JWT) cho client truy cập hệ thống. Kết hợp với **API Gateway**, bạn có thể cấu hình xác thực người dùng bằng token JWT mà không cần viết thêm nhiều mã.

#### Nội dung chính

#### **Kích hoạt xác thực cho  các resource**

1. Vào **API Gateway Console** → chọn API `eshop-fcj`. Trong menu bên trái, chọn **Authorizers**. và sau đó chọn **create an authorizer**

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/01.png)

2. Trong trang **Authorizer details** chọn và nhập các thông tin sau:

- **Authorizer details** : `cognito-authorizer-eshop-fcj`

- **Authorizer type** : `Cognito`

- **Cognito user pool** : `<your-user-pool>`

- **Token source** : `Authorization`

- Sau đó chọn **Create authorizer**

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/fetch-02.png)

3. Sau khi tạo **Authorizer** xong, thì **setting** cho từng **method**

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/03.png)

##### Cấu hình cho categories

**Phương thức GET**
1. Chọn **resources categories** với phương thức GET , sau đó chọn Edit

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/04.png)

2. Trong **Edit method request** chọn và nhập các thông tin sau

- **Authorization** : `cognito-authorizer-eshop-fcj`

- Sau đó nhấn **save**

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/05.png)

3. sau khi hoàn thành các method sẽ có kết quả như :

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/06.png)

**Cấu hình xác thực Cognito cho các phương thức còn lại tương tự**

**1. POST /categories**

- Chọn method **POST** sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- Save lại và có kết quả như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/07.png)


**2. GET /categories/{id}**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/09.png)

**3. PUT /categories/{id}**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/10.png)


**4. DELETE /categories/{id}**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/08.png)

##### Cấu hình cho products

**1. POST /products**

- Chọn method **POST** sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- Save lại và có kết quả như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/12.png)


**2. GET /products**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/11.png)


**3. GET /products/{id}**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/14.png)

**4. PUT /products/{id}**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/15.png)


**5. DELETE /products/{id}**

Chọn method GET bên dưới {id}, sau đó chọn **Edit method request**

- Trong mục **Authorization**, chọn: `cognito-authorizer-eshop-fcj`

- **Save** lại và có **kết quả** như hình dưới:

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/13.png)


##### sau khi hoàn thanh kích hoạt xác thực
1. Trong API Gatewate `eshop-fcj`. Trong thanh bên trái, chọn Deploy API.

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/16.png)

2. Trong cửa sổ Deploy API , chọn stage để deloy lại , Và sau đó bấm **Deploy** để hoàn tất

![Ảnh minh họa: Xác thực](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/17.png)