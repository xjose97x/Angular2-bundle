module.exports = function(grunt) {

    // load Grunt plugins from NPM
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // configure plugins
    grunt.initConfig({
        uglify: {
            my_target: {
                options: {

                },
                files: {
                    'dist/app.bundle.js': 'dist/app.bundle.js'
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: ["index.html"],
                    dest: "dist/"
                }, {
                    expand: true,
                    cwd: "src/assets",
                    src: ["*.*", "**/*.*"],
                    dest: "dist/assets"
                }]
            }
        },
        clean: ['dist/*'],
        webpack: {
            mainBundle: {
                entry: "./src/main.ts",
                output: {
                    path: "dist",
                    filename: "app.bundle.js",
                },
                progress: true,

                failOnError: true,
                resolve: {
                    extensions: ['', '.ts', '.js', '.css',
                        '.scss', 'html'
                    ]
                },
                devtool: 'source-map',
                loaders: ['angular2-template-loader'],
                module: {
                    loaders: [
                        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                        {
                            test: /\.tsx?$/,
                            loaders: ['ts-loader', 'angular2-template-loader?keepUrl=true']
                        }, {
                            test: /\.scss$/,
                            exclude: /node_modules/,
                            loaders: ['raw-loader', 'sass-loader'] // sass-loader not scss-loader
                        },
                        /* Embed files. */
                        {
                            test: /\.(html|css)$/,
                            loader: 'raw-loader',
                            exclude: /\.async\.(html|css)$/
                        },
                        /* Async loading. */
                        {
                            test: /\.async\.(html|css)$/,
                            loaders: ['file?name=[name].[hash].[ext]', 'extract']
                        }
                    ]
                }
            }
        }
    });

    // define tasks
    grunt.registerTask('default', ['clean', 'copy', 'webpack', 'uglify']);
};
