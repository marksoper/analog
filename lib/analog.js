

var analog = exports;

analog.Logger = function Logger(options) {

};

analog.Logger.prototype = {

  parseRequest : function(request) {
    reqattrs = {"url":request.url};
    return JSON.stringify(reqattrs);
  },

  parseResponse : function(response) {
    resattrs = {"statusCode":response.statusCode};
    return JSON.stringify(resattrs);
  }

};