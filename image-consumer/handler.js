'use strict';

const elasticsearchService = require('./service/elasticsearchService');
const dynamoDBService = require('./service/dynamoDBService');

module.exports.consumer = async event => {

  for (const record of event.Records) {

    const item = JSON.parse(record.body);

    const dbItem = await dynamoDBService.getItem(item.key);

    switch (item.eventType) {
      case 'TAG_EVENT':
        console.log('Chamou o elastic');
        await elasticsearchService.index({
          id: item.key,
          tags: item.labels
        });
        dbItem.labels = item.labels;
        break;
      case 'FILTER_EVENT':
        dbItem.blackWhiteFilter = {
          bucket: item.bucket,
          key: item.key
        };
        break;
      case 'THUMBNAIL_EVENT':
        dbItem.thumbnail = {
          bucket: item.bucket,
          key: item.key
        };
        break;
    }

    await dynamoDBService.putItem(dbItem);

  }

  return { message: 'Mensagens consumidas com sucesso!', event };
};
