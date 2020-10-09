'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

const dynamo = new AWS.DynamoDB.DocumentClient();

const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'https://vpc-elasticsearch-cluster-4qiv4s2bcahsiwbyvft5eik23a.us-east-1.es.amazonaws.com',  
  apiVersion: '7.7',
});

module.exports.consumer = async event => {

  try {
    await client.search({
      index: 'index',
      q: '*'
    })
  } catch (error) {
    console.log(error);
  }

  await (new Promise((resolve, reject) => {
    dynamo.get({
      TableName: 'imagens',
      Key: {
        id: '123'
      }
    }, (err, data) => {
      console.log('err', err);
      console.log('data', data);

      return resolve({});
    });
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
