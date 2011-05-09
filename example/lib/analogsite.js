
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
    winston = require('winston'),
    service = require('./service'),
    syslogConfig = require('../config/syslog-config'),
		logglyConfig = JSON.parse(fs.readFileSync('./config/loggly-config.json').toString())["transports"]["loggly"];

//
// Unshift analog lib path - temporary until installable by npm
//
require.paths.unshift(path.join(__dirname, '../..', 'lib'));

//
// Configure winston
//
winston.setLevels(syslogConfig.levels);

var logger = new (winston.Logger)({
	levels: syslogConfig.levels,
	transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './log/ana.log' }),
    new (winston.transports.Loggly)(logglyConfig)
  ]
});

var analog = require('analog');


// debugging
debugger;
console.log(logger.levels);
console.log(logglyConfig);
logger.info("test analog");












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
				debugger;
        console.log(logger.levels);
	      console.log(logger["analog"]);
				logger.info(analog.dumps(request, response, route.body));
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