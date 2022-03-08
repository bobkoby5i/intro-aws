import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const REGION = "eu-central-1";
const dynamoDBClient = new DynamoDBClient({ region: REGION });
export { dynamoDBClient };
