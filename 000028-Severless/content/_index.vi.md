---
title : "Session Management"
date: "2025-06-19" 
weight : 1 
chapter : false
---
# Phát triển ứng dụng Web với kiến trúc Serverless Amazon Web Service

### Tổng quan

Chào mừng bạn đến với workshop "Phát triển ứng dụng Web với kiến trúc Serverless Amazon Web Services". Trong workshop này, bạn sẽ được hướng dẫn chi tiết cách xây dựng một hệ thống ứng dụng web hoàn chỉnh sử dụng các dịch vụ serverless nổi bật trên Amazon Web Services, bao gồm AWS Lambda, API Gateway, Amazon S3, DynamoDB, Amazon Cognito và S3 Static Web Hosting. Hệ thống này giúp người dùng có thể quản lý các sản phẩm và danh mục sản phẩm, đồng thời hỗ trợ upload và xử lý hình ảnh một cách tự động, linh hoạt và hiệu quả.

Chúng ta sẽ bắt đầu bằng cách tìm hiểu tổng quan về kiến trúc serverless, sau đó lần lượt triển khai các thành phần quan trọng như: API Gateway đóng vai trò điều phối, các hàm Lambda đảm nhận xử lý logic nghiệp vụ (CRUD sản phẩm và danh mục, tạo URL upload ảnh, resize ảnh), Amazon S3 lưu trữ hình ảnh gốc và ảnh đã được xử lý, DynamoDB quản lý cơ sở dữ liệu dạng NoSQL cho sản phẩm và danh mục, và cuối cùng là tích hợp Amazon Cognito để quản lý người dùng và phân quyền truy cập an toàn.

Workshop này sẽ giúp bạn làm quen với thực hành thực tế, nắm vững cách thức xây dựng và vận hành ứng dụng serverless một cách bài bản và hiệu quả trên AWS.

![ConnectPrivate](/images/arc-log.png) 

### Nội dung

 1. [Giới thiệu](1-introduce/)
 2. [Các bước chuẩn bị](2-Prerequiste/)
 3. [Tạo kết nối đến máy chủ EC2](3-Accessibilitytoinstance/)
 4. [Quản lý session logs](4-s3log/)
 5. [Port Forwarding](5-Portfwd/)
 6. [Dọn dẹp tài nguyên](6-cleanup/)
