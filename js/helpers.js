define([
], function(
) {
	var helpers = {
		constructURLFragment: function(str) {

			return str.replace(/ /g, '-');
		},

		deconstructURLFragment: function(URLFragment) {
			return URLFragment.replace(/-/g, ' ');
		}
	};

	return helpers;
});