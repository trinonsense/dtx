define([
	'underscore'
],function(
	_
) {
	var app = {
		models: {},
		collections: {},
		views: {},
		findLocation: function(locationName) {
			var location;
			_(this.collections).find(function(category) {
				location = category.findWhere({title: locationName});
				return location;
			});

			return location;
		}
	};

	return app;
});