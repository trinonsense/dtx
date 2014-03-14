/* jshint maxparams: 10 */

define([
	'backbone',
	'router',
	'app',
	'views/map-view',
	'views/menu-view'
], function(
	Backbone,
	Router,
	app,
	MapView,
	MenuView
) {
	var main = {
		run: function() {
			this.setupViews();
			app.Router = new Router();
			Backbone.history.start();
		},

		setupViews: function() {
			app.views.mapView = new MapView();
			app.views.menuView = new MenuView();
		}
	};

	return main;
});
