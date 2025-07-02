---
title : "Lưu dữ liệu vào DynamoDB"
date :  "`r Sys.Date()`"
weight : 3
chapter : false
pre : " <b> 3. </b> "
---

#### Tổng quan

Sau khi ảnh đã được tải lên và xử lý thành công, bước tiếp theo là **quản lý dữ liệu ứng dụng** – chẳng hạn như **sản phẩm (Product)** và **danh mục (Category)** – bằng cách lưu trữ chúng vào một hệ thống cơ sở dữ liệu.

Trong phần này, bạn sẽ sử dụng **Amazon DynamoDB** – một dịch vụ cơ sở dữ liệu NoSQL được quản lý toàn phần bởi AWS – để lưu trữ và truy vấn dữ liệu hiệu quả, đặc biệt phù hợp cho kiến trúc serverless.

Thông tin sản phẩm và danh mục sẽ bao gồm:

- **Product**: tên, mô tả, giá, **đường dẫn ảnh đã resize**, danh mục,...
- **Category**: tên danh mục, ảnh đại diện,...

#### Mục tiêu

Tạo các bảng DynamoDB cho `Product` và `Category` để lưu trữ dữ liệu của ứng dụng.

---

### Tạo bảng Product trong DynamoDB

1. Truy cập vào [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) và chọn **Create Table** từ ngăn điều hướng.

   ![Ảnh minh họa: nút Create table trong DynamoDB](images/create-table-button.png)

2. Trong trang **Table details**, nhập thông tin:

   - **Table name**: `Product`
   - **Partition key**: `id` (kiểu `string`)
   - Bỏ qua **Sort key** nếu không cần sắp xếp nâng cao.

   ![Ảnh minh họa: nhập thông tin bảng Product](images/product-table-config.png)

3. Trong **Table settings**:

   - Bạn có thể nhấn **Customize settings** để tùy chỉnh một số cấu hình nâng cao như **Table class** và **Capacity mode**.
   - **Table class**: Mặc định là `Standard` – phù hợp cho hầu hết các ứng dụng. Nếu muốn tiết kiệm chi phí hơn cho bảng ít truy cập, có thể chọn `Standard-IA`.
   - **Capacity mode**: Mặc định là `On-demand` – chỉ tính phí theo lượt truy cập thực tế, không cần cấu hình trước. Rất phù hợp với hệ thống mới, MVP, thử nghiệm,...

{{% notice tip %}}
Nếu bạn chỉ muốn tạo bảng nhanh chóng, có thể giữ nguyên các thiết lập mặc định. Các thiết lập này đã được tối ưu cho người mới và phù hợp với đa số ứng dụng thực tế.
{{% /notice %}}

4. Cuối cùng, kéo xuống và nhấn **Create table** để hoàn tất.

---

### Tạo bảng Category trong DynamoDB

Cách tạo bảng `Category` cũng hoàn toàn tương tự như `Product`. Bạn chỉ cần:

1. Truy cập lại **DynamoDB Console** và chọn **Create Table**.

2. Trong phần **Table details**, nhập:
   - **Table name**: `Category`
   - **Partition key**: `id` (kiểu `string`)
   - Bỏ qua **Sort key**

3. Ở phần **Table settings**, có thể chọn **Default settings** nếu không cần thay đổi gì.

4. Nhấn **Create table** để hoàn tất.

---

{{% notice note %}}
**Chế độ On-demand** rất phù hợp với các hệ thống có **lưu lượng truy cập không đều hoặc khó dự đoán**, đặc biệt lý tưởng cho **người mới bắt đầu** hoặc **hệ thống đang thử nghiệm**.  
**Partition key** là **bắt buộc** khi tạo bảng và **không thể thay đổi** sau này.  
Bạn có thể **thêm các chỉ mục phụ** (*Global Secondary Index*) **sau khi bảng đã được tạo**.
{{% /notice %}}
