/**
 * Filter module
 * @constructor
 * @param {Taskies.app.Sandbox} sandbox
 */
Taskies.app.modules.Filter = function(sandbox) {
	/**
	 * @private
	 * @type {Taskies.app.Sandbox}
	 */
	this.sandbox = sandbox;
	this.test = "test";
};

/**
 * Content type variable
 */
Taskies.app.modules.Filter.moduleType = Taskies.app.constants.moduleTypes.FILTER;

/**
 * Init-function, first to be called
 */
Taskies.app.modules.Filter.prototype.init = function() {
	this.view.draw(this.sandbox.myElement);
	
	goog.events.listen(this.view.elements.submit, 'click', this.submitFilter , false, this);
	goog.events.listen(this.view.elements.create, 'click', function() {
		this.sandbox.notify(Taskies.app.constants.events.CREATE);
	} , false, this);
	
	// Show/hide tag helper text
	goog.events.listen(this.view.elements.tags, 'focus', function(e){
		goog.dom.classes.add(this.view.elements.tagsDesc, "inputDesc");
		goog.dom.classes.remove(this.view.elements.tagsDesc, "hide");
		goog.dom.setProperties(this.view.elements.tagsDesc, {'style': 'top:'+(e.target.offsetTop)+'; left:' + (e.target.offsetLeft+e.target.offsetWidth+10) + ';'});
	}, false, this);
	goog.events.listen(this.view.elements.tags, 'blur', function(e){
		goog.dom.classes.add(this.view.elements.tagsDesc, "hide");
		goog.dom.classes.remove(this.view.elements.tagsDesc, "inputDesc");
	}, false, this);
};

/**
 * Eventfunction to applys the new filter.
 * @param {object} e
 */
Taskies.app.modules.Filter.prototype.submitFilter = function(e) {
	var te = (this.view.elements.search.value != "") ? this.view.elements.search.value : undefined,
		ta = (this.view.elements.tags.value != "") ? this.view.elements.tags.value : undefined;
	
	if(ta) {
		ta = ta.toString().split(',');
	}
	
	this.sandbox.notify(Taskies.app.constants.events.FILTERUPDATE, Taskies.app.objects.Filter(te, ta));
	return false;
};

/**
 * Destroy-function, last to be called
 */
Taskies.app.modules.Filter.prototype.destroy = function() {
	return "NOT IMPLEMENTED!";
};

/**
 * Object containing the view of this module
 */
Taskies.app.modules.Filter.prototype.view = {
	/**
	 * Object containing the div id's or thies elementobjects
	 */
	elements: {
		wrapper: "filter-wrapper",
		container: "filter-content",
		search: "filter-search-field",
		tags: "filter-tags-field",
		tagsDesc: "filter-tags-description",
		submit: "filter-submit",
		startdate: "filter-startdate",
		enddate: "filter-enddate",
		create: "filter-create"
	},
	
	/**
	 * Prints the html to the page
	 * @param {object} myElement
	 */
	draw: function(myElement){
		var html = "<div id='" + this.elements.wrapper + "'><div id='" + this.elements.container + "'>"+
		"<h3>Search</h3><input type='text' id='" + this.elements.search + "' />"+
		"<h3>Tags</h3><input type='text' id='" + this.elements.tags + "' /> <p class='hide' id='"+this.elements.tagsDesc+"'>(Separated with a comma ',')</p>"+
		"<p><input type='button' value='Apply' id='" + this.elements.submit + "' />"+
		"<input type='button' value='Create a new!' id='" + this.elements.create + "' /></p>"+
		"</div></div>";
		
		goog.dom.append(myElement, goog.dom.htmlToDocumentFragment(html));
		
		// Change the strings to elements
		this.elements = Taskies.helpers.redoElements(this.elements);
	}
};
