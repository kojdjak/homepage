var http = require('http');
var aws = require('./aws/aws');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Node');
});

server.listen(33333);
