/* jshint maxparams: 10 */

define([
	'backbone',
	'router',
	'app',
	'views/map-view'
], function(
	Backbone,
	Router,
	app,
	MapView
) {
	var main = {};
	function run() {
		app.views.mapView = new MapView();
		app.Router = new Router();
		Backbone.history.start();
	}

	main.run = run;
	return main;
});
