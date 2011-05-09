


var	fs = require('fs'),
	  loggly = require('loggly');
	
var config = JSON.parse(fs.readFileSync("./loggly-config.json").toString());

var client = loggly.createClient({ "subdomain": config.subdomain });

client.log(config.inputs[0].token,
	'this is a test logging message from /test/input-test.js');
