---
title : "Create API Gateway"
date :  "`r Sys.Date()`" 
weight : 1
chapter : false
pre : " <b> 5.1. </b> "
---

#### Create API Gateway

We will now configure **API Gateway** to interact with the Lambda functions created in the previous section:

1. Open the [Amazon API Gateway Console](https://console.aws.amazon.com/apigateway/home) and click **Create an API**

![Illustration: Create API Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/01.png)

2. In the **Choose an API type** section, scroll down and select **REST API**, then click **Build**

![Illustration: Create API Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/02.png)

3. In the **API details** section, provide the following information:

   - **Select**: `New API`
   - **API name**: `eshop-fcj`
   - **Description (optional)**: `eshop-fcj`
   - **API endpoint type**: `Regional`
   - **IP address type**: `IPv4`

![Illustration: Create API Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/03.png)

4. After clicking **Create API**, you will see the result as shown below:

![Illustration: Create API Gateway](/images/5-config-api-gateway/5.1-create-api-gateway/04.png)
---
