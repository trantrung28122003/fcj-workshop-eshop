import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const REGION         = "ap-southeast-1";
const TABLE_NAME     = "Product";
const RESIZED_BUCKET = "upload-resized-fcj";

const db = new DynamoDBClient({ region: REGION });

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  try {
    const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event.body;
    const {
      name,
      price,
      stockCount,
      description = "",
      categoryId,
      key     
    } = body;

    const id       = uuidv4();
    const imageUrl = `https://${RESIZED_BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    const item = {
      Id:          { S: id },
      Name:        { S: name },
      Price:       { N: price.toString() },
      StockCount:  { N: stockCount.toString() },
      ImageUrl:    { S: imageUrl },
      Description: { S: description },
      CategoryId:  { N: categoryId.toString() }
    };

    await db.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item:      item
    }));
    
    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message:  "Product created",
        id,
        imageUrl
      })
    };

  } catch (err) {
    console.error("CreateProduct error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: err.message || "Internal Server Error"
      })
    };
  }
};
