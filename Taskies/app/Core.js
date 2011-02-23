/**
 * The main applikationobject
 * @constructor
 */
Taskies.app.Core = function(){
	/**
	 * The Taskielist
	 * @private
	 * @type {Array.<object>}
	 */
	this.moduleList = [];
	
	/**
	 * The Database facadeobject
	 * @private
	 * @type {IDBfacade}
	 */
	this.DBfacade = Taskies.app.facades.CouchDB;
	
	/**
	 * The library facadeobject
	 * @private
	 * @type {ILibraryfacade}
	 */
	this.Libraryfacade = Taskies.app.facades.ClosureLibraryFacade;
	
	return "NOT IMPLEMENTED!";
}

/**
 * Register a new application module
 * @param {string} moduleId
 * @param {function(Taskies.app.Sandbox)} creator
 */
Taskies.app.Core.prototype.register = function(moduleId, creator){
	return "NOT IMPLEMENTED!";
}

/**
 * Will call the init function
 * @param {string} moduleId
 */
Taskies.app.Core.prototype.start = function(moduleId){
	return "NOT IMPLEMENTED!";
}

/**
 * Will call the init function in all modules
 */
Taskies.app.Core.prototype.startAll = function(){
	return "NOT IMPLEMENTED!";
}

/**
 * Will call the destroy function
 * @param {string} moduleId
 */
Taskies.app.Core.prototype.stop = function(moduleId){
	return "NOT IMPLEMENTED!";
}

/**
 * Will call the destroy function in all modules
 */
Taskies.app.Core.prototype.stopAll = function(){
	return "NOT IMPLEMENTED!";
}

/**
 * Creates a eventlistener
 * @param {Array.<string>} names
 * @param {function(Object)} func
 * @param {Object} context
 */
Taskies.app.Core.prototype.createCustomEventListener = function(names, func, context){
	//Pubsub
	return "NOT IMPLEMENTED!";
}

/**
 * Fires a event
 * @param {Object} note
 */
Taskies.app.Core.prototype.fireCustomEvent = function(node){
	return "NOT IMPLEMENTED!";
}
