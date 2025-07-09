---
title : "Thiết lập phân quyền Cognito groups"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 7.2. </b> "
---


#### Tổng quan

Cognito hỗ trợ cơ chế **phân quyền người dùng theo nhóm (groups)** thông qua **User Pool Groups**. Khi một người dùng đăng nhập và thuộc một nhóm nhất định, thông tin nhóm đó sẽ được gắn kèm vào **JWT token** (trong claim `cognito:groups`). Từ đó, ta có thể kiểm tra quyền trong backend (Lambda) hoặc tại API Gateway.

#### Nội dung chính

#### **Tạo Cognito User Pool Groups**


1. Truy cập [Amazon Cognito Console](https://console.aws.amazon.com/cognito/home). Chọn **User pools** đã tạo. Vào **Group** và chọn **Create group**

2. Trong **Group information** chọn và nhập các thông tin :

- **Group name** : `admin`

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/02.png)

- Sau đó chọn **Create group**

3. Tạo thêm một group **user** : - **Group name** : `user`

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/03.png)

4. Sau đó hoàn thành tạo 2 group **admin** và **user** thì sẽ thêm người dùng  vào từng nhóm tưng ứng

5. Vào danh sách **users**, sau đó chọn tài khoản thêm vào group

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/03-01.png)

6. Trong trang chi tiết tài khoản, chọn **Add user to group**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/04.png)

7. Sau đó chọn group để thêm tài khoản vào, ví dụ: `user`

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/05.png)

8. Sau khi hoàn thành sẽ có kết quả sau:

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/06.png)

##### Tạo một user admin cho hệ thống và gán cho group admin


1. Mở Postman, thực hiện tạo tài khoản người dùng:

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/07.png)

2. Sau khi tạo xong, truy cập vào User vừa tạo trong AWS Cognito:

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/08.png)

3. Trong tab User attributes, nhấn Edit để xác thực email:

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/09.png)

4. Tích chọn **Mark email as verified**:

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/10.png)

5. Cuối cùng, nhấn Confirm user để kích hoạt tài khoản:

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/11.png)

6. Thêm tài khoản **admin** vào trong group **admin**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/12.png)


#### **Cấu hình kiểm tra quyền theo Cognito Group trong các hàm Lambda**

{{% notice note %}}
Trong các hàm lambda đã tọa trước, giờ cần thêm cấu hình trên AWS console để đọc group từ JWT token trong lambda
{{% /notice %}}

##### **Dưới đây là cấu hình phân quyền từ group thông qua token**

```js
const claims = event.requestContext.authorizer?.jwt?.claims ||  event.requestContext.authorizer?.claims || {};  
  const groups = Array.isArray(claims["cognito:groups"])
    ? claims["cognito:groups"]
    : claims["cognito:groups"]
    ? [claims["cognito:groups"]]
    : [];
if (!groups.includes("admin")) {
  return {
    statusCode: 403,
    body: JSON.stringify({ error: "Bạn không có quyền" }),
  };
}
```

#### Cấu hình phân quyền cho product 

##### **Cấu hình cho hàm create-product-lambda**

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn hàm lambda sẽ cấu hình, ví dụ: `create-product`.


2. Ở màn hình phần code của hàm lambda ta thêm phần **code** ở đầu vào file `index.mjs`, rồi sau đó chọn **deloy**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/18.png)

##### **Cấu hình cho hàm update-product-lambda**

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn hàm lambda sẽ cấu hình, ví dụ: `create-product`.


2. Ở màn hình phần code của hàm lambda ta thêm phần **code** ở đầu vào file `index.mjs`, rồi sau đó chọn **deloy**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/19.png)

##### **Cấu hình cho hàm delete-product-lambda**

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn hàm lambda sẽ cấu hình, ví dụ: `create-product`.


2. Ở màn hình phần code của hàm lambda ta thêm phần **code** ở đầu vào file `index.mjs`, rồi sau đó chọn **deloy**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/20.png)

#### Cấu hình phân quyền cho category 

##### **Cấu hình cho hàm create-category-lambda**

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn hàm lambda sẽ cấu hình, ví dụ: `create-category`.


2. Ở màn hình phần code của hàm lambda ta thêm phần **code** ở đầu vào file `index.mjs`, rồi sau đó chọn **deloy**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/21.png)

##### **Cấu hình cho hàm update-category-lambda**

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn hàm lambda sẽ cấu hình, ví dụ: `update-category`.


2. Ở màn hình phần code của hàm lambda ta thêm phần **code** ở đầu vào file `index.mjs`, rồi sau đó chọn **deloy**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/22.png)

##### **Cấu hình cho hàm delete-category-lambda**

1. Truy cập [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), chọn hàm lambda sẽ cấu hình, ví dụ: `delete-category`.


2. Ở màn hình phần code của hàm lambda ta thêm phần **code** ở đầu vào file `index.mjs`, rồi sau đó chọn **deloy**

![Ảnh minh họa: phân quyền](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/23.png)
