
//
// recursively extracts flat dict of "logworthy" data from an object (e.g. node request object)
// 

exports.extractObj = function(obj,objname) {
	var levelObj = obj;
	if (objname)
  	var levelName = objname;
	else
	  var levelName = false;
	for (attr in level) {
		if (typeof(level[attr]) == 'function')
			continue;
		else if (typeof(level[attr]) == 'object' )
		  console.log("level: " + levelName + " , attr: " + attr + " , object ," + level.level[attr].constructor);
	}
};
