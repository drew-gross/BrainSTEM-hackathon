(function(){
    var Component = this.Component = {};
    var Wall = Component.Wall = function(p1,p2){
        var attrs = {
            name: 'Wall',
            sensor_color: 'Black'
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
    var Goal = Component.Goal = function(dimensions) {
        var attrs = {
            name: 'Goal',
            x:dimensions.x, 
            y:dimensions.y,
            w:dimensions.w,
            h:dimensions.h
        };
        return Crafty.e("Goal, Canvas, 2D, Color")
        .attr(attrs)
        .color("rgba(99,255,99,0.7)");
    };
    var colorLookup = {
        'Red': 'rgb(255,0,0)',
        'Green': 'rgb(0,255,0)',
        'Blue': 'rgb(0,0,255)'
    };
    var Panel = Component.Panel = function(p1,p2,color){
        var attrs = {
            name: 'Panel',
            sensor_color: color
        };
        if(p1.x === p2.x){
            var start = Math.min(p1.y, p2.y);
            var len = Math.max(p1.y, p2.y) - start;
            _.extend(attrs, {
                x: p1.x - 2,
                y: start + 4,
                w: 4,
                h: len - 8
            });
        } else {
            var start = Math.min(p1.x, p2.x);
            var len = Math.max(p1.x, p2.x) - start;
            _.extend(attrs, {
                x: start - 2,
                y: p1.y + 4,
                w: len - 8,
                h: 4
            });
        }
        Crafty.e("Panel, Canvas, Color, Box2D")
            .attr(attrs)
            .color(colorLookup[color]);
    };
})();
