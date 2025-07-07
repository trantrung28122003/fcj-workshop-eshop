import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3 = new S3Client({ region: "ap-southeast-1" });
const DEST_BUCKET = "upload-resized-fcj";

export const handler = async (event) => {
  const record = event.Records[0];
  const srcBucket = record.s3.bucket.name;
  const rawKey = record.s3.object.key;
  const key = decodeURIComponent(rawKey.replace(/\+/g, " "));

  console.log("Resizing image:", key);

  const getRes = await s3.send(new GetObjectCommand({
    Bucket: srcBucket,
    Key: key
  }));

  const contentType = getRes.ContentType || "image/jpeg";

  const resizedBuffer = await sharp(await getRes.Body.transformToByteArray())
    .resize(300) // bạn có thể thay đổi kích thước theo ý muốn ở đây nè!!!!
    .toBuffer();

  await s3.send(new PutObjectCommand({
    Bucket: DEST_BUCKET,
    Key: key,
    Body: resizedBuffer,
    ContentType: contentType
  }));
};
