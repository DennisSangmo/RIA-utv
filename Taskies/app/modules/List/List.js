/**
 * List module
 * @constructor
 * @param {Taskies.app.Sandbox} sandbox
 */
Taskies.app.modules.List = function(sandbox) {
	/**
	 * @private
	 * @type {Taskies.app.Sandbox}
	 */
	this.sandbox = sandbox;
	
	/**
	 * @private
	 * @type {Array.<Object>}
	 */
	this.taskieList = [];
	
	return "NOT IMPLEMENTED!";
}

/**
 * Init-function, first to be called
 */
Taskies.app.modules.List.prototype.init = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Show the list with the filter
 * @param {Object} filter
 */
Taskies.app.modules.List.prototype.applyFilter = function(filter) {
	return "NOT IMPLEMENTED!";
}

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.List.prototype.destroy = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Object containing the view of this module
 */
Taskies.app.modules.List.view = {
	/**
	 * ID of the main div-element
	 */
	content: "lsit-content",
	
	/**
	 * Returns full html
	 */
	draw: function() {
		return "<div>NOT IMPLEMENTED</div>";
	}
}
