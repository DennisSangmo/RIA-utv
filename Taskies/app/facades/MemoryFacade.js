/**
 * Facadeobject for memorystorage
 * @constructor
 * @implements {Taskies.app.facades.interfaces.IDatastorage}
 */
Taskies.app.facades.MemoryFacade = function(core) {
	
	/**
	 * @type {Taskies.app.Core}
	 * @private
	 */
	this._core = core;
	
	/**
	 * @type {array<Taskies.app.objects.Taskie>}
	 * @private
	 */
	this.taskies = [];
	
	// Fill with example data
	this.taskies.push(Taskies.app.objects.Taskie(1, "Test1", "This is test object number one!", "2011-3-4", ["test", "1", "one"], ["Task 1 in first taskie", "Task 2 in first taskie", "Task 3 in first taskie"]));
	this.taskies.push(Taskies.app.objects.Taskie(2, "Test2", "This is test object number two!", "2011-3-4", ["test", "2", "two"], ["Task 1 in second taskie", "Task 2 in second taskie", "Task 3 in second taskie"]));
	this.taskies.push(Taskies.app.objects.Taskie(3, "Test3", "This is test object number three!", "2011-3-4", ["test", "3", "three"]));
	this.taskies.push(Taskies.app.objects.Taskie(4, "Test4", "This is test object number four!", "2011-3-4", ["test", "4", "four"]));
	this.taskies.push(Taskies.app.objects.Taskie(5, "Test5", "This is test object number five!", "2011-3-4", ["test", "5", "five"], ["Task 1 in fifth taskie"]));
	this.taskies.push(Taskies.app.objects.Taskie(6, "Test6", "This is test object number six!", "2011-3-4", ["test", "6", "six"]));
};

/**
 * Returns an array of taskie objects
 * @param {Taskies.app.objects.Filter} filter
 */
Taskies.app.facades.MemoryFacade.prototype.get = function(filter){
	if (filter.Text == "" && filter.Tags.length == 0 && filter.StartDate == null && filter.EndDate == null) {
		this._core.fireCustomEvent(Taskies.app.constants.events.LISTUPDATE, this.taskies);
	}
	else {
		var texttest = false,
			tagtest = false,
			datetest = false;
		
		// Filter per search string
		if (filter.Text != "") texttest = true;
		if (filter.Tags.length > 0) tagtest = true;
		if (filter.StartDate != "" && filter.EndDate != "") datetest = true;
		
		for(var i = 0; i < this.taskies.length; i++) {
			
		}
	}
};

/**
 * Saves the taskie to the memory
 * @param {Taskies.app.objects.Taskie} taskie
 * @return {Taskies.app.objects.Taskie}
 */
Taskies.app.facades.MemoryFacade.prototype.save = function(taskie) {
	if(taskie.TaskieId == 0){
		taskie.TaskieId = this.taskies.length + 1;
		this.taskies.push(taskie);
	} else {
		for(var i in this.taskies) {
			if(this.taskies[i].TaskieId == taskie.TaskieId) {
				this.taskies[i] = taskie;
			}
		}
	}
	return taskie;
};
