define('Component',
       ['require', 'jquery', 'backbone', 'underscore',
        'EaselJS/display/Graphics', 'EaselJS/display/Shape', 'EaselJS/geom/Point'],
       function(require, $, Backbone, _, Graphics, Shape, Point) {

  var Component = Backbone.Model.extend({
    defaults: {
      name: 'A Generic Component',
      type: 'Component',
    },

    /*
     * constructor
     * We check if a type attribute exists, if so we load the relevant subclass's module
     * and return a new instance of it, instead of the original object
     */
    constructor: function(attributes, options) {
      var obj = this;
      if (attributes.type && attributes.type != this.defaults.type) {
        var subModule = require('Components/' + attributes.type);
        obj = new subModule(attributes, options);
      } else {
        Backbone.Model.apply(obj, arguments);
      }
      return obj;
    },

    initialize: function(attributes, options) {
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }

      //Replace array of generic node objects with Point objects
      if (attributes && attributes.nodes) {
        var nodes = new Array(attributes.nodes.length);
        for (var i = 0; i < attributes.nodes.length; i++) {
          nodes[i] = new Point(attributes.nodes[i].x, attributes.nodes[i].y);
        }
        this.set('nodes', nodes);
      }

      var g = this.graphics = new Graphics();
      g.setStrokeStyle(2);
      g.beginStroke(Graphics.getRGB(255,255,255,1));
      g.drawCircle(-20, 0, 4);
      g.beginStroke(Graphics.getRGB(255,255,255,1));
      g.drawCircle(30, 0, 4);
    },

    clear: function() {
      this.destroy();
    },

    getNodes: function() {
      return [new Point(0,0), new Point(40,0)];
    },

    getShape: function(draw) {
      draw.startLine('wire')
          .moveTo(0,0)
          .lineTo(40,0);
    }
  });

  return Component;
});
