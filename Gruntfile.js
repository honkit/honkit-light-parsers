module.exports = function (grunt) {
    var path = require("path");
    var pkg = require("./package.json");

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Init GRUNT configuraton
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    '@honkit-light-parsers.js': [
                        './lib/index.js'
                    ],
                },
                options: {
                    postBundleCB: function (err, src, next) {
                        if (err) return next(err);
                        return next(null, '(function () { var define = undefined; '+src+'; })();')
                    },
                    browserifyOptions: {
                        'standalone': "honkitLightParsers"
                    },
                    "transform": [
                        "browserify-swap"
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '@honkit-light-parsers.min.js': ['@honkit-light-parsers.js']
                }
            }
        }
    });

    grunt.registerTask("bower-install", [ "bower-install-simple" ]);

    // Bundle the library
    grunt.registerTask('bundle', [
        'browserify',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'bundle'
    ]);
};
