---
title : "Hệ thống quản lý ứng dụng web không máy chủ trên nền tảng AWS"
date :  "`r Sys.Date()`" 
weight : 1 
chapter : false
---
# Hệ thống quản lý ứng dụng web không máy chủ trên nền tảng AWS

#### Tổng quan

Trong kỷ nguyên số hiện nay, việc phát triển và vận hành các ứng dụng web cần đáp ứng nhiều yêu cầu về hiệu năng, chi phí và khả năng mở rộng. Các mô hình truyền thống sử dụng máy chủ vật lý hoặc EC2 thường kéo theo chi phí vận hành cao, độ linh hoạt thấp và yêu cầu kỹ thuật quản trị hệ thống phức tạp. Điều này gây khó khăn cho nhiều doanh nghiệp vừa và nhỏ (SME) trong việc triển khai nhanh các giải pháp phần mềm.

Giải pháp **Serverless trên nền tảng AWS** cho phép xây dựng hệ thống mà không cần quản lý máy chủ, chỉ trả tiền cho tài nguyên thực sự sử dụng. Với kiến trúc này, nhà phát triển có thể tập trung hoàn toàn vào nghiệp vụ, còn việc tự động mở rộng, bảo trì và giám sát được AWS xử lý.

Hệ thống bao gồm các thành phần chính:

- **Amazon API Gateway**: quản lý các endpoint RESTful.
- **AWS Lambda**: xử lý logic nghiệp vụ không cần máy chủ.
- **Amazon DynamoDB**: lưu trữ dữ liệu phi quan hệ hiệu suất cao.
- **Amazon S3**: lưu trữ ảnh gốc và ảnh đã resize.
- **Amazon Cognito**: xác thực, phân quyền và quản lý người dùng.
- **S3 + CloudFront**: triển khai frontend tĩnh, tải nhanh toàn cầu.

Hệ thống được thiết kế để:
- Tiết kiệm chi phí vận hành đến 60–70% so với mô hình EC2.
- Tự động scale theo lưu lượng truy cập thực tế.
- Cung cấp giao diện quản lý sản phẩm linh hoạt, bảo mật.
- Cho phép thao tác upload ảnh nhanh, resize ảnh tự động.

#### Kiến trúc hệ thống Serverless trong Worshop

Dưới đây là sơ đồ kiến trúc tổng thể minh họa cách các thành phần AWS phối hợp trong hệ thống workshop này:

![Sơ đồ kiến trúc](/images/serverless_architecture.png?featherlight=false&width=90pc)

#### Nội dung chính

1. [Giới thiệu](1-introduce/)
2. [Xử lý tải ảnh và tối ưu kích thước ảnh](2-image-upload-and-resize/)
3. [Lưu dữ liệu vào DynamoDB](3-writing-data-to-amazon-dynamodb/)
4. [Triển khai các hàm Lambda](4-deploy-lambda-function/)
5. [Thiết lập API Gateway](5-config-api-gateway/)
6. [Thiết lập cấu hình Cognito UserPool](6-setup-cognito-userpool/)
7. [Xác thực và phân quyền](7-authentication-and-authorization/)
8. [Triển khai Frontend](8-deploy-frontend/)
9. [Kiểm tra kết quả cuối cùng](9-final-result-verification/)
10.[Dọn dẹp tài nguyên](10-clean-up-resources/)
