

var analog = exports;

analog.Logger = function Logger(options) {

};

analog.Logger.prototype = {

  parseRequest : function(request) {
		var reqattrs = {};
		for (attr in DEFAULT_REQATTRS) {
			attrparts = attr.split(".");
			reqattrs = reqattrs + "\n--------\n" + attr + "  :::  " + request.trailers[attr]; 
		}
    //reqattrs = {"url":request.url};
    //return JSON.stringify(reqattrs);
		this.reqattrs = reqattrs;
		return(reqattrs);
  },

  parseResponse : function(response) {
    resattrs = {"statusCode":response.statusCode};
    return JSON.stringify(resattrs);
  }

};

//
// Default attribute definitions - allow for config file to override these
//

var DEFAULT_REQATTRS = [
	"url",
	"method",
	
	"socket.remoteAddress",
	"socket.remotePort",
	"socket.type",
	
	"socket._idleStart",

	"connection._idleStart",
	
	"headers.accept",
	"headers.host",
	
	
	"readable",
	"httpVersion", // optional
	"statusCode", // ?
];