---

title : "Deploy Frontend"
date :  "`r Sys.Date()`"
weight : 8
chapter : false
pre : " <b> 8. </b> "
---------------------

#### Overview

Next, we deploy the **frontend** (user interface) of the modern web application to **AWS S3 and CloudFront**, ensuring end users can access it via the Internet with high speed, security, and stability.

The **frontend** application is typically a **Single Page Application (SPA)** built with **React**, **Angular**, or **Vue**. After building, the static assets are uploaded to S3 and CloudFront is used as the CDN to distribute content globally.

#### Main Content

#### Create S3 Bucket for Web Files

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/s3/) and click **Create bucket**.

![S3 Bucket Creation Illustration](/images/8-Deploy-Frontend/01.png)

2. In **General configuration**, enter the following:

* **AWS Region**: Choose a single AWS region for all resources (Lambda, S3, DynamoDB, etc.) to reduce latency and simplify IAM (e.g., Asia Pacific (Singapore) ap-southeast-1)
* **Bucket type**: General purpose (default)
* **Bucket name**: `fe-easyshop-fcj`

![S3 Bucket Creation Illustration](/images/8-Deploy-Frontend/02.png)

{{% notice info %}}
**Note**: The bucket name must be **globally unique** and **cannot contain spaces or special characters**.
{{% /notice %}}

3. In **Block Public Access settings**:

* Uncheck **Block all public access**
* Check the box **I acknowledge...** to confirm public access

![S3 Bucket Creation Illustration](/images/8-Deploy-Frontend/03.png)

4. Scroll down and click **Create bucket** to finish.

![S3 Bucket Creation Illustration](/images/8-Deploy-Frontend/04.png)

#### Upload Files to S3

1. Go to your created bucket (e.g., fe-easyshop-fcj) in the AWS S3 Console.

![Upload Files to S3](/images/8-Deploy-Frontend/05.png)

2. In the bucket detail page, click **Upload**.

![Upload Files to S3](/images/8-Deploy-Frontend/06.png)

3. Upload the following items from the `dist` folder:

* `index.html` and root files (e.g., vite.svg, favicon.ico)
* The entire `assets/` directory or subdirectories with static files (CSS, JS, images)

![Upload Files to S3](/images/8-Deploy-Frontend/07.png)
![Upload Files to S3](/images/8-Deploy-Frontend/08.png)

{{% notice info %}}
Do not upload the entire `dist` folder, only its contents. Ensure `index.html` is at the bucket root.
{{% /notice %}}

4. Click **Upload** to complete. You will see a result like this:

![Upload Files to S3](/images/8-Deploy-Frontend/09.png)

#### Configure Bucket Policy

1. In the S3 bucket, go to the **Permissions** tab.

![S3 Bucket Policy](/images/8-Deploy-Frontend/10.png)

2. Scroll to **Bucket policy** and click **Edit**.

![S3 Bucket Policy](/images/8-Deploy-Frontend/11.png)

3. Paste the following JSON policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<your-bucket-name>/*"
    }
  ]
}
```

![S3 Bucket Policy](/images/8-Deploy-Frontend/12.png)

#### Configure Static Website Hosting

1. Go to the bucket **Properties** tab.
2. Scroll to **Static website hosting**, click **Edit**.
3. Enter the following:

* Index document: `index.html`
* Error document: `index.html` (for SPA)
* Click **Save changes**

{{% notice tip %}}
SPA apps use a single HTML file. So, all paths (`/products`, `/cart`, etc.) must return `index.html` to let JavaScript handle routing. Otherwise, S3 returns a 404 error.
{{% /notice %}}

#### Set Up CloudFront CDN for S3 Website

1. Go to [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/) and click **Create Distribution**.

![Create CloudFront Distribution](/images/8-Deploy-Frontend/13.png)

2. In **Distribution option**:

* Name: `easyshop-cdn`
* Choose **Single website or app**
* Click **Next**

![CloudFront Origin Setup](/images/8-Deploy-Frontend/14.png)

3. In **Specify origin**:

* Origin type: `Amazon S3`
* S3 origin: Select your S3 bucket (e.g., `fe-easyshop-fcj.s3.ap-southeast-1.amazonaws.com`)
* Click **Next**

![CloudFront Origin Setup](/images/8-Deploy-Frontend/15.png)

4. In **Enable security**:

* Choose **Do not enable security protections** (to avoid extra cost)
* Click **Next**

![CloudFront Security](/images/8-Deploy-Frontend/16.png)

5. Click **Create distribution** to finish.

![CloudFront Final Step](/images/8-Deploy-Frontend/17.png)

{{% notice info %}}
Initially, the selected origin is a **REST API endpoint**, suitable for backend/API access. For static websites, update to use the **website endpoint**.
{{% /notice %}}

#### Update Origin to Website Endpoint

1. Go to the distribution details, then to the **Origins** tab.

![CloudFront Origins Tab](/images/8-Deploy-Frontend/18.png)

2. Select the origin (e.g., `fe-easyshop-fcj.s3.ap-southeast-1.amazonaws.com`), click **Edit**.

![Edit CloudFront Origin](/images/8-Deploy-Frontend/19-01.png)

3. In the warning message:

> This S3 bucket has static web hosting enabled...

* Click **Use website endpoint**

![Use Website Endpoint](/images/8-Deploy-Frontend/20.png)

4. Scroll down and click **Save changes**

![Save CloudFront Origin](/images/8-Deploy-Frontend/21.png)

{{% notice info %}}
After creating or editing the **Distribution**, its status will be **"Deploying"**. Wait **3–5 minutes** for the updates to take effect.
{{% /notice %}}

#### Result

After completing the steps, you’ll get a CloudFront URL like this:

![Deployment Result](/images/8-Deploy-Frontend/22.png)

![CloudFront Domain](/images/8-Deploy-Frontend/23.png)
