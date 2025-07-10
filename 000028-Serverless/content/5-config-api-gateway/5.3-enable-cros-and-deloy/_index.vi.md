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

![Ảnh minh họa: Cài đặt hỗ trợ Binary file](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01-01.png)

2. Chọn API Settings ở menu phía bên trái, sau đó chọn **Binary media types** trong **Binary media types**

![Ảnh minh họa: Cài đặt hỗ trợ Binary file](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01.png)

3. Trong **Binary media types** nhập thông tin:

- **Binary media type** : `multipart/form-data`

- Cuối cùng, nhấn **Save changes** để hoàn tất

![Ảnh minh họa: Cài đặt hỗ trợ Binary file](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/02.png)

4. Sau khio hoàn tất , sẽ hiện phần **multipart/form-data** ở Binary media type

![Ảnh minh họa: Cài đặt hỗ trợ Binary file](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/03.png)

#### Kích hoạt CORS cho từng phương thức

Để cho phép trình duyệt gọi các API từ domain khác (ví dụ từ frontend), bạn cần **bật CORS** cho từng phương thức HTTP (GET, POST, DELETE, v.v).

Thực hiện theo các bước sau cho từng **resource** với các method tương ứng:

##### **Kích hoạt cho resource của product**

1. Vào **API Gateway Console** → chọn API `eshop-fcj`.

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01-01.png)

2. Trong sidebar bên trái, chọn một `Resource`, ví dụ `/products`. Trong trang **Resource details** → chọn **Enable CORS**.

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/04.png)

3. Tại cửa sổ bật lên trong **CORS settings**

- **Access-Control-Allow-Methods**:  chọn các phương thức `GET`, `POST`, và `OPTIONS`

- **Access-Control-Allow-Headers**:  `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`

- **Access-Control-Allow-Origin**:  `*` (cho phép mọi domain truy cập)

- Chọn **Save** để hoàn tất.

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/05.png)

##### **Tiếp theo là **resource** con của **products** là `{id}`**

4. Trong trang **Resource details** của resource con product là `id` → chọn **Enable CORS**.

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/06.png)

5. Tại cửa sổ bật lên trong **CORS settings**

- **Access-Control-Allow-Methods**:  chọn các phương thức `DELETE`, `PUT`, `DELETE` và `OPTIONS`

- **Access-Control-Allow-Headers**:  `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`

- **Access-Control-Allow-Origin**:  `*` (cho phép mọi domain truy cập)

- Chọn **Save** để hoàn tất.

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/07.png)

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

#### Sau khi hoàn thành hết tất cả sẽ có kết quả như ảnh

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/08.png)

{{% notice info %}}
Sau khi bật **CORS** cho phương thức (ví dụ `GET`, `POST`, ...) tại các **endpoint**. AWS tự động tạo method **`OPTIONS`** tương ứng.Nhờ đó, frontend có thể gửi request từ domain khác mà không bị lỗi **CORS**.  
{{% /notice %}}


---

#### Triển khai API Gateway

Sau khi kích hoạt CORS xong, ta cần deploy lại API để áp dụng thay đổi:

1. Vào **API Gateway Console** , chọn API vừa tạo, ví dụ: `eshop-fcj`.

![Ảnh minh họa: Kích hoạt CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01-01.png)

2. Trong thanh bên trái, chọn **Deploy API.**

![Ảnh minh họa: riển khai API Gateway](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/09.png)

3. Trong cửa sổ **Deploy API**: Nếu chưa có **stage**, nhấn **[New Stage]** để tạo mới.

![Ảnh minh họa: riển khai API Gateway](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/10.png)

4. Nhập các thông tin sau: 

- **Stage name**: eshop

- **Deployment description**: Dev environment

- Chọn **Deploy** để hoàn tất

![Ảnh minh họa: riển khai API Gateway](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/11.png)

Sau khi triển khai xong sẽ có kết quả như hình ảnh:

![Ảnh minh họa: riển khai API Gateway](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/12.png)

{{% notice note %}}
Mỗi khi bạn **chỉnh sửa method hoặc resource**, **bắt buộc phải deploy lại API** để áp dụng thay đổi và nhớ chọn đúng stage bạn đã tạo
{{% /notice %}}

---

#### Lấy URL gọi API

Sau khi deploy thành công, bạn sẽ thấy **Invoke URL**, có dạng: 
```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
```

