
//
// recursively extracts flat dict of "logworthy" data from an object (e.g. node request object)
// 

exports.extractObj = function(obj,objname) {
	var levelObj = obj;
	if (objname)
  	var levelName = objname;
	else
	  var levelName = false;
	for (attr in levelObj) {
 		if (typeof(levelObj[attr]) == 'function')
			continue;
		else if (typeof(levelObj[attr]) == 'object' && levelObj[attr] )
		    console.log("level: " + levelName + " , attr: " + attr + " , object ," + String(levelObj[attr].constructor).substr(0,60));
		else
		    console.log("level: " + levelName + " , attr: " + attr + " , type: " + typeof(levelObj[attr]) );	  
	}
};
