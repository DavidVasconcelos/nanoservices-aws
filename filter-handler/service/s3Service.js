const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const S3 = new AWS.S3();

const BUCKET = 'nanoservices-aws-images-black-white';

const getObject = (bucket, key) => {
    return new Promise((res, rej) => {
        S3.getObject({
            Bucket : bucket,
            Key: key
        }, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res(data.Body);
        });

    });
}

const putObject = (buffer, fileName) => {
    return new Promise((res, rej) => {
        S3.putObject({
            Bucket : BUCKET,
            Key: fileName,
            Body: buffer
        }, (err, data) => {
            if (err) {
                return rej(err);
            }
            return res({
                bucket: BUCKET,
                key: fileName            
            });
        });

    });
}




module.exports = {
    getObject: getObject,
    putObject: putObject
}