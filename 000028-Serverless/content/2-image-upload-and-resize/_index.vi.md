---
title : "Xử lý tải ảnh và tối ưu kích thước ảnh"
date :  "`r Sys.Date()`" 
weight : 2 
chapter : false
pre : " <b> 2. </b> "
---

#### Tổng quan

Xử lý ảnh là một nhu cầu phổ biến trong các hệ thống hiện đại như mạng xã hội, thương mại điện tử, quản lý hồ sơ người dùng,...

Tuy nhiên, để ảnh được upload **an toàn**, và sau đó **tự động được xử lý, giảm kích thước**, hệ thống cần có:

- Quy trình không qua backend trung gian (giảm tải)
- Xử lý tự động bằng **S3 Event Trigger + AWS Lambda**
- Phân tách ảnh gốc và ảnh đã xử lý

Trong chương này, bạn sẽ thiết lập một quy trình hoàn chỉnh cho việc **tải ảnh từ client và xử lý ảnh tự động bằng AWS**. Cụ thể:

- Ảnh được **tải trực tiếp từ frontend** lên S3 bằng **Presigned URL**
- Khi ảnh được upload thành công, **S3 sẽ kích hoạt Lambda Function**
- Lambda sẽ **resize ảnh** và lưu vào một bucket khác
- Ảnh resize sẽ được dùng để hiển thị trong frontend với kích thước và dung lượng tối ưu


#### Mục tiêu

- Tạo cơ chế cho client (web/mobile) upload ảnh trực tiếp bằng **Presigned URL**
- Tự động resize ảnh sau khi upload bằng **Lambda Function + Sharp**
- Lưu ảnh resize vào bucket đích sẵn sàng dùng trong frontend

---
#### Các bước chính

1. [Xử lý tải ảnh gốc](2.1-upload-original-image/)
2. [Xử lý tối ưu kích thước ảnh](2.2-resize-image/)