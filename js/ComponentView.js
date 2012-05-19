define('ComponentView',
       ['jquery', 'backbone', 'underscore', 'jqueryui/draggable'],
       function($, Backbone, _) {

  var ComponentView = Backbone.View.extend({
    tagName: 'li',
    className: 'component-item',

    events: {
      'dragstop' : 'dropped',
      'drag' : 'dragging'
    },

    initialize: function() {
      _.bindAll(this, 'render', 'close', 'remove', 'dropped', 'drawHelper', 'dragging');
      this.model.on('change', this.render);
      this.model.on('destroy', this.remove);

      this.template = _.template($('#component-template').html());

      this.$el.draggable({helper: 'clone'});
      this.$el.data('view', this);
      this.$el.data('model', this.model);
    },

    dragging: function(event, ui) {
      this.trigger('dragging', event, ui);
    },

    dropped: function(event, ui, other) {
      var o = other;
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    drawHelper: function() {
        var canvas = $('<canvas width="60" height="40"></canvas>');
        this.model.graphics.draw(canvas[0].getContext('2d'));
        return canvas[0];
    },

    close: function() {
      this.model.save({content: this.input.val()});
      this.$el.removeClass("editing");
    },

    clear: function() {
      this.model.clear();
    }
  });

  return ComponentView;
});
