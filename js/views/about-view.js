define([
	'jquery',
	'backbone',
], function(
	$,
	Backbone
) {
	var AboutView = Backbone.View.extend({
		el: $('.about')[0],
		events: {
			'click .about': 'close',
			'click .about__close': 'close'
		},

		show: function() {
			this.$el.removeClass('is-hidden');
		},

		close: function() {
			this.$el.addClass('is-hidden');
		}
	});

	return AboutView;
});