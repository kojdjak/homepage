var aws = require('aws-sdk');

//change to config.json
aws.config.loadFromPath('/home/centos/production/homepage/nodejs/aws/config/config2.json');

var ec2 = new aws.EC2();
var ec2AllRegions = [];
var ec2AllRegionsIds = [];
var ec2ApiRegions = [];


ec2.describeRegions({}, function(err, data) {
    if (err) {
        return [];
    }
    else {
        ec2AllRegions = data;
        ec2AllRegions.Regions.forEach(function(item) {
            ec2AllRegionsIds.push(item.RegionName);
            
            aws.config.region = item.RegionName;
            ec2ApiRegions.push(new aws.EC2());
            ec2AllRegionsIds.push(false);
        });
 
    }

});

module.exports = {
    ec2: ec2,
    ec2Regions: ec2AllRegions,
    listInstances: function(callback) {
        ec2.describeInstances({}, function(err, data) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data.Reservations[0].Instances);
            }

        });
    },
    listInstancesSimple: function(callback) {
        ec2.describeInstances({}, function(err, data) {
            if (err) {
                callback(err);
            }
            else {
                var retData = [];
                data.Reservations[0].Instances.forEach(function(item) {
                    retData.push( { name: item.InstanceId } );
                });

                callback(null, retData);
            }

        });
    },
    listInstancesAllRegions: function(callback) {
        var loadedRegions = [];
        var allRegions = [];
        ec2AllRegions.Regions.forEach(function(item) {
            allRegions.push(item.RegionName);
            loadedRegions.push(false);
        });
        var retData = [];

        ec2ApiRegions.forEach(function(regionApi) {
            regionApi.describeInstances({}, function(err, data) {
                if (err) {
                    callback(err);
                }
                else {
                    loadedRegions[allRegions.indexOf(regionApi.config.region)] = true;
                    if (data.Reservations[0] != undefined ) {
                        data.Reservations[0].Instances.forEach(function(item) {
                            retData.push( { name: item.InstanceId } );
                        });
                    }

                   if (callback!=null && areAllTrue(loadedRegions) ) {
                        callback(null, retData);
                   }                   
                }
            });
        });
    }
};

function areAllTrue(array)
{
        for(i=0; i<array.length; i++) 
            if(!array[i]) return false;
        return true;
}
