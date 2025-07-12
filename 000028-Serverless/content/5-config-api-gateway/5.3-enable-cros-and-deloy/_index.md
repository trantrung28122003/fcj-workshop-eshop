---
title : "Enable CORS and Deploy API"
date :  "`r Sys.Date()`" 
weight : 3
chapter : false
pre : " <b> 5.3. </b> "
---

#### Overview

After configuring resources and methods for the API Gateway, the next step is to **enable CORS (Cross-Origin Resource Sharing)** so that your frontend (or other apps) can access the API from a different domain. Then, you’ll **deploy the API** to make it available.

---

#### Add Binary File Support

1. Go to the **API Gateway Console**, select your API (e.g. `eshop-fcj`).

![Binary support settings](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01-01.png)

2. From the left menu, go to **API Settings** → **Binary media types**

![Binary support settings](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01.png)

3. Under **Binary media types**, enter:

- **Binary media type**: `multipart/form-data`
- Click **Save changes**

![Binary support settings](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/02.png)

4. After saving, `multipart/form-data` should appear in the list:

![Binary support settings](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/03.png)

---

#### Enable CORS for Each Method

To allow browsers to call your API from different domains (such as a frontend app), you need to **enable CORS** for each HTTP method (GET, POST, DELETE, etc.) per resource.

##### **Enable CORS for `/products` resource**

1. Go to **API Gateway Console** → open the `eshop-fcj` API

![Enable CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01-01.png)

2. From the left sidebar, select a `Resource` like `/products`. Then click **Enable CORS**.

![Enable CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/04.png)

3. In the **CORS Settings** popup:

- **Access-Control-Allow-Methods**: Select `GET`, `POST`, and `OPTIONS`
- **Access-Control-Allow-Headers**: `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`
- **Access-Control-Allow-Origin**: `*` (allow all domains)

Click **Save** to apply.

![Enable CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/05.png)

##### **Enable CORS for `/products/{id}` child resource**

4. On the **Resource details** page for `/products/{id}`, click **Enable CORS**

![Enable CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/06.png)

5. In the **CORS Settings** popup:

- **Access-Control-Allow-Methods**: Select `GET`, `PUT`, `DELETE`, and `OPTIONS`
- **Access-Control-Allow-Headers**: `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`
- **Access-Control-Allow-Origin**: `*`

Click **Save** to apply.

![Enable CORS](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/07.png)

---

#### Repeat the same for other resources and methods

| Resource Path      | Access-Control-Allow-Origin | Access-Control-Allow-Methods                 |
|--------------------|-----------------------------|----------------------------------------------|
| `/products`        | `*`                         | `GET`, `POST`, `OPTIONS`                     |
| `/products/{id}`   | `*`                         | `GET`, `PUT`, `DELETE`, `OPTIONS`            |
| `/categories`      | `*`                         | `GET`, `POST`, `OPTIONS`                     |
| `/categories/{id}` | `*`                         | `GET`, `DELETE`, `OPTIONS`                   |
| `/upload-image`    | `*`                         | `POST`, `OPTIONS`                            |

{{% notice warning %}}
You must repeat these steps for each resource if you want the frontend to be able to call that API endpoint.
{{% /notice %}}

---

#### Final result after enabling CORS:

![CORS setup result](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/08.png)

{{% notice info %}}
After enabling **CORS** for methods like `GET`, `POST`, etc., AWS will automatically generate the **`OPTIONS` method**, allowing frontend clients to make cross-origin requests without getting CORS errors.
{{% /notice %}}

---

#### Deploy API Gateway

After enabling CORS, you must deploy the API to apply the changes:

1. Go to **API Gateway Console**, select your API (e.g. `eshop-fcj`)

![Deploy API](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/01-01.png)

2. From the left sidebar, click **Deploy API**

![Deploy API](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/09.png)

3. In the **Deploy API** dialog: If you haven’t created a stage yet, click **[New Stage]**

![Deploy API](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/10.png)

4. Enter the following:

- **Stage name**: `eshop`
- **Deployment description**: `Dev environment`

Then click **Deploy**

![Deploy API](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/11.png)

---

After successful deployment, you will see the following result:

![Deploy result](/images/5-config-api-gateway/5.3-enable-cros-and-deloy/12.png)

{{% notice note %}}
Every time you update a method or resource, you must **redeploy the API** for changes to take effect — and make sure to select the correct stage.
{{% /notice %}}

---

#### Get Your API URL

Once deployed, you will get an **Invoke URL**, which looks like this:

```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
