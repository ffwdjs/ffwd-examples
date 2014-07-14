/* jshint node: true */
'use strict';

/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

module.exports = function(config) {
  return {
    options: {
      paths: [
        'client/bower_components/bootstrap/less',
        'client/less'
      ]
    },

    dev: {
      files: {
        '<%= pkg.ffwd.dist %>/styles/styles.css': 'client/less/styles.less'
      }
    },

    prod: {
      options: {
        cleancss: false,
        compress: true,
        sourceMap: true
      },

      files: {
        '<%= pkg.ffwd.dist %>/styles/styles.css': 'client/less/styles.less'
      }
    }
  };
}