/**
 * The sandbox object
 * @constructor
 * @param {Taskies.app.Core}
 */
Taskies.app.Sandbox = function(core){
	/**
	 * The Taskielist
	 * @private
	 * @type {Taskies.app.Core}
	 */
	this.core = core;
}

/**
 * Creates a eventlistener for a module
 * @param {Array.<string>} names
 * @param {function(Object)} func
 * @param {Object} context
 */
Taskies.app.Sandbox.prototype.listen = function(names, func, context) {
	return "NOT IMPLEMENTED!";
}

/**
 * Fires a, event
 * @param {Object} note
 */
Taskies.app.Sandbox.prototype.notify = function(note) {
	return "NOT IMPLEMENTED!";
}
