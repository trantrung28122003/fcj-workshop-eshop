---
title : "Test API with Postman"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 6.2. </b> "
---

#### Overview

After creating a **User Pool** and an **App Client** (without secret), we can test Amazon Cognito APIs via Postman such as:

- **Sign up** a new user (SignUp)
- **Confirm** OTP code (ConfirmSignUp)
- **Sign in** and **get token** (InitiateAuth)

---

#### Main Content

#### **Note on Calling APIs to Amazon Cognito**
Amazon Cognito uses a region-based endpoint: `https://cognito-idp.<region>.amazonaws.com/`  
> Example for Singapore: https://cognito-idp.ap-southeast-1.amazonaws.com/

All **requests** to **Cognito** must be distinguished using the `ClientId`, which is a **unique identifier for each App Client** under your **User Pool**.

##### **How to get ClientID**

![Ảnh minh họa: Lấy clientID](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/01.png)

**Common Header Configuration when calling Cognito API**

| Key                      | Value                                              |
|--------------------------|----------------------------------------------------|
| `Content-Type`           | `application/x-amz-json-1.1`                       |
| `X-Amz-Target`           | Name of the API you want to call > e.g.: `AWSCognitoIdentityProviderService.InitiateAuth`, `AWSCognitoIdentityProviderService.SignUp` |

{{% notice warning %}}
If `X-Amz-Target` is missing or incorrect → Cognito will return `UnknownOperationException` or `BadRequest`.
{{% /notice %}}

#### **Sign Up User (SignUp)**

1. In the **postman** interface, enter the following information:

- Click **Create new request**, the + icon on the screen

- Select **method** `POST` and enter the URL: `https://cognito-idp.<YOUR-REGION>.amazonaws.com/`  
> Replace `<YOUR-REGION>` with your actual region, e.g.: `ap-southeast-1`

- In the **Header** section:

    - **Content-Type**: `application/x-amz-json-1.1`

    - **X-Amz-Target**: `AWSCognitoIdentityProviderService.SignUp`

![Ảnh minh họa: Kiểm tra đăng kí](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/02.png)

2. Next, go to the **body** tab, choose **raw**, and paste the following:
```json
{
  "ClientId": "YOUR_APP_CLIENT_ID",
  "Username": "YOUR_USER_NAME",
  "Password": "YOUR_PASS_WORD",
  "UserAttributes": [
    {
      "Name": "email",
      "Value": "YOUR_EMAIL"
    },
    {
      "Name": "name",
      "Value": "YOUR_FULL_NAME"
    }
  ]
}
```

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/03.png)

3. Wait for the response in the **body** in **JSON** format.

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/04.png)

4. Check that the account has been added under **users**.

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/06.png)

- Check the email you registered with. You will receive a **verification code** (OTP) from Cognito to proceed with account confirmation in the next step.

---

#### **Confirm User (ConfirmSignUp)**

1. In the **Postman** interface, enter the following information:

- Click **Create new request**, the + icon on the screen

- Choose **method** `POST` and enter the URL: `https://cognito-idp.<YOUR-REGION>.amazonaws.com/`  
> Replace `<YOUR-REGION>` with your actual region, e.g.: `ap-southeast-1`

- In the **Header** section:

    - **Content-Type**: `application/x-amz-json-1.1`

    - **X-Amz-Target**: `AWSCognitoIdentityProviderService.ConfirmSignUp`

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/07.png)

2. Next, go to the **body** tab, choose **raw**, and paste the following:
```json
{
  "ClientId": "YOUR_APP_CLIENT_ID",
  "Username": "YOUR_USER_NAME",
  "ConfirmationCode": "YOUR_CODE"
}
```

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/08.png)

3. Wait for the response in the **body** in **JSON** format. The response will include a **SESSION**.

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/09.png)

4. **Check if the account** has been **successfully confirmed**.

![Verification step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/10.png)

---

#### **User Authentication (InitiateAuth)**

1. In the **Postman** interface, enter the following information:

- Click **Create new request**, the + icon on the screen

- Choose **method** `POST` and enter the URL: `https://cognito-idp.<YOUR-REGION>.amazonaws.com/`  
> Replace `<YOUR-REGION>` with your actual region, for example: `ap-southeast-1`

- In the **Header** section:

    - **Content-Type**: `application/x-amz-json-1.1`

    - **X-Amz-Target**: `AWSCognitoIdentityProviderService.InitiateAuth`

![Authentication step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/11.png)

2. Next, go to the **body** tab, choose **raw**, and paste the following:
```json
{
    "ClientId": "YOUR_APP_CLIENT_ID",
    "AuthFlow": "USER_PASSWORD_AUTH",
    "AuthParameters": {
        "USERNAME": "YOUR_USER_NAME",
        "PASSWORD": "YOUR_PASS_WORD"
    }
}
```

![Authentication step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/12.png)

3. Wait for the response in the **body** in **JSON** format. It will include important information such as: **AccessToken**, **IdToken**, **ExpiresIn**, **RefreshToken**, and **TokenType**.

![Authentication step image](/images/6-setup-cognito-userpool/6.2-test-apis-with-postman/13.png)


