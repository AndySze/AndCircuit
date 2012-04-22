define('ComponentView',
       ['jquery', 'backbone', 'underscore', 'jqueryui/draggable'],
       function($, Backbone, _) {

  var ComponentView = Backbone.View.extend({
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

      this.$el.draggable({ helper: 'clone' });
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

  return ComponentView;
});
