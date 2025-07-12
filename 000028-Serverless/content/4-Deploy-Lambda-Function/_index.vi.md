---
title : "Triển khai các hàm Lambda"
date :  "r Sys.Date()" 
weight : 4
chapter : false
pre : " <b> 4. </b> "
---

#### Tổng quan

Sau khi đã thiết lập hệ thống lưu trữ dữ liệu bằng DynamoDB, bước tiếp theo là xây dựng các hàm **AWS Lambda** để xử lý các nghiệp vụ chính của ứng dụng. Mỗi hàm sẽ tương ứng với một hành động thao tác dữ liệu như tạo, cập nhật, xoá, hoặc lấy thông tin từ cơ sở dữ liệu.

Lambda là một dịch vụ điện toán serverless do AWS cung cấp, cho phép bạn chạy mã mà **không cần quản lý máy chủ**. Bạn chỉ cần tập trung viết logic, còn việc tự động scale, chạy đúng lúc và tính phí theo số lần gọi sẽ do Lambda đảm nhiệm.


#### Vai trò của các hàm Lambda

Trong hệ thống này, ta sẽ triển khai ba loại hàm Lambda cơ bản:

- **Hàm tạo/cập nhật dữ liệu**: thêm mới hoặc cập nhật thông tin sản phẩm và danh mục vào DynamoDB.
- **Hàm xoá dữ liệu**: xoá cứng hoặc xoá mềm bản ghi khỏi cơ sở dữ liệu.
- **Hàm lấy dữ liệu**: lấy thông tin chi tiết theo id, hoặc lấy danh sách để hiển thị trong ứng dụng.

Những hàm này có thể được tích hợp vào **API Gateway** để tạo thành API RESTful hoặc gắn với các sự kiện khác (ví dụ: upload ảnh thành công từ S3, người dùng thao tác,...).

---


#### Chuẩn bị: Tạo IAM Role cho Lambda


Trước khi tạo các hàm Lambda, bạn cần một IAM Role để cấp quyền truy cập DynamoDB. Đây là bước **bắt buộc** để Lambda có thể thao tác dữ liệu. Thực hiện như sau:

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home#/roles) → mục **Roles** → nhấn **Create role**.
2. Ở phần **Trusted entity type**, chọn: `AWS service`.
3. Ở mục **Use case**, chọn: `Lambda`.
4. Bấm **Next** và gán quyền:
   - Tìm và chọn policy: `AmazonDynamoDBFullAccess` *(hoặc custom policy nếu muốn giới hạn quyền)*.
5. Đặt tên Role, ví dụ: `lambda-dynamodb-role`.
6. Bấm **Create role**.


---
#### Các bước chính

1. [Tạo IAM Role cho Lambda Function](4.1-create-iam-role-for-lambda-function/)
2. [Hàm Lambda tạo hoặc cập nhập dữ liệu](4.2-create-or-update-lambda-function/)
3. [Hàm Lambda xóa dữ liệu](4.3-delete-lambda-function/)
4. [Hàm Lambda lấy dữ liệu](4.4-get-lambda-function/)