---

title : "Serverless Web Application Management System on AWS"
date :  "`r Sys.Date()`"
weight : 1
chapter : false
---------------

# Serverless Web Application Management System on AWS

#### Overview

In today’s digital era, developing and operating web applications must meet various requirements for performance, cost-efficiency, and scalability. Traditional models using physical servers or EC2 instances often entail high operational costs, limited flexibility, and complex system administration, which poses challenges for many small and medium-sized enterprises (SMEs) in rapidly deploying software solutions.

The **Serverless solution on AWS** enables building systems without managing servers, paying only for actual resource usage. With this architecture, developers can fully focus on business logic while AWS handles auto-scaling, maintenance, and monitoring.

This system includes the following core components:

* **Amazon API Gateway**: manages RESTful endpoints
* **AWS Lambda**: handles serverless business logic
* **Amazon DynamoDB**: high-performance NoSQL data storage
* **Amazon S3**: stores original and resized images
* **Amazon Cognito**: handles authentication, authorization, and user management
* **S3 + CloudFront**: deploys static frontend with global fast delivery

The system is designed to:

* Reduce operational costs by 60–70% compared to EC2
* Automatically scale with actual traffic
* Provide a secure and flexible product management interface
* Enable fast image uploads and automatic image resizing

#### Serverless Architecture in the Workshop

Below is the overall architecture diagram illustrating how AWS services interact within this workshop system:

![Architecture Diagram](/images/serverless_architecture.png?featherlight=false\&width=90pc)

#### Main Sections

1. [Introduction](1-introduce/)
2. [Image Upload and Resizing](2-image-upload-and-resize/)
3. [Writing Data to Amazon DynamoDB](3-writing-data-to-amazon-dynamodb/)
4. [Deploying Lambda Functions](4-deploy-lambda-function/)
5. [Configuring API Gateway](5-config-api-gateway/)
6. [Setting Up Cognito UserPool](6-setup-cognito-userpool/)
7. [Authentication and Authorization](7-authentication-and-authorization/)
8. [Deploying the Frontend](8-deploy-frontend/)
9. [Final Result Verification](9-final-result-verification/)
10. [Clean Up Resources](10-clean-up-resources/)
---

title : "Serverless Web Application Management System on AWS"
date :  "`r Sys.Date()`"
weight : 1
chapter : false
---------------

# Serverless Web Application Management System on AWS

#### Overview

In today’s digital era, developing and operating web applications must meet various requirements for performance, cost-efficiency, and scalability. Traditional models using physical servers or EC2 instances often entail high operational costs, limited flexibility, and complex system administration, which poses challenges for many small and medium-sized enterprises (SMEs) in rapidly deploying software solutions.

The **Serverless solution on AWS** enables building systems without managing servers, paying only for actual resource usage. With this architecture, developers can fully focus on business logic while AWS handles auto-scaling, maintenance, and monitoring.

This system includes the following core components:

* **Amazon API Gateway**: manages RESTful endpoints
* **AWS Lambda**: handles serverless business logic
* **Amazon DynamoDB**: high-performance NoSQL data storage
* **Amazon S3**: stores original and resized images
* **Amazon Cognito**: handles authentication, authorization, and user management
* **S3 + CloudFront**: deploys static frontend with global fast delivery

The system is designed to:

* Reduce operational costs by 60–70% compared to EC2
* Automatically scale with actual traffic
* Provide a secure and flexible product management interface
* Enable fast image uploads and automatic image resizing

#### Serverless Architecture in the Workshop

Below is the overall architecture diagram illustrating how AWS services interact within this workshop system:

![Architecture Diagram](/images/serverless_architecture.png?featherlight=false\&width=90pc)

#### Main Sections

1. [Introduction](1-introduce/)
2. [Image Upload and Resizing](2-image-upload-and-resize/)
3. [Writing Data to Amazon DynamoDB](3-writing-data-to-amazon-dynamodb/)
4. [Deploying Lambda Functions](4-deploy-lambda-function/)
5. [Configuring API Gateway](5-config-api-gateway/)
6. [Setting Up Cognito UserPool](6-setup-cognito-userpool/)
7. [Authentication and Authorization](7-authentication-and-authorization/)
8. [Deploying the Frontend](8-deploy-frontend/)
9. [Final Result Verification](9-final-result-verification/)
10. [Clean Up Resources](10-clean-up-resources/)
