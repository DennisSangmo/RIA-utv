/*
 * Helper functions
 */
Taskies.helpers.redoElements = function(obj) {
	var tmp = {};
	for (var prop in obj) {
		if(typeof obj[prop] == "string") {
			tmp[prop] = goog.dom.getElement(obj[prop]);
		} else {
			tmp[prop] = obj[prop];
		}
	}
	return tmp;
};

Taskies.helpers.makePostReady = function(obj) {
	var ret = "",
		tmp = "";
	/*for(var i in obj) {
		if (obj[i] instanceof Array) {
			tmp = "[";
			for(var j = 0; j < obj[i].length; j++){
				if(j == obj[i].length-1){
					tmp += "'"+obj[i][j]+"'";
				} else {
					tmp += "'"+obj[i][j]+"',";
				}
			}
			ret += i + "=" + tmp + "]&";
		}
		else {
			ret += i + "=" + obj[i] + "&";
		}
	}*/
	return "json="+JSON.stringify(obj);
};