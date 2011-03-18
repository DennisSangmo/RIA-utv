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
	
	/**
	 * @private
	 * @type {string}
	 */
	this._codeAnswer = "";
};

/**
 * Content type variable
 */
Taskies.app.modules.Create.moduleType = Taskies.app.constants.moduleTypes.CREATE;

/**
 * Init-function, first to be called
 */
Taskies.app.modules.Create.prototype.init = function() {
	// Draw the html
	this.view.draw(this.sandbox.myElement);
	
	// Initiually hide the div
	goog.dom.classes.add(this.sandbox.myElement, "hide");
	
	// create lisiners
	this.sandbox.listen(Taskies.app.constants.events.CREATE, this.show, this);
	goog.events.listen(this.view.elements.addTag, 'click', this.view.addTagField, false, this.view);
	goog.events.listen(this.view.elements.addTask, 'click', this.view.addTaskField, false, this.view);
	goog.events.listen(this.view.elements.save, 'click', this.save, false, this);
	goog.events.listen(this.view.elements.reset, 'click', this.view.clear, false, this.view);
	goog.events.listen(this.view.elements.overlay, 'click', this.hide, false, this);
};

/**
 * Previews the create form
 */
Taskies.app.modules.Create.prototype.show = function() {
	goog.dom.classes.remove(this.sandbox.myElement, "hide");
	this.generateCode();
	
	var wp = goog.dom.getViewportSize();
	var left = (wp.width - 440)/2;
	if(wp.height<600)
		var height = wp.height-70;
	else
		var height = 600;
	goog.dom.setProperties(this.view.elements.container, {'style': 'left:'+left+'; height:' + height + 'px;'});
};

/**
 * Hides the create form
 */
Taskies.app.modules.Create.prototype.hide = function(){
	goog.dom.classes.add(this.sandbox.myElement, "hide");
};

/**
 * Saves the form
 * @param {object} e
 */
Taskies.app.modules.Create.prototype.save = function(e) {
	if(this.view.elements.code.value !== this._codeAnswer) {
		// TODO error handling
		alert("Wrong codeanswer!");
		this.generateCode();
		return false;	
	}
	
	var dateObj = new Date();
	var name = this.view.elements.name.value,
		desc = this.view.elements.desc.value,
		date = dateObj.getTime(),
		tags = [],
		tasks = [];
	
	var nodeTags = goog.dom.getElementsByClass(this.view.elements.classes.tag, this.view.elements.tags),
		nodeTasks =  goog.dom.getElementsByClass(this.view.elements.classes.task, this.view.elements.tasks);
	
	for(var i in nodeTags) {
		if(nodeTags[i].type == "text" && nodeTags[i].value != "")
			tags.push(nodeTags[i].value);
	}
	
	for(var j in nodeTasks) {
		if(nodeTasks[j].type == "text" && nodeTasks[j].value != undefined)
			tasks.push(nodeTasks[j].value);
	}
	
	var newObj = this.sandbox.saveTaskie(Taskies.app.objects.Taskie(undefined, name, desc, date, tags, tasks));
	if(newObj != null){
		this.sandbox.notify(Taskies.app.constants.events.DETAILSSELECT, newObj);
	} else {
		// TODO errorhandling
	}
	this.hide();
	this.view.clear();
};

Taskies.app.modules.Create.prototype.generateCode = function(){
	var a = goog.math.randomInt(10),
		b = goog.math.randomInt(10);
	this._codeAnswer = "" + (a+b);
	this.view.changeCodeText(a + " plus " + b + " = ");
	this.view.elements.code.value = "";
};

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Create.prototype.destroy = function() {
	this.hide();
	this.view.clear();
	
	goog.events.removeAll(this.view.elements.addTag);
	goog.events.removeAll(this.view.elements.addTask);
	goog.events.removeAll(this.view.elements.save);
	goog.events.removeAll(this.view.elements.reset);
	goog.events.removeAll(this.view.elements.overlay);
};

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Create.prototype.view = {
	/**
	 * Object containing the div id's or thies elementobjects
	 */
	elements: {
		overlay: "create-overlay",
		container: "create-content",
		close: "details-close",
		name: "create-name-fiels",
		desc: "create-desc-field",
		tags: "create-tags",
		addTag: "create-add-tag",
		tasks: "create-tasks",
		addTask: "create-add-task",
		codeText: "create-code-text",
		code: "create-code",
		save: "create-save",
		reset: "create-reset",
		classes: {
			tag: "create-class-tag",
			task: "create-class-task"
		}
	},
	
	/**
	 * Prints the html to the page
	 * @param {object} myElement
	 */
	draw: function(myElement){
		var html = "<div id='" + this.elements.overlay + "'></div><div id='" + this.elements.container + "'>"+
		"<div id='" + this.elements.close + "'>Klicka utanför för att stänga</div>"+
		"<h2>Create a new Taskie</h2>"+
		"<p><label for='" + this.elements.name + "'>Name</label><input type='text' id='" + this.elements.name + "' /></p>"+
		"<p><label for='" + this.elements.desc + "'>Description</label><input type='text' id='" + this.elements.desc + "' /></p>"+
		"<p><h3>Tags <input type='button' id='" + this.elements.addTag + "' value='+' /></h3><ol id='" + this.elements.tags + "'><li><input type='text' class='" + this.elements.classes.tag + "' /></li></ol></p>"+
		"<p><h3>Tasks <input type='button' id='" + this.elements.addTask + "' value='+' /></h3><ol id='" + this.elements.tasks + "'><li><input type='text' class='" + this.elements.classes.task + "' /></li></ol></p>"+
		"<p><h3>Anti robots</h3><span id='" + this.elements.codeText + "'></span><input type='text' id='" + this.elements.code + "' /></p>"+
		"<p><input type='button' value='Save' id='" + this.elements.save + "' /><input type='button' value='Reset' id='" + this.elements.reset + "' /></p>"+
		"</div>";
		
		goog.dom.append(myElement, goog.dom.htmlToDocumentFragment(html));
		
		// Change the strings to elements
		this.elements = Taskies.helpers.redoElements(this.elements);
	},
	
	/**
	 * Resets the form
	 */
	clear: function(){
		this.elements.name.value = "";
		this.elements.desc.value = "";
		if (typeof this.elements.tags == "object") {
			goog.dom.removeChildren(this.elements.tags);
			this.addTagField();
		}
		if (typeof this.elements.tasks == "object") {
			goog.dom.removeChildren(this.elements.tasks);
			this.addTaskField();
		}
	},
	/**
	 * Changes the questionstring
	 * @param {string} text
	 */
	changeCodeText: function(text){
		goog.dom.setTextContent(this.elements.codeText, text);
	},
	
	/**
	 * Adds a tagfield to the form
	 */
	addTagField: function() {
		var html = "<li><input type='text' class='" + this.elements.classes.tag + "' /></li>";
		goog.dom.append(this.elements.tags, goog.dom.htmlToDocumentFragment(html));
	},
	
	/**
	 * adds a taskfield to the form
	 */
	addTaskField: function() {
		var html = "<li><input type='text' class='" + this.elements.classes.task + "' /></li>";
		goog.dom.append(this.elements.tasks, goog.dom.htmlToDocumentFragment(html));
	}
};
