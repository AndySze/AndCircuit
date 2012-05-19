define('Component',
       ['jquery', 'backbone', 'underscore',
       'EaselJS/display/Graphics', 'EaselJS/display/Shape'],
       function($, Backbone, _, Graphics, Shape) {

  var Component = Backbone.Model.extend({
    defaults: {
      name: 'A Generic Component',
    },

    initialize: function() {
      if (!this.get("name")) {
        this.set({"name": this.defaults.name});
      }

      var g = this.graphics = new Graphics();
      g.setStrokeStyle(2);
      g.beginStroke(Graphics.getRGB(255,255,255,1));
      g.drawCircle(10, 20, 4);
      g.beginStroke(Graphics.getRGB(255,255,255,1));
      g.drawCircle(50, 20, 4);
    },

    clear: function() {
      this.destroy();
    }
  });

  return Component;
});
