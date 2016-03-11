var http = require('http');
var express = require('express');
var app = express();

var aws = require('./aws/aws');

app.get('/aws/', function(req, res) {
    aws.ec2.describeInstances({}, function(err, data) {
        if (err)
            res.send(500, {error: "something goes wrong"});
        else 
            res.send(data);
    });
});

app.get('/aws2/', function(req, res) {
    aws.listInstances(function(err, data) {
        if (err)
            res.send(500, {error: "something goes wrong"});
        else 
            res.send(data);
    });
});


var server = app.listen(33333, function() {
    var host = server.address().address
    var port = server.address().port

     console.log("Listening at http://%s:%s", host, port)

})

//var server = http.createServer(function(req, res) {
//  res.writeHead(200);
//  res.end('Hello Node');
//});
//server.listen(33333);
