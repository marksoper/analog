
var assert = require('assert');
var vows = require('vows');

var analog = exports;

analog.Logger = function Logger(options) {

};

analog.Logger.prototype = {

  parseRequest : function(request) {
		var reqattrs = {};
		for (attr_i in DEFAULT_REQATTRS) {
			attr = DEFAULT_REQATTRS[attr_i];
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
	  this.reqattrs = reqattrs;
    return JSON.stringify(reqattrs);
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