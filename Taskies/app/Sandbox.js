/**
 * The sandbox object
 * @constructor
 * @param {Taskies.app.Core}
 */
Taskies.app.Sandbox = function(core, myElement){
	/**
	 * The Taskielist
	 * @private
	 * @type {Taskies.app.Core}
	 */
	this.core = core;
	
	/**
	 * The modules DOM element to play in
	 * @public
	 * @type {object}
	 */
	this.myElement = myElement;
};

/**
 * Creates a eventlistener for a module
 * @param {string} names
 * @param {function(Object)} func
 * @param {Object} context
 */
Taskies.app.Sandbox.prototype.listen = function(event, func, context) {
	this.core.createCustomEventListener(event, func, context);
};

/**
 * Fires a, event
 * @param {string} names
 * @param {Object} param
 */
Taskies.app.Sandbox.prototype.notify = function(event, param) {
	this.core.fireCustomEvent(event, param);
};

/**
 * Returns a taskielist representing the filter
 * @param {Taskies.app.objects.Filter} filter
 * @return {array<Taskies.app.objects.Taskie>}
 */
Taskies.app.Sandbox.prototype.getTaskies = function(filter){
	return this.core.getTaskies(filter);
};

/**
 * Returns a taskie from id
 * @param {string} id
 * @return {Taskies.app.objects.Taskie}
 */
Taskies.app.Sandbox.prototype.getTaskie = function(id){
	return this.core.getTaskie(id);
};

/**
 * Saves a taskie to the data storage
 * @param {Taskies.app.objects.Taskie} taskie
 * @return {object}
 */
Taskies.app.Sandbox.prototype.saveTaskie = function(taskie){
	return this.core.saveTaskie(taskie);
};

/**
 * Displays a message in the message window
 * @param {string} message
 * @param {string} type
 */
Taskies.app.Sandbox.prototype.showMessage = function(message, type){
	this.core.showMessage(message, type);
};