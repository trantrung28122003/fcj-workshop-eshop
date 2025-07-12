---
title  : "Introduction"
date   : "`r Sys.Date()`"
weight : 1
chapter: false
pre    : " <b> 1. </b>"
---

#### Overview of the architecture diagram used in this workshop

![Architecture Diagram](/images/serverless_architecture.png?featherlight=false&width=90pc)

### Overview of Serverless Architecture

**Serverless** is a cloud computing model that allows you to run applications **without managing servers, operating systems, or infrastructure**. Amazon Web Services automatically handles:

- **Provisioning compute resources** upon request or event  
- **Auto-scaling** to handle any workload, from a single to thousands of requests  
- **Shutting down unused resources** to save costs  
- **Hardware maintenance and security patching**

**Benefits of Serverless**

- **Reduced operational overhead**: no server management or auto-scaling configuration  
- **Faster deployment**: update code and deploy instantly  
- **Pay-per-use pricing**: billed based on invocations and execution time (ms), with additional storage costs per read/write and GB-month  
- **Event-driven architecture**: easily integrates with S3, DynamoDB Streams, and API Gateway

**Reference:** [AWS Serverless Overview](https://aws.amazon.com/serverless/)

---

### AWS Services Used in This Workshop

#### AWS Lambda  
- A **serverless compute service** that runs your code in response to events.  
- **Automatically scales** based on the number of incoming events; pay only for invocations and execution time (ms).  
- **Supports multiple languages** (Node.js, Python, C#, Java, Go…) and allows packaging dependencies as a deployment package or container image.  
- **Built-in integration** with AWS services like S3, DynamoDB, Kinesis, SNS, SQS, API Gateway…  
- **Supports versioning and aliases** for blue/green or canary deployments.

**Documentation:** [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/)

#### Amazon API Gateway  
- A **fully managed service** to create, publish, secure, and monitor RESTful or WebSocket APIs.  
- Supports two API types: **REST APIs** (feature-rich) and **HTTP APIs** (lower latency and cost).  
- Offers **mapping templates** to transform request/response payloads, integration with Lambda, HTTP endpoints, or VPC Link.  
- Built-in support for **CORS**, **throttling**, **caching**, and **AWS WAF** to protect APIs.  
- Supports **authentication** using Cognito User Pools, IAM roles, or custom Lambda authorizers.

**Documentation:** [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/)

#### Amazon S3  
- **Durable object storage** (99.999999999% durability) with virtually unlimited scalability.  
- Multiple **storage classes** (Standard, Intelligent-Tiering, Infrequent Access, Glacier) to optimize cost.  
- Supports **versioning**, **lifecycle policies** (auto-delete or transition), and **event notifications**.  
- Ensures **read-after-write consistency** for new PUTs and **eventual consistency** for overwrite/DELETE.  
- Ideal for storing **static files**, **backups**, **logs**, **media files**, and **big data**.

**Documentation:** [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)

#### Amazon DynamoDB  
- A **fully managed NoSQL** key-value/document database with millisecond latency.  
- **Automatically scales throughput** (Read/Write Capacity Units) and storage as needed.  
- Supports **eventual consistency** (default) and **strong consistency** (optional).  
- Provides **DynamoDB Streams**, **TTL**, and **Transactions (ACID)**.  
- **Distributed architecture** using partition keys for high scalability and stability.

**Documentation:** [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)

#### S3 Static Website Hosting  
- Host **static websites** (HTML, CSS, JavaScript) directly from an S3 bucket.  
- Configure a bucket as a **website endpoint** (e.g., `http://<bucket-name>.s3-website-<region>.amazonaws.com`).  
- Supports **custom domains** via Amazon Route 53 and **HTTPS** via CloudFront.  
- Suitable for **SPA**, **landing pages**, and **static documentation**.

**Documentation:** [Hosting a Static Website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

#### Amazon Cognito  
- A service for **authentication and authorization** for web and mobile apps.  
- **User Pools:** user directory with sign-up/sign-in APIs, MFA, and social identity providers.  
- **Identity Pools (Federated Identities):** provide temporary AWS credentials to authenticated users via User Pools, social providers, or SAML/OIDC.  
- Supports **OAuth 2.0**, **OpenID Connect**, and **JWT tokens** to secure API Gateway and backend.  
- Integrates with **Lambda triggers** to customize workflows (e.g., before/after authentication, email/phone verification).

**Documentation:** [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/)

#### Amazon CloudFront  
- AWS's **Content Delivery Network (CDN)** for accelerating delivery of static and dynamic content globally.  
- **Automatically caches** content at **Edge Locations** (300+ worldwide), significantly reducing latency.  
- **Seamless integration with S3** for secure and fast delivery of static assets (HTML, CSS, JS, images).  
- Supports **HTTPS**, **custom domains**, and **free SSL certificates** via **AWS Certificate Manager (ACM)**.  
- Features include:  
  - **Origin failover** for source redundancy  
  - **Signed URLs** for access control  
  - **Geo restriction** to limit access by region  
- Supports **SPA (Single Page Application)** via custom **error pages** and **rewrite rules**.

**Documentation:** [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/)
