var aws = require('aws-sdk');

//change to config.json
aws.config.loadFromPath('/home/centos/production/homepage/nodejs/aws/config/config2.json');

var ec2 = new aws.EC2();

module.exports = {
    ec2: ec2,
    listInstances: function(callback) {
        ec2.describeInstances({}, function(err, data) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data.Reservations[0].Instances);
            }

        });
    }
};


