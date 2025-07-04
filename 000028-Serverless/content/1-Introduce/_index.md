---
title : "Introduction"
date  : "`r Sys.Date()`"
weight: 1
chapter: false
pre   : " <b> 1. </b>"
---

### Overview of Serverless Architecture
**Serverless** is a cloud computing model that lets you run applications **without managing servers, operating systems, or infrastructure**. Amazon Web Services automatically handles:
- **Provisioning compute** when there’s a request or event  
- **Automatic scaling** to meet any request volume, from one to thousands  
- **Shutting down idle resources** to save costs  
- **Hardware maintenance and security patching**

**Benefits of going serverless**
- **Reduced operational overhead**: no need to manage servers or set up auto-scaling  
- **Faster deployments**: update your code and deploy instantly  
- **Pay-per-use billing**: charged only for the number of invocations and execution time (milliseconds), plus storage fees based on read/write capacity and GB-months  
- **Event-driven architecture**: easily integrate with services like S3, DynamoDB Streams, and API Gateway

**Reference:** [AWS Serverless Computing Overview](https://aws.amazon.com/serverless/)

---

### Services Used in This Workshop

#### AWS Lambda  
- A **serverless compute service** that runs your code in response to events (event-driven).  
- **Automatically scales** with incoming events; you pay only for invocations and execution duration (in milliseconds).  
- **Supports multiple languages** (Node.js, Python, C#, Java, Go, etc.) and lets you package dependencies as deployment packages or container images.  
- **Natively integrates** with other AWS services (S3, DynamoDB, Kinesis, SNS, SQS, API Gateway, and more).  
- **Offers versioning and aliases** to enable blue/green or canary deployments.  

**Documentation:** [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/)

#### Amazon API Gateway  
- A **fully managed service** to create, publish, secure, and monitor RESTful or WebSocket APIs.  
- Supports two API types: **REST APIs** (feature-rich) and **HTTP APIs** (lower latency, lower cost).  
- Provides **mapping templates** to transform request and response payloads, enabling integration with Lambda, HTTP endpoints, or VPC Links.  
- Built-in support for **CORS**, **throttling**, **caching**, and **AWS WAF** for API protection.  
- Supports **authentication** via Amazon Cognito User Pools, IAM roles, or custom Lambda authorizers.  

**Documentation:** [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/)

#### Amazon S3  
- **Durable (99.999999999%)** object storage with virtually unlimited scalability.  
- Multiple **storage classes** (Standard, Intelligent-Tiering, Infrequent Access, Glacier) to optimize costs.  
- Features **versioning**, **lifecycle policies** (automatic deletion or transition), and **event notifications**.  
- Provides **read-after-write consistency** for new PUTs and eventual consistency for overwrite PUTs and DELETEs.  
- Ideal for storing **static assets**, **backups**, **logs**, **media files**, and **big data**.  

**Documentation:** [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/)

#### Amazon DynamoDB  
- **Fully managed NoSQL** key-value and document database with single-digit millisecond latency.  
- Automatically **scales throughput** (Read/Write Capacity Units) and storage as needed.  
- Supports **eventual consistency** (default) and optional strong consistency.  
- Offers **DynamoDB Streams** for change data capture, **TTL** for automatic item expiration, and **ACID transactions**.  
- **Distributed architecture** based on partition keys for high scalability and reliability.  

**Documentation:** [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)

#### S3 Static Website Hosting  
- Host **static websites** (HTML, CSS, JavaScript) directly from an S3 bucket.  
- Configure a bucket as a **website endpoint** (e.g., `http://<bucket-name>.s3-website-<region>.amazonaws.com`).  
- Supports **custom domains** via Amazon Route 53 and **HTTPS** through Amazon CloudFront.  
- Perfect for **SPAs**, **landing pages**, and **static documentation**.  

**Documentation:** [Hosting a Static Website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

#### Amazon Cognito  
- **Authentication and authorization** service for web and mobile applications.  
- **User Pools:** user directory with built-in sign-up/sign-in APIs, multi-factor authentication (MFA), and social identity providers.  
- **Identity Pools (Federated Identities):** issue temporary AWS credentials to authenticated users from User Pools, social providers, or SAML/OIDC.  
- Supports **OAuth 2.0**, **OpenID Connect**, and **JWT tokens** to secure API Gateway and backend services.  
- Integrates with **Lambda triggers** to customize workflows (e.g., pre-/post-authentication, email/phone verification).  

**Documentation:** [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/)
