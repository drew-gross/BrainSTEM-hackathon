(function(){
    var Component = this.Component = {};
    var Wall = Component.Wall = function(p1,p2){
        var attrs = {
            name: 'Wall',
            colour: 'Black'
        };
        if(p1.x === p2.x){
            var start = Math.min(p1.y, p2.y);
            var len = Math.max(p1.y, p2.y) - start;
            _.extend(attrs, {
                x: p1.x - 8,
                y: start - 8,
                w: 16,
                h: len + 16
            });
        } else {
            var start = Math.min(p1.x, p2.x);
            var len = Math.max(p1.x, p2.x) - start;
            _.extend(attrs, {
                x: start - 8,
                y: p1.y - 8,
                w: len + 16,
                h: 16
            });
        }
        Crafty.e("Wall, Canvas, Color, Box2D")
            .color('rgb(0,0,0)')
            .attr(attrs);
    };

})();
