module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        basic: {
             src: ["src/utils/util.js","src/utils/*.js"],
             dest:"dest/<%= pkg.name %>_base.js"
        },
        chrome: {
             src: ["src/utils/util.js","src/utils/*.js", "src/chrome/*.js"],
             dest:"dest/<%= pkg.name %>_chrome.js"
        }
    },
    uglify: {
      options: {
         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      basic: {
         src: 'dest/<%= pkg.name %>_base.js',
         dest: 'dest/<%= pkg.name %>_base.min.js'
      },
      chrome: {
         src: 'dest/<%= pkg.name %>_chrome.js',
         dest: 'dest/<%= pkg.name %>_chrome.min.js'
      }
    },
    copy: {
        main: {
            files:[{
                 filter: 'isFile',
                 flatten: true,
                 src: 'dest/*chrome*.js',
                 dest: 'test/testExtension/js/'
            },{
                 filter: 'isFile',
                 flatten: true,
                 src: 'dest/*base*.js',
                 dest: 'test/server/static/js/src/'
            }]
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  //grunt.registerTask('default', ['concat', 'jshint', 'uglify']);
  grunt.registerTask('default', ['concat', 'uglify', 'copy']);

};
