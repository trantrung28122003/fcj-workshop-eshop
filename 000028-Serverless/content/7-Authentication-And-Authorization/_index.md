---
title : "Authentication and Authorization"
date :  "`r Sys.Date()`" 
weight : 7
chapter : false
pre : " <b> 7. </b> "
---

#### Overview

In a **Serverless** system on AWS, security is a critical aspect. **Authentication** ensures that only valid users can access the system, while **authorization** determines the level of access for each user group.

Solution used:

- **Amazon Cognito** to manage users and handle login authentication

- **Cognito User Pool Groups** to manage user roles

- **API Gateway** as the protection layer between clients and backend

- **Lambda Authorizer** or **Cognito Authorizer** to validate access tokens

#### Main Content

1. [User Authentication with Cognito and API Gateway](7.1-authenticate-with-cognito-api-gateway/)
2. [User Authorization using Cognito Groups](7.2-authorization-with-cognito-groups/)
