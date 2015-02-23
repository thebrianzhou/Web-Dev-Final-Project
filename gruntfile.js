module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'public/js/script.js': ['js/*.js']
        } //files
      } //my_target
    }, //uglify
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
        files: ['js/*.js'],
        tasks: ['uglify']
      }, //script
      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass:dev','compass:foundation']
      }, //sass
      sass_foundation: {
        files: ['public/lib/foundation/scss/foundation.scss','public/lib/foundation/scss/foundation/*.scss','public/lib/foundation/scss/foundation/components/*.scss'],
        tasks: ['compass:foundation']
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
      },
  compassMultiple: {
    options : {
      // if you need, you can set options. 
      environment: 'production',
      outputStyle: 'compressed',
      javascriptsDir: './js',
      imagesDir: './image',
      fontsDir: './font',
      importPath: './css/framework',
      relativeAssets: true,
      time: true
    },
 
 
    // multiple option provides you to compile multi sassDir. 
    all: {
      options: {
        multiple: [
          {
          sassDir: 'page/css/cmn/',
          cssDir: '../static/page/css/cmn/'
          },{
          sassDir: 'page/css/orgn/scss',
          cssDir: '../static/page/css/orgn/'
          }
        ]
      }
    }
  }



  }
  }) //initConfig
  grunt.registerTask('default', ['express:dev', 'watch']);
} //exports