/**
 * Filter module
 * @constructor
 * @param {Taskies.app.Sandbox} sandbox
 */
Taskies.app.modules.Filter = function(sandbox) {
	/**
	 * @private
	 * @type {Taskies.app.Sandbox}
	 */
	this.sandbox = sandbox;
	
	return "NOT IMPLEMENTED!";
}

/**
 * Init-function, first to be called
 */
Taskies.app.modules.Filter.prototype.init = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Saves the new filter
 */
Taskies.app.modules.Filter.prototype.save = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Filter.prototype.destroy = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Filter.view = {
	/**
	 * ID of the main div-element
	 */
	content: "filter-content",
	
	/**
	 * Returns full html
	 */
	draw: function() {
		return "<div>NOT IMPLEMENTED</div>";
	}
}
