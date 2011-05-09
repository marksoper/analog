
var path = require('path'),
    vows = require('vows'),
		fs = require('fs'),
    assert = require('assert'),
    winston = require('winston');

var config = JSON.parse(fs.readFileSync("./loggly-config.json").toString());

//var	logglyTransport = new (winston.transports.Loggly)({ 
//  subdomain: config.transports.loggly.subdomain,
//  inputName: config.transports.loggly.inputName,
//  inputToken: config.transports.loggly.inputToken,
//  auth: config.transports.loggly.auth	
//});

var	logglyTransport = new (winston.transports.Loggly)(config.transports.loggly);

var logger = new (winston.Logger)({
	//levels: syslogConfig.levels,
	transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './test.log' }),
    logglyTransport
  ]
});

var logval = "logglyT-test || " + JSON.stringify(logglyTransport);
logger.info(logval);

vows.describe('loggly Transport').addBatch({
  "An instance of the Loggly Transport": {
    "when called with level info": {
		  "should write the following to loggly": logger.info(logval, function(res) {
			  console.log(JSON.stringify(res));
		  })
	  }
	}
}).export(module);	

