/*jshint node:true*/
'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            src: 'src/**/*.js',
            options: {
                specs: 'spec/**/*.js',
                helpers: 'helpers/**/*.js'
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
                    'build/<%= pkg.name %>.debug.js': 'src/<%= pkg.name %>.js'
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
                output: 'docs/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-docco');

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['test', 'uglify']);
};
