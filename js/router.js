define([
	'underscore',
	'backbone',
	'app'
], function(
	_,
	Backbone,
	app
) {

	var Router = Backbone.Router.extend({
		routes: {
			'(/)': 'home',
			'about(/)': 'about',
			'category/:category': 'category',
			'category/:category/:location(/)': 'category',
			'location/:location': 'location'
		},

		home: function() {
			app.views.mapView.clearMarkers().loadAllLocations();
		},

		about: function() {

		},

		category: function(category, location) {
			var locations;
			app.views.mapView.clearMarkers();

			if (_(location).isNull()) {
				locations = app.collections[category];
				app.views.mapView.loadLocations(locations);
			}
		},

		location: function(locationTitle) {
			var location = app.findLocation(locationTitle);

			if (!_(location).isUndefined()) {
				app.views.mapView
					.clearMarkers()
					.loadLocation(location)
					.focusLocation(location);

			} else {
				if (!app.alreadyStarted) {
					this.navigate('', {trigger: true});

				} else {
					Backbone.history.history.back();
				}
			}
		}
	});

	return Router;
});