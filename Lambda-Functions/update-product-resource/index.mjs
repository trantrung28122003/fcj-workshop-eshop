import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const REGION         = "ap-southeast-1";
const TABLE_NAME     = "Product";
const RESIZED_BUCKET = "upload-resized-fcj";

const db = new DynamoDBClient({ region: REGION });

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "PUT, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  const id = event.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Missing product id in path" })
    };
  }

  let body;
  try {
    body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body;
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Invalid JSON in request body" })
    };
  }

  const {
    name,
    price,
    stockCount,
    description = "",
    categoryId,
    key = ""
  } = body;

  const exprParts = [
    "#n = :name",
    "Price = :price",
    "StockCount = :stock",
    "Description = :desc",
    "CategoryId = :cat"
  ];
  const attrNames  = { "#n": "Name" };
  const attrValues = {
    ":name":  { S: name },
    ":price": { N: price.toString() },
    ":stock": { N: stockCount.toString() },
    ":desc":  { S: description },
    ":cat":   { N: categoryId.toString() }
  };

  if (key) {
    const finalImageUrl = `https://${RESIZED_BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
    exprParts.push("ImageUrl = :image");
    attrValues[":image"] = { S: finalImageUrl };
  }

  const updateExp = "SET " + exprParts.join(", ");

  try {
    await db.send(new UpdateItemCommand({
      TableName:               TABLE_NAME,
      Key:                     { Id: { S: id } },
      UpdateExpression:        updateExp,
      ExpressionAttributeNames:  attrNames,
      ExpressionAttributeValues: attrValues
    }));
  } catch (err) {
    console.error("UpdateProduct error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message || "Internal Server Error" })
    };
  }

  const resp = { message: "Product updated", id };
  if (key) resp.imageUrl = attrValues[":image"].S;

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify(resp)
  };
};
