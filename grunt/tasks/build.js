/* jshint node: true */
'use strict';

/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

module.exports = function(grunt) {
  grunt.registerTask('build', function(target) {
    target = target || 'prod';

    var tasks = [
      'clean',
      'jshint',
      'scripts:'+ target,
      'styles:'+ target
    ];

    if (target === 'prod') {
      tasks.push('jsdoc');
      // tasks.push('gzip');
    }
    
    grunt.log.writeln('Will build with '+ tasks.join(', ') +' tasks.');

    grunt.task.run(tasks);
  });
};