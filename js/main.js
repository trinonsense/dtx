define([
	'backbone',
	'router',
	'app'
], function(
	Backbone,
	Router,
	app
) {
	var main = {};
	function run() {
		app.Router = new Router();
		Backbone.history.start();
	}

	main.run = run;
	return main;
});
