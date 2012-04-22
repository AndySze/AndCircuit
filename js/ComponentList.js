define('ComponentList',
       ['backbone', 'backbone/localstorage', 'Component'],
       function(Backbone, bblocalStorage, Component) {

  var ComponentList = Backbone.Collection.extend({
    model: Component,

    localStorage: new bblocalStorage.Store("AndCircuit-Backbone"),

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(component) {
      return component.get('order');
    }
  });

  return ComponentList;
});
