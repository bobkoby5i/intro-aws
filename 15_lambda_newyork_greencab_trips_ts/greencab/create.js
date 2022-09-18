'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

// The document client affords developers the use of native JavaScript
// types instead of AttributeValues to simplify the JavaScript development
// experience with Amazon DynamoDB.
// - AWS Documentation

// POST payload
// {
//   "yyyymm": "2009-01",
//   "vendor_id": 2,
//   "vendor_name": "Volvo",
//   "passengers": 2.0,
//   "trips": 2,
//   "fare": 2,
//   "tip": 2,
//   "adf_created_at": "2022-09-18 00:25:25"
// }

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.yyyymm !== 'string' || typeof data.vendor_id !== 'number' || typeof data.vendor_name !== 'string' ||   typeof data.passengers !== 'number' ||   typeof data.trips !== 'number' ||   typeof data.fare  !== 'number' ||   typeof data.tip !== 'number' ||   typeof data.adf_created_at !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the pet item.'));
    return;
  }

  const params = {
    TableName: process.env.GREENCAB_TRIPS_SUMMARY_DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      yyyymm: data.yyyymm,
      vendor_id: data.vendor_id,
      vendor_name: data.vendor_name,
      passengers: data.passengers,
      trips: data.trips,
      fare: data.fare,
      tip: data.tip,
      adf_created_at: data.adf_created_at,      
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the pet to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the trip item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};