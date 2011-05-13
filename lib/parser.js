
//
// recursively extracts flat dict of "logworthy" data from an object (e.g. node request object)
// 

DATA_TYPES = ["string", "boolean", "number"];


exports.extractObj = extractObj = function(obj,objname) {
	var objdata = {};
	var levelObj = obj;
	if (objname)
  	var levelName = objname;
	else
	  var levelName = false;
	for (attr in levelObj) {
 		if (typeof(levelObj[attr]) == 'function') // ignore functions
			continue;
                else if (attr == "socket" || attr == "connection" || attr == "client")
		    continue;
		else if (DATA_TYPES.indexOf(typeof(levelObj[attr])) >= 0 ) // insert approved data types
			insertValue(objdata,levelName,attr,levelObj[attr]);
		else if (typeof(levelObj[attr]) == 'object' && levelObj[attr] )  // extract sub-objects recursively
		  { console.log("level: " + levelName + " , attr: " + attr + " , object ," + String(levelObj[attr].constructor).substr(0,60));
		      var subdata = extractObj(levelObj[attr],determineFullAttrName(levelName,attr));
			for (subattr in subdata) {
				objdata[subattr] = subdata[subattr];
			}
		  }
		else
		  console.log("SKIPPED level: " + levelName + " , attr: " + attr + " , type: " + typeof(levelObj[attr]) );	  
	}
	for (atr in objdata) {
		console.log(atr + " ::: " + objdata[atr]);
	}
	return objdata;
	
};

exports = extractObj;


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
