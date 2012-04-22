define('Component',
       ['backbone'],
       function(Backbone) {

  var Component = Backbone.Model.extend({
    defaults: {
      image: 'component.png',
      name: 'A Generic Component'
    },

    initialize: function() {
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }
    },

    clear: function() {
      this.destroy();
    }
  });

  return Component;
});
