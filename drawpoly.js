(function(){
    var rToD = (360/(2*Math.PI));
    Crafty.c("DrawPolygon",{
        draw_polygons:[],
        init:function(){
        },
        draw:function(context, position){
            var context = Crafty.canvas.context;
            var self = this;
            _.each(self.draw_polygons, function(poly){
                context.beginPath();
                _.each(poly, function(point){
                    point = [point[0]*Math.cos(self.rotation/rToD)-
                    point[1]*Math.sin(self.rotation/rToD),
                    point[1]*Math.cos(self.rotation/rToD)+
                    point[0]*Math.sin(self.rotation/rToD)];
                    context.lineTo(Crafty.viewport.x+self.x+point[0],
                        Crafty.viewport.y+self.y+point[1]);
                });
                context.closePath();
                context.stroke();
            });
        }
    });
})();
