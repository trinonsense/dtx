define([
	'app',
	'backbone',
	'underscore',
	'leaflet'
], function(
	app,
	Backbone,
	_,
	L
) {
	var MapView = Backbone.View.extend({
		markers: {},
		markerHandler: function() {/* noop */},
		mapHandler: function() {/* noop */},

		initialize: function() {
			var tileURL = 'http://{s}.tiles.mapbox.com/v3/trinonsense.idiem5nk' +
				'/{z}/{x}/{y}' + (L.Browser.retina? '@2x': '') + '.png';

			this.map = L.map('map', {attributionControl: false, zoomAnimationThreshold: 18});
			this.map.zoomControl.setPosition('topright');

			L.tileLayer(tileURL, {
				maxZoom: 18,
				detectRetina: true
			}).addTo(this.map);
		},

		setMarkerHandler: function(callback) {
			this.markerHandler = callback;
			return this;
		},

		setMapHandler: function(callback) {
			this.mapHandler = callback;

			if (app.alreadyStarted) {
				this.map.once('zoomend moveend', function() {
					this.map.once('zoomstart movestart', this.mapHandler);
				}, this);

			} else {
				this.map.once('zoomstart movestart', this.mapHandler);
			}

			return this;
		},

		loadCategory: function(category) {
			category.each(this.loadLocation, this);
			return this;
		},

		loadLocation: function(location) {
			var title = location.get('title'),
				lat = location.get('pos').lat,
				lng = location.get('pos').long,
				marker = L.marker([lat, lng], {title: title})
										.on('click', this.markerHandler, this)
										.addTo(this.map);

			this.markers[title] = {
				location: location,
				marker: marker
			};
			return this;
		},

		focusLocation: function(location) {
			this.unfocusMarkers();
			this.focusMarker(location);
			this.focusLocationMap(location);

			return this;
		},

		focusMarker: function(location) {
			var title = location.get('title');
			this.markers[title].marker.setOpacity(1);
			return this;
		},

		unfocusMarkers: function() {
			_(this.markers).each(function(marker) {
				marker.marker.setOpacity(0.5);
			});
			return this;
		},

		focusLocationMap: function(location) {
			var lat = location.get('pos').lat,
				lng = location.get('pos').long;

			this.map.setView([lat, lng], 15, {animate: true});
			return this;
		},

		clearMarkers: function() {
			_(this.markers).each(function(marker) {
				this.map.removeLayer(marker.marker);
			}, this);

			this.markers = {};
			return this;
		},

		hasMarker: function(locationTitle) {
			return !!this.markers[locationTitle];
		},

		getMarker: function(locationTitle) {
			return this.markers[locationTitle];
		},

		setMapBounds: function() {
			var pos = _(this.markers).sample().location.get('pos'),
				south = pos.lat,
				north = pos.lat,
				west = pos.long,
				east = pos.long;

			_(this.markers).each(function(marker) {
				pos = marker.location.get('pos');
				south = (pos.lat < south)? pos.lat: south;
				north = (pos.lat > north)? pos.lat: north;
				west = (pos.long < west)? pos.long: west;
				east = (pos.long > east)? pos.long: east;
			});

			this.map.fitBounds([
				[south, west],
				[north, east]
			]);

			return this;
		}
	});

	return MapView;
});
