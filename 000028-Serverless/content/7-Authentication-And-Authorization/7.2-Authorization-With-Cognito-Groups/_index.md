---

title : "Configure Cognito Group-Based Authorization"
date :  "`r Sys.Date()`"
weight : 2
chapter : false
pre : " <b> 7.2. </b> "
-----------------------

#### Overview

Cognito supports **user authorization by group** using **User Pool Groups**. When a user logs in and belongs to a specific group, that group information is attached to the **JWT token** (in the `cognito:groups` claim). This allows us to check authorization either in the backend (Lambda) or directly in API Gateway.

#### Main Content

#### **Create Cognito User Pool Groups**

1. Go to [Amazon Cognito Console](https://console.aws.amazon.com/cognito/home). Select the existing **User Pool**. Go to **Group** and select **Create group**

2. In **Group information**, enter the following:

* **Group name**: `admin`

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/02.png)

* Then select **Create group**

3. Create another group **user**:

* **Group name**: `user`

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/03.png)

4. After creating the **admin** and **user** groups, assign users to the respective group

5. In the **users** list, select the user to add to a group

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/03-01.png)

6. In the user detail page, choose **Add user to group**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/04.png)

7. Select the group to assign, for example: `user`

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/05.png)

8. Once completed, you will see the result as:

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/06.png)

##### Create an admin user for the system and assign to the admin group

1. Open Postman and create a user account:

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/07.png)

2. After creation, go to the newly created user in AWS Cognito:

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/08.png)

3. In the **User attributes** tab, click **Edit** to verify email:

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/09.png)

4. Check **Mark email as verified**:

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/10.png)

5. Finally, click **Confirm user** to activate the account:

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/11.png)

6. Add the **admin** user to the **admin** group

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/12.png)

#### **Configure group-based authorization in Lambda functions**

{{% notice note %}}
For existing Lambda functions, you now need to configure them via AWS Console to read the group from JWT token inside Lambda
{{% /notice %}}

##### **Sample code for group-based authorization from token**

```js
const claims = event.requestContext.authorizer?.jwt?.claims ||  event.requestContext.authorizer?.claims || {};  
  const groups = Array.isArray(claims["cognito:groups"])
    ? claims["cognito:groups"]
    : claims["cognito:groups"]
    ? [claims["cognito:groups"]]
    : [];
if (!groups.includes("admin")) {
  return {
    statusCode: 403,
    body: JSON.stringify({ error: "You do not have permission" }),
  };
}
```

#### Configure authorization for product

##### **For create-product-lambda function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select the Lambda function to configure, e.g., `create-product`

2. In the Lambda code screen, add the **code** to the top of `index.mjs` file, then click **Deploy**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/18.png)

##### **For update-product-lambda function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select the Lambda function to configure, e.g., `create-product`

2. In the Lambda code screen, add the **code** to the top of `index.mjs` file, then click **Deploy**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/19.png)

##### **For delete-product-lambda function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select the Lambda function to configure, e.g., `create-product`

2. In the Lambda code screen, add the **code** to the top of `index.mjs` file, then click **Deploy**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/20.png)

#### Configure authorization for category

##### **For create-category-lambda function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select the Lambda function to configure, e.g., `create-category`

2. In the Lambda code screen, add the **code** to the top of `index.mjs` file, then click **Deploy**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/21.png)

##### **For update-category-lambda function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select the Lambda function to configure, e.g., `update-category`

2. In the Lambda code screen, add the **code** to the top of `index.mjs` file, then click **Deploy**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/22.png)

##### **For delete-category-lambda function**

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/home), select the Lambda function to configure, e.g., `delete-category`

2. In the Lambda code screen, add the **code** to the top of `index.mjs` file, then click **Deploy**

![Authorization Illustration](/images/7-authentication-and-authorization/7.2-authorization-with-cognito-groups/23.png)
