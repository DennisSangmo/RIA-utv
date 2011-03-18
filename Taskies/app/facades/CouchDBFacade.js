goog.require('goog.net.Jsonp');
goog.require('goog.net.XhrIo');

/**
 * Facadeobject for CouchDB
 * @constructor
 * @implements {Taskies.app.facades.interfaces.IDatastorage}
 */
Taskies.app.facades.CouchDBFacade = function(core) {
	
	/**
	 * @type {Taskies.app.Core}
	 * @private
	 */
	this._core = core;
	
	/**
	 * @type {string}
	 * @private
	 */
	this._uri = "http://localhost/Taskies/app/facades/php/";
	
	/**
	 * @type {goog.XhrIo}
	 * @private
	 */
	this._xhr = new goog.net.XhrIo();
};

/**
 * Alerts the listupdate event
 * @param {Taskies.app.objects.Filter} filter
 */
Taskies.app.facades.CouchDBFacade.prototype.getList = function(filter){
	if (filter.Text == "" && filter.Tags.length == 0) {
		
		goog.net.XhrIo.send(this._uri+"all.php", goog.bind(function(e) {
		    var target = e.target;
			if(target.isSuccess()){
				var arr = this.jsonToObj(target.getResponseJson());
				this._core.fireCustomEvent(Taskies.app.constants.events.LISTUPDATE, arr);
			}
		}, this));
	}
	else {
		if (filter.Text != "") {
			goog.net.XhrIo.send(this._uri + "getWithFilter.php", goog.bind(function(e){
				var target = e.target;
				if (target.isSuccess()) {
					var tmp = [];
					var json = target.getResponseJson();
					for (var i in json.rows) {
						tmp.push(json.rows[i].value);
					};
					this._core.fireCustomEvent(Taskies.app.constants.events.LISTUPDATE, tmp);
				}
			}, this), "POST", "type=name&text=" + filter.Text);
		} else if(filter.Tags.length != 0){
			goog.net.XhrIo.send(this._uri + "getWithFilter.php", goog.bind(function(e){
				var target = e.target;
				if (target.isSuccess()) {
					var arr = this.jsonToObj(target.getResponseJson());
					this._core.fireCustomEvent(Taskies.app.constants.events.LISTUPDATE, arr);
				}
			}, this), "POST", "type=tag&text=" + filter.Tags[0]);
		}
	}
	return true;
};

/**
 * Fetches one Taskie from the couchDB
 * @param {string} id
 * @return {Taskies.objects.Taskie}
 */
Taskies.app.facades.CouchDBFacade.prototype.get = function(id){
	goog.net.XhrIo.send(this._uri + "one.php", goog.bind(function(e){
		var target = e.target;
		if (target.isSuccess()) {
			var arr = this.jsonToObj(target.getResponseJson());
			if (arr.length == 1) {
				this._core.fireCustomEvent(Taskies.app.constants.events.DETAILSSELECT, arr[0]);
			}
		}
	}, this), "POST", "id="+id);
};

/**
 * Saves the taskie to the memory
 * @param {Taskies.app.objects.Taskie} taskie
 * @return {Taskies.app.objects.Taskie}
 */
Taskies.app.facades.CouchDBFacade.prototype.save = function(taskie) {
	goog.net.XhrIo.send(this._uri+"save.php", goog.bind(function(e) {
	    var target = e.target;
		if(target.isSuccess()){
			var tmp = [];
			var text = target.getResponseText();
			
			this._core.fireCustomEvent(Taskies.app.constants.events.LISTUPDATE);
		}
	}, this), "POST", Taskies.helpers.makePostReady(taskie));
};

/**
 * CouchDB json to Taskie objects
 * @param {object} json
 * @return {Array<Taskies.app.objects.Taskie>}
 */
Taskies.app.facades.CouchDBFacade.prototype.jsonToObj = function(json){
	var tmp = [];
	for (var i in json.rows) {
		tmp.push(json.rows[i].value);
	};
	return tmp;
};
