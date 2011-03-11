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
 * @param {Object} taskie
 */
Taskies.app.modules.Details.prototype.show = function(taskie) {
	goog.dom.classes.remove(this.sandbox.myElement, "hide");
	
	this.view.showTaskie(taskie);
	var wp = goog.dom.getViewportSize();
	var left = (wp.width - 500)/2;
	goog.dom.setProperties(this.view.elements.container, {'style': 'left:'+left+';'});
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
	return "NOT IMPLEMENTED!";
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
		taskie: "details-taskie",
		tasks: "details-tasks"
	},
	
	/**
	 * Prints the html to the page
	 * @param {object} myElement
	 */
	draw: function(myElement) {
		var html = "<div id='" + this.elements.overlay + "'></div><div id='" + this.elements.container + "'>"+
		"<div id='" + this.elements.close + "'></div>"+
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
		"<p>" + taskie.Description + "</p>"+
		"<p>Created: " + d.getDate() + "-" +  (d.getMonth()+1) + "-" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes() + "</p>"+
		"<div id='details-tags'>";
		
		if (taskie.Tags.length == 0) {
			taskieHTML += "This taskie has no tags!";
		}
		else {
			taskieHTML += "Tags: ";
			for (var t in taskie.Tags) {
				taskieHTML += "<div class='tag'>" + taskie.Tags[t] + "</div>";
			}
		}
		
		taskieHTML += "</div>";
		
		tasksHTML += "<h3>Tasks</h3>";
		if(taskie.Tasks.length == 0) {
			tasksHTML += "This taskie has no tasks!";
		} else {
			tasksHTML += "<ol>";
			for(var i in taskie.Tasks) {
				tasksHTML += "<li class='details-tasks-task'>" + taskie.Tasks[i] + "</li>";
			}
			tasksHTML += "</ol>";
		}
		
		goog.dom.append(this.elements.taskie, goog.dom.htmlToDocumentFragment(taskieHTML));
		goog.dom.append(this.elements.tasks, goog.dom.htmlToDocumentFragment(tasksHTML));
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
