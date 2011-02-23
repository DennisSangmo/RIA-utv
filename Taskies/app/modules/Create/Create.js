/**
 * Create module
 * @constructor
 * @param {Taskies.app.Sandbox} sandbox
 */
Taskies.app.modules.Create = function(sandbox) {
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
Taskies.app.modules.Create.prototype.init = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Adds a task string field in the form
 */
Taskies.app.modules.Create.prototype.addTaskField() {
	return "NOT IMPLEMENTED!";
}

/**
 * Adds a tag string field in the form
 */
Taskies.app.modules.Create.prototype.addTagField() {
	return "NOT IMPLEMENTED!";
}

/**
 * Saves the form
 */
Taskies.app.modules.Create.prototype.save() {
	return "NOT IMPLEMENTED!";
}

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Create.prototype.destroy = function() {
	return "NOT IMPLEMENTED!";
}

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Create.view = {
	/**
	 * ID of the main div-element
	 */
	content: "create-content",
	
	/**
	 * Returns full html
	 */
	draw: function() {
		return "<div>NOT IMPLEMENTED</div>";
	}
}
