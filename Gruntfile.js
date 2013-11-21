/*jshint node:true*/
'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            options: {
                specs: 'spec/**/*.js',
                vendor: 'bower_components/stacktrace/stacktrace.js'
            },
            source: {
                src: 'src/<%= pkg.name %>.js',
                options: {
                    helpers: 'helpers/**/*.js'
                }
            },
            prod: {
                src: 'build/<%= pkg.name %>.min.js'
            },
            debug: {
                src: 'build/<%= pkg.name %>.debug.js'
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'spec/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        uglify: {
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
                },
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
                    compress: {
                        global_defs: {
                            'DEBUG': false
                        }
                    }
                }
            },
            debug: {
                files: {
                    'build/<%= pkg.name %>.debug.js': ['bower_components/stacktrace/stacktrace.js', 'src/<%= pkg.name %>.js']
                },
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
                    compress: {
                        global_defs: {
                            'DEBUG': true
                        }
                    }
                }
            }
        },

        docco: {
            src: ['src/**/*.js'],
            options: {
                layout: 'classic',
                output: 'docs'
            }
        },

        copy: {
            docs: {
                src: 'docs/<%= pkg.name %>.html',
                dest: 'docs/index.html'
            }
        },

        'gh-pages': {
            options: {
                base: 'docs'
            },
            src: '**/*'
        },

        push: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['-a'],
                npm: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-docco3');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-push-release');

    grunt.registerTask('test', ['jshint', 'jasmine:source']);
    grunt.registerTask('docs', ['docco', 'copy:docs', 'gh-pages']);
    grunt.registerTask('default', ['test', 'uglify']);
};
