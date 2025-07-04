---
title : "Kiểm tra các API bằng Postman"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 5.3. </b> "
---

#### Tổng quan

Sau khi đã **triển khai API Gateway** và có **Invoke URL**, bạn có thể sử dụng **Postman** để kiểm tra các API như tạo sản phẩm, lấy danh sách, xóa sản phẩm, upload ảnh, v.v.

#### Kiểm tra API của category

##### **Kiểm tra API để ghi dữ liệu category**

1. Truy cập và sử dụng **postman**, bạn có thể sử dụng Postman theo một trong hai cách sau:
- Dùng Postman bản web: [Trình duyệt POSTMAN](https://www.postman.com)  

- Hoặc tải ứng dụng tại: [Ứng dụng POSTMAN](https://www.postman.com/downloads/)

2. Trong giao diện **postman** :

- chọn **Create new requets** dấu + trên màn hình

- Chọn **phương thức** `POST` và Nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước

- Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:

```json
123123123
```

- Rồi chọn nút **send**

3. Kết quả sẽ trả về tạo category thành công

4. Mở bảng **Category** trong bảng điều khiển của [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) để kiểm tra dữ liệu


##### **Kiểm tra API để lấy ra dữ liệu category**

1. Trong giao diện **postman** :

- chọn **Create new requets** dấu + trên màn hình

- Chọn **phương thức** `GET` và Nhập **InvokURL** của GET API từ API Gateway được tạo từ bước trước

- Rồi chọn nút **send**

2. Kết quả sẽ trả về là toàn bộ dữ liệu của bảng category đã qua xử lý


3.Ngoài ra, bạn có thể lấy dữ liệu của một Category cụ thể bằng cách thêm ID vào cuối đường dẫn.

- Chọn **phương thức** `GET` và Nhập **InvokURL** của GET API từ API Gateway được tạo từ bước trước + `/<id-của-category>`

Thường URL request có dạng 
```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}/{id-category}
```

##### **Kiểm tra API để xóa ra dữ liệu category**




