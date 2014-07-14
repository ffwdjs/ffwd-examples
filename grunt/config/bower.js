/* jshint node: true */
'use strict';

/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

var config = {
  options: {
    layout: 'byType',
    // install: true,
    // copy: true,
    verbose: true,
    cleanTargetDir: true,
    cleanBowerDir: false,
    bowerOptions: {}
  },
  dev: {
    options: {
      targetDir: '.tmp/bower_components',
    }
  },
  dist: {
    options: {
      targetDir: '<%= pkg.ffwd.dist %>/bower_components',
    }
  }
};

module.exports = config;
