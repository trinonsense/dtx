/* global module:true */

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			dev: {
				files: ['*.html', 'scss/**/*.scss', 'js/**/*.js'],
				tasks: ['jshint', 'compass:dev'],
				options: {
					livereload: true
				}
			},
			scss: {
				files: 'scss/*.scss',
				tasks: 'compass:dev'
			}
		},

		compass: {
			options: {
				sassDir: 'scss',
				cssDir: 'css',
				importPath: ['./']
			},
			dev: {
				options: {
					outputStyle: 'expanded',
					debugInfo: true
				}
			},
			prod: {
				options: {
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},

		csslint: {
			src: ['css/main.css'],
			options: {
				// csslintrc: ''
			}
		},

		jshint: {
			src: ['Gruntfile.js', 'js/**/*.js'],
			options: {
				// option order as listed on http://www.jshint.com/docs/options/
				jshintrc: '.jshintrc'
			}
		},

		requirejs: {
			options: {}
		},

		jasmine: {
			options: {}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
};