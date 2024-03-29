/* jshint node: true */
'use strict';

/*
This file was generated by generator-ffwd,
you probably should not modify it
*/

module.exports = function(config) {
  'use strict';
  var requirejs = require('requirejs');
  var _ = require('underscore');
  var fs = require('fs');
  var path = require('path');

  var grunt = config.grunt;
  var verbose = grunt.verbose;
  var log = grunt.log;
  var ffwd = config.config.pkg.ffwd;

  var tempDir = '.tmp/-rjs-';

  var deps = [
    'requirejs',
    'requirejs-conf'
  ];

  var rjsConfPath = path.resolve('./client/scripts/requirejs-conf');
  var rjsConf = requirejs(rjsConfPath);

  _.defaults(rjsConf, {
    paths: {},
    shim: {}
  });

  _.defaults(rjsConf.shim, {
    '<%= pkg.name %>': [
      'tpl!scripts/index.tpl'
    ],

    '<%= pkg.name %>/deps': [
      'backbone',
      'underscore.string',
      'moment'
    ]
    // .concat(rjsConf.shim['underscore.string'], rjsConf.shim.backbone.deps)
    ,

    '<%= pkg.name %>/mocks': [
      // '<%= pkg.name %>/deps',
      'mockjax'
    ],

    '<%= pkg.name %>/test': [
      // '<%= pkg.name %>/mocks',
      'expectjs',
      'mocha'
    ]
  });

  _.extend(rjsConf.paths, {
    'requirejs': path.resolve('./node_modules/requirejs/require'),
    'requirejs-conf': rjsConfPath,
    '<%= pkg.name %>': 'scripts/index.js'
  });

  var modules = {
    '<%= pkg.name %>/deps': {
      create: true,
      name: '<%= pkg.name %>/deps',
      out: '<%= pkg.ffwd.dist %>/scripts/<%= pkg.name %>/deps.js',

      // wrapShim: true,
      // insertRequire: true,

      include: _.uniq([
                    'requirejs',
                    'requirejs-conf'
                  ]
                  .concat(rjsConf.shim['<%= pkg.name %>/deps'])
                ),
      exclude: _.uniq(rjsConf.shim['<%= pkg.name %>']
                // .concat(rjsConf.shim['<%= pkg.name %>/test'])
                // .concat(rjsConf.shim['<%= pkg.name %>/mocks'])
                )
    },

    '<%= pkg.name %>/test': {
      create: true,
      name: '<%= pkg.name %>/test',
      out: '<%= pkg.ffwd.dist %>/scripts/<%= pkg.name %>/test.js',
      exclude: _.uniq([]
                  .concat(rjsConf.shim['<%= pkg.name %>/deps'])
                  .concat(rjsConf.shim['<%= pkg.name %>/mocks'])
                  .concat(rjsConf.shim['<%= pkg.name %>'])
                )
    },

    '<%= pkg.name %>/mocks': {
      create: true,
      name: '<%= pkg.name %>/mocks',
      out: '<%= pkg.ffwd.dist %>/scripts/<%= pkg.name %>/mocks.js',
      exclude: _.uniq([]
                  .concat(rjsConf.shim['<%= pkg.name %>/deps'])
                  .concat(rjsConf.shim['<%= pkg.name %>/test'])
                  .concat(rjsConf.shim['<%= pkg.name %>'])
                )
    },

    '<%= pkg.name %>': {
      name: '<%= pkg.name %>',
      out: '<%= pkg.ffwd.dist %>/scripts/<%= pkg.name %>.js',
      exclude: _.uniq([]
                  .concat(rjsConf.shim['<%= pkg.name %>/deps'])
                  .concat(rjsConf.shim['<%= pkg.name %>/test'])
                  .concat(rjsConf.shim['<%= pkg.name %>/mocks'])
                  .concat(['requirejs-conf'])
                )
    }
  };

  var rConf = {
    options: {
      stubModules: ['text'],

      optimize: 'uglify2',
      preserveLicenseComments: false,
      generateSourceMaps: true,

      // wrapShim: true,
      skipDirOptimize: true,

      optimizeCss: 'none',

      baseUrl: './client',
      paths: rjsConf.paths,
      shim: rjsConf.shim,
      packages: rjsConf.packages,

      onModuleBundleComplete: function (data) {
        /*
        data.name: the bundle name.
        data.path: the bundle path relative to the output directory.
        data.included: an array of items included in the build bundle.
        If a file path, it is relative to the output directory. Loader
        plugin IDs are also included in this array, but depending
        on the plugin, may or may not have something inlined in the
        module bundle.
        */
        verbose.writeln('onModuleBundleComplete', data.path+':\n'+data.included.join('\n'));

        try {
          grunt.file.copy(tempDir +'/'+ data.path, ffwd.dist +'/'+ data.path);
        }
        catch(e) {
          grunt.fatal(e);
        }
        try {
          grunt.file.copy(tempDir +'/'+ data.path +'.map', ffwd.dist +'/'+ data.path +'.map');
        }
        catch(e) {
          log.error(e);
        }

        log.ok(ffwd.dist +'/'+ data.path +' created');
        // // add a timestamp to the sourcemap URL to prevent caching
        // fs.readFile(data.path, {encoding: 'utf8'}, function(err, content) {
        //   // console.info('onModuleBundleComplete', data.name, content);
        //   content = content + '?' + (new Date()).getTime();
        //   fs.writeFileSync(data.path, content);
        // });
      },

      dir: tempDir,

      modules: _.toArray(modules)
    },


    prod: {
      options: {}
    },

    dev: {
      options: {
        optimize: 'none',
        preserveLicenseComments: true,
        generateSourceMaps: true,
        // modules: [
        //   modules['<%= pkg.name %>/mocks'],
        //   modules['<%= pkg.name %>']
        // ]
      }
    }
  };

  return rConf;
};