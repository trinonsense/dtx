define([
	'backbone',
	'leaflet'
], function(
	Backbone,
	L
) {
	var MapView = Backbone.View.extend({
		initialize: function() {
			var tileURL = 'http://{s}.tile.cloudmade.com/bdd6cda1b22b4048b78ca7a8e7f7f909/1714' +
				(L.Browser.retina? '@2x': '') + '/256/{z}/{x}/{y}.png';
			this.map = L.map('map', {zoomControl: false, attributionControl: false}).setView([32.7758, -96.7967], 13);

			L.tileLayer(tileURL, {
				maxZoom: 18,
				detectRetina: true
			}).addTo(this.map);
		}
	});

	return MapView;
});