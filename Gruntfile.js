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
      srcPath: 'sass/',
      deployPath: 'css/'
    },

    //  Task configuration
    sass: {
      dist: {
        files: {
          '<%= meta.deployPath %>style.css' : '<%= meta.srcPath %>style.sass'
        },
        options: {
          style: 'compressed'
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
        files: ['<%= meta.srcPath %>*.sass', '*.html'],
        tasks: ['sass', 'livereload'],
        events: true
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};