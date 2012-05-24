define('Components/Resistor',
       ['Component'],
       function(Component) {
  var Resistor = Component.extend({
    defaults: {
      name: 'Resistor',
      type: 'Resistor' //Must be the same as the AMD module name
    },

    initialize: function() {
      //Super()?
      Component.prototype.initialize.apply(this, arguments);
    },

    getNodes: function() {
      return [new Point(0,0), new Point(40,0)];
    },

    getShape: function(draw) {
      draw.startLine('wire')
          .moveTo(0, 0)
          .lineTo(5,0);
 
      for (var i = 1, y = 5, steps = 8, steplen = 30/steps; i < steps; i++) {
        draw.lineTo(steplen*i + 5, y);
        y = -y;
      }
      draw.lineTo(35,0)
          .lineTo(40, 0);
    }
  });

  return Resistor;
});
