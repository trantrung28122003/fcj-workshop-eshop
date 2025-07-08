---
title : "Kiểm tra các API bằng Postman"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 5.4. </b> "
---

#### Tổng quan

Sau khi đã **triển khai API Gateway** và có **Invoke URL**, bạn có thể sử dụng **Postman** để kiểm tra các API như tạo sản phẩm, lấy danh sách, xóa sản phẩm, upload ảnh, v.v.


#### Sử dụng postman để kiểm tra API
Truy cập và sử dụng **postman**, bạn có thể sử dụng Postman theo một trong hai cách sau:

- Dùng Postman bản web: [Trình duyệt POSTMAN](https://www.postman.com)  

- Hoặc tải ứng dụng tại: [Ứng dụng POSTMAN](https://www.postman.com/downloads/)

#### Kiểm tra API của category

##### **Kiểm tra API để ghi dữ liệu category**

1. Lấy **Invoke URL** trong **Stages** của **API Gateway** vừa tạo và **URL** thường có dạng : 
```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
```

2. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn **phương thức** `POST` và Nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước

3. Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:
```json
{
    "name": "Computer",
    "description": "các linh kiện máy tính để bàn"
}
```

4. Sau đó nhấn **send** và đợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin như

5. Mở bảng **Category** trong bảng điều khiển của [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) để kiểm tra dữ liệu


##### **Kiểm tra API để lấy ra dữ liệu category**

1. Lấy **Invoke URL** trong **Stages** của **API Gateway** vừa tạo  

2. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn **phương thức** `GET` , nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước

4. Sau đó nhấn **send** và dợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin

5. Mở bảng **Category** trong bảng điều khiển của [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) để kiểm tra dữ liệu

Thường URL request có dạng 
```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}/{id-category}
```

##### **Kiểm tra API để xóa ra dữ liệu category**




