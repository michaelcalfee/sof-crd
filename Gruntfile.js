module.exports = function(grunt) {

  var js = {
    vendor: [
      "bower_components/jquery/dist/jquery.js"
    ],
    main: [
      "static/src/js/app.js",
      "static/src/js/main.js"
    ]
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      dev: {
        options: {
          port: 8001,
          hostname: 'localhost',
          base: {
            path: 'static',
            options: {
              index: 'index.html'
            }
          },
          open: true,
          middleware: function (connect, options) {
              return [
                require('connect-livereload')(),
                connect.static('static', options.base)
              ];
            }
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'static/src/scss',
          src: ['**/*.scss'],
          dest: 'static/src/css',
          ext: '.css'
        }]
      }
    },
    concat: {
      vendor: {
        src: js.vendor,
        dest: 'static/dist/js/vendor.js'
      },
      main: {
        src: js.main,
        dest: 'static/dist/js/main.js'
      }
    },
    watch: {
      src: {
        files: ['static/src/scss/**/*.scss','static/src/js/**/*.js'],
        tasks: ['sass','concat']  
      },
      livereload: {
        port: 35728,
        options: { livereload: true },
        files: ['static/dist/css/**/*.css','static/dist/js/**/*.js']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass','concat']);
  grunt.registerTask('serve', ['sass','concat','connect:dev','watch']);

};