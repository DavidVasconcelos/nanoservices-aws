const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: 'us-east-1'
});

const S3 = new AWS.S3();

const BUCKET = 'nanoservices-images';

const upload = body => {
    
    const id = uuidv4();
    const KEY = id + '.jpg';


    return new Promise((res, rej) => {
        S3.putObject({
            Bucket: BUCKET,
            Key: KEY,
            Body: Buffer.from(body.replace(/^data:image\/\w+;base64,/, ""),'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'           
        }, (err) => {
            if (err) {
                return rej(err);
            }
            return res({
                bucket: BUCKET,
                key: KEY
            });
        });
    });

}

module.exports = {
    upload: upload
}
