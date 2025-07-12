---
title : "Writing Data to DynamoDB"
date  : "`r Sys.Date()`"
weight: 3
chapter: false
pre   : " <b> 3. </b> "
---

#### Overview

After successfully uploading and processing the images, the next step is to **manage application data** – such as **products** and **categories** – by storing them in a database system.

In this section, you will use **Amazon DynamoDB** – a fully managed NoSQL database service by AWS – to store and query data efficiently. It's especially well-suited for serverless architectures.

The product and category data will include:

- **Product**: name, description, price, **resized image URL**, category, etc.  
- **Category**: category name, thumbnail image, etc.

---

#### Objectives

Create DynamoDB tables for `Product` and `Category` to store your application data.

---

#### **Create the Product Table in DynamoDB**

1. Go to the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home) and click **Create Table** in the navigation panel.

![Illustration: Create DynamoDB table](/images/3-writing-data-to-amazon-dynamodb/01.png)

2. In the **Table details** section, enter:

   - **Table name**: `Product`  
   - **Partition key**: `Id` (type: `string`)  
   - Leave the **Sort key** blank unless you need advanced sorting.

![Illustration: Enter table details](/images/3-writing-data-to-amazon-dynamodb/02.png)

3. Under **Table settings**:

   - Click **Customize settings** if you want to adjust advanced options like **Table class** or **Capacity mode**.  
   - **Table class**: Default is `Standard` – good for most use cases. If the table is rarely accessed, consider `Standard-IA` to reduce cost.  
   - **Capacity mode**: Default is `On-demand` – pay per request with no need to provision capacity. Perfect for MVPs, prototypes, or unpredictable traffic.

![Illustration: Table settings](/images/3-writing-data-to-amazon-dynamodb/03.png)

{{% notice tip %}}
If you just want to create the table quickly, you can leave the default settings as they are. These defaults are beginner-friendly and suitable for most use cases.
{{% /notice %}}

4. Finally, scroll down and click **Create table** to finish.

![Illustration: Create table](/images/3-writing-data-to-amazon-dynamodb/04.png)

---

#### **Create the Category Table in DynamoDB**

The process for creating the `Category` table is identical to `Product`. You just need to:

1. Go back to the **DynamoDB Console** and click **Create Table**.

2. In the **Table details** section, enter:  
   - **Table name**: `Category`  
   - **Partition key**: `Id` (type: `string`)  
   - Leave the **Sort key** blank

![Illustration: Create Category table](/images/3-writing-data-to-amazon-dynamodb/fetch-05.png)

3. In the **Table settings**, you can choose **Default settings** if no changes are needed.

4. Click **Create table** to complete.

---

{{% notice note %}}
**On-demand mode** is great for applications with **unpredictable or uneven traffic patterns**, especially ideal for **beginners** or **experimental systems**.  
The **Partition key** is **mandatory** when creating a table and **cannot be changed** afterward.  
You can **add secondary indexes** (Global Secondary Indexes) **after the table is created**.
{{% /notice %}}

---

#### Result

After creating both **Product** and **Category** tables, you will see them listed in the DynamoDB Console.

![Illustration: Tables created](/images/3-writing-data-to-amazon-dynamodb/06.png)
