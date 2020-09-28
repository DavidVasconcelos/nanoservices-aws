'use strict';

module.exports.thumbnail = async event => {
  console.log('Evento do SNS recebido com sucesso', JSON.stringify(event));
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }),
  };  
};
