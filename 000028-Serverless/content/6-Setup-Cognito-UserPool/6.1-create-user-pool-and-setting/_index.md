---
title : "Create and Configure User Pool"
date :  "`r Sys.Date()`"
weight : 1
chapter : false
pre : " <b> 6.1. </b> "
---

### Overview

**Amazon Cognito User Pool** is an identity management service that allows you to create, **authenticate, and manage users** for your web or mobile application. In this section, we will create a **basic User Pool** to use in upcoming authentication steps.

### Main Steps

1. Go to the [Amazon Cognito Console](https://console.aws.amazon.com/cognito/home). Choose **User pools** from the left menu, then click **Create user pool**.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/01.png)

2. On the **Set up resources for your application** screen, under **Define your application**, enter the following:

- **Application type**: `Single-page application (SPA)`
- **Name your application**: `eshop-client-no-secret`

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/02.png)

{{% notice info %}}
In this workshop, the frontend calls Cognito directly for authentication, so you should choose `Single-page application (SPA)` to **avoid generating a client secret**, which simplifies integration from frontend or Postman.
{{% /notice %}}

3. Scroll down to **Configure options**, and configure as follows:

- **Sign-in options**: Select `Email` so users can log in with email.
- Then click **Create user directory** to create the User Pool.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/03.png)

{{% notice note %}}
You may also enable `email` or `phone number` verification if needed.  
Additionally, under **Required attributes for sign-up**, you can add user attributes like `name`, `birthdate`, or `address` to collect more data.
{{% /notice %}}

4. Once the User Pool is created, return to the **Cognito** dashboard, select your User Pool, and go to **App clients** under **Applications** — you will see the app client just created.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/04.png)

6. Click into the app client and select **Edit**.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/05.png)

7. In the **Authentication flows** section, enable:

- **ALLOW_USER_AUTH**: Allows multiple types of authentication flows.
- **ALLOW_USER_PASSWORD_AUTH**: Allows login with username/password (required for API calls via Postman or frontend).
- **ALLOW_REFRESH_TOKEN_AUTH**: Allows refresh token for session extension.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/06.png)

8. Scroll down and click **Save changes** to apply configuration.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/07.png)

9. To enable user verification via email, go to the **User Pool**, select the **Sign-up** section from the left menu, then click **Edit** on the **Attribute verification and user account confirmation** section.

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/08.png)

10. In the **Edit attribute verification and user account confirmation** screen, configure:

- `Allow Cognito to automatically send messages to verify and confirm – Recommended`
- `Send email message, verify email address`
- `Keep original attribute value active when an update is pending – Recommended`
- Then click **Save changes**

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/09.png)

11. From the left menu in the User Pool, go to **Message templates** → under **Verification message**, click **Edit**

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/10.png)

12. In the **Edit verification message** section, set up:

- **Verification type**: `Code`
- **Email subject**: `Account verification code`
- **Email message**:

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 0;">
  <tr>
    <td align="center">
      <table width="100%" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial,sans-serif; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        
        <tr>
          <td style="background: linear-gradient(135deg, #06bbcc 0%, #2E86C1 100%); padding: 30px; text-align:center;">
            <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:normal;">
              Welcome to <strong>eSHOP-FCJ</strong>
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding: 30px; color: #333333; font-size: 16px; line-height:1.6;">
            <p>Hello <strong>User!</strong>,</p>
            <p>
              To complete your registration, please enter the verification code below:
            </p>

            <p style="text-align:center; margin: 30px 0;">
              <span style="
                display:inline-block;
                background-color:#06bbcc;
                color:#ffffff;
                font-size:28px;
                font-weight:bold;
                padding:15px 30px;
                border-radius:6px;
                border:2px solid #06bbcc;
                letter-spacing:4px;
              ">
                {{####}}
              </span>
            </p>

            <p style="color:#7f8c8d; font-size:14px; text-align:center;">
              This code will <strong>expire in 5 minutes</strong>.
            </p>

            <p style="margin-top:30px;">
              We are committed to protecting your information and privacy.
            </p>

            <p style="margin-top:30px;">
              Best regards,<br>
              <em>The eSHOP-FCJ Team</em>
            </p>
          </td>
        </tr>

        <tr>
          <td style="background-color:#f0f2f5; padding:20px 30px; text-align:center; font-size:12px; color:#95a5a6;">
            © 2024 eSHOP-FCJ.  
            <a href="https://your-domain.com" style="color:#06bbcc; text-decoration:none;">Visit our site</a> |
            <a href="mailto:support@your-domain.com" style="color:#06bbcc; text-decoration:none;">support@eshopfcj.com</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
```

![UserPool creation illustration](/images/6-setup-cognito-userpool/6.1-create-user-pool-and-setting/11.png)