$(function() {
  var root = (function(){return this;}).call();

  var AndCircuit = root.AndCircuit = {};

  var Component = AndCircuit.Component = Backbone.Model.extend({
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

  var ComponentList = AndCircuit.ComponentList = Backbone.Collection.extend({
    model: Component,

    localStorage: new Store("AndCircuit-Backbone"),

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },

    comparator: function(component) {
      return component.get('order');
    }
  });

  var Components = AndCircuit.Components = new ComponentList;

  var ComponentView = AndCircuit.ComponentView = Backbone.View.extend({
    tagName: "li",

    template: _.template($('#component-template').html()),

    //events: {}

    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove');
      this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    close: function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    },

    clear: function() {
      this.model.clear();
    }
  });

  var AppView = AndCircuit.AppView = Backbone.View.extend({
    el: $("body"),

    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render');

      Components.bind('add', this.addOne);
      Components.bind('reset', this.addAll);
      Components.bind('all', this.render);

      Components.fetch();
    },

    render: function() {
      //Nothing?
    },

    addOne: function(component) {
      var view = new ComponentView({model: component});
      this.$("#component-palette").append(view.render().el);
    },

    addAll: function() {
      Components.each(this.addOne);
    }

  });

  var App = AndCircuit.App = new AppView;

});
