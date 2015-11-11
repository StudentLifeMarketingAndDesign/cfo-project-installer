module.exports = function(grunt) {

  var globalConfig = {
    themeDir: 'themes/cfo'
  };

  // Project configuration.
  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          '<%=globalConfig.themeDir %>/css/app.css' : '<%=globalConfig.themeDir %>/scss/app.scss'
        },                  // Target
        options: {              // Target options
          style: 'compressed',
          loadPath: [
          'cfo-project/bower_components/foundation/scss'
          ]
        }
      }
    },
    //concat all the files into the build folder

    concat: {
      js:{
        src: [
          'cfo-project/bower_components/modernizr/modernizr.js',
          'cfo-project/bower_components/foundation/js/foundation.min.js',
          'cfo-project/bower_components/FlexSlider/jquery.flexslider.js',
          'division-bar/js/division-bar.js',
          '<%=globalConfig.themeDir %>/javascript/*.js'
        ],
        dest: '<%=globalConfig.themeDir %>/build/build.src.js'
      }
    },

    //minify those concated files
    //toggle mangle to leave variable names intact

    uglify: {
      my_target:{
        files:{
        '<%=globalConfig.themeDir %>/build/build.js': ['<%=globalConfig.themeDir %>/build/build.src.js'],
        }
      }
    },

    watch: {
      scripts: {
        files: ['<%=globalConfig.themeDir %>/js/*.js', '<%=globalConfig.themeDir %>/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: true,
        }
      },
      css: {
        files: ['<%=globalConfig.themeDir %>/scss/*.scss',
                '<%=globalConfig.themeDir %>/scss/**/*.scss',
                '<%=globalConfig.themeDir %>/scss/**/**/*.scss'
                ],
        tasks: ['sass'],
        options: {
          spawn: true,
        }
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  // Note: order of tasks is very important
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

};
