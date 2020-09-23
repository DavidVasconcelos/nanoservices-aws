'use strict';

const s3Service = require('./service/s3Service')

module.exports.upload = async event => {
  const item = await s3Service.upload(event.body)
  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };
  
};
