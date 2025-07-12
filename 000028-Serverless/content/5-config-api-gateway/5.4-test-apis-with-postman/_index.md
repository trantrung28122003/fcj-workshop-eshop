---
title : "Test APIs with Postman"
date :  "`r Sys.Date()`" 
weight : 4
chapter : false
pre : " <b> 5.4. </b> "
---

#### Overview

Once your **API Gateway has been deployed** and you have the **Invoke URL**, you can use **Postman** to test your APIs — such as creating a product, listing items, deleting entries, uploading files, etc.

---

#### Use Postman to Test the API

You can access **Postman** in one of the following ways:

- Web version: [Postman in Browser](https://www.postman.com)  
- Desktop app: [Download Postman](https://www.postman.com/downloads/)

---

#### Test Category API

##### **Test POST API to Create Category**

1. Get the **Invoke URL** from **Stages** in your **API Gateway**. It typically looks like this:

```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
```

![Illustration: Calling API](/images/5-config-api-gateway/5.4-test-apis-with-postman/01-01.png)

2. In the **Postman** interface, enter the following details:

- Click **Create new request** using the `+` icon at the top
- Select method **`POST`** and enter the **Invoke URL** from the API Gateway you created earlier
- Then click **Send** and wait for the response in the **Body** tab, which will return JSON data like this:

![Illustration: API Response](/images/5-config-api-gateway/5.4-test-apis-with-postman/01.png)

3. Next, go to the **Body** tab, select **raw**, and paste the following JSON snippet:
```json
{
  "name": "Điện thoại",
  "description": "Các dòng điện thoại thông minh từ nhiều thương hiệu."
}
```

![Illustration: Calling API](/images/5-config-api-gateway/5.4-test-apis-with-postman/02.png)

4. Open the **Category** table in the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) to verify that the data has been saved correctly:

![Illustration: Verify in DynamoDB](/images/5-config-api-gateway/5.4-test-apis-with-postman/03.png)

![Illustration: Verify in DynamoDB](/images/5-config-api-gateway/5.4-test-apis-with-postman/04.png)

6. Additionally, you can test the **update data** function:

Select the **`PUT`** method and enter the **Invoke URL** from API Gateway created earlier. The URL will be in the following format:

```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}/{id}
```

##### **Test API to retrieve category data**

1. Get the **Invoke URL** from the **Stages** section of the created **API Gateway**.

2. In the **Postman** interface, enter the following information:

- Click **Create new request** (the `+` icon at the top)
- Select **`GET`** as the method, then enter the **Invoke URL** obtained earlier
- Click **Send** and wait for the response in the **body**, which should be in **JSON** format containing the category data

![Illustration: Calling API](/images/5-config-api-gateway/5.4-test-apis-with-postman/05.png)

3. Additionally, you can retrieve **category** data by **ID**:

![Illustration: Get by ID](/images/5-config-api-gateway/5.4-test-apis-with-postman/05-01.png)

---

##### **Test API to delete a category**

1. Get the **Invoke URL** from the **Stages** section of the created **API Gateway**.

2. In the **Postman** interface, enter the following information:

- Click **Create new request** (the `+` icon at the top)
- Select the **`DELETE`** method, then enter the **Invoke URL**
- Click **Send** and wait for the response in the **body**, which should be in **JSON** format

![Illustration: Delete API](/images/5-config-api-gateway/5.4-test-apis-with-postman/06.png)

5. Open the **Category** table in the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) to verify that the data has been deleted:

![Illustration: DynamoDB after delete](/images/5-config-api-gateway/5.4-test-apis-with-postman/07.png)

---

#### Test the file upload API

##### **Test API to get the pre-signed URL for uploading a file**

1. Get the **Invoke URL** from the **Stages** section of the created **API Gateway**. The URL typically has the following format:

```bash
https://{restapi_id}.execute-api.{region}.amazonaws.com/{stage_name}/{resource_path}
```
![Illustration: Call API](/images/5-config-api-gateway/5.4-test-apis-with-postman/01-01.png)

2. In the **Postman** interface, enter the following information:

- Click **Create new request** (the `+` icon at the top)
- Select the **`POST`** method and paste the **Invoke URL** obtained from the API Gateway setup
- Click **Send** and wait for the response in the **body**, which should return a **JSON** object containing the signed URL and related information

![Illustration: API response](/images/5-config-api-gateway/5.4-test-apis-with-postman/08.png)

3. Then switch to the **Body** tab, select **raw**, and paste the following JSON content:
```json
{
  "fileName": "example.jpg",
  "fileType": "image/jpeg"
}
```

{{% notice note %}}
Since we're testing with Postman, make sure to enter the correct **file name** and **file type** of the image you want to upload.
{{% /notice %}}

---

4. In the **Postman** interface, enter the following details:

- Click **Create new request** (the `+` icon at the top)
- Select the **`PUT`** method and paste the **Invoke URL** returned in the previous step (this is the presigned URL)

![Illustration: Call API](/images/5-config-api-gateway/5.4-test-apis-with-postman/09.png)

5. Then switch to the **Body** tab, choose **binary**, and upload the exact image file you specified earlier (e.g., `example.jpg` with MIME type `image/jpeg`).

> **Note**: Make sure you **upload the exact image file** you specified earlier in the `fileName` and `fileType`, for example: **json**

![Illustration: Call API](/images/5-config-api-gateway/5.4-test-apis-with-postman/10.png)

{{% notice note %}}
Make sure to select the correct image file that matches the `fileName` and `fileType` you specified earlier.
{{% /notice %}}

6. After clicking **Send**, you can check the result in the two S3 buckets:

![Illustration: Call API](/images/5-config-api-gateway/5.4-test-apis-with-postman/13.png)

![Illustration: Call API](/images/5-config-api-gateway/5.4-test-apis-with-postman/15.png)
