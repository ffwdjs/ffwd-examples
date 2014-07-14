/* jshint node: true */
'use strict';

/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

module.exports = function(config) {
  var serverPort = parseInt(config.port || 9090, 10);
  var livereloadPort = parseInt(config.livereloadPort, 10) || (1 + serverPort);

  return {
    prod: {
      options: {
        bases:          config.staticDirs || ['dist'],
        serverreload:   false,
        hostname:       '*',
        port:           serverPort,
        livereload:     livereloadPort || false,
        server:         'app.js',
      }
    },

    dev: {
      options: {
        bases:          config.staticDirs || ['dist'],
        serverreload:   true,
        hostname:       '*',
        port:           serverPort,
        livereload:     livereloadPort,
        server:         'demo.js',
        showStack:      true
      }
    }
  };
};