/**
 * @module ffwd-examples
 * 
 * ffwd-examples - desc
 */
require([
  'requirejs-conf'
], function(
  requireConf
) {
  'use strict';

  // configure requirejs
  require.config(requireConf);

  // do something like
  require(['jquery', 'highlight'], function($) {
    // var Backbone = require('backbone');
    // var $ = Backbone.$;
    // var _ = require('underscore');
    // ....
    
    // dependency defined in requirejs-conf 
    $(function() {
      /* global hljs: false */
      $('.highlight pre').each(function(i, e) {
        hljs.highlightBlock(e);
      });
    });
  });
});