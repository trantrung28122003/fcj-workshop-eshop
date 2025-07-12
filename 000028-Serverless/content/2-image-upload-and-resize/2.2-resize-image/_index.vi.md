---
title : "Xử lý tối ưu kích thước ảnh"
date :  "`r Sys.Date()`" 
weight : 2 
chapter : false
pre : " <b> 2.2. </b> "
---

#### Tổng quan

Sau khi ảnh gốc được tải lên thành công vào S3, bước tiếp theo là **tự động tối ưu hóa ảnh (resize)** để giảm dung lượng và phục vụ frontend hiệu quả hơn.

Thay vì để frontend tự xử lý ảnh (gây chậm, thiếu nhất quán và không bảo mật), ta sẽ để backend đảm nhận công việc này một cách **tự động, nhất quán và có kiểm soát**, bằng cách sử dụng **AWS Lambda kết hợp với S3 Event Trigger**.

Trong phần này, bạn sẽ triển khai một Lambda function với các nhiệm vụ:

- **Lắng nghe sự kiện từ S3** (khi có ảnh mới được upload)
- **Tải ảnh gốc**, resize ảnh bằng thư viện `sharp`
- **Lưu ảnh đã resize** vào một S3 bucket khác

Cách làm này giúp:

- Đảm bảo frontend luôn hiển thị ảnh với kích thước tối ưu
- Tăng tốc độ tải trang, cải thiện trải nghiệm người dùng
- Giảm chi phí lưu trữ và truyền tải dữ liệu (bandwidth)

---
#### Nội dung chính


1. [Tạo S3 Buckets](2.2.1-create-s3-buckets/)
2. [Tạo IAM Role](2.2.2-create-iam-role/)
3. [Tạo hàm Lambda Resize](2.2.3-create-resize-lambda-function/)