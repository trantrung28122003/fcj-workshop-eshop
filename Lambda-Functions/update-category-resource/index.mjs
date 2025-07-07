import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const REGION     = "ap-southeast-1";
const TABLE_NAME = "Category";

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

  if (event.httpMethod !== "PUT") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: `Method ${event.httpMethod} not allowed` })
    };
  }

  const id = event.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Missing category id in path" })
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

  const { name, description = "" } = body;
  if (!name) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Field 'name' is required" })
    };
  }

  const updateExp = "SET #n = :name, #d = :desc";
  const attrNames  = { "#n": "Name", "#d": "Description" };
  const attrValues = {
    ":name": { S: name },
    ":desc": { S: description }
  };

  try {
    await db.send(new UpdateItemCommand({
      TableName:                 TABLE_NAME,
      Key:                       { Id: { S: id } },
      UpdateExpression:          updateExp,
      ExpressionAttributeNames:  attrNames,
      ExpressionAttributeValues: attrValues
    }));
  } catch (err) {
    console.error("UpdateCategory error:", err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message || "Internal Server Error" })
    };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      message: "Category updated",
      id
    })
  };
};
