var appVersion = '0.0.1';

require.config({
	enforceDefine: true,
	baseUrl: 'js',
	urlArgs: 'v=' + appVersion,
	paths: {
		jquery: '../bower_packages/jquery/dist/jquery',
		backbone: '../bower_packages/backbone/backbone',
		underscore: '../bower_packages/underscore/underscore',
		modernizr: '../bower_packages/modernizr/modernizr',
		leaflet: '../bower_packages/leaflet/dist/leaflet'
	},
	shim: {
		modernizr: {
			exports: 'Modernizr'
		}
	}
});

define(['main', 'modernizr'], function(main) {
	main.run();
});