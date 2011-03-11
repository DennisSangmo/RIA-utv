/**
 * Filterobjectthat can be applied to a Taskieslist
 */
Taskies.app.objects.Filter = function(text, tags, start, end){
	return {
		Text: (text != undefined) ? text : "",
		Tags: (tags != undefined) ? tags : []
	};
};