define([
	'backbone',
	'jquery',
], function(
	Backbone,
	$
) {
	var MenuView = Backbone.View.extend({
		el: $('.main-menu')[0],

		events: {
			'click .main-menu__item a': 'toggle'
		},

		isTouchDevice: $('html.touch').length > 0,

		toggle: function() {
			if (this.isTouchDevice) {
				this.$el.toggleClass('is-open');
				$('.main-menu__toggle a').text(this.$el.hasClass('is-open')? 'Close': 'Menu');
			}
		}
	});

	return MenuView;
});