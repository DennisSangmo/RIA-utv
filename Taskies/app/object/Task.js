/**
 * A specifik task in a taskie
 * @param {number} id
 * @param {number} taskieid
 * @param {string} text
 */
Taskies.app.objects.Task = function(id, taskieid, text){
	return {
		TaskId: (id != undefined) ? id : 0,
		TaskieId: (taskieid != undefined) ? taskieid : 0,
		Text: (text != undefined) ? text : ""
	};
};
