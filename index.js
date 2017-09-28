const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
AWS.config.apiVersions = {
  dynamodb: '2012-08-10',
};

const dynamodb = new AWS.DynamoDB();

exports.handler = (event, context, callback) => {
    const done = (res) => {
        console.log(res);

        callback(null, {
            statusCode: '200',
            body: JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const params = {
        TableName: event.table,
        ProvisionedThroughput: {
            ReadCapacityUnits: event.read_capacity,
            WriteCapacityUnits: event.write_capacity
        } 
    };

    dynamodb.updateTable(params, (err, data) => {
        if (err) {
            console.log('DynamodDB Error', err.stack);
            done({ 'status': 'ERROR', 'message': err.stack });
        } else {
            console.log('DynamoDB OK', data);
            done({ 'status': 'OK' });
        }
    });

};

