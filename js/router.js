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

		category: function(categoryName, options) {
			var router = this,
				category = app.collections[categoryName];
			options = options || {};

			if (!_(category).isUndefined()) {
				app.views.mapView
					.clearMarkers()
					.setMarkerHandler(function(e) {
						var locationTitle = e.target.options.title,
							locationTitleFragment = Helpers.constructURLFragment(locationTitle);
						router.navigate('category/'+ categoryName +'/'+ locationTitleFragment, {trigger: true});
					})
					.loadCategory(category);

				if (!options.dontSetMapBounds) {
					app.views.mapView.setMapBounds();
				}

			} else {
				this.isNotFound();
			}
		},

		categoryLocation: function(categoryName, locationTitleFragment) {
			var location,
				router = this,
				locationTitle = Helpers.deconstructURLFragment(locationTitleFragment),
				currentRoute = Backbone.history.fragment,
				category = app.collections[categoryName];

			if (!_(category).isUndefined()) {
				if (!app.views.mapView.hasMarker(locationTitle)) {
					this.category(categoryName, {dontSetMapBounds: true});
				}

				if (app.views.mapView.hasMarker(locationTitle)) {
					location = app.views.mapView.getMarker(locationTitle).location;
					app.views.mapView
						.focusLocation(location)
						.setMapHandler(function() {
							if (Backbone.history.fragment === currentRoute) {
								router.category(categoryName, {dontSetMapBounds: true});
								router.navigate('category/' + categoryName);
							}
						});

				} else {
					this.isNotFound();
				}

			} else {
				this.isNotFound();
			}
		},

		location: function(locationTitleFragment) {
			var location,
				router = this,
				currentFragment = Backbone.history.fragment,
				locationTitle = Helpers.deconstructURLFragment(locationTitleFragment);

			if(!app.views.mapView.hasMarker(locationTitle)){
				this.home({dontSetMapBounds: true});
			}

			if (app.views.mapView.hasMarker(locationTitle)) {
				location = app.views.mapView.getMarker(locationTitle).location;

				app.views.infoPanelView.showInfo(location);
				app.views.mapView
					.focusLocation(location)
					.setMapHandler(function() {
						var nextFragment = Backbone.history.fragment,
							itIsSameRoute = (nextFragment.search('location') === 0),
							itIsUnfocusingLocation = (nextFragment === currentFragment);

						if (!itIsSameRoute || itIsUnfocusingLocation) {
							app.views.infoPanelView.hideInfoPanel();
						}

						if (itIsUnfocusingLocation) {
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