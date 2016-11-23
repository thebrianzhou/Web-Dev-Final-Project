module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.initConfig({
    clean: ["public/js"],
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'public/js/script.js': ['source_js/script.js'],
          'public/js/app.js': ['source_js/app.js'],
          'public/js/controllers.js': ['source_js/controllers.js'],
          'public/js/services.js': ['source_js/services.js'],
        } //files
      } //my_target
    }, //uglify
    copy: {
      files: {
            expand : true,
            dest   : 'public/js',
            cwd    : 'js',
            src    : [
              '**/*.js'
            ]
      }
    },
    compass: {
      dev: {
        options: {
          config: 'compass_config.rb'
        } //options
      }, //dev
      foundation: {
        options: {
          config: 'compass_foundation_config.rb'
        } //options
      } //foundation

    }, //compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['source_js/*.js'],
        tasks: ['clean','uglify'],
        //tasks: ['copy']
      }, //script
      sass: {
        files: ['source_sass/*.scss'],
        tasks: ['compass:dev','compass:foundation']
      }, //sass
      sass_foundation: {
        files: ['source_sass/*.scss', 'source_sass/foundation/*.scss'],
        tasks: ['compass:dev']
      }, //sass_foundation
      html: {
        files: ['public/*.html']
      }
    }, //watch
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'app.js'
        }
      }
  }
  }) //initConfig
  grunt.registerTask('default', ['uglify', 'compass:dev', 'express:dev', 'watch']);
} //exports
