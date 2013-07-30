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
      jsPath: 'js/',
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

    // Uglify
    uglify: {
      target: {
        files: {
          '<%= meta.jsPath %>main.min.js' : ['<%= meta.jsPath %>main.js']
        }
      }
    },

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
        files: ['<%= meta.srcPath %>*.scss', '*.html', '<%= meta.jsPath %>*.js'],
        tasks: ['livereload'],
        events: true
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sass', 'uglify', 'livereload-start', 'connect', 'regarde']);
};