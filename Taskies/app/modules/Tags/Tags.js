/**
 * Tags module
 * @constructor
 * @param {Taskies.app.Sandbox} sandbox
 */
Taskies.app.modules.Tags = function(sandbox) {
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
Taskies.app.modules.Tags.prototype.init = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Selects a tag and changes the filter
 */
Taskies.app.modules.Tags.prototype.select = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Tags.prototype.destroy = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Tags.view = {
	/**
	 * ID of the main div-element
	 */
	content: "tag-content",
	
	/**
	 * Returns full html
	 */
	draw: function() {
		return "<div>NOT IMPLEMENTED</div>";
	}
}
