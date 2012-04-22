define('AndCircuit',
       ['jquery', 'backbone', 'underscore', 'backbone/localstorage', 'exports',
         'EaselJS/display/Stage', 'EaselJS/display/Graphics', 'EaselJS/display/Shape', 'EaselJS/utils/Ticker',
         'jqueryui/draggable'],
       function($, Backbone, _, bblocalStorage, AndCircuit, Stage, Graphics, Shape, Ticker) {

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

    localStorage: new bblocalStorage.Store("AndCircuit-Backbone"),

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

    events: {
      "dragstop" : "dropped"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove', 'dropped');
      this.model.on('change', this.render);
      this.model.on('destroy', this.remove);

      this.template = _.template($('#component-template').html());

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

    initialize: function() {

      _.bindAll(this, 'render', 'resize');

      this.setElement($('#schematic'));

      this.options.parent.on('tick', this.render);
      this.options.parent.on('resize', this.resize);

      this.$canvas = $("<canvas>").appendTo(this.$el)
        .attr("id", "schematic-canvas");
      this.canvas = this.$canvas[0];
      this.stage = new Stage(this.canvas);

      var image = new Image();
      var stage = this.stage;

      this.resize();

      image.src = "lib/EaselJS/examples/img/daisy.png";
      image.onload = function(event) {
        var bitmap = new Bitmap(event.target);
        stage.addChild(bitmap);
      }

      var g = new Graphics();
      var s = new Shape(g);
      stage.addChild(s);
      g.setStrokeStyle(1);
      g.beginStroke(Graphics.getRGB(0,0,0));
      g.beginFill(Graphics.getRGB(255,0,0));
      g.moveTo(100,0);
      g.lineTo(100, stage.canvas.height);
      
    },

    render: function() {
      this.stage.update();
    },

    resize: function() {
      this.stage.canvas.height = this.$el.height();
      this.stage.canvas.width = this.$el.width();
    }
  });

  var AppView = AndCircuit.AppView = Backbone.View.extend({

    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render');

      this.setElement($('body'));

      this.Components = new ComponentList;

      this.Components.on('add', this.addOne);
      this.Components.on('reset', this.addAll);
      this.Components.on('all', this.render);

      this.Components.fetch();

      this.Schematic = new SchematicView({parent: this});

      var that = this;
      var tickObject = {
        tick: function(timeElapsed) {
          that.trigger('tick', timeElapsed);
        }
      };
      Ticker.addListener(tickObject);

      $(window).resize(function(event) {
        that.trigger('resize', event);
      });
    },

    render: function() {
      //Nothing?
    },

    addOne: function(component) {
      var view = new ComponentView({model: component});
      this.$('#component-palette').append(view.render().el);
    },

    addAll: function() {
      this.Components.each(this.addOne);
    }
  });

  
});
