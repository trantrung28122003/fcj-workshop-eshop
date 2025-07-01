---
title : "Tạo IAM Role"
date :  "`r Sys.Date()`" 
weight : 2 
chapter : false
pre : " <b> 2.2 </b> "
---


Trong bước này chúng ta sẽ tiến hành tạo các IAM Role. Với mỗi role sẽ gán policy phù hợp để Lambda có thể truy cập DynamoDB hoặc S3.

### Tạo Role cho lambda product và lambda category
Trong IAM Role này sẽ được gán policy **AmazonDynamoDBFullAccess**, đây là policy cho phép tất cả API có thể giao tiếp với DynamoDB.

1. Truy cập vào [giao diện quản trị dịch vụ IAM](https://console.aws.amazon.com/iamv2/)
2. Ở thanh điều hướng bên trái, click  **Roles**.  

![role](/images/2.prerequisite/038-iamrole.png)

3. Click **Create role**.  

![role1](/images/2.prerequisite/039-iamrole.png)

4. Click **AWS service** và click **Lambda**. 
  + Click **Next**.  

![role1](/images/2.prerequisite/040-iamrole.png)

5. Trong ô Search, điền **AmazonDynamoDBFullAccess** và ấn phím Enter để tìm kiếm policy này.
  + Click chọn policy **AmazonDynamoDBFullAccess**.
  + Click **Next**

![createpolicy](/images/2.prerequisite/041-iamrole.png)

6. Click **Next: Review**.
7. Đặt tên cho Role là **SSM-Role** ở Role Name 

  + Click **Create Role**

![namerole](/images/2.prerequisite/042-iamrole.png)

Tiếp theo chúng ta sẽ thực hiện kết nối đến các máy chủ EC2 chúng ta đã tạo bằng **Session Manager**.