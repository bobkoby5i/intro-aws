'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.yyyymm !== 'string' || typeof data.vendor_id !== 'number' || typeof data.vendor_name !== 'string' ||   typeof data.passengers !== 'number' ||   typeof data.trips !== 'number' ||   typeof data.fare  !== 'number' ||   typeof data.tip !== 'number' ||   typeof data.adf_created_at !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  
  const params = {
    TableName: process.env.GREENCAB_TRIPS_SUMMARY_DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeValues: {
      ':yyyymm': data.yyyymm,
      ':vendor_id': data.vendor_id,
      ':vendor_name': data.vendor_name,
      ':passengers': data.passengers,
      ':trips': data.trips,
      ':fare': data.fare,
      ':tip': data.tip,
      ':adf_created_at': data.adf_created_at,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET petName = :petName, petBreed = :petBreed, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};