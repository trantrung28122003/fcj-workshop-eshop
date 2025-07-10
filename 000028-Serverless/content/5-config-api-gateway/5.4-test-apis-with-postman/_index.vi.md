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
![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/01-01.png)

2. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn phương thức **`POST`** và Nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước.

- Sau đó nhấn **send** và đợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin như

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/01.png)

3. Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:
```json
{
  "name": "Điện thoại",
  "description": "Các dòng điện thoại thông minh từ nhiều thương hiệu."
}
```

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/02.png)

4. Mở bảng **Category** trong bảng điều khiển của [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) để kiểm tra dữ liệu

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/03.png)

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/04.png)


6. Ngoài ra , có thể kiểm tra thêm cập nhập dữ liệu :

Chọn phương thức **`PUT`** và Nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước và có dạng:

```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}/{id}
```

##### **Kiểm tra API để lấy ra dữ liệu category**

1. Lấy **Invoke URL** trong **Stages** của **API Gateway** vừa tạo  

2. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn phương thức **`GET`** , nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước

- Sau đó nhấn **send** và dợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/05.png)

3. Ngoài ra có thể lấy dữ liệu **category** theo **Id** 

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/05-01.png)

##### **Kiểm tra API để xóa ra dữ liệu category**

1. Lấy **Invoke URL** trong **Stages** của **API Gateway** vừa tạo  

2. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn **phương thức** **`DELETE`** , nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước

- Sau đó nhấn **send** và dợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/06.png)

5. Mở bảng **Category** trong bảng điều khiển của [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) để kiểm tra dữ liệu

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/07.png)




#### Kiểm tra API của tải tệp

##### **Kiểm tra API để ghi lấy ra đường dẫn để tải tệp**

1. Lấy **Invoke URL** trong **Stages** của **API Gateway** vừa tạo và **URL** thường có dạng : 

```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
```
![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/01-01.png)

2. Trong giao diện **postman** nhập các thông tin sau

- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn phương thức **`POST`** và Nhập URL là **Invoke URL** từ API Gateway đã tạo ở bước trước.

- Sau đó nhấn **send** và đợi kết quả trả về ở phần **body** dạng **JSON** chứa các thông tin như

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/08.png)

3. Tiếp theo chuyển sang mục **body**, sau đó chọn **raw** và sao chép đoạn dưới đây bỏ vào:
```json
{
  "fileName": "example.jpg",
  "fileType": "image/jpeg"
}
```
{{% notice note %}}
Vì đang kiểm tra trên postman nên bạn nđiền đúng tên ảnh và thể loại ảnh bạn muốn tải lên
{{% /notice %}}



4. Trong giao diện **postman** nhập các thông tin sau
- chọn **Create new requets**,  dấu + trên màn hình 

- Chọn phương thức **`PUT`** và Nhập URL là **Invoke URL** từ API được tạo wor bước trước

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/09.png)

5. Tiếp theo chuyển sang mục **body**, sau đó chọn **binary** và sao chép đoạn dưới đây bỏ vào:
```json
{
  "fileName": "example.jpg",
  "fileType": "image/jpeg"
}
```
![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/10.png)

{{% notice note %}}
Nhớ cọn ảnh đúng tên và thể loại cảu tệp ảnh đó nha
{{% /notice %}}

6. Sau khi chọn **send** bạn cso thểm xem kết quả từ hai bucket:

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/13.png)

![Ảnh minh họa: gọi API](/images/5-config-api-gateway/5.4-test-apis-with-postman/15.png)