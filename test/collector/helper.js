

var helper = exports;

var winston = require("winston");

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


helper.getCounters = function(config) {
	//
	// creates winston Counters for each counter in config file
	//
	counters = [];
	for (counter_type in config["counters"]) {
	  switch(counter_type) {
	    case "redis":
		    counters.push(new (winston.counters.Redis)(config["counters"].redis));
			  break;
		  default:
			  // add warning message
				break;
	  }
  }
	return counters;
};