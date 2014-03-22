define([
	'backbone'
], function(
	Backbone
) {
	var Category = Backbone.Collection.extend({
		switchLocationFrom: function(location, isNextLocation) {
			var index = this.indexOf(location);

			if (isNextLocation) {
				index = this.getNextIndex(index);

			} else {
				index = this.getPrevIndex(index);
			}

			return this.at(index);
		},

		getNextIndex: function(index) {
			if (++index >= this.length) {
				index = 0;
			}

			return index;
		},

		getPrevIndex: function(index) {
			if (--index <= 0) {
				index = this.length - 1;
			}

			return index;
		}
	});

	return Category;
});