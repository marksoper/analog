
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
    path = require('path'),
    winston = require('winston'),
    service = require('./service');

//
// Unshift analog lib path - temporary until installable by npm
//
require.paths.unshift(path.join(__dirname, '../..', 'lib'));
console.log(require.paths.unshift(path.join(__dirname, '../..', 'lib')));

var analog = require('analog');

/**
 * Creates the server for the analog web service
 * @param {int} port: Port for the server to run on
 */
exports.createServer = function (port) {
  var router = service.createRouter();
  var analogger = new analog.Logger();
  
  var server = http.createServer(function (request, response) {

    winston.info(analogger.parseRequest(request));

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
	winston.info(analogger.parseResponse(response));
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