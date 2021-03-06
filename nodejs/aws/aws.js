var aws = require('aws-sdk');

//change to config.json
aws.config.loadFromPath('/home/centos/production/homepage/nodejs/aws/config/config2.json');

var ec2 = new aws.EC2();
var ec2AllRegions = [];
var ec2ApiRegions = [];

//this is to initialize regions API to be used later.
ec2.describeRegions({}, function(err, data) {
    if (err) {
        return [];
    }
    else {
        ec2AllRegions = data;
        //get all regions and create new API for each of them
        ec2AllRegions.Regions.forEach(function(item) {
            aws.config.region = item.RegionName;    //reuse the same aws, only change region
            ec2ApiRegions.push(new aws.EC2());
        });
 
    }

});

module.exports = {
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
        //initialize what of regions has been already loaded and returned
        var loadedRegions = [];
        var allRegions = [];
        ec2AllRegions.Regions.forEach(function(item) {
            allRegions.push(item.RegionName);
            loadedRegions.push(false);
        });
        var retData = [];   //data to retunr. will be updtaed with response from all retions

        ec2ApiRegions.forEach(function(regionApi) {
            regionApi.describeInstances({}, function(err, data) {
                if (err) {
                    //just error 
                    callback(err);
                }
                else {
                    //process one region
                    loadedRegions[allRegions.indexOf(regionApi.config.region)] = true;
                    if (data.Reservations[0] != undefined ) {
                        data.Reservations[0].Instances.forEach(function(item) {
                            retData.push( { name: item.InstanceId } );
                        });
                    }
                    //if all regions are back, return aggregated result
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
