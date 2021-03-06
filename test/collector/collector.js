
/*
 * Analog - Analytics for Node Logs
 * collector.js: Example Web Server for Analog
 *
 * Copyright(C) 2011 Mark Soper - masoper at gmail
 * MIT LICENSE
 *
 */
 
var http = require('http'),
    fs = require('fs'),
    sys = require('sys'),
    path = require('path'),
    winston = require('winston'),
    helper = require('./helper'),
    analog = require('../../lib/analog');

// construct winston transport(s)
  var	configFile = path.join(__dirname, '../config/', 'test-config.json'),
    config = JSON.parse(fs.readFileSync(configFile).toString()),
		transports = helper.getTransports(config)

var instrument = new (analog.Analog)();

var logger = new (winston.Logger)({
		  transports: transports,
		  });

exports.createServer = function (port) {
 
  var server = http.createServer(function (request, response) {

    var body = '';
    
    request.on('data', function (chunk) {
      body += chunk;
    });
    
    request.on('end', function () {
	    console.log("--------------");

		  var response_body = "response body goes here";
			response.writeHead(200);
		  response.end(response_body);
			logger.log("info","message payload",instrument.transform(request, response, response_body));
			//logger.log("info","message payload",{'testmeta_key':'testmeta_val'});
			//console.log("sent: " + response_body);
			//logger.log("info","message payload");
			
    });
  
	});
		
  if (port) {
    server.listen(port);
  }
  
  return server;

};

exports.start = function(options, callback) {
  var server = exports.createServer(options.collector_port);
  callback(null, server);
};

var config = {'collector_port' : 8000};

exports.start(config, function (err, server) {
  if (err) {
    return sys.puts('Error starting analog example server: ' + err.message);
  }
  sys.puts('analog example server listening on http://127.0.0.1:' + config.collector_port);
});

