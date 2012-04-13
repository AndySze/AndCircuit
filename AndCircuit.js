$(function() {
  var root = (function(){return this;}).call();

  var AndCircuit = root.AndCircuit = {};
  var Components, App;

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


  var ComponentView = AndCircuit.ComponentView = Backbone.View.extend({
    tagName: "li",
    className: "component-item",

    template: _.template($('#component-template').html()),

    events: {
      "dragstop" : "dropped"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove', 'dropped');
      this.model.on('change', this.render);
      this.model.on('destroy', this.remove);

      this.$el.draggable({ grid: [ 10,10 ], helper: 'clone' });
    },

    dropped: function(event, ui) {
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    close: function() {
      this.model.save({content: this.input.val()});
      this.$el.removeClass("editing");
    },

    clear: function() {
      this.model.clear();
    }
  });

  var SchematicView = AndCircuit.SchematicView = Backbone.View.extend({
    el: $("#schematic"),

    initialize: function() {

      _.bindAll(this, 'render');

      this.options.parent.on('tick', this.render);

      this.$canvas = $("<canvas>").appendTo(this.$el)
        .attr("id", "schematic-canvas");
      this.canvas = this.$canvas[0];
      this.stage = new Stage(this.canvas);

      var image = new Image();
      var stage = this.stage;
      image.src = "lib/EaselJS/examples/img/daisy.png";
      image.onload = function(event) {
        var bitmap = new Bitmap(event.target);
        stage.addChild(bitmap);
      }


    },

    render: function() {
      this.stage.update();
    }
  });

  var AppView = AndCircuit.AppView = Backbone.View.extend({
    el: $("body"),

    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render');

      Components.on('add', this.addOne);
      Components.on('reset', this.addAll);
      Components.on('all', this.render);

      Components.fetch();

      this.Schematic = new SchematicView({parent: this});

      var that = this;
      var tickObject = {
        tick: function(timeElapsed) {
          that.trigger("tick", timeElapsed);
        }
      };
      Ticker.addListener(tickObject);
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

  Components = AndCircuit.Components = new ComponentList;
  App = AndCircuit.App = new AppView;
});
