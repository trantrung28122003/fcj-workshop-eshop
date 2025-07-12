---

title : "Clean Up Resources"
date :  "`r Sys.Date()`"
weight : 10
chapter : false
pre : " <b> 10. </b> "
----------------------

#### Overview

After completing the deployment and testing of the serverless system, it’s recommended to **clean up all AWS resources** to avoid incurring unnecessary costs.

In this workshop, we’ve created several resources, including:

* IAM Roles (for Lambda, API Gateway, etc.)
* Lambda Functions
* DynamoDB Tables
* S3 Buckets (original and resized images)
* Amazon API Gateway
* Amazon Cognito (User Pool, App Client, etc.)
* Amazon CloudFront (if used for frontend hosting)

---

#### Main Tasks

{{% notice info %}}
**Note:** Resource names (IAM roles, buckets, API...) may vary between users. Carefully verify names before deleting to avoid affecting unrelated services.
{{% /notice %}}

#### 1. Delete DynamoDB Tables

1. Go to the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) → Select:

* Table `Product`
* Table `Category`

2. Then click **Delete Table**

#### 2. Delete Lambda Functions

1. Go to the [Lambda Console](https://console.aws.amazon.com/lambda/home) → Delete functions:

* `create-product`
* `create-category`
* `get-presigned-url`
* `resize-image`
* `delete-product`
* ...

2. Select each function, click **Actions > Delete**

#### 3. Delete S3 Buckets

1. Go to the [S3 Console](https://s3.console.aws.amazon.com/s3/home)

* Original bucket: `upload-originals-fcj`
* Resized bucket: `resized-image-fcj`
* Frontend hosting bucket (if any)

> Before deleting a bucket, delete all **objects** inside it first.

2. Then click **Delete bucket**

#### 4. Delete Amazon API Gateway

Visit the [API Gateway Console](https://console.aws.amazon.com/apigateway/home)

1. Select the **API** such as `easyshop-api` or your custom name

2. Click **Delete**

#### 5. Delete Amazon Cognito

Visit the [Cognito Console](https://console.aws.amazon.com/cognito/users/)

* Delete **User Pool**
* Delete **App Client**
* Delete **Identity Pool** (if any)

#### 6. Delete Amazon CloudFront (if used)

Visit the [CloudFront Console](https://console.aws.amazon.com/cloudfront/v3/home)

1. Select the distribution used for frontend delivery

2. First click **Disable**, then click **Delete**

#### 7. Delete IAM Roles and Policies

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/home#/roles), find and delete roles such as:

* `lambda-dynamodb-role`
* `lambda-resize-image-role`
* `lambda-upload-original-role`

2. Select each role, then click **Delete role**

#### Conclusion

Cleaning up resources is the final step that helps you:

* Avoid unexpected AWS charges
* Keep your AWS account clean and organized
* Ensure compliance with security best practices (removing unused permissions and roles)
