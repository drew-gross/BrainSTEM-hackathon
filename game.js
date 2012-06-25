Crafty.init(600, 300);
Crafty.background('rgb(127,127,127)');

var walls = [
{x:0, y:0},
{x:500, y:0},
{x:500, y:300},
{x:300, y:300},
{x:300, y:200},
{x:0, y:200}
];

var wall = function(p1,p2){
    var attrs;
    if(p1.x === p2.x){
        var start = Math.min(p1.y, p2.y);
        var len = Math.max(p1.y, p2.y) - start;
        attrs = {
            x: p1.x - 8,
            y: start + 8,
            w: 16,
            h: len
        };
    } else {
        var start = Math.min(p1.x, p2.x);
        var len = Math.max(p1.x, p2.x) - start;
        attrs = {
            x: start + 8,
            y: p1.y - 8,
            w: len,
            h: 16
        };
    }
    Crafty.e("Wall, 2D, DOM, Color, Collision")
        .color('rgb(0,0,0)')
        .attr(attrs);
};

_.each(walls, function(p,i){
    wall(p, walls[(i+1)%walls.length]);
});

var rToD = (360/(2*Math.PI));

//Ball
Crafty.e("2D, DOM, Color, Collision").
color('rgb(0,0,255)').
attr({ x: 200, y: 100, w: 40, h: 40,
    rotation: 45,
    leftMotor: 2,
    rightMotor: 2
}).
origin({x:20, y:20}).bind('EnterFrame', function () {
    var speed = (this.leftMotor + this.rightMotor)/2;
    this.rotation += rToD*(this.leftMotor - this.rightMotor)/this.w;
    var dX = -speed * Math.sin(this.rotation/rToD);
    var dY = speed * Math.cos(this.rotation/rToD);
    this.x += dX;
    this.y += dY;
}).
onHit('Wall', function () {
    console.log("Collide");
});
