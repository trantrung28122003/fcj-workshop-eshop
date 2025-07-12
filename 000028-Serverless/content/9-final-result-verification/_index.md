---

title : "Final Frontend Verification"
date :  "`r Sys.Date()`"
weight : 9
chapter : false
pre : " <b> 9. </b> "
---------------------

#### Overview

After successfully deploying the frontend to S3 and configuring CloudFront, verify the entire system by visiting the live website.

## Accessing the Frontend Website

#### Login / Register

* Visit `/login` and `/register` to test user authentication flows.
* Ensure Cognito integration works properly.

**Registration Page**
![Result Illustration](/images/9-final-result-verification/01.png)

**Login Page**
![Result Illustration](/images/9-final-result-verification/02.png)

#### Admin Page

* Log in using an **admin** account.
* Visit pages such as `/admin/products`, `/admin/categories`
* Verify you can add, edit, and delete products.

**Admin Product Management Page**
![Result Illustration](/images/9-final-result-verification/03.png)

**Admin Category Management Page**
![Result Illustration](/images/9-final-result-verification/04.png)

#### User Page

* Visit the homepage or `/` and confirm that the product list is displayed properly.

![Result Illustration](/images/9-final-result-verification/05.png)

### Access Denied Page

* Log in with a **regular user** account.
* Visit the `/admin` page to verify that the system displays a "No access permission" message.

![Result Illustration](/images/9-final-result-verification/06.png)
