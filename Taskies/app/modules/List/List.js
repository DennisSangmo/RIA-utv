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
	 * @type {Array<Taskies.app.objects.Taskie>}
	 */
	this._taskies = null;
	
	/**
	 * @private
	 * @type {Taskies.app.objects.Filter}
	 */
	this._currentFilter = Taskies.app.objects.Filter();
};

/**
 * Content type variable
 */
Taskies.app.modules.List.moduleType = Taskies.app.constants.moduleTypes.LIST;

/**
 * Init-function, first to be called
 */
Taskies.app.modules.List.prototype.init = function() {
	this.view.draw(this.sandbox.myElement);
	
	this.sandbox.listen(Taskies.app.constants.events.FILTERUPDATE, this.updateFilter, this);
	this.sandbox.listen(Taskies.app.constants.events.LISTUPDATE, this.updateList, this);
	
	this.sandbox.notify(Taskies.app.constants.events.LISTUPDATE);
};

/**
 * Updates the list
 * @param {Array<Taskies.app.objects.Taskie>} taskies
 */
Taskies.app.modules.List.prototype.updateList = function(taskies){
	if (!taskies) {
		this.sandbox.getTaskies(this._currentFilter);
		return;
	}
	
	this._taskies = taskies;
	
	this.clearList();
	
	if (this._taskies) {
		this.view.drawList(this._taskies);
		
		for (var prop in this.view.elements.detaillinks) {
			goog.events.listen(this.view.elements.detaillinks[prop], 'click', this.listItemClick, false, this);
		}
	} else {
		this.view.drawLoading();
	}
};

/**
 * Updates the filter
 * @param {Taskies.app.objects.Filter} filter
 */
Taskies.app.modules.List.prototype.updateFilter = function(filter) {
	if(filter) {
		this._currentFilter = filter;
	} else {
		this._currentFilter = Taskies.app.objects.Filter();
	}
	this.updateList();
};

/**
 * Linkitem click
 * @param {object} e
 */
Taskies.app.modules.List.prototype.listItemClick = function(e) {
	var a_element = e.currentTarget,
		click_id = this.view.splitId(a_element.id);
	
	for(var i = 0; i < this._taskies.length; i++) {
		if (this._taskies[i]._id == click_id) {
			this.sandbox.notify(Taskies.app.constants.events.DETAILSSELECT, this._taskies[i]);
		}
	}
	
	e.preventDefault();
	
	return false;
};

/**
 * Removes the current list
 */
Taskies.app.modules.List.prototype.clearList = function() {
	for(var i = 0; i < this.view.elements.detaillinks.length; i++){
		goog.events.unlisten(this.view.elements.detaillinks[i], 'click', this.listItemClick, false, this);
	}
	this.view.clear();
};

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.List.prototype.destroy = function() {
	this.view.clear();
};

/**
 * Object containing the view of this module
 */
Taskies.app.modules.List.prototype.view = {
	/**
	 * Object containing the div id's or thies elementobjects
	 */
	elements: {
		container: "list-content",
		detaillinks: {}
	},
	
	/**
	 * Prints the html to the page
	 * @param {object} myElement
	 */
	draw: function(myElement){
		var html = "<div id='" + this.elements.container + "'></div>";
		
		goog.dom.append(myElement, goog.dom.htmlToDocumentFragment(html));
		
		// Change the strings to elements
		this.elements = Taskies.helpers.redoElements(this.elements);
	},
	
	/**
	 * Draw the new list
	 * @param {array<Taskies.app.objects.Taskie>} taskies
	 */
	drawList: function(taskies) {
		var html = "";
		if (taskies.length > 0) {
			for (var prop = 0; prop < taskies.length; prop++) {
					var id = "taskie_" + taskies[prop]._id;
					var d = new Date(taskies[prop].Created);
					html += "<div class='list-row pointerCurser' id='" + id + "'>" +
					"<h4>" + taskies[prop].Name +
					" (" + taskies[prop].Tasks.length + ")</h4><p class='date'>" +
					 + d.getDate() + "-" +  (d.getMonth()+1) + "-" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes() + 
					"</p><p class='description'>" +
					taskies[prop].Description +
					"</p></div>";
					
					this.elements.detaillinks[id] = id;
			}
		} else {
			html = "<div id='empty'>No Taskies matched your filter!</div>";
		}
		
		goog.dom.append(this.elements.container, goog.dom.htmlToDocumentFragment(html));
		this.elements.detaillinks = Taskies.helpers.redoElements(this.elements.detaillinks);
	},
	
	drawLoading: function() {
		var html = "<div id='loading'>Loading...</div>";
		goog.dom.append(this.elements.container, goog.dom.htmlToDocumentFragment(html));
	},
	
	/**
	 * Splits the id number from the element-id
	 * @param {string} stringId
	 * @return {number}
	 */
	splitId: function(stringId) {
		var tmp = stringId.split("_");
		return tmp[1];
	},
	
	/**
	 * Clear the list
	 */
	clear: function(){
		if(typeof this.elements.container == "object") {
			goog.dom.removeChildren(this.elements.container);
			this.elements.listlinks = [];
		}
	}
};
