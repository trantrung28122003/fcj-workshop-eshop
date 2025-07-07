import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

const REGION     = "ap-southeast-1";
const TABLE_NAME = "Category"; 

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};

const db = new DynamoDBClient({ region: REGION });

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
      description = ""
    } = body;

    if (!name) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Name is required" })
      };
    }

    const id = uuidv4();

    const item = {
      Id:          { S: id },
      Name:        { S: name },
      Description: { S: description }
    };

    await db.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item:      item
    }));

    return {
      statusCode: 201,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message:  "Category created",
        id
      })
    };

  } catch (err) {
    console.error("CreateCategory error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: err.message || "Internal Server Error"
      })
    };
  }
};
