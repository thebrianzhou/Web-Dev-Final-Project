module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.initConfig({
    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'public/js/script.js': ['js/script.js'],
          'public/js/controllers.js': ['js/controllers.js']
        } //files
      } //my_target
    }, //uglify
    copy: {
      files: {
        cwd: '.',  // set working folder / root to copy
        src: 'js/*.js',           // copy all files and subfolders
        dest: 'public/js/',    // destination folder
        expand: true           // required when using cwd
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
        files: ['js/*.js'],
        //tasks: ['uglify']
        tasks: ['copy']
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