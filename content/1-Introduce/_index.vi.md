---
title  : "Giới thiệu"
date   : "`r Sys.Date()`"
weight : 1
chapter: false
pre    : " <b> 1. </b>"
---

### Tổng quan về kiến trúc Serverless
**Serverless** là mô hình điện toán đám mây cho phép bạn chạy ứng dụng **mà không phải quản lý máy chủ, hệ điều hành hay cơ sở hạ tầng**. Amazon Web Services tự động đảm nhận việc:
- **Cung cấp tài nguyên tính toán** khi có yêu cầu hoặc sự kiện  
- **Tự động mở rộng** để đáp ứng mọi khối lượng yêu cầu, từ một đến hàng ngàn  
- **Tắt tài nguyên không sử dụng** để tiết kiệm chi phí  
- **Bảo trì phần cứng và vá bảo mật**

**Lợi ích khi dùng Serverless**
- **Giảm gánh nặng vận hành**: không cần quản lý máy chủ hay cấu hình auto-scaling  
- **Triển khai nhanh hơn**: cập nhật code và deploy ngay lập tức  
- **Tính phí theo mức sử dụng**: chỉ trả cho số lần gọi và thời gian thực thi (ms), cộng phí lưu trữ theo đơn vị read/write và GB-tháng  
- **Kiến trúc phản ứng sự kiện**: dễ dàng tích hợp với S3, DynamoDB Streams và API Gateway

**Tham khảo:** [Tổng quan về Serverless của AWS](https://aws.amazon.com/serverless/)

---

### Các dịch vụ sử dụng trong Workshop này

#### AWS Lambda  
- Dịch vụ **tính toán serverless** chạy mã của bạn theo sự kiện (event-driven).  
- **Tự động mở rộng** theo số sự kiện; chỉ trả phí cho số lần gọi và thời gian thực thi (ms).  
- **Hỗ trợ nhiều ngôn ngữ** (Node.js, Python, C#, Java, Go…) và cho phép đóng gói dependencies dưới dạng deployment package hoặc container image.  
- **Tích hợp sẵn** với các dịch vụ AWS khác (S3, DynamoDB, Kinesis, SNS, SQS, API Gateway…).  
- **Hỗ trợ versioning và alias** để triển khai blue/green hoặc canary deployments.  

**Tài liệu:** [Hướng dẫn nhà phát triển AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/)

#### Amazon API Gateway  
- Dịch vụ **fully managed** cho phép tạo, xuất bản, bảo mật và giám sát API RESTful hoặc WebSocket.  
- Hỗ trợ hai loại API: **REST APIs** (nhiều tính năng) và **HTTP APIs** (độ trễ thấp, chi phí thấp).  
- Cung cấp **mapping templates** để biến đổi payload của request/response, tích hợp với Lambda, HTTP endpoint hoặc VPC Link.  
- Hỗ trợ sẵn **CORS**, **throttling**, **caching** và **AWS WAF** để bảo vệ API.  
- Hỗ trợ **xác thực** qua Cognito User Pools, IAM roles hoặc custom Lambda authorizer.  

**Tài liệu:** [Hướng dẫn Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/)

#### Amazon S3  
- **Lưu trữ đối tượng** bền vững (99.999999999%) với khả năng mở rộng gần như vô hạn.  
- Nhiều **lớp lưu trữ** (Standard, Intelligent-Tiering, Infrequent Access, Glacier) để tối ưu chi phí.  
- Hỗ trợ **versioning**, **lifecycle policies** (tự động xóa hoặc chuyển đổi) và **event notifications**.  
- Đảm bảo **read-after-write consistency** cho PUT mới và **eventual consistency** cho overwrite/DELETE.  
- Phù hợp lưu trữ **tệp tĩnh**, **backup**, **log**, **file media** và **big data**.  

**Tài liệu:** [Hướng dẫn người dùng Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)

#### Amazon DynamoDB  
- Cơ sở dữ liệu **NoSQL** key-value/document fully managed, độ trễ mili-giây.  
- **Tự động mở rộng throughput** (Read/Write Capacity Units) và dung lượng lưu trữ theo nhu cầu.  
- Hỗ trợ **eventual consistency** (mặc định) và **strong consistency** (tùy chọn).  
- Cung cấp **DynamoDB Streams**, **TTL** và **Transactions (ACID)**.  
- **Kiến trúc phân tán** theo partition key, đảm bảo khả năng mở rộng và độ ổn định cao.  

**Tài liệu:** [Hướng dẫn Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)

#### S3 Static Website Hosting  
- Host **website tĩnh** (HTML, CSS, JavaScript) trực tiếp từ bucket S3.  
- Cấu hình bucket làm **website endpoint** (ví dụ `http://<bucket-name>.s3-website-<region>.amazonaws.com`).  
- Hỗ trợ **custom domain** qua Amazon Route 53 và **HTTPS** qua CloudFront.  
- Phù hợp cho **SPA**, **landing page** và **tài liệu tĩnh**.  

**Tài liệu:** [Hosting Static Website trên Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

#### Amazon Cognito  
- Dịch vụ **xác thực và ủy quyền** cho web và mobile apps.  
- **User Pools:** thư mục người dùng với API đăng ký/đăng nhập, MFA và social identity providers.  
- **Identity Pools (Federated Identities):** cung cấp credentials tạm thời cho người dùng đã xác thực qua User Pools, social provider hoặc SAML/OIDC.  
- Hỗ trợ **OAuth 2.0**, **OpenID Connect** và **JWT tokens** để bảo vệ API Gateway và backend.  
- Tích hợp với **Lambda triggers** để tùy chỉnh quy trình (ví dụ: trước/sau xác thực, xác minh email/phone).  

**Tài liệu:** [Hướng dẫn Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/)
