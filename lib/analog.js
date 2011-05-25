




//
// function Analog (options)
//   Constructor for the Analog instrument object.
//
var Analog = exports.Analog = function () {
};

//
// function parseRequest (request)
//   extracts data from request object
//
Analog.prototype.parseRequest = function(request) {
		var reqdata = extractObj(request,'request');
		return reqdata;
};


//
// function parseTransaction (request)
//   extracts data for transaction (request + response)
//
Analog.prototype.transform = function(request, response, response_body) {
	return Analog.prototype.parseRequest(request);
};



BASIC_DATA_TYPES = ["string", "boolean", "number"];
CONSTRUCTOR_DATA_TYPES = ["Date"];
MAX_DEPTH = 2;

// 
// function extractObj (obj, objname, level_count)
//   recursively extracts flat dict of loggable data from an object (e.g. node request object)
//
exports.extractObj = extractObj = function(obj,objname,level_count) {
	if (typeof(level_count) == 'undefined') {
		var level_count = 1;
	}
	if (typeof(passobjs) == 'undefined')
	  var passobjs = [];
	if (objname)
	  var levelName = objname;
  else
	  var levelName = false;
	var levelObj = obj;
	var objdata = {};
	for (attr in levelObj) {
		
		// ignore functions
 		if (typeof(levelObj[attr]) == 'function')
			continue;
			
		// insert approved data types
		else if (BASIC_DATA_TYPES.indexOf(typeof(levelObj[attr])) >= 0 )
			insertValue(objdata,levelName,attr,levelObj[attr]);
		
		// handle objects	
		else if (typeof(levelObj[attr]) == 'object' && levelObj[attr] )  {
			var constructor_data_type = determineTypeByConstructor(levelObj[attr]);

			// handle approved "data objects" (e.g. Date) as determined by constructor name
			if (CONSTRUCTOR_DATA_TYPES.indexOf(constructor_data_type) >= 0) 
			  insertValue(objdata,levelName,attr,String(levelObj[attr]));
			
			// handle potentially multi-field and hierarchical extract sub-objects recursively
			else { 
		  	if (level_count < MAX_DEPTH && passobjs.length == 0) {
		      var subdata = extractObj(levelObj[attr],determineFullAttrName(levelName,attr),level_count+1);
			    for (subattr in subdata) {
				    objdata[subattr] = subdata[subattr];
			    }
		    }
		  }
		}
		else
		  
			// TEMPORARY: log to console anything not handled
		  console.log("SKIPPED level: " + levelName + " , attr: " + attr + " , type: " + typeof(levelObj[attr]) );	  
	}

	return objdata;
	
};


// function determineTypeByConstructor(obj)
//   tries to determine type of object by name of its constructor
determineTypeByConstructor = function(obj) {
	var functionNameRE = /\s*function\s*([^(]*)/;
	var match = functionNameRE.exec(String(obj.constructor).substr(0,100));
	if (match)
		return match[1];
	else
		return false;	  
};


// function determineFullAttrName(obj)
//   creates a fully-qualified attribute name by prefixing level name to attr name
DELIMITER = "."
determineFullAttrName = function(levelName,attr) {
	if (levelName)
		return levelName + DELIMITER + attr;
	else
	  return attr;
};


// function insertValue(obj)
//   determines fully-qualified attr name and inserts attr:value pair into objdata
insertValue = function(objdata,levelName,attr,value) {
	fullAttrName = determineFullAttrName(levelName,attr);
	objdata[fullAttrName] = value;
};

