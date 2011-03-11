/**
 * Database facade interface
 * @interface
 */
Taskies.app.facades.interfaces.IDatastorage = function(){};

/**
 * Fetches taskies
 * @param {Taskies.app.objects.Filter} filter
 * @return {array<Taskies.app.objects.Taskie>}
 */
Taskies.app.facades.interfaces.IDatastorage.prototype.get = function(filter){};

/**
 * Saves the taskie
 * @param {Taskies.app.objects.Taskie} taskie
 * @return {Taskies.app.objects.Taskie}
 */
Taskies.app.facades.interfaces.IDatastorage.prototype.save = function(taskie){};
