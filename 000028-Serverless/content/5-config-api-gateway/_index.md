---
title : "Configure API Gateway"
date :  "`r Sys.Date()`" 
weight : 5
chapter : false
pre : " <b> 5. </b> "
---

#### **Overview**

To allow Lambda functions to be invoked from the frontend (or tools like Postman, curl, etc.), we need to configure an API layer — this is where **Amazon API Gateway** comes in.

**API Gateway** acts as a "gateway" that enables clients (users) to interact with your Lambda backend in a **secure**, **well-structured**, and **organized** manner.

In this section, we will:

- **Create a new REST API** named `eshop-fcj`
- Attach each **resource** (e.g., `/products`, `/products/{id}`) to the corresponding Lambda function
- Define HTTP **methods** such as `GET`, `POST`, `PUT`, and `DELETE`
- Enable **CORS** so the frontend can make API calls from the browser
- Test the **API** using Postman

Once completed, you will have a **fully functional API system** that your frontend can call and interact with.

---

#### Key Steps

1. [Create API Gateway](5.1-create-api-gateway/)
2. [Create resources and methods](5.2-create-resource-and-method/)
3. [Enable CORS and deploy](5.3-enable-cros-and-deloy/)
4. [Test APIs using Postman](5.4-test-apis-with-postman/)
