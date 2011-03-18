/*
 * Closure library requirements
 */
goog.require('goog.dom');
goog.require('goog.pubsub.PubSub');
goog.require('goog.events');
goog.require('goog.string');
goog.require('goog.math');
goog.require('goog.json');

/*
 * Namespaces
 */
Taskies = {};
Taskies.helpers = {};
Taskies.app = {};
Taskies.app.modules = {};
Taskies.app.facades = {};
Taskies.app.facades.interfaces = {};
Taskies.app.objects = {};

/*
 * Constants
 */
Taskies.app.constants = {
	moduleTypes: {
		FILTER: 1,
		LIST: 2,
		CREATE: 3,
		DETAILS: 4
	},
	
	events: {
		LISTUPDATE: "taskie-list-update",
		FILTERUPDATE: "taskie-filter-update",
		DETAILSSELECT: "taskie-details-select",
		CREATE: "taskie-create"
	},
	
	messageTypes:{
		OK: "message-ok",
		ERROR: "message-error"
	},
	
	siteUrl: "http://localhost/Taskies/"
};

/*
 * Start application
 */
window.onload = function(){
	var core = new Taskies.app.Core("application");
	core.register("filter", Taskies.app.modules.Filter);
	core.register("list", Taskies.app.modules.List);
	core.register("details", Taskies.app.modules.Details);
	core.register("create", Taskies.app.modules.Create);
	core.startAll();
	
	var getArgs = Taskies.helpers.getUrlVars();
	
	if(getArgs.length > 0){
		if(getArgs['details']){
			core.getTaskie(getArgs['details']);
		}
	}
};
