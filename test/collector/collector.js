
/*
 * Analog - Analytics for Node Logs
 * server.js: Example Web Server for Analog
 *
 * Copyright(C) 2011 Mark Soper - masoper at gmail
 * MIT LICENSE
 *
 */
 
var http = require('http'),
    fs = require('fs'),
		sys = require('sys'),
    path = require('path');

require.paths.unshift(path.join(__dirname, '../../', 'lib'));

var analog = require('analog');

exports.createServer = function (port) {
 
  var server = http.createServer(function (request, response) {

    var body = '';
    
    request.on('data', function (chunk) {
      body += chunk;
    });
    
    request.on('end', function () {
			var collected_data = analog.dumps(request,response,'');
			response.writeHead(200);
		  response.end(collected_data);
			analog.write(request,response,collected_data);
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
//exports.start = start;

config = JSON.parse(fs.readFileSync('../config/config.json').toString());

exports.start(config, function (err, server) {
  if (err) {
    return sys.puts('Error starting analog example server: ' + err.message);
  }
  sys.puts('analog example server listening on http://127.0.0.1:' + config.collector_port);
});

