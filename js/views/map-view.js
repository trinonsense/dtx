define([
	'backbone',
	'underscore',
	'app',
	'leaflet'
], function(
	Backbone,
	_,
	app,
	L
) {
	var MapView = Backbone.View.extend({
		markers: [],

		initialize: function() {
			var tileURL = 'http://{s}.tile.cloudmade.com/bdd6cda1b22b4048b78ca7a8e7f7f909/1714' +
				(L.Browser.retina? '@2x': '') + '/256/{z}/{x}/{y}.png';
			this.map = L.map('map', {zoomControl: false, attributionControl: false}).setView([32.7758, -96.7967], 13);

			L.tileLayer(tileURL, {
				maxZoom: 18,
				detectRetina: true
			}).addTo(this.map);
		},

		loadAllLocations: function() {
			_(app.collections).each(function(collection) {
				this.loadLocations(collection);
			}, this);

			return this;
		},

		loadLocations: function(category) {
			category.each(function(location) {
				var lat = location.get('pos').lat,
					lng = location.get('pos').long,
					marker = L.marker([lat, lng]).addTo(this.map);

				this.markers.push(marker);
			},this);

			return this;
		},

		clearMarkers: function() {
			_(this.markers).each(function(marker) {
				this.map.removeLayer(marker);
			}, this);

			this.markers.length = 0;
			return this;
		}
	});

	return MapView;
});