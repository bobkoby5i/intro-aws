import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "./libs/dynamoDBClient.js";
export const params = {
    AttributeDefinitions: [
        {
            AttributeName: "Model",
            AttributeType: "S",
        },
        {
            AttributeName: "Rocznik",
            AttributeType: "N",
        },
    ],
    KeySchema: [
        {
            AttributeName: "Model",
            KeyType: "HASH",
        },
        {
            AttributeName: "Rocznik",
            KeyType: "RANGE",
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
    TableName: "Samochody2",
    StreamSpecification: {
        StreamEnabled: false,
    },
};
export const run = async () => {
    try {
        const data = await dynamoDBClient.send(new CreateTableCommand(params));
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
run();