# Workshop: Xây dựng hệ thống quản lý sản phẩm với AWS Serverless

## Tổng quan

Workshop này hướng dẫn bạn từng bước triển khai một hệ thống quản lý sản phẩm dựa trên kiến trúc **Serverless của AWS**. Mô hình này giúp xây dựng ứng dụng web mà **không cần quản lý máy chủ**, tận dụng các dịch vụ như Lambda, API Gateway, S3, DynamoDB và Cognito để đảm bảo tính **linh hoạt**, **tự động mở rộng** và **chi phí thấp**.

Người dùng có thể:
- Đăng ký / đăng nhập bằng Amazon Cognito
- Thêm / sửa / xoá sản phẩm và danh mục (chức năng CRUD)
- Upload ảnh sản phẩm, tự động resize bằng Lambda
- Truy cập website frontend được triển khai qua S3 + CloudFront

## Dịch vụ sử dụng

- **Amazon API Gateway** – tạo các endpoint RESTful
- **AWS Lambda** – xử lý logic nghiệp vụ (Node.js 22.x)
- **Amazon S3** – lưu trữ ảnh tĩnh & frontend
- **Amazon DynamoDB** – lưu dữ liệu phi quan hệ
- **Amazon Cognito** – xác thực người dùng & phân quyền
- **Amazon CloudFront** – phân phối nội dung frontend toàn cầu

## Kết quả đạt được

- Một hệ thống quản lý sản phẩm đơn giản nhưng đầy đủ chức năng
- Kiến thức thực tế về cách xây dựng kiến trúc Serverless
- Thực hành tích hợp frontend, backend và bảo mật với AWS

> Phù hợp cho người học AWS, sinh viên CNTT, lập trình viên backend/frontend muốn tiếp cận kiến trúc không máy chủ.

---

> Xem hướng dẫn chi tiết từng bước tại thư mục dự án hoặc file `.md` tương ứng trong workshop.
