module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            systemjs: {
                files:
                    [
                        {
                            expand: true,
                            cwd: 'node_modules/systemjs/dist/',
                            src: 'system.js',
                            dest: 'build/'
                        }
                    ]
            },
            html: {
                files:
                    [
                        {
                            expand: true,
                            cwd: '',
                            src: 'index.html',
                            dest: 'build/'
                        }
                    ]
            },
            server: {
                files:
                    [
                        {
                            expand: true,
                            cwd: '../Server/Debug/',
                            src: 'Server.exe',
                            dest: ''
                        }
                    ]
            }
        },

        ts: {
            default: {
                src: ['ts/*.ts'],
                out: 'build/scripts.js',
                options: {
                    noImplicitAny: true,
                    removeComments: true,
                    preserveConstEnums: true,
                    sourceMap: false,
                    module: 'system',
                    target: 'es5'
                }
            }
        },

        tslint: {
            options:
                {
                    configFile: 'tsconfig.json'
                },
            validate: ['ts/*.ts']
        },

        clean: {
            server: ['Server.exe'],
            scripts: ['build/scripts.js'],
            js_min: ['build/*.js'],
            css_min: ['build/*.css'],
            html: ['build/index.html']
        },

        uglify: {
            build: {
                src: 'build/scripts.js',
                dest: 'build/scripts.min.js'
            }
        },

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },

            target: {
                files: {
                    'build/styles.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'css/main.css'
                    ]
                }
            }
        },

        hashres: {
            options: {
                fileNameFormat: '${name}.[${hash}].${ext}',
                renameFiles: true
            },

            prod: {
                src: [
                    'build/scripts.min.js',
                    'build/styles.min.css',
                    'build/system.js'
                ],

                dest: ['*.html']
            }
        },

        watch: {
            css: {
                files: ['css/**/*.*'],
                tasks: [
                    'clean:css_min',
                    'cssmin',
                    'hashres:prod'
                ],
                options: {livereload: true}
            },
            scripts: {
                files: ['ts/**/*.*'],
                tasks: [
                    'clean:js_min',
                    'shell',
                    'tslint',
                    'ts',
                    'uglify',
                    'clean:scripts',
                    'copy:systemjs',
                    'hashres:prod'
                ],
                options: {livereload: true}
            },
            html: {
                files: ['*.html'],
                tasks: [
                    'clean:html',
                    'hashres:prod',
                    'copy:html'
                ],
                options: {livereload: true}
            }
        },

        open: {
            server: {
                path: 'Server.exe'
            },
            browser: {
                path: 'http://127.0.0.1:80/build/index.html'
            }
        },

        shell: {
            options: {
                stderr: true
            },
            target: {
                command: 'cspell ts/*.ts'
            }
        },
    });

    grunt.loadNpmTasks('grunt-ts'),
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('default', [
            'clean',
            'shell',
            'tslint',
            'ts',
            'uglify',
            'cssmin',
            'clean:scripts',
            'copy:systemjs',
            'hashres:prod',
            'copy:html',
            'copy:server',
            'open:server',
            'open:browser',
            'watch'
    ]);
};