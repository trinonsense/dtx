define([
	'underscore',
	'backbone',
	'router',
	'app',
	'views/map-view', 'views/menu-view', 'views/info-panel-view',
	'json!data/drinks.json', 'json!data/foods.json', 'json!data/homes.json',
	'json!data/jobs.json', 'json!data/parks.json', 'json!data/schools.json',
	'json!data/venues.json'
], function(
	_,
	Backbone,
	Router,
	app,
	MapView, MenuView, InfoPanelView,
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
			app.alreadyStarted = true;
		},

		setupViews: function() {
			app.views.mapView = new MapView();
			app.views.menuView = new MenuView();
			app.views.infoPanelView = new InfoPanelView();
		},

		loadData: function() {
			var data = {
				drinks: new Backbone.Collection(drinksData),
				foods: new Backbone.Collection(foodsData),
				homes: new Backbone.Collection(homesData),
				jobs: new Backbone.Collection(jobsData),
				parks: new Backbone.Collection(parksData),
				schools: new Backbone.Collection(schoolsData),
				venues: new Backbone.Collection(venuesData)
			};

			_(app.collections).extend(data);
		}
	};

	return main;
});
