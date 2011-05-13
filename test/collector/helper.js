

var helper = exports;
var winston = require("../../winston");

helper.getTransports = function(config) {
	//
	// creates winston Transports for each transport in config file
	//
	transports = [];
	for (transport_type in config["transports"]) {
	  switch(transport_type) {
	    case "file":
		    transports.push(new (winston.transports.File)(config["transports"].file));
			  break;
		  case "console":
		    transports.push(new (winston.transports.Console)());
				break;	
		  case "loggly":
			  transports.push(new (winston.transports.Loggly)(config["transports"].loggly));
				break;
		  default:
			  // add warning message
				break;
	  }
  }
	return transports;
};
