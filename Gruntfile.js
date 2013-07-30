'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  //  Project configuration
  grunt.initConfig({

    //  Read the package.json
    pkg: grunt.file.readJSON('package.json'),

    //  Metadata

    meta: {
<<<<<<< HEAD
=======
      jsPath: 'js/',
>>>>>>> master
      srcPath: 'sass/',
      deployPath: 'css/'
    },

    //  Task configuration
    sass: {
      dist: {
        files: {
          '<%= meta.deployPath %>style.css' : '<%= meta.srcPath %>style.scss'
        },
        options: {
          style: 'compressed'
        }
      }
    },

<<<<<<< HEAD
=======
    // Uglify
    uglify: {
      target: {
        files: {
          '<%= meta.jsPath %>main.min.js' : ['<%= meta.jsPath %>main.js']
        }
      }
    },

>>>>>>> master
    livereload: {
      port: 35729
    },

    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },

    regarde: {
      watch: {
<<<<<<< HEAD
        files: ['<%= meta.srcPath %>*.scss', '*.html'],
        tasks: ['sass', 'livereload'],
=======
        files: ['<%= meta.srcPath %>*.scss', '*.html', '<%= meta.jsPath %>*.js'],
        tasks: ['sass', 'uglify', 'livereload'],
>>>>>>> master
        events: true
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
<<<<<<< HEAD
=======
  grunt.loadNpmTasks('grunt-contrib-uglify');
>>>>>>> master

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};