
/*
 * Analog - Analytics for Node Logs
 * analogsite.js: Web Server for Analog Site
 * Top-level include 
 *
 * Copyright(C) 2011 Mark Soper - masoper at gmail
 * MIT LICENSE
 *
 */
 
var http = require('http'),
    fs = require('fs'),
    path = require('path'),
		loggly = require('loggly'),
    service = require('./service'),
		logglyConfig = JSON.parse(fs.readFileSync('./config/loggly-config.json').toString());

require.paths.unshift(path.join(__dirname, '../..', 'lib'));

var client = loggly.createClient({ "subdomain": logglyConfig.subdomain });

var analog = require('analog');


console.log(JSON.stringify(logglyConfig));

/**
 * Creates the server for the analog web service
 * @param {int} port: Port for the server to run on
 */
exports.createServer = function (port) {
  var router = service.createRouter();
  
  var server = http.createServer(function (request, response) {

    var body = '';
    
    request.on('data', function (chunk) {
      body += chunk;
    });
    
    request.on('end', function () {
      //
      // Dispatch the request to the router
      //
      router.handle(request, body, function (route) {
        response.writeHead(route.status, route.headers);
        response.end(route.body);
				var txn = analog.dumps(request, response, route.body);
 	      client.log(logglyConfig.inputs[0].token, "txn here");
				console.log(txn);
      });
    })
  });
  
  if (port) {
    server.listen(port);
  }
  
  return server;
};

/**
 * Light-weight wrapped to 'createServer' method for future use
 */
exports.start = function (options, callback) {
  var server = exports.createServer(options.port);
  callback(null, server);
}