/**
 * The main applikationobject
 * @constructor
 */
Taskies.app.Core = function(container){
	/**
	 * The Taskielist
	 * @private
	 * @type {Array.<object>}
	 */
	this.moduleList = [];
	
	/**
	 * The Datastorage facadeobject
	 * @private
	 * @type {IDBfacade}
	 */
	//this.Datastorage = new Taskies.app.facades.MemoryFacade(this);
	this.Datastorage = new Taskies.app.facades.CouchDBFacade(this);
	
	/**
	 * Pubsub object. Topic-based publish/subscribe channel.
	 * Works as an eventhander
	 * @private
	 * @type {goog.pubsub.PubSub}
	 */
	this.pubsub = new goog.pubsub.PubSub();
	
	// Appys the html
	this.view.draw(container);
	
};

/**
 * Register a new application module
 * @param {string} moduleId
 * @param {function(Taskies.app.Sandbox)} creator
 */
Taskies.app.Core.prototype.register = function(moduleId, creator){
	this.moduleList[moduleId] = {
		creator: creator,
		instance: null
	};
};

/**
 * Will call the init function
 * @param {string} moduleId
 */
Taskies.app.Core.prototype.start = function(moduleId){
	// Assign the module element
	var element = null,
		moduletypes = Taskies.app.constants.moduleTypes;
		
	switch(this.moduleList[moduleId].creator.moduleType) {
		case moduletypes.FILTER:
			element = this.view.elements.filter;
			break;
		case moduletypes.LIST:
			element = this.view.elements.list;
			break;
		case moduletypes.DETAILS:
			element = this.view.elements.details;
			break;
		case moduletypes.CREATE:
			element = this.view.elements.create;
			break;
	}
	
	this.moduleList[moduleId].instance = new this.moduleList[moduleId].creator(new Taskies.app.Sandbox(this, element));
	this.moduleList[moduleId].instance.init();
};

/**
 * Will call the init function in all modules
 */
Taskies.app.Core.prototype.startAll = function(){
	for (var moduleId in this.moduleList){
		if(this.moduleList.hasOwnProperty(moduleId)){
			this.start(moduleId);
		}
	}
};

/**
 * Will call the destroy function
 * @param {string} moduleId
 */
Taskies.app.Core.prototype.stop = function(moduleId){
	var module = this.moduleList[moduleId];
	if(module.instance){
		module.instance.destroy();
		module.instance = null;
	}
};

/**
 * Will call the destroy function in all modules
 */
Taskies.app.Core.prototype.stopAll = function(){
	for (var moduleId in this.moduleList){
		if(this.moduleList.hasOwnProperty(moduleId)){
			this.stop(moduleId);
		}
	}
};

/**
 * Creates a eventlistener
 * @param {Array.<string>} names
 * @param {function(Object)} func
 * @param {Object} context
 */
Taskies.app.Core.prototype.createCustomEventListener = function(event, func, context){
	var test = false,
		events = Taskies.app.constants.events;
	
	// Test to see if event exists
	for(var prop in events) {
		if(events[prop] === event) test = true;
	}
	
	if(typeof func != "function") test = false;
	
	// If test passed
	if(test){
		this.pubsub.subscribe(event, func, context);
	}
	return false;
};

/**
 * Fires a event
 * @param {Object} note
 */
Taskies.app.Core.prototype.fireCustomEvent = function(event, param){
	var test = false,
		events = Taskies.app.constants.events;
	
	// Test to see if event exists
	for(var prop in events) {
		if(events[prop] === event) test = true;
	}
	
	// If test passed
	if(test){
		this.pubsub.publish(event, param);
	}
	return false;
};

/**
 * Returns the taskielist from the datastorage
 * @param {Taskies.app.objects.Filter} filter
 * @return {array<Taskies.app.objects.Taskie>}
 */
Taskies.app.Core.prototype.getTaskies = function(filter){
	return this.Datastorage.getList(filter);
};

/**
 * Returns the taskie from the datastorage
 * @param {String} id
 * @return {Taskies.app.objects.Taskie}
 */
Taskies.app.Core.prototype.getTaskie = function(id){
	return this.Datastorage.get(id);
};

/**
 * Saves a taskie to the data storage
 * @param {Taskies.app.objects.Taskie} taskie
 * @return {Taskies.app.objects.Taskie}
 */
Taskies.app.Core.prototype.saveTaskie = function(taskie){
	var obj = this.Datastorage.save(taskie); 
	if(obj) {
		this.fireCustomEvent(Taskies.app.constants.events.LISTUPDATE);
		return obj;
	} else {
		return null;
	}
};

/**
 * Main application view object
 */
Taskies.app.Core.prototype.view = {
	/**
	 * Object containing the div id's or thies elementobjects
	 */
	elements: {
		container: "taskies-content",
		top: "taskies-top",
		header: "taskies-header",
		bottom: "taskies-bottom",
		filter: "taskies-filter",
		list: "taskies-list",
		details: "taskies-details",
		create: "taskies-create"
	},
	
	/**
	 * Returns full html
	 */
	draw: function(container){
		var appDiv = goog.dom.getElement(container),
			html = "<div id='" + this.elements.details + "'></div>"+
			"<div id='" + this.elements.create + "'></div>"+
			"<div id='" +
			this.elements.top +
			"'><div id='"+this.elements.header+"'></div><div id='" +
			this.elements.filter +
			"'></div></div>" +
			"<div id='" +
			this.elements.bottom +
			"'><div id='" +
			this.elements.list +
			"'> </div></div>";
		
		goog.dom.append(appDiv, goog.dom.htmlToDocumentFragment(html));
		
		// Change the strings to elements
		this.elements = Taskies.helpers.redoElements(this.elements);
	}
};
