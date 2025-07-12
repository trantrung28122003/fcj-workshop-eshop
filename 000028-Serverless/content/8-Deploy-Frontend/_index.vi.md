---
title : "Triển khai Frontend"
date :  "`r Sys.Date()`" 
weight : 8
chapter : false
pre : " <b> 8. </b> "
---

#### Tổng quan
Tiếp theo, triển khai **frontend** (giao diện người dùng) của ứng dụng web hiện đại lên **AWS S3 và CloudFront**, đảm bảo người dùng cuối có thể truy cập thông qua Internet với tốc độ nhanh, bảo mật và ổn định.

Ứng dụng **frontend** ở đây thường là S**ingle Page Application (SPA)** được xây dựng bằng **React**, **Angular** hoặc **Vue**. Sau khi build hoàn tất, mã nguồn tĩnh sẽ được upload lên S3 và sử dụng CloudFront làm CDN để phân phối nội dung hiệu quả toàn cầu.

#### Nội dung chính

#### Tạo bucket để tải file web lên

1. Truy cập vào [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) và nhấn nút **Create bucket**.

![Ảnh minh họa: Tạo S3 bucket](/images/8-Deploy-Frontend/01.png)

2. Tại phần **General configuration**, nhập các thông tin sau:

- **AWS Region**: Nên chọn một khu vực AWS duy nhất để triển khai toàn bộ kiến trúc (Lambda, S3, DynamoDB,...) nhằm giảm độ trễ và đơn giản hóa cấu hình phân quyền(ví dụ: Asia Pacific (Singapore) ap-southeast-1)

- **Bucket type**: General purpose (mặc định)

- **Bucket name**: `fe-easyshop-fcj`

![Ảnh minh họa: Tạo S3 bucket](/images/8-Deploy-Frontend/02.png)

{{% notice info %}}
  **Lưu ý**: Tên bucket phải là **duy nhất trên toàn cầu** và **không chứa khoảng trắng hoặc ký tự đặc biệt**.
{{% /notice %}}

3. Ở phần **Block Public Access settings**,

- Bỏ chọn **Block all public access**

- Đánh dấu vào ô **I acknowledge that the current settings might result in this bucket and the objects within becoming public**.

![Ảnh minh họa: Tạo S3 bucket](/images/8-Deploy-Frontend/03.png)

4. Cuối cùng, cuộn xuống và nhấn **Create bucket** để hoàn tất.

![Ảnh minh họa: Tạo S3 bucket](/images/8-Deploy-Frontend/04.png)

#### Tải các tệp lên S3
##### **Tải các tệp lên S3**
1. Truy cập vào bucket bạn đã tạo (ví dụ: fe-easyshop-fcj) trong AWS S3 Console.

![Ảnh minh họa: Tải tệp lên s3](/images/8-Deploy-Frontend/05.png)

2. Trong trang chi tiết của s3, chọn Upload

![Ảnh minh họa: Tải tệp lên s3](/images/8-Deploy-Frontend/06.png)

3. Trong phần **upload** mình sẽ thêm **hai file** và **một thư mục** sau khi ta **buid** ở bước trên

- File index.html và các file gốc (ví dụ: vite.svg, favicon.ico) từ thư mục dist.

![Ảnh minh họa: Tải tệp lên s3](/images/8-Deploy-Frontend/07.png)

- Toàn bộ thư mục assets/ hoặc các thư mục con chứa mã tĩnh (CSS, JS, images).
![Ảnh minh họa: Tải tệp lên s3](/images/8-Deploy-Frontend/08.png)

{{% notice info %}}
Không upload cả thư mục **dist**, mà chỉ upload nội dung bên trong nó (giữ đúng cấu trúc gốc). Và đảm bảo file **index.html** nằm ở gốc **bucket**, không nằm trong thư mục con.
{{% /notice %}}

4. Nhấn Upload để hoàn tất. và kết quả sẽ có như hình sau :

![Ảnh minh họa: Tải tệp lên s3](/images/8-Deploy-Frontend/09.png)


##### **cấu hình Bucket Policy**
Sau khi upload xong, cần cấu hình Bucket Policy để cho phép truy cập công khai từ trình duyệt (từ mọi domain).

1. trong phần thong tin s3,  Chọn tab Permissions

![Ảnh minh họa: cấu hình polict cho s3](/images/8-Deploy-Frontend/10.png)

2. Cuộn xuống phần **Bucket policy**, nhấn **Edit**

![Ảnh minh họa: cấu hình polict cho s3](/images/8-Deploy-Frontend/11.png)

3. Dán đoạn JSON sau vào khung editor:
````json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
````
![Ảnh minh họa: cấu hình polict cho s3](/images/8-Deploy-Frontend/12.png)
##### **Cấu hình Static Website Hosting**

Sau khi tải tệp và cấu hình **policy** , bạn cần bật chế độ **Static website hosting** cho bucket.

1. Trong trang chi tiết của bucket, chọn tab Properties.



2. Cuộn xuống phần Static website hosting, bấm vào Edit.



3. Trong **Edit static website hosting** và nhập các thông tin sau:

- Index document: `index.html`

- Error document: `index.html` (nếu dùng SPA – Single Page Application)

- Bấm **Save changes** để lưu.



Khi dùng **Single Page Application (SPA)**, cần đặt cả `Index document` và `Error document` là `index.html`.
{{% notice tip %}}
Vì SPA chỉ có **một file duy nhất**, nên nếu truy cập trực tiếp vào các đường dẫn như `/products` hoặc `/cart`, trình duyệt sẽ cần tải lại `index.html` để JavaScript xử lý routing.
Nếu không cấu hình đúng, truy cập thẳng các URL này sẽ bị lỗi **404** trên S3.
{{% /notice %}}

##### Thiết lập CloudFront CDN cho S3 Website

1. Truy cập [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/) Và chọn  **Create Distribution**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/13.png)

2. Trong phần **Distribution option**:

- **Distribution name** : `easyshop-cdn`

- Chọn **Single website or app**

- Sau đó chọn **next**

![Ảnh minh họa: cấu hình polict cho s3](/images/8-Deploy-Frontend/14.png)

2. Trong phần **Specify origin**:

- **Origin type** : `Amazon S3`

- **S3 origin** : Chọn S3 triển khai Frontend. Ví dụ, `fe-easyshop-fcj.s3.ap-southeast-1.amazonaws.com` 

- Sau đó cuộn xuống và chọn **next**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/15.png)

2. Trong phần **Enable security**:

- Web Application Firewall (WAF) tắt chế độ này chọn **Do not enable security protections**và sau đó chokjn Next
Để không tốn thêm phí an toàn

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/16.png)

3. Cuối xùng chọn **create distribution**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/17.png)

{{% notice info %}}
Nãy ở bước chọn **S3 origin** chỉ mới là sử dụng **REST API endpoint**, dùng cho các ứng dụng **backend** hoặc **object API** (dùng SDK truy cập), **KHÔNG** dùng để render **website tĩnh**. Nhưng website tĩnh (SPA) lại cần sử dụng dạng website endpoint.
{{% /notice %}}

4. Cập nhật Origin để tránh lỗi **AccessDenied** khi truy cập **CloudFront**
Sau khi tạo xong Distribution, bạn cần chỉnh lại Origin để sử dụng S3 website endpoint thay vì REST API endpoint mặc định. 

- Vào trang chi tiết của **Distribution** vừa tạo, sau đó chọn tab **Origins**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/18.png)

-Chọn dòng **Origin** tương ứng với bucket bạn đã chọn (ví dụ: fe-easyshop-fcj.s3.ap-southeast-1.amazonaws.com) sau đó chọn  **Edit**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/19-01.png)

- Trong trang chỉnh sửa **origin**, bạn sẽ thấy cảnh báo:

>This S3 bucket has static web hosting enabled. If you plan to use this distribution as a website, we recommend using the S3 website endpoint rather than the bucket endpoint.
- Chọn nút **Use website endpoint**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/20.png)

- Sau đó Cuộn xuống và chọn **Save changes**

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/21.png)

{{% notice info %}}
Sau khi tạo hoặc chỉnh sửa **Distribution**, bạn sẽ thấy trạng thái là: **“Deploying”** . Bạn cần chờ khoảng **3–5 phút** để hệ thống cập nhật các thay đổi.
{{% /notice %}}

#### Kết quả
Sau khi hoàn tất các bước trên, bạn sẽ nhận được một đường dẫn CloudFront có dạng như sau:

![Ảnh minh họa: kết quả](/images/8-Deploy-Frontend/22.png)

![Ảnh minh họa: Thiết lập CloudFront CDN](/images/8-Deploy-Frontend/23.png)
