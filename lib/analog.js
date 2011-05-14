

var analog = exports;
var extractObj = require('parser').extractObj;

analog.parseRequest = function(request) {
	//
	// extracts data from request object
	//
		var reqdata = extractObj(request,'request');
		return reqdata;
};

analog.dumps = function (request, response, response_body) {
	//
	// populate a transaction with data from request object, response object, and response body
	// serialize this transaction object into JSON
	//
	return JSON.stringify(analog.parseRequest(request));
};

analog.loads = function (txn) {
	//
	// parse a transaction back from JSON
	//
	return JSON.parse(txn);
};

