

var analog = exports;

analog.dumps = function (request, response, response_body) {
	//
	// populate a transaction with data from request object, response object, and response body
	// serialize this transaction object into JSON
	//
  var txn = {};
	
	//
	// extract data from request object
	//
	txn["url"] = request.url;
	txn["method"] = request.method;
	txn["remoteAddress"] = request.socket.remoteAddress;
	txn["remotePort"] = request.socket.remotePort;
	txn["socket_type"] = request.socket.type;
	txn["_idleStart"] = request.connection._idleStart;
	txn["request_accept"] = request.headers.accept;
	txn["remoteHost"] = request.headers.host;
	txn["request_readable"] = request.readable;
	txn["request_httpVersion"] = request.httpVersion;
	txn["request_statusCode"] = request.statusCode;
	
	//
	// extract data from response object
	//
	txn["response_statusCode"] = response.statusCode;
	txn["_headers"] = response._headers;
	
	//
	// store the response body
	//
	txn["response_body"] = response_body;
	
	return JSON.stringify(txn);
};

analog.loads = function (txn) {
	//
	// parse a transaction back from JSON
	//
	return JSON.parse(txn);
};

