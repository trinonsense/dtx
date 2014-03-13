define([
	'backbone',
	'leaflet'
], function(
	Backbone,
	L
) {
	var MapView = Backbone.View.extend({
		initialize: function() {
			this.map = L.map('map', {zoomControl: false, attributionControl: false}).setView([32.7758, -96.7967], 13);
			L.tileLayer('http://{s}.tile.cloudmade.com/bdd6cda1b22b4048b78ca7a8e7f7f909/1714/256/{z}/{x}/{y}.png', {maxZoom: 18})
				.addTo(this.map);
		}
	});

	return MapView;
});