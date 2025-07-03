---
title : "Writing Data to Amazon DynamoDB"
date : "`r Sys.Date()`"
weight : 3
chapter : false
pre : " <b> 3. </b> "
---

#### Overview

After the image is successfully uploaded and resized, the next step is to **manage application data** – such as **products** and **categories** – by storing them in a database.

In this section, you will use **Amazon DynamoDB** – a fully managed NoSQL database service provided by AWS – to store and query your data efficiently, especially suitable for serverless architectures.

The data models will include:

- **Product**: name, description, price, **resized image URL**, category, etc.
- **Category**: category name, display image, etc.

#### Objective

Create DynamoDB tables for `Product` and `Category` to store application data.

---

#### **Creating the Product Table in DynamoDB**

1. Go to the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) and select **Create Table** from the left navigation panel.

   ![Illustration: Create table button in DynamoDB](images/create-table-button.png)

2. In the **Table details** section, enter the following:

   - **Table name**: `Product`
   - **Partition key**: `id` (type: `string`)
   - Leave **Sort key** empty (unless advanced sorting is needed).

   ![Illustration: Product table configuration](images/product-table-config.png)

3. In the **Table settings** section:

   - You can click **Customize settings** to configure advanced options like **Table class** and **Capacity mode**.
   - **Table class**: The default is `Standard` – suitable for most applications. If you need to optimize cost for rarely accessed tables, consider using `Standard-IA`.
   - **Capacity mode**: The default is `On-demand` – pay only for actual read/write requests without provisioning throughput. Ideal for new apps, MVPs, or unpredictable workloads.

{{% notice tip %}}
If you simply want to create a table quickly, you can keep the default settings without enabling **Customize settings**. These defaults are optimized for beginners and common use cases.
{{% /notice %}}

4. Scroll down and click **Create table** to finish.


#### **Creating the Category Table in DynamoDB**

The steps to create the **Category** table are similar to the **Product** table:

1. Go to the **DynamoDB Console** and click **Create Table**.

2. In the **Table details**, enter:
   - **Table name**: `Category`
   - **Partition key**: `id` (type: `string`)
   - Leave **Sort key** empty

3. In **Table settings**, you can simply use the **Default settings**.

4. Click **Create table** to finish.

---

{{% notice note %}}
**On-demand mode** is a great choice for workloads with **unpredictable or spiky traffic**, making it ideal for **beginners** or **development/test environments**.  
The **Partition key** is **required** and **cannot be changed** after the table is created.  
You can **add Global Secondary Indexes (GSI)** after the table has been created.
{{% /notice %}}

#### Results

Once the `Product` and `Category` tables have been successfully created, they will appear in the DynamoDB Console under the list of available tables.
