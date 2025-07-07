---
title : "Tạo api gateway"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---


#### Tạo API Gateway

Chúng ta sẽ thiết lập **API Gateway** để tương tác với các Lambda function đã tạo ở phần trước:

1. Mở bảng điều khiển [Amazon API Gateway](https://console.aws.amazon.com/apigateway/home) và chọn **Create an API**

![Ảnh minh họa: Tạo Api Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/01.png)

2. Trong phần **Choose an API type**, cuộn xuống dưới và chọn **REST API**, sau đó bấm **Build**

![Ảnh minh họa: Tạo Api Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/02.png)
3. Trong mục **API details**, nhập các thông tin sau:

    - **Chọn**: `New API`
    - **API name**: `eshop-fcj`
    - **Description (tuỳ chọn)**: `eshop-fcj`
    - **API endpoint type**: `Regional`
    - **IP address type**: `IPv4`

![Ảnh minh họa: Tạo Api Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/03.png)

4, Sau khi chọn **Create API**, thì sẽ kết quả như sau:

![Ảnh minh họa: Tạo Api Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/04.png)
---




