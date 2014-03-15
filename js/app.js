define([
	'underscore'
],function(
	_
) {
	var app = {
		models: {},
		collections: {},
		views: {},
		findLocation: function(locationTitle) {
			var location;
			_(this.collections).find(function(category) {
				location = category.findWhere({title: locationTitle});
				return location;
			});

			return location;
		}
	};

	return app;
});