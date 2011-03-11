/**
 * A Taskie that contains one or more tasks.
 * @param {number} id
 * @param {string} name
 * @param {string} desc
 * @param {number} crea
 * @tags {array<string>} tags
 * @tasks {array<string>} tasks
 */
Taskies.app.objects.Taskie = function(id, name, desc, crea, tags, tasks){
	return {
		_id: (id != undefined) ? id : "",
		Name: (name != undefined) ? name : "",
		Description: (desc != undefined) ? desc : "",
		Created: (crea != undefined) ? crea : 0,
		Tags: (tags != undefined) ? tags : [],
		Tasks: (tasks != undefined) ? tasks : []
	};
};
