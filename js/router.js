define([
	'underscore',
	'backbone',
	'app',
	'helpers',
], function(
	_,
	Backbone,
	app,
	Helpers
) {

	var Router = Backbone.Router.extend({
		routes: {
			'(/)': 'home',
			'about(/)': 'about',
			'category/:category': 'category',
			'category/:category/:location(/)': 'categoryLocation',
			'location/:location': 'location',
			'*invalid': 'invalid'
		},

		home: function(options) {
			var router = this;
			options = options || {};

			if (!app.alreadyStarted && !options.dontShowAbout) {
				this.about();
			}

			app.views.mapView
				.clearMarkers()
				.setMarkerHandler(function(e) {
					var locationTitle = e.target.options.title,
						locationTitleFragment = Helpers.constructURLFragment(locationTitle);
					router.navigate('location/' + locationTitleFragment, {trigger: true});
				})
				.loadCategories(app.collections);

			if (!options.dontSetMapBounds) {
				app.views.mapView.setMapBounds();
			}
		},

		about: function() {

		},

		category: function(categoryName) {
			var router = this,
				category = app.collections[categoryName];

			if (!_(category).isUndefined()) {
				app.views.mapView
					.clearMarkers()
					.setMarkerHandler(function(e) {
						var locationName = e.target.options.title;
						this.focusLocation(this.getMarker(locationName).location);
						router.navigate('category/'+ categoryName +'/'+ Helpers.constructURLFragment(locationName));
					})
					.loadCategory(category)
					.setMapBounds();

			} else {
				this.isNotFound();
			}
		},

		categoryLocation: function(categoryName, locationTitleFragment) {
			var location, locationTitle,
				category = app.collections[categoryName];

			if (!_(category).isUndefined()) {
				if (!app.alreadyStarted) {
					this.category(categoryName);
				}

				locationTitle = Helpers.deconstructURLFragment(locationTitleFragment);
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

		location: function(locationTitleFragment) {
			var router = this,
				currentRoute = Backbone.history.fragment,
				locationTitle = Helpers.deconstructURLFragment(locationTitleFragment),
				marker = app.views.mapView.getMarker(locationTitle),
				location = (marker && marker.location) || app.getLocation(locationTitle);

			if (!_(location).isUndefined()) {
				if(!app.alreadyStarted){
					app.views.mapView.loadLocation(location);
				}
				app.views.mapView
					.focusLocation(location)
					.setMapHandler(function() {
						if(Backbone.history.fragment === currentRoute) {
							router.home({dontSetMapBounds: true});
							router.navigate('');
						}
					});

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
		},

		invalid: function() {
			this.home({dontShowAbout: true});
			this.navigate('', {replace: true});
		}
	});

	return Router;
});