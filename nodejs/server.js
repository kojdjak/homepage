require("node-jsx").install();
//require('babel-register'); 

var express = require('express');
var app = express();
var ReactDOMServer = require('react-dom/server');
var React = require('react');
var ReactApp = React.createFactory(require('./react/components/app.js').ReactApp);

var aws = require('./aws/aws');

app.get('/awsTest/', function(req, res) {
   aws.listInstancesSimple(function(err, data) {
       if (err)
            res.send(500, {error: err.message});
        else { 
           res.json(data);
        }
    });
});

app.get('/awsAllVMs/', function(req, res) {
    aws.listInstancesAllRegions(function(err, data) {
       if (err)
       res.send(500, {error: err.message});
       else { 
          res.json(data);
       }
    });
});

app.get('/react/', function(req, res) {
    var reactHtml = ReactDOMServer.renderToString(ReactApp({}));
    res.send(reactHtml);
});

var server = app.listen(33333, '127.0.0.1',  function() {
    var host = server.address().address
    var port = server.address().port

     console.log("Listening at http://%s:%s", host, port)

});

//var server = http.createServer(function(req, res) {
//  res.writeHead(200);
//  res.end('Hello Node');
//});
//server.listen(33333);
