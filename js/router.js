define([
	'backbone'
], function(
	Backbone
) {

	var Router = Backbone.Router.extend({
		routes: {
			'(/)': 'about',
			'about(/)': 'about',
			'map(/)': 'map',
			'category/:category/:location(/)': 'location'
		},

		about: function() {

		},

		map: function() {

		},

		location: function() {

		}
	});

	return Router;
});