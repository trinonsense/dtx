define([
	'backbone',
	'router',
	'app',
	'views/map-view', 'views/menu-view',
	'json!data/drinks.json', 'json!data/foods.json', 'json!data/homes.json',
	'json!data/jobs.json', 'json!data/parks.json', 'json!data/schools.json',
	'json!data/venues.json'
], function(
	Backbone,
	Router,
	app,
	MapView, MenuView,
	drinksData, foodsData, homesData,
	jobsData, parksData, schoolsData,
	venuesData
) {
	var main = {
		run: function() {
			this.setupViews();
			this.loadData();
			app.Router = new Router();
			Backbone.history.start();
		},

		setupViews: function() {
			app.views.mapView = new MapView();
			app.views.menuView = new MenuView();
		},

		loadData: function() {
			app.collections = {
				drinks: new Backbone.Collection(drinksData),
				foods: new Backbone.Collection(foodsData),
				homes: new Backbone.Collection(homesData),
				jobs: new Backbone.Collection(jobsData),
				parks: new Backbone.Collection(parksData),
				schools: new Backbone.Collection(schoolsData),
				venues: new Backbone.Collection(venuesData)
			};
		}
	};

	return main;
});
