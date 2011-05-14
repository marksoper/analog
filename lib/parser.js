
//
// recursively extracts flat dict of loggable data from an object (e.g. node request object)
// 

BASIC_DATA_TYPES = ["string", "boolean", "number"];
CONSTRUCTOR_DATA_TYPES = ["Date"];
MAX_DEPTH = 2;

exports.extractObj = extractObj = function(obj,objname,level_count,passobjs) {
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
		//if (typeof(levelObj[attr]) == 'object')
		  
 		if (typeof(levelObj[attr]) == 'function') // ignore functions
			continue;
		else if (BASIC_DATA_TYPES.indexOf(typeof(levelObj[attr])) >= 0 ) // insert approved data types
			insertValue(objdata,levelName,attr,levelObj[attr]);
		else if (typeof(levelObj[attr]) == 'object' && levelObj[attr] )  {
			var constructor_data_type = determineTypeByConstructor(levelObj[attr]);
			//	
			// handle "data objects" (e.g. Date)
			//
			if (CONSTRUCTOR_DATA_TYPES.indexOf(constructor_data_type) >= 0) 
			  insertValue(objdata,levelName,attr,String(levelObj[attr]));
			//	
			// handle potentially multi-field and hierarchical extract sub-objects recursively
			//
			else { 
  		  console.log("---------" + attr + " ::: " + " (" + typeof(levelObj[attr]) + ") " + " (" + String(levelObj[attr].constructor).substr(0,30) + ") " + levelObj[attr]);
	  		//console.log("considering " + attr + "," + passobjs.length + "," + (level_count < MAX_DEPTH));
		  	if (level_count < MAX_DEPTH && passobjs.length == 0) {
			  //if (level_count < MAX_DEPTH && ((passobjs.length > 0 && passobj.indexOf(levelObj[attr])) || (passobjs.length == 0))) {
			    //console.log("level: " + levelName + " , attr: " + attr + " , object ," + String(levelObj[attr].constructor).substr(0,60));
		      var subdata = extractObj(levelObj[attr],determineFullAttrName(levelName,attr),level_count+1);
			    for (subattr in subdata) {
				    objdata[subattr] = subdata[subattr];
			    }
		    }
		  }
		}
		else
		  console.log("SKIPPED level: " + levelName + " , attr: " + attr + " , type: " + typeof(levelObj[attr]) );	  
	}
	//for (atr in objdata) {
		//console.log(atr + " ::: " + objdata[atr]);
	//}
	return objdata;
	
};

exports = extractObj;

determineTypeByConstructor = function(obj) {
	var functionNameRE = /\s*function\s*([^(]*)/;
	var match = functionNameRE.exec(String(obj.constructor).substr(0,100));
	if (match)
		return match[1];
	else
		return false;	  
};

DELIMITER = "."
determineFullAttrName = function(levelName,attr) {
	if (levelName)
		return levelName + DELIMITER + attr;
	else
	  return attr;
};

insertValue = function(objdata,levelName,attr,value) {
	fullAttrName = determineFullAttrName(levelName,attr);
	objdata[fullAttrName] = value;
};
