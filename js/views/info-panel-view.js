define([
	'jquery',
	'backbone'
], function(
	$,
	Backbone
) {
	var InfoPanelView = Backbone.View.extend({
		el: $('.info-panel')[0],

		initialize: function() {

		},

		showInfo: function(location) {
			this.model = location;
			this.$el
				.addClass('is-open')
				.find('.loc-info__title').text(this.model.get('title'));
		},

		hideInfoPanel: function() {
			this.$el.removeClass('is-open');
		}
	});

	return InfoPanelView;
});