/**
 * Details module
 * @constructor
 * @param {Taskies.app.Sandbox} sandbox
 */
Taskies.app.modules.Details = function(sandbox) {
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
Taskies.app.modules.Details.prototype.init = function() {
	return "NOT IMPLEMENTED!";
}
Taskies.app.modules.Details.prototype.show = function(taskie) {
	return "NOT IMPLEMENTED!";
}

/**
 * Hide the details
 */
Taskies.app.modules.Details.prototype.hide = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Details.prototype.destroy = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Details.view = {
	/**
	 * ID of the main div-element
	 */
	content: "Details-content",
	
	/**
	 * Returns full html
	 */
	draw: function() {
		return "<div>NOT IMPLEMENTED</div>";
	}
}
