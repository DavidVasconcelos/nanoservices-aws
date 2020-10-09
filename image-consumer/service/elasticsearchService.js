const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'https://vpc-elasticsearch-cluster-4qiv4s2bcahsiwbyvft5eik23a.us-east-1.es.amazonaws.com',  
  apiVersion: '7.7',
});

const index = async documento => {

    await client.index({
        index: 'imagens',
        type: 'object',
        body: documento
      });
}

module.exports = {
    index: index
}