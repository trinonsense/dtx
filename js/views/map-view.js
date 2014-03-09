define([
	'backbone',
	'leaflet'
], function(
	Backbone,
	L
) {
	var MapView = Backbone.View.extend({
		initialize: function() {
			this.map = L.map('map').setView([32.7758, -96.7967], 13);
			L.tileLayer('http://{s}.tile.cloudmade.com/bdd6cda1b22b4048b78ca7a8e7f7f909/1714/256/{z}/{x}/{y}.png',
				{
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
					maxZoom: 18
				})
				.addTo(this.map);
		}
	});

	return MapView;
});