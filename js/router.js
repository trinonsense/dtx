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
			'category/:category/:location(/)': 'categoryLocation',
			'location/:location': 'location'
		},

		home: function() {
			if (!app.alreadyStarted) {
				this.about();
			}

			app.views.mapView
				.clearMarkers()
				.loadCategories();
		},

		about: function() {

		},

		category: function(categoryName) {
			var category = app.collections[categoryName];
			app.views.mapView.clearMarkers();

			if (!_(category).isUndefined()) {
				app.views.mapView.loadCategory(category);

			} else {
				this.isNotFound();
			}
		},

		categoryLocation: function() {

		},

		location: function(locationTitle) {
			var location = app.findLocation(locationTitle);

			if (!_(location).isUndefined()) {
				app.views.mapView
					.clearMarkers()
					.loadLocation(location)
					.focusLocation(location);

			} else {
				this.isNotFound();
			}
		},

		isNotFound: function() {
			if (!app.alreadyStarted) {
				this.navigate('', {trigger: true});

			} else {
				Backbone.history.history.back();
			}
		}
	});

	return Router;
});