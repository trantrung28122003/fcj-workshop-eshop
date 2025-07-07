---
title : "Kích hoạt CORS và triển khai API"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 5.3. </b> "
---

#### Tổng quan

Sau khi bạn đã cấu hình các tài nguyên và phương thức cho API Gateway, bước tiếp theo là **kích hoạt CORS (Cross-Origin Resource Sharing)** để cho phép frontend (hoặc các ứng dụng khác) truy cập API từ domain khác, và sau đó **deploy API** để sử dụng thực tế.

---


#### Thêm cài đặt hỗ trợ Binary file cho API

1. Vào **API Gateway Console** , chọn API vừa tạo, ví dụ: `eshop-fcj`.

2. Chọn API Settings ở menu phía bên trái, sau đó chọn **Binary media types** trong **Binary media types**

3. Trong **Binary media types** nhập thông tin:

- **Binary media type** : `multipart/form-data`

4. Cuối cùng, nhấn **Save changes** để hoàn tất

#### Kích hoạt CORS cho từng phương thức

Để cho phép trình duyệt gọi các API từ domain khác (ví dụ từ frontend), bạn cần **bật CORS** cho từng phương thức HTTP (GET, POST, DELETE, v.v).

Thực hiện theo các bước sau cho từng **resource** với các method tương ứng:

##### **Kích hoạt cho resource của product**

1. Vào **API Gateway Console** → chọn API `eshop-fcj`.

2. Trong sidebar bên trái, chọn một `Resource`, ví dụ `/products`.

3. Trong trang **Resource details** → chọn **Enable CORS**.

4. Tại cửa sổ bật lên trong **CORS settings**

- **Access-Control-Allow-Methods**:  chọn các phương thức `GET`, `POST`, và `OPTIONS`

- **Access-Control-Allow-Headers**:  `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`

- **Access-Control-Allow-Origin**:  `*` (cho phép mọi domain truy cập)

5. Nhán **Save** để hoàn tất.

**Tiếp theo là **resource** con của **products** là `{id}`**

7. Trong trang **Resource details** của resource con product là `id` → chọn **Enable CORS**.

8. Tại cửa sổ bật lên trong **CORS settings**

- **Access-Control-Allow-Methods**:  chọn các phương thức `DELETE`, `PUT`, `DELETE` và `OPTIONS`

- **Access-Control-Allow-Headers**:  `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`

- **Access-Control-Allow-Origin**:  `*` (cho phép mọi domain truy cập)

---
#### Thực hiện tương tự kích hoạt cho các tài nguyên với phương thức tương ứng 
| Resource Path      | Access-Control-Allow-Origin   | Access-Control-Allow-Methods                 |
| ------------------ | ------------------------------| ---------------------------------------------|
| `/products`        | `*`                           | Bật CORS với `GET`, `POST`, `OPTIONS`        |
| `/products/{id}`   | `*`                           | Bật CORS với `GET`,`PUT`,`DELETE`, `OPTIONS` |
| `/categories`      | `*`                           | Bật CORS với `GET`,`PUT`,`DELETE`, `OPTIONS` |
| `/categories/{id}` | `*`                           | Bật CORS với `GET`, `POST`, `OPTIONS`        |
| `/upload-image`    | `*`                           | Bật CORS với `POST`, `OPTIONS`               |

{{% notice warning %}}
Bạn cần thực hiện lại các bước trên cho từng resource còn lại theo bảng trên nếu muốn frontend gọi được API đó!
{{% /notice %}}

---

#### Triển khai API Gateway

Sau khi kích hoạt CORS xong, ta cần deploy lại API để áp dụng thay đổi:

1. Vào **API Gateway Console** , chọn API vừa tạo, ví dụ: `eshop-fcj`.

2. Trong thanh bên trái, chọn Deploy API.

3. Trong cửa sổ Deploy API:

- Nếu chưa có stage, nhấn [New Stage] để tạo mới.Nhập các thông tin:

   - **Stage name**: eshop

   - **Deployment description**: Dev environment



3. Bấm **Deploy** để hoàn tất

{{% notice note %}}
Mỗi khi bạn **chỉnh sửa method hoặc resource**, **bắt buộc phải deploy lại API** để áp dụng thay đổi và nhớ chọn đúng stage bạn đã tạo
{{% /notice %}}

---

#### Lấy URL gọi API

Sau khi deploy thành công, bạn sẽ thấy **Invoke URL**, có dạng: 
```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
```

