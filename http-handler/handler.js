'use strict';

const s3Service = require('./service/s3Service')
const dynamoDBService = require('./service/dynamoDBService')

module.exports.upload = async event => {
  const item = await s3Service.upload(event.body);
  await dynamoDBService.put(item);


  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
  
};
