/* global module:true */

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			dev: {
				files: ['*.html', 'scss/**/*.scss', 'js/**/*.js'],
				tasks: ['jshint', 'csscomb', 'csslint', 'compass:dev'],
				options: {
					livereload: true
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

		csslint: {
			src: ['scss/*.scss'],
			options: {
				csslintrc: '.csslintrc'
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
		},

		csscomb: {
			scss: {
				expand: true,
				cwd: 'scss/',
				src: ['*.scss'],
				dest: 'scss/',
				options: {
					config: 'csscomb.json'
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-csscomb');
};