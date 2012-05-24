define('View/Drawer',
       ['underscore', 'EaselJS/geom/Point', 'EaselJS/display/Graphics'],
       function(_, Point, Graphics) {
 var Drawer = function(graphics) {
   if (graphics) {
    this._g = graphics;
   } else {
     this._g = new Graphics();
   }
 };

 _.extend(Drawer.prototype, {
   startLine: function(style) {
     switch(style) {
       case 'wire':
         this._g.setStrokeStyle(2)
                .beginStroke(Graphics.getRGB(255,255,255));
         break;
       default:
         this._g.setStrokeStyle(1)
                .beginStroke(Graphics.getRGB(255,255,255));
         break;
     }
     return this;
   },

   moveTo: function(x, y) {
     this._g.moveTo(x, y);
     return this;
   },

   lineTo: function(x, y) {
     this._g.lineTo(x, y);
     return this;
   },

   getGraphics: function() {
     return this._g;
   }
 });

 return Drawer;
});
