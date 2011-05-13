
//
// recursively extracts flat dict of "logworthy" data from an object (e.g. node request object)
// 

DATA_TYPES = ["string", "boolean", "number"];

exports.extractObj = function(obj,objname) {
	var objdata = {};
	var levelObj = obj;
	if (objname)
  	var levelName = objname;
	else
	  var levelName = false;
	for (attr in levelObj) {
 		if (typeof(levelObj[attr]) == 'function')
			continue;
		else if (DATA_TYPES.indexOf(typeof(levelObj[attr])) >= 0 )
			insertValue(objdata,levelName,attr,levelObj[attr]);
		else if (typeof(levelObj[attr]) == 'object' && levelObj[attr] )
		  console.log("level: " + levelName + " , attr: " + attr + " , object ," + String(levelObj[attr].constructor).substr(0,60));
		else
		  console.log("level: " + levelName + " , attr: " + attr + " , type: " + typeof(levelObj[attr]) );	  
	}
	for (atr in objdata) {
		console.log(atr + " ::: " + objdata[atr]);
	}
	
};

insertValue = function(objdata,levelName,attr,value) {
	if (levelName)
		objdata[levelName + "." + attr] = value;
	else	
  	objdata[attr] = value;
};