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

		//
		// Route Handlers
		//
		home: function(options) {
			var router = this;
			options = options || {};

			if (!app.alreadyStarted && !options.dontShowAbout) {
				this.about();
			}

			app.views.mapView
				.clearMarkers()
				.setMarkerHandler(function(e) {
					var locationTitle = e.target.options.title;
					router.routeToLocation(locationTitle, {trigger: true});
				})
				.loadCategory(app.categories);

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
						var locationTitle = e.target.options.title;
						router.routeToCategoryLocation(categoryName, locationTitle, {trigger: true});
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
				currentFragment = Backbone.history.fragment,
				category = app.collections[categoryName];

			if (!_(category).isUndefined()) {
				if (!app.views.mapView.hasMarker(locationTitle)) {
					this.category(categoryName, {dontSetMapBounds: true});
				}

				if (app.views.mapView.hasMarker(locationTitle)) {

					// show location
					location = app.views.mapView.getMarker(locationTitle).location;
					app.views.mapView.focusLocation(location);
					app.views.infoPanelView.showInfo(location);

					// set view handlers
					app.views.mapView.setMapHandler(function() {
						var nextFragment = Backbone.history.fragment,
							itIsSameRoute = (nextFragment.search('category/' + categoryName) === 0),
							itIsUnfocusingLocation = (nextFragment === currentFragment);

						if (!itIsSameRoute || itIsUnfocusingLocation) {
							app.views.infoPanelView.hideInfoPanel();
						}

						if (itIsUnfocusingLocation) {
							router.category(categoryName, {dontSetMapBounds: true});
							router.routeToCategory(categoryName);
						}
					});

					app.views.infoPanelView.setNavHandler(function(isNextLocation) {
						var switchedLocation = category.switchLocationFrom(location, isNextLocation);
						router.routeToCategoryLocation(categoryName, switchedLocation.get('title'), {trigger:true});
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

				// show location
				location = app.views.mapView.getMarker(locationTitle).location;
				app.views.mapView.focusLocation(location);
				app.views.infoPanelView.showInfo(location);

				// set view handlers
				app.views.mapView.setMapHandler(function() {
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

				app.views.infoPanelView.setNavHandler(function(isNextLocation) {
					var switchedLocation = app.categories.switchLocationFrom(location, isNextLocation);
					router.routeToLocation(switchedLocation.get('title'), {trigger: true});
				});

			} else {
				this.isNotFound();
			}
		},


		//
		// Route Helpers
		//
		routeToCategory: function(categoryName, options) {
			this.navigate('category/' + categoryName, options);
		},

		routeToCategoryLocation: function(categoryName, locationTitle, options) {
			var fragment = Helpers.constructURLFragment(locationTitle);
			this.navigate('category/'+ categoryName +'/'+ fragment, options);
		},

		routeToLocation: function(locationTitle, options) {
			var locationTitleFragment = Helpers.constructURLFragment(locationTitle);
			this.navigate('location/' + locationTitleFragment, options);
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