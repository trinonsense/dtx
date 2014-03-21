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

		setNavHandler: function(callback) {
			this.once('switch', callback, this);
		},

		switchLocation: function(e) {
			this.trigger('switch', $(e.currentTarget).hasClass('next'));
			return this;
		},

		showInfo: function(location) {
			this.model = location;
			this.$el
				.addClass('is-open')
				.find('.location-title').text(this.model.get('title'));

			return this;
		},

		hideInfoPanel: function() {
			this.$el.removeClass('is-open');
			return this;
		}
	});

	return InfoPanelView;
});