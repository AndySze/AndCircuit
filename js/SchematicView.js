define('SchematicView',
       ['jquery', 'backbone', 'underscore',
         'EaselJS/display/Stage', 'EaselJS/display/Graphics', 'EaselJS/display/Shape',
         'jqueryui/draggable', 'jqueryui/droppable'],
       function($, Backbone, _, Stage, Graphics, Shape) {

  var SchematicView = Backbone.View.extend({
    events: {
      dropover: 'dragOver',
      dropout: 'dragOut',
      drop: 'drop'
    },

    initialize: function() {

      _.bindAll(this, 'render', 'resize', 'dragOver', 'dragOut', 'dragging', 'drop');

      this.setElement($('#schematic'));
      this.$el.droppable();

      this.options.parent.on('tick', this.render);
      this.options.parent.on('resize', this.resize);

      this.$canvas = $("<canvas>").appendTo(this.$el)
        .attr("id", "schematic-canvas");
      this.canvas = this.$canvas[0];
      this.stage = new Stage(this.canvas);

      var stage = this.stage;

      this.resize();

      this.gridgraphics = new Graphics();
      this.gridshape = new Shape(this.gridgraphics);

      stage.addChild(this.gridshape);

      this.updateGrid();
    },

    dragOver: function(event, ui) {
      ui.helper.hide();
      var view = ui.draggable.data('view');
      if (this.dragshape) {
        this.stage.removeChild(this.dragshape);
        this.dragshape = null;
      }
      this.dragshape = new Shape(view.model.graphics);
      this.stage.addChild(this.dragshape);
      view.on('dragging', this.dragging);
    },

    dragOut: function(event, ui) {
      ui.helper.show();
      var view = ui.draggable.data('view');
      view.off('dragging', this.dragging);
      this.stage.removeChild(this.dragshape);
      this.dragshape = null;
    },

    dragging: function(event, ui) {
      if (this.dragshape) {
        var position = this.$el.offset();
        this.dragshape.x = event.pageX - position.left - 30;
        this.dragshape.x = Math.round(this.dragshape.x / 10) * 10;
        this.dragshape.y = event.pageY - position.top - 20;
        this.dragshape.y = Math.round(this.dragshape.y / 10) * 10;
      }
    },

    drop: function(event, ui) {
      if (this.dragshape) {
        this.stage.removeChild(this.dragshape);
        this.dragshape = null;
      }
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
