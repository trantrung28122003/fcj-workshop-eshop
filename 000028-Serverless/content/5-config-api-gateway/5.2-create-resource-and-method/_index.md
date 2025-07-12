---
title : "Create Resources and Corresponding Methods"
date :  "`r Sys.Date()`" 
weight : 2
chapter : false
pre : " <b> 5.2. </b> "
---

#### Overview

After creating the **API Gateway** (**eshop-fcj**), the next step is to define the **resources** and configure **methods** to connect with the previously created Lambda functions such as creating a product, fetching data, deleting items, etc.

---

#### Steps to Create Resources and Methods

##### **Create resource for `products` to link with corresponding product-related Lambda functions**

1. Open the [API Gateway Console](https://console.aws.amazon.com/apigateway), access the **eshop-fcj** API and click **Create Resource**.

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/01.png)

2. In **Resource details**:

- **Resource Path**: `/`
- **Resource Name**: `products`

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/02.png)

3. Click **Create Resource**

Similarly, you can create the following resources:

- For categories:
  - **Resource Path**: `/`
  - **Resource Name**: `categories`

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/03.png)

- For image uploads:
  - **Resource Path**: `/`
  - **Resource Name**: `uploads`

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/04.png)

---

##### Add Method for a Resource

For example, to add a **POST** method to `/products`:

1. Select the `/products` resource in the **Resource Tree**, then click **Create Method**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/05.png)

2. In the **Method details**, fill out the following:

- **Method type**: `POST`
- **Integration type**: `Lambda function`
- **Lambda function**: Select the region and your deployed Lambda function, e.g., `create-product`
- Enable **Lambda proxy integration**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/06.png)

{{% notice info %}}
Note: In this project, all APIs receive **JSON body** input, so **Lambda Proxy Integration is required**.
{{% /notice %}}

3. Scroll down and click **Create method**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/07.png)

---

To create a **GET** method with **path parameter** like `/products/{id}`:

1. Inside the **eshop-fcj** API, click **Create Resource**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/08.png)

2. In **Resource details**:

- **Resource Path**: `/products`
- **Resource Name**: `{id}`

Then click **Create Resource**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/09.png)

4. Select the `/products` resource and then the `{id}` sub-resource, click **Create Method**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/10.png)

5. In **Method details**, fill out the following:

- **Method type**: `GET`
- **Integration type**: `Lambda function`
- Enable **Lambda proxy integration**
- **Lambda function**: e.g., `get-product`

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/11.png)

6. Scroll down and click **Create method**

![Illustration](/images/5-config-api-gateway/5.2-create-resource-and-method/12.png)

---

#### Repeat the above steps for all other resources and methods in the following table:

| Resource Path        | Resource Name     | Method | Functionality Description      | Lambda Function           |
|----------------------|-------------------|--------|--------------------------------|----------------------------|
| `/`                  | `products`        | POST   | Create a new product           | `create-product`           |
| `/`                  | `products`        | GET    | Get all products               | `get-product`              |
| `/products`          | `{id}`            | GET    | Get a product by ID            | `get-product`              |
| `/products`          | `{id}`            | DELETE | Delete a product by ID         | `delete-product`           |
| `/`                  | `categories`      | POST   | Create product category        | `create-category`          |
| `/`                  | `categories`      | GET    | Get all categories             | `get-category`             |
| `/categories`        | `{id}`            | GET    | Get category by ID             | `get-category`             |
| `/categories`        | `{id}`            | DELETE | Delete category by ID          | `delete-category`          |
| `/`                  | `upload-image`    | POST   | Generate image upload URL      | `get-presigned-url`        |

{{% notice warning %}}
You must repeat the above steps for each resource and method as shown in the table in order for the frontend to be able to call those APIs.
{{% /notice %}}

---

#### The final result will look like this:

![Final Result](/images/5-config-api-gateway/5.2-create-resource-and-method/12-01.png)
