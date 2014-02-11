module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Javascript
    uglify: {
      bowerlibs: {
        files: [
          { src: 'src/js/vendor/modernizr.js', dest:'src/js/vendor/modernizr.js' },
        ]
      }
    },

    // CSS
    autoprefixer: {
      single_file: {
        src: 'src/css/main.css',
        dest: 'src/css/styles.css'
      }
    },
    cssmin: {
      compress: {
        files: {
          "dist/css/styles.css": ['dist/css/normalize.css', 'dist/css/styles.css']
        }
      }
    },

    // Images
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'dist/img/',
          src: '**/*.{png,gif}',
          dest: 'dist/img/'
        }]
      }
    },

    copy: {
      bowerlibs: {
        files: [
          { expand:true, cwd:'bower_components/jquery/',    src:'jquery.min.js', dest: 'src/js/vendor/' },
          { expand:true, cwd:'bower_components/modernizr/', src:'modernizr.js', dest: 'src/js/vendor/' },
          { expand:true, cwd:'bower_components/jquery/',    src:'jquery.min.js', dest: 'src/js/vendor/' },
          //{ expand:true, cwd:'bower_components/jasmine/', src:'modernizr.js', dest: 'src/js/vendor/' },
          //{ expand:true, cwd:'bower_components/sinon/', src:'require.js', dest: 'src/js/vendor/' }
        ],
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: '**/*',
          dest: 'dist/'
        }]
      }
    },

    // Testing
    jasmine : {
      client: {
        // Your project's source files
        src : 'src/**/*.js',

        options: {
          specs : 'specs/client/*.js',
          helpers : 'specs/helpers/*.js',
          keepRunner: true
        }
      }
    },

    clean: [
      'dist/css/main.css',
      'dist/css/normalize.css'
    ],

    express: {
      dev: {
        options: {
          script: './server.js'
        }
      }
    },

    watch: {
      autoprefix: {
        files: ['src/css/main.css'],
        tasks: ['autoprefixer']
      },
      css: {
        files: ['src/css/styles.css'],
        options: { livereload: true}
      },
      js: {
        files: ['src/js/**/*.js'],
        options: { livereload: true}
      },
      html: {
        files: ['src/**/*.html'],
        options: { livereload: true}
      }
    },

    open : {
      dev : {
        path: 'http://localhost:3000'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('start', ['copy:bowerlibs', 'uglify:bowerlibs']);
  grunt.registerTask('dev', ['express:dev', 'autoprefixer', 'open', 'watch']);
  grunt.registerTask('build', ['autoprefixer', 'copy:build', 'cssmin', 'clean']);

  // TODO: grunt.registerTask('test', ['jshint', 'jasmine'])
  grunt.registerTask('test', 'jasmine:client');

};