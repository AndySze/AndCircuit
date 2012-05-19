define('Components/Resistor',
       ['Component'],
       function(Component) {
  var Resistor = Component.extend({
    defaults: {
      name: 'Resistor'
    },

    initialize: function() {
      //Super()?
      Component.prototype.initialize.call(this);

      this.graphics.setStrokeStyle(2)
        .beginStroke('#FFF')
        .moveTo(14, 20)
        .lineTo(46, 20);
    }
  });
});
