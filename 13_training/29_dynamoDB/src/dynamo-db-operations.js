import {
    ListTablesCommand, DescribeTableCommand, PutItemCommand,
    QueryCommand
} from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "./libs/dynamoDBClient.js";
export const paramsDescribe = { TableName: "Samochody2" };
export const paramsPut = {
    TableName: "Samochody2",
    Item: {
        Model: { S: "Toyota" },
        Rocznik: { N: "2010" },
    },
};
export const paramsQuery = {
    KeyConditionExpression: "Model = :m and Rocznik > :r",
    //FilterExpression: "contains (Model, :m)",
    ExpressionAttributeValues: {
        ":m": { S: "Saab" },
        ":r": { N: "2000" },
    },
    ProjectionExpression: "Model, Rocznik",
    TableName: "Samochody2",
};
export const paramsQuery2 = {
    KeyConditionExpression: "Model = :m ",
    //FilterExpression: "contains (Model, :m)",
    ExpressionAttributeValues: {
        ":m": { S: "Toyota" },
    },
    ProjectionExpression: "Model, Rocznik",
    TableName: "Samochody2",
};
export const run = async () => {
    try {
        const list = await dynamoDBClient.send(new ListTablesCommand({}));
        console.log(list);
        // console.log(data.TableNames.join("\n"));
        const describe = await dynamoDBClient.send(new DescribeTableCommand(paramsDescribe));
        console.log("Success", describe);
        const putData = await dynamoDBClient.send(new PutItemCommand(paramsPut));
        console.log(putData);
        const queryData = await dynamoDBClient.send(new QueryCommand(paramsQuery));
        console.log("READ DATA...");
        queryData.Items.forEach(function (element, index, array) {
            console.log(index, element.Model.S + " rocznik " + element.Rocznik.N);
        });


        console.log("READ DATA...");
        const queryData2 = await dynamoDBClient.send(new QueryCommand(paramsQuery2));
        queryData2.Items.forEach(function (element, index, array) {
            console.log(index, element.Model.S + " rocznik " + element.Rocznik.N);
        });
        return;
    } catch (err) {
        console.error(err);
    }
};
run();