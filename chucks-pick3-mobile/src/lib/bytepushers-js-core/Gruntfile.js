module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: ["build"],
            release: {
                options: {
                    force: true
                },
                src: ['release']
            }
        },
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true,
                reporter: require('jshint-stylish')
            },
            files: ['src/main/javascript/**/*.js']
        },
        jslint: {
            javascript: {
                src: [
                    /*'src/main/javascript/!**!/!*.js',*/
                    /*'src/main/javascript/software.bytepushers.BytePushers.js',*/
                    /*'src/main/javascript/software.bytepushers.exceptions.Errors.js',*/
                    'src/main/javascript/software.bytepushers.filters.GenericPropertyFilter.js',
                    'src/main/javascript/software.bytepushers.utils.DateConverter.js',
                    'src/main/javascript/software.bytepushers.utils.DateUtility.js',
                    'src/main/javascript/software.bytepushers.utils.DOMUtility.js',
                    'src/main/javascript/software.bytepushers.utils.NumberUtility.js',
                    'src/main/javascript/software.bytepushers.utils.PhoneNumberUtility.js',
                    /*'src/main/javascript/software.bytepushers.utils.Reflection.js',*/
                    /*'src/main/javascript/software.bytepushers.utils.ResourceLoader.js'*/
                ],
                directives: {
                },
                options: {
                    edition: 'latest',
                    errorsOnly: true,
                    failOnError: false
                },
            }
        },
        karma: {
            server: {
                configFile: 'karma.conf.requires.js'
            },
            ci: {
                options: {
                    basePath: '',
                    frameworks: ['jasmine', 'requirejs'],
                    files: [
                        {pattern: 'node_modules/bytepushers-js-obj-extensions/release/bytepushers-js-obj-extensions.js', included: true},
                        {pattern: 'src/main/javascript/*.js', included: false},
                        {pattern: 'src/main/javascript/*.d.ts', included: false},
                        {pattern: 'src/test/javascript/*.js', included: false},
                        {pattern: 'src/test/javascript/*.d.ts', included: false},
                        'test-main.js'
                    ],
                    exclude: [
                    ],
                    preprocessors: {
                        'src/main/**/*.js': ['coverage']
                    },
                    reporters: ['progress', 'coverage'],
                    coverageReporter: {
                        dir: 'build/reports/coverage'
                    },
                    port: 9876,
                    colors: true,
                    autoWatch: false,
                    browsers: ['PhantomJS'],
                    singleRun: true,
                    concurrency: Infinity
                }
            }
        },
        copy: {
            build: {
                files: [{expand: true, src: ['src/main/javascript/*.js', 'src/main/javascript/*.d.ts'], dest: 'build/', filter: 'isFile'}]
            },
            release: {
                files: [
                    {
                        expand: true,
                        src: [
                            'build/<%= pkg.name %>.min.js',
                            'build/<%= pkg.name %>.js',
                            'build/src/main/javascript/index.js',
                            'build/src/main/javascript/*.d.ts'
                        ],
                        dest: 'release/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        uglify: {
            build_min: {
                options: {
                    mangle: true
                },
                files: {
                    'build/<%= pkg.name %>.min.js': ['build/src/main/javascript/software.bytepushers.*.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            build: {
                src: ['build/src/main/javascript/software.bytepushers.*.js'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },
        'npm-publish': {
            options: {
                // list of tasks that are required before publishing
                //requires: ['build'],
                // if the workspace is dirty, abort publishing (to avoid publishing local changes)
                abortIfDirty: true,
                // can also be a function that returns NPM tag (eg. to determine canary/latest tag based on the version)
                tag: 'latest'
            }
        }
    });
    
    

    var build = grunt.option('target') || 'build';
    var release = grunt.option('target') || 'release';
    var karma_server = grunt.option('target') || 'server';
    var karma_ci = grunt.option('target') || 'ci';

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-npm');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('validate', ['jshint', 'jslint']);
    grunt.registerTask('test', ['test-karma-ci']);
    grunt.registerTask('test-karma', ['karma:' + karma_server]);
    grunt.registerTask('test-karma-ci', ['karma:' + karma_ci]);
    grunt.registerTask('package', ['copy:' + build, 'uglify', 'concat']);
    grunt.registerTask('build', ['clean:' + build, 'validate', 'test', 'package']);
    //grunt.registerTask('release', ['clean:release', 'build', 'copy:release', 'bump', 'npm-publish']);
    grunt.registerTask('release', function (target) {
        target = (target === null || target === undefined) ? "patch" : target;

        grunt.task.run("clean:release");
        grunt.task.run("build");
        grunt.task.run("copy:release");
        grunt.task.run("bump:"+ target);
        grunt.task.run("npm-publish");
    });
};
