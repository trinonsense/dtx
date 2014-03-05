module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			site: {
				files: ['*.html', 'css/*.css', 'js/.*js'],
				tasks: [],
				options: {
					livereload: true
			}
			scss: {
				files: 'scss/*.scss',
				task: 'compass'
			}
		},

		compass: {
			options: {
					sassDir: 'scss',
					cssDir: 'css'
					outputStyle: 'expanded',
					debugInfo: true
					// importPath: '',
					// specify: 'scss/main.scss'
			},
			prod: {
				options: {
					outputStyle: 'compressed',
					environment: 'production'
				}
			}
		},

		csslint: {
			src: ['css/main.css']
			options: {
				// csslintrc: ''
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			}
		},

		requirejs: {
			options: {}
		},

		jasmine: {
			options: {}
		}
	};

		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-compass');
		grunt.loadNpmTasks('grunt-contrib-csslint');
		grunt.loadNpmTasks('grunt-contrib-jasmine');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-requirejs');
	});
};