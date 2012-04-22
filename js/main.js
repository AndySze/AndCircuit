require({
  paths: {
    jquery: '../lib/jquery-1.7.1',
    jqueryui: '../lib/jqueryui-built/jqueryui',
    backbone: '../lib/backbone/backbone',
    'backbone/localstorage': '../lib/backbone-localstorage',
    underscore: '../lib/underscore/underscore',
    EaselJS: '../lib/EaselJS/src/easeljs'
  },
  priority: ['jquery']
}, ['jquery', 'AppView'], function($, AppView) {
  $(function() {App = new AppView();});
});
