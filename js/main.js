require({
  paths: {
    jquery: '../lib/jquery-1.7.1',
    jqueryui: '../lib/jqueryui-built/jqueryui',
    backbone: '../lib/backbone/backbone',
    'backbone/localstorage': '../lib/backbone-localstorage',
    'backbone/relational': '../lib/backbone-relational/backbone-relational',
    underscore: '../lib/underscore/underscore',
    EaselJS: '../lib/EaselJS/src/easeljs'
  },
  priority: ['jquery']
}, ['jquery', 'AppView'], function($, AppView) {
  $(function() {window.App = new AppView();});
});
