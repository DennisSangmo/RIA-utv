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

// Read a page's GET URL variables and return them as an associative array.
Taskies.helpers.getUrlVars = function() {
    var vars = [], hash;
	if(window.location.href.indexOf('?') > 0){
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	 
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	}
    return vars;
};


Taskies.helpers.copyToClipboard = function(s) {
	
};