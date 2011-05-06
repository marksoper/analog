
var assert = require('assert');
var vows = require('vows');

var analog = exports;

analog.Logger = function Logger(options) {

};

analog.Logger.prototype = {

  requestToJSON : function(request) {
		var reqattrs = {};
		for (attr_i in REQUEST_ATTRS) {
			attr = REQUEST_ATTRS[attr_i];
			console.log(attr);
			attrparts = attr.split(".");
			console.log(attrparts[0]);
			if (attrparts.length === 1) {
				reqattrs[attrparts[0]] = request[attrparts[0]];
			} else if (attrparts.length === 2) {
				reqattrs[attrparts[1]] = request[attrparts[0]][attrparts[1]];
			} else {
				assert.isTrue(attrparts.length === 1 || attrparts.length === 2);
				return;
			}
			console.log("\n reqattrs -- " + attr + "  :::  " + reqattrs[attr]);
		}
	  this.request = reqattrs;
    return JSON.stringify(reqattrs);
  },

  responseToJSON : function(response) {
		resattrs = {"body":response.body};
		
		for (attr_i in RESPONSE_ATTRS) {
			attr = RESPONSE_ATTRS[attr_i];
			console.log(attr);
			attrparts = attr.split(".");
			console.log(attrparts[0]);
			if (attrparts.length === 1) {
				resattrs[attrparts[0]] = response[attrparts[0]];
			} else if (attrparts.length === 2) {
				resattrs[attrparts[1]] = response[attrparts[0]][attrparts[1]];
			} else {
				assert.isTrue(attrparts.length === 1 || attrparts.length === 2);
				return;
			}
			console.log("\n reqattrs -- " + attr + "  :::  " + resattrs[attr]);
		}
		resattrs.request = this.request;
	  this.response = resattrs;
		
		
		
//		for (attr in response) {
	//		console.log("\n response -- " + attr + "  :::  " + response[attr]);
		//}
		
    return JSON.stringify(resattrs);	    

  }

};

//
// Default attribute definitions - allow for config file to override these
//

var REQUEST_ATTRS = [
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

var RESPONSE_ATTRS = [
	"statusCode",
	"_header",
	"body"
];