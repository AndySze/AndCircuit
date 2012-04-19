require({
  paths: {
    jquery: '../lib/jquery-1.7.1',
    jqueryui: '../lib/jqueryui-built/jqueryui',
    backbone: '../lib/backbone/backbone',
    'backbone/localstorage': '../lib/backbone-localstorage',
    underscore: '../lib/underscore/underscore'
  },
  priority: ['jquery']
}, ['AndCircuit', 'jquery'], function(AndCircuit, $) {
  $(function() {AndCircuit.App = new AndCircuit.AppView;});
});
