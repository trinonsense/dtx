define([
], function(
) {
	var helpers = {
		constructURLFragment: function(str) {
			return str.replace(' ', '-');
		},

		deconstructURLFragment: function(URLFragment) {
			return URLFragment.replace('-', ' ');
		}
	};

	return helpers;
});