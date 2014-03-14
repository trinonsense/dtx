define([
	'backbone',
	'app'
], function(
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
			app.views.mapView.clearMarkers();

		},

		location: function(location) {
			app.views.mapView.clearMarkers();

		}
	});

	return Router;
});