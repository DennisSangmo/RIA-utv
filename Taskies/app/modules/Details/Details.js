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
};

/**
 * Content type variable
 */
Taskies.app.modules.Details.moduleType = Taskies.app.constants.moduleTypes.DETAILS;

/**
 * Init-function, first to be called
 */
Taskies.app.modules.Details.prototype.init = function() {
	// draw the html
	this.view.draw(this.sandbox.myElement);
	
	// Initiually hide the div
	goog.dom.classes.add(this.sandbox.myElement, "hide");
	
	// Add a listiner to detailsselect
	this.sandbox.listen(Taskies.app.constants.events.DETAILSSELECT, this.show, this);
	
	// Init events
	goog.events.listen(this.view.elements.overlay, "click", this.hide, false, this);
};

/** 
 * Previews the selected Taskie
 * @param {Object||String} taskie
 */
Taskies.app.modules.Details.prototype.show = function(taskie) {
	if(typeof taskie == "string") {
		taskie = this.sandbox.getTaskie(taskie);
	}
	
	goog.dom.classes.remove(this.sandbox.myElement, "hide");
	
	if (typeof taskie == "object" && (taskie._id)) {
		this.view.showTaskie(taskie);
		
		// start some events
		goog.events.listen(this.view.elements.detail.copyBtn, 'click', function(){
			Taskies.helpers.copyToClipboard(this.view.elements.detail.linkField);
		}, false, this);
	} else {
		this.view.show404();
	}
	var wp = goog.dom.getViewportSize();
	var left = (wp.width - 500) / 2;
	if(wp.height<600)
		var height = wp.height-70;
	else
		var height = 600;
	goog.dom.setProperties(this.view.elements.container, {'style': 'left:'+left+'; height:' + height + 'px;'});
};

/**
 * Hide the details
 */
Taskies.app.modules.Details.prototype.hide = function() {
	// Hide the div
	goog.dom.classes.add(this.sandbox.myElement, "hide");
	
	// Empty the current taskiehtml
	this.view.clear();
};

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Details.prototype.destroy = function() {
	this.hide();
	goog.events.removeAll(this.view.elements.overlay);
};

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Details.prototype.view = {
	/**
	 * Object containing the div id's or thies elementobjects
	 */
	elements: {
		overlay: "details-overlay",
		container: "details-content",
		close: "details-close",
		taskie: "details-taskie",
		tasks: "details-tasks",
		detail:{
			linkField: "detail-link-field",
			copyBtn: "detail-copy"
		}
	},
	
	/**
	 * Prints the html to the page
	 * @param {object} myElement
	 */
	draw: function(myElement) {
		var html = "<div id='" + this.elements.overlay + "'></div><div id='" + this.elements.container + "'>"+
		"<div id='" + this.elements.close + "'>Klicka utanför för att stänga</div>"+
		"<div id='" + this.elements.taskie + "'></div>"+
		"<div id='" + this.elements.tasks + "'></div>"+
		"</div>";
		
		goog.dom.append(myElement, goog.dom.htmlToDocumentFragment(html));
		
		// Change the strings to elements
		this.elements = Taskies.helpers.redoElements(this.elements);
	},
	
	/**
	 * Previews the taskieinformation to the html
	 * @param {Taskies.objects.Taskie} taskie 
	 */
	showTaskie: function(taskie) {
		var taskieHTML = "",
			tasksHTML = "";
		var d = new Date(taskie.Created);
		taskieHTML += "<h2>" + taskie.Name + "</h2>"+
		"<p class='date'>" + d.getDate() + "-" +  (d.getMonth()+1) + "-" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes() + "</p>"+
		"<p class='description'>" + taskie.Description + "</p>"+
		"<div id='details-tags'>";
		
		if (taskie.Tags.length == 0) {
			taskieHTML += "This taskie has no tags!";
		}
		else {
			taskieHTML += "";
			for (var t in taskie.Tags) {
				taskieHTML += "<div class='tag'>" + taskie.Tags[t] + "</div>";
			}
		}
		
		taskieHTML += "</div>";
		
		if(taskie.Tasks.length == 0) {
			tasksHTML += "This taskie has no tasks!";
		} else {
			tasksHTML += "<ol id='task-list'>";
			var counter = 0,
				cls = "";
			for(var i in taskie.Tasks) {
				if(counter == 0){
					cls = " first";
				} else if(counter == taskie.Tasks.length-1){
					cls = " last";
				} else {
					cls = "";
				}
				
				tasksHTML += "<li class='details-tasks-task"+cls+"'><p>" + taskie.Tasks[i] + "</p></li>";
				
				counter++;
			}
			tasksHTML += "</ol>";
		}
		
		tasksHTML += "<input type='text' value='" + Taskies.app.constants.siteUrl + "index.html?details=" + taskie._id + "' id='"+this.elements.detail.linkField+"' />"+
		" <input type='button' value='Copy' id='"+this.elements.detail.copyBtn+"' />";
		
		goog.dom.append(this.elements.taskie, goog.dom.htmlToDocumentFragment(taskieHTML));
		goog.dom.append(this.elements.tasks, goog.dom.htmlToDocumentFragment(tasksHTML));
		
		// Change the strings to elements
		this.elements.detail = Taskies.helpers.redoElements(this.elements.detail);
	},
	
	/**
	 * Taskie does'nt exist
	 */
	show404: function(){
		var html = "<h2>The specific Taskie cant be found!</h2>";
		goog.dom.append(this.elements.taskie, goog.dom.htmlToDocumentFragment(html));
	},
	
	/**
	 * Clears the html
	 */
	clear: function() {
		if(typeof this.elements.taskie == "object" && typeof this.elements.tasks == "object") {
			goog.dom.removeChildren(this.elements.taskie);
			goog.dom.removeChildren(this.elements.tasks);
		}
	}
};
