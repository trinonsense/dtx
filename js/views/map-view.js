define([
	'backbone',
	'underscore',
	'leaflet'
], function(
	Backbone,
	_,
	L
) {
	var MapView = Backbone.View.extend({
		markers: {},
		markerHandler: function() {/* noop */},

		initialize: function() {
			var tileURL = 'http://{s}.tile.cloudmade.com/bdd6cda1b22b4048b78ca7a8e7f7f909/1714' +
				(L.Browser.retina? '@2x': '') + '/256/{z}/{x}/{y}.png';
			this.map = L.map('map', {zoomControl: false, attributionControl: false}).setView([32.7758, -96.7967], 13);

			L.tileLayer(tileURL, {
				maxZoom: 18,
				detectRetina: true
			}).addTo(this.map);
		},

		setMarkerHandler: function(callback) {
			this.markerHandler = callback;
			return this;
		},

		loadCategories: function(collections) {
			_(collections).each(this.loadCategory, this);
			return this;
		},

		loadCategory: function(category) {
			category.each(this.loadLocation, this);
			return this;
		},

		loadLocation: function(location) {
			var locationTitle = location.get('title'),
				lat = location.get('pos').lat,
				lng = location.get('pos').long,
				title = location.get('title'),
				marker = L.marker([lat, lng], {title: title})
										.on('click', this.markerHandler, this)
										.addTo(this.map);

			this.markers[locationTitle] = {
				location: location,
				marker: marker
			};
			return this;
		},

		focusLocation: function(location) {
			var lat = location.get('pos').lat,
				lng = location.get('pos').long;

			this.map.panTo([lat, lng], {animate: true});
			return this;
		},

		clearMarkers: function() {
			_(this.markers).each(function(marker) {
				this.map.removeLayer(marker.marker);
			}, this);

			this.markers = {};
			return this;
		},

		getMarker: function(locationTitle) {
			return this.markers[locationTitle];
		}
	});

	return MapView;
});