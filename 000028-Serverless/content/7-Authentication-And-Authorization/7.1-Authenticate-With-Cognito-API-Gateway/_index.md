---
title : "Configure Cognito Authentication in API Gateway"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 7.1. </b> "
---

#### Overview

**Amazon Cognito** is a user management service that helps with authentication and issuing secure tokens (JWT) for clients to access the system. When integrated with **API Gateway**, you can configure user authentication using JWT tokens without writing extra code.

#### Main Content

#### **Enable authentication for resources**

1. Go to **API Gateway Console** → select the API `eshop-fcj`. In the left menu, choose **Authorizers**, then click **Create an authorizer**.

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/01.png)

2. On the **Authorizer details** page, enter the following:

- **Authorizer name**: `cognito-authorizer-eshop-fcj`

- **Authorizer type**: `Cognito`

- **Cognito user pool**: `<your-user-pool>`

- **Token source**: `Authorization`

- Then click **Create authorizer**

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/fetch-02.png)

3. After creating the **Authorizer**, configure each **method** individually.

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/03.png)

##### Configure for categories

**GET method**
1. Select **resources categories** with GET method, then click **Edit**.

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/04.png)

2. In **Edit method request**, set the following:

- **Authorization**: `cognito-authorizer-eshop-fcj`

- Then click **Save**

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/05.png)

3. Once completed, the method will appear like this:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/06.png)

**Repeat the same Cognito authentication configuration for other methods**

**1. POST /categories**

- Select method **POST**, then **Edit method request**

- In **Authorization**, choose: `cognito-authorizer-eshop-fcj`

- Save and confirm the result:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/07.png)

**2. GET /categories/{id}**

Select the GET method under `{id}`, then click **Edit method request**

- In **Authorization**, choose: `cognito-authorizer-eshop-fcj`

- **Save**, and the result will be:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/09.png)

**3. PUT /categories/{id}**

Same as above:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/10.png)

**4. DELETE /categories/{id}**

Same as above:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/08.png)

##### Configure for products

**1. POST /products**

- Select method **POST**, then **Edit method request**

- In **Authorization**, choose: `cognito-authorizer-eshop-fcj`

- Save and confirm:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/12.png)

**2. GET /products**

Same as above:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/11.png)

**3. GET /products/{id}**

Same as above:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/14.png)

**4. PUT /products/{id}**

Same as above:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/15.png)

**5. DELETE /products/{id}**

Same as above:

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/13.png)

##### After completing the authentication configuration

1. In the API Gateway `eshop-fcj`, on the left sidebar, choose **Deploy API**.

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/16.png)

2. In the **Deploy API** window, choose the stage to deploy and click **Deploy** to complete.

![Illustration: Authentication](/images/7-authentication-and-authorization/7.1-authenticate-with-cognito-api-gateway/17.png)
