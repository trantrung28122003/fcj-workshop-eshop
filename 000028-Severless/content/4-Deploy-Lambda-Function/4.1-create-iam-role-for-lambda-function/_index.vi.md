---
title: "Tạo IAM Role cho Lambda Function"
date: "`r Sys.Date()`"
weight: 1
chapter: false
pre: " <b> 4.1. </b> "
---

### Tổng quan

Trước khi triển khai bất kỳ hàm Lambda nào, bạn cần tạo một **IAM Role** – giúp cấp quyền cho hàm Lambda có thể truy cập các dịch vụ AWS khác, chẳng hạn như **đọc/ghi dữ liệu từ DynamoDB**. Tỏng bài này sẽ cấp quyền ****

IAM (Identity and Access Management) hoạt động như một lớp phân quyền, cho phép Lambda hoạt động an toàn trong môi trường AWS của bạn.


### Các bước tạo IAM Role

1. Truy cập vào [IAM Console](https://console.aws.amazon.com/iam/home). Sau đó ,chọn Roles ở menu bên trái.

2. Chọn **Create role**.

3. Trong phần **Trusted entity type**, chọn `AWS service`

4. Ở phần **Use case**, chọn `Lambda`

5. Bấm **Next**.

6. Trong phần **Permissions policies**, tìm và gán quyền `AmazonDynamoDBFullAccess`  
     *(Bạn cũng có thể tạo policy riêng nếu muốn giới hạn quyền chặt chẽ hơn.)*
7. Bấm **Next**, đặt tên cho role, ví dụ: `lambda-dynamodb-role`

8. Bấm **Create role** để hoàn tất.


### Tái sử dụng

IAM Role này có thể dùng lại cho nhiều Lambda function khác nhau thao tác với DynamoDB như:

- Tạo hoặc cập nhật dữ liệu
- Xóa bản ghi
- Truy vấn chi tiết theo ID hoặc lấy danh sách


{{% notice tip %}}
Trong môi trường production, nên sử dụng **nguyên tắc phân quyền tối thiểu** bằng cách tạo IAM policy riêng chỉ cấp quyền cần thiết (ví dụ: `PutItem`, `GetItem`, `DeleteItem`) thay vì dùng `FullAccess`.
{{% /notice %}}
