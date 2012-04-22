define('SchematicView',
       ['jquery', 'backbone', 'underscore',
         'EaselJS/display/Stage', 'EaselJS/display/Graphics', 'EaselJS/display/Shape',
         'jqueryui/draggable'],
       function($, Backbone, _, Stage, Graphics, Shape) {

  var SchematicView = Backbone.View.extend({

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

      this.gridgraphics = new Graphics();
      this.gridshape = new Shape(this.gridgraphics);

      stage.addChild(this.gridshape);

      this.updateGrid();
    },

    updateGrid: function() {
      this.gridgraphics.clear();
      this.gridgraphics.setStrokeStyle(0.5);
      this.gridgraphics.beginStroke(Graphics.getRGB(0,0,0));

      for (var i = 10; i < this.stage.canvas.width; i += 10) {
        if (i % 100 == 0) {
          this.gridgraphics.setStrokeStyle(0.5);
        } else {
          this.gridgraphics.setStrokeStyle(0.25);
        }

        this.gridgraphics.moveTo(i,0);
        this.gridgraphics.lineTo(i, this.stage.canvas.height);
      }
      for (var i = 10; i < this.stage.canvas.height; i += 10) {
        if (i % 100 == 0) {
          this.gridgraphics.setStrokeStyle(0.5);
        } else {
          this.gridgraphics.setStrokeStyle(0.25);
        }

        this.gridgraphics.moveTo(0, i);
        this.gridgraphics.lineTo(this.stage.canvas.width, i);
      }

      this.gridshape.cache(0, 0, this.stage.canvas.width, this.stage.canvas.height);
    },

    render: function() {
      this.stage.update();
    },

    resize: function() {
      this.stage.canvas.height = this.$el.height();
      this.stage.canvas.width = this.$el.width();

      if (this.gridgraphics) {
        this.updateGrid();
        this.render();
      }
    }
  });

  return SchematicView;
});
