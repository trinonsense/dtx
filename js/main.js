define([
	'underscore',
	'backbone',
	'router',
	'app',
	'collections/category-collection',
	'views/map-view', 'views/menu-view', 'views/info-panel-view',
	'json!data/drinks.json', 'json!data/foods.json', 'json!data/homes.json',
	'json!data/jobs.json', 'json!data/parks.json', 'json!data/schools.json',
	'json!data/venues.json'
], function(
	_,
	Backbone,
	Router,
	app,
	Category,
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
			var collections = {
				drinks: new Category(drinksData),
				foods: new Category(foodsData),
				homes: new Category(homesData),
				jobs: new Category(jobsData),
				parks: new Category(parksData),
				schools: new Category(schoolsData),
				venues: new Category(venuesData),
			},
				categories = new Category(_.chain(collections)
					.map(function(collection) {return collection.toJSON();})
					.flatten()
					.value()
				);

			_(app.collections).extend(collections);
			_(app.categories).extend(categories);
		}
	};

	return main;
});
