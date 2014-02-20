// Generated on 2014-01-16 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    angularFeeds: {
      scriptsPath: 'src/scripts',
      stylesPath: 'src/styles',
      templatesPath: 'src/templates'
    },

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= angularFeeds.scriptsPath %>/{,*/}*.js', '<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      angularFeedsScript: {
        files: ['<%= angularFeeds.scriptsPath %>/{,*/}*.js'],
        tasks: ['concat:angular_feeds_script', 'uglify:angular_feeds_script'],
        options: {
          livereload: true
        }
      },
      angularFeedsStyles: {
        files: ['<%= angularFeeds.stylesPath %>/{,*/}*.css'],
        tasks: ['concat:angular_feeds_styles', 'cssmin:angular_feeds_styles'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= angularFeeds.scriptsPath%>/*.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    pkg: grunt.file.readJSON("package.json"),

    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd h:MM TT") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n'
    },
    ngtemplates: {
      feeds: {
        cwd: 'src/templates/',
        src: '**.html',
        dest: 'src/scripts/templates.js'
      },
      "app-templates": {
        cwd: 'app/',
        src: 'templates/**.html',
        dest: 'app/scripts/app-templates.js'
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,png,txt}',
              '*.html',
              'views/{,*/}*.html',
              'bower_components/**/*',
              'images/{,*/}*.{webp}',
              'fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/images',
            dest: '<%= yeoman.dist %>/images',
            src: ['generated/*']
          }
        ]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      },
      angular_feeds_styles: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= yeoman.app %>//<%= pkg.name %>/<%= pkg.name %>.min.css': [
            '<%= yeoman.app %>//<%= pkg.name %>/<%= pkg.name %>.css'
          ]
        }
      }
    },
    concat: {
      angular_feeds_script: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          '<%= angularFeeds.scriptsPath %>/*.js'
        ],
        dest: '<%= yeoman.app %>/<%= pkg.name %>/<%= pkg.name %>.js'
      },
      angular_feeds_styles: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          '<%= angularFeeds.stylesPath %>/*.css'
        ],
        dest: '<%= yeoman.app %>//<%= pkg.name %>/<%= pkg.name %>.css'
      },
      dist: {}
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      angular_feeds_script: {
        src: ['<%= yeoman.app %>/<%= pkg.name %>/<%= pkg.name %>.js'],
        dest: '<%= yeoman.app %>/<%= pkg.name %>/<%= pkg.name %>.min.js'
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });


  grunt.registerTask('test', [
    'concurrent:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'concat',
    'copy:dist',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['serve']);
};
