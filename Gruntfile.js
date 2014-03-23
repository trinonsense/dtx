/* global module:true */

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			dev: {
				files: [
					'*.html',
					'templates/*.hbs',
					'scss/**/*.scss',
					'js/**/*.js'
				],
				tasks: ['jshint', 'handlebars', 'compass:dev'],
				options: {
					// livereload: true
					atBegin: true
				}
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
				}
			},
			prod: {
				options: {
					outputStyle: 'compressed',
					environment: 'production',
					force: true
				}
			}
		},

		jshint: {
			src: ['Gruntfile.js', 'js/**/*.js'],
			options: {
				// option order as listed on http://www.jshint.com/docs/options/
				jshintrc: '.jshintrc'
			}
		},

		handlebars: {
			compile: {
				expand: true,
				cwd: 'templates/',
				src: '*.hbs',
				dest: 'compiled_templates/',
				ext: '.js',
				options: {
					namespace: false,
					amd: true
				}
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
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
};