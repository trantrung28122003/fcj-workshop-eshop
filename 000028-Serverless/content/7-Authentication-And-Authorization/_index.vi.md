---
title : "Xác thực và phân quyền"
date :  "`r Sys.Date()`" 
weight : 7
chapter : false
pre : " <b> 7. </b> "
---

#### Tổng quan

Trong hệ thống **Serverless** trên AWS, bảo mật là yếu tố then chốt. Việc **xác thực (authentication)** đảm bảo chỉ người dùng hợp lệ mới có quyền truy cập, trong khi **phân quyền (authorization)** quyết định mức độ truy cập của từng nhóm người dùng.

Giải pháp sử dụng:

- **Amazon Cognito** để quản lý người dùng, xác thực đăng nhập

- **Cognito User Pools Group** để phân nhóm quyền

- **API Gateway** làm lớp bảo vệ trung gian

- **Lambda Authorizer** hoặc **Cognito Authorizer** để kiểm tra token truy cập

#### Nội dung chính

1. [Xác thực người dùng truy cập](7.1-authenticate-with-cognito-api-gateway/)
2. [Phân quyền người dùng](7.2-authorization-with-cognito-groups/)
