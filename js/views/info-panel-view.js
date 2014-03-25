define([
	'jquery',
	'backbone'
], function(
	$,
	Backbone
) {
	var InfoPanelView = Backbone.View.extend({
		el: $('.info-panel')[0],
		events: {
			'click .info-nav': 'switchLocation'
		},
		navHandler: function() {},

		setNavHandler: function(callback) {
			this.navHandler = callback;
			return this;
		},

		switchLocation: function(e) {
			this.navHandler($(e.currentTarget).hasClass('next'));
		},

		showInfo: function(location) {
			this.model = location;
			this.$el
				.removeClass('is-hidden')
				.find('.location-title a')
					.text(this.model.get('title'))
					.attr('href', this.model.get('link'));

			return this;
		},

		hideInfoPanel: function() {
			this.$el.addClass('is-hidden');
			return this;
		}
	});

	return InfoPanelView;
});