define('AppView',
       ['jquery', 'backbone', 'underscore', 'EaselJS/utils/Ticker', 'ComponentList',
        'View/Schematic', 'View/Component'],
       function($, Backbone, _, Ticker, ComponentList, SchematicView, ComponentView) {

  var AppView = Backbone.View.extend({

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

  return AppView;
});
