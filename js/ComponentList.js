define('ComponentList',
       ['backbone', 'backbone/localstorage', 'Component', 'Components/Resistor'],
       function(Backbone, bblocalStorage, Component, Resistor) {

  var ComponentList = Backbone.Collection.extend({
    model: Component,

    localStorage: new bblocalStorage.Store("AndCircuit-Backbone"),

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(component) {
      return component.get('order');
    },

    removeAll: function() {
      while (this.length > 0) {
        this.remove(this.at(0));
      }
    }
  });

  return ComponentList;
});
