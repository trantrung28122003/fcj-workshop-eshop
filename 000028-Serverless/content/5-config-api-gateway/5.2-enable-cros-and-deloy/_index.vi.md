---
title : "Kích hoạt CORS và triển khai API"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 5.2. </b> "
---

#### Tổng quan

Sau khi bạn đã cấu hình các tài nguyên và phương thức cho API Gateway, bước tiếp theo là **kích hoạt CORS (Cross-Origin Resource Sharing)** để cho phép frontend (hoặc các ứng dụng khác) truy cập API từ domain khác, và sau đó **deploy API** để sử dụng thực tế.

---

#### Kích hoạt CORS cho từng phương thức

Để cho phép trình duyệt gọi các API từ domain khác (ví dụ từ frontend), bạn cần **bật CORS** cho từng phương thức HTTP (GET, POST, DELETE, v.v).

Thực hiện theo các bước sau cho từng **method** của **resource**:

1. Vào **API Gateway Console** → chọn API `eshop-fcj`.

2. Trong sidebar bên trái, chọn một `Resource`, ví dụ `/products`.

3. Chọn một phương thức (ví dụ `POST`) → click chuột vào nó.

4. Trong trang cấu hình của phương thức → chọn **Actions** → **Enable CORS**.

5. Tại cửa sổ bật lên:

   - Xác nhận các giá trị mặc định như:

     - **Access-Control-Allow-Headers**:  
       `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`

     - **Access-Control-Allow-Methods**:  
       Chứa các phương thức bạn định hỗ trợ: `GET,POST,DELETE,...`

     - **Access-Control-Allow-Origin**:  
       `*` (cho phép mọi domain truy cập)

6. Chọn **Enable CORS and replace existing CORS headers**.

7. Bấm **Yes, replace existing values** để xác nhận.

8. Cuối cùng, **Save** lại để hoàn tất.

{{% notice warning %}}
Bạn cần thực hiện lại các bước trên cho **mỗi phương thức** (`POST`, `GET`, `DELETE`, v.v) của từng resource nếu muốn frontend gọi được API đó!
{{% /notice %}}

---

### 🚀 Deploy API

Sau khi kích hoạt CORS xong, ta cần deploy lại API để áp dụng thay đổi:

1. Trên thanh menu **Actions** (góc trên cùng), chọn **Deploy API**

2. Nếu chưa có stage nào, tạo mới:

   - **Deployment stage name**: `dev`
   - **Stage description**: `Dev environment`

3. Bấm **Deploy**

{{% notice note %}}
Mỗi khi bạn **chỉnh sửa method hoặc resource**, **bắt buộc phải deploy lại API** để áp dụng thay đổi.
{{% /notice %}}

---

### 🔗 Lấy URL gọi API

Sau khi deploy thành công, bạn sẽ thấy **Invoke URL**, có dạng:

