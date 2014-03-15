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
			var router = this;

			if (!app.alreadyStarted) {
				this.about();
			}

			app.views.mapView
				.clearMarkers()
				.setMarkerHandler(function(e) {
					var locationName = e.target.options.title;
					this.focusLocation(this.getMarker(locationName).location);
					router.navigate('location/' + locationName);
				})
				.loadCategories(app.collections);
		},

		about: function() {

		},

		category: function(categoryName) {
			var category = app.collections[categoryName];

			if (!_(category).isUndefined()) {
				app.views.mapView
					.clearMarkers()
					.loadCategory(category);

			} else {
				this.isNotFound();
			}
		},

		categoryLocation: function(categoryName, locationTitle) {
			var location, category = app.collections[categoryName];

			if (!_(category).isUndefined()) {
				if (!app.alreadyStarted) {
					app.views.mapView.loadCategory(category);
				}
				location = category.findWhere({title: locationTitle});

				if (!_(location).isUndefined()) {
					app.views.mapView.focusLocation(location);
				} else {
					this.isNotFound();
				}

			} else {
				this.isNotFound();
			}
		},

		location: function(locationTitle) {
			var marker = app.views.mapView.getMarker(locationTitle),
				location = (marker && marker.location) || app.findLocation(locationTitle);

			if (!_(location).isUndefined()) {
				if(!app.alreadyStarted){
					app.views.mapView.loadLocation(location);
				}
				app.views.mapView.focusLocation(location);

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