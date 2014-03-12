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
		leaflet: '../bower_packages/leaflet/dist/leaflet',
		domReady: '../bower_packages/requirejs-domready/domReady',
		handlebars: '../bower_packages/handlebars.js/dist/handlebars.amd',
		templates: '../compiled_templates'
	},
	shim: {
		modernizr: {
			exports: 'Modernizr'
		}
	}
});

define([
	'domReady',
	'main',
	'modernizr'
], function(
	domReady,
	main
) {

	domReady(function whenDOMIsReady() {
		main.run();
	});
});