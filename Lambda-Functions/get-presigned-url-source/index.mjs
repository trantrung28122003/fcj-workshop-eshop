import {S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "ap-southeast-1" });
const BUCKET_NAME = "upload-originals";
const URL_EXPIRATION_SECONDS = 300;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  try {
    const { fileName, fileType } = JSON.parse(event.body);
    const command = new PutObjectCommand({
      Bucket:      BUCKET_NAME,
      Key:         fileName,
      ContentType: fileType
    });
    const uploadUrl = await getSignedUrl(s3, command, {
      expiresIn: URL_EXPIRATION_SECONDS
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ uploadUrl, key: fileName })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: error.message })
    };
  }
};
