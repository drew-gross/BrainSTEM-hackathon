$(function(){
Crafty.init(600, 300);
Crafty.Box2D.init();
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
            y: start - 8,
            w: 16,
            h: len + 16
        };
    } else {
        var start = Math.min(p1.x, p2.x);
        var len = Math.max(p1.x, p2.x) - start;
        attrs = {
            x: start - 8,
            y: p1.y - 8,
            w: len + 16,
            h: 16
        };
    }
    Crafty.e("Wall, DOM, Color, Box2D")
        .color('rgb(0,0,0)')
        .attr(attrs);
};

_.each(walls, function(p,i){
    wall(p, walls[(i+1)%walls.length]);
});

var rToD = (360/(2*Math.PI));

window.Game = {}
Game.running = false;

var Robot = Crafty.e("DOM, Color, Box2D")
.color('rgb(0,0,255)')
.attr({ x: 200, y: 100, w: 40, h: 40, type:"dynamic", friction:1,
leftMotor: 0, rightMotor: 0})
.bind('EnterFrame', function (data) {
    var center = this.body.GetLocalCenter();
    if(Game.running && data.frame % 1 == 0){
        var outputs = UserCode.run({lightsensor1: 60});
        this.leftMotor = new Box2D.Common.Math.b2Vec2(0,outputs.motor1);
        this.rightMotor =  new Box2D.Common.Math.b2Vec2(0,outputs.motor2 - 1.0e-5);
    }
    if(Math.abs(this.leftMotor.y) > 0.001){
        this.body.ApplyForce(
            this.body.GetWorldVector(this.leftMotor),
            this.body.GetWorldPoint(new Box2D.Common.Math.b2Vec2(0,0.6666)));
    }
    if(Math.abs(this.rightMotor.y) > 0.001){
        this.body.ApplyForce(
            this.body.GetWorldVector(this.rightMotor),
            this.body.GetWorldPoint(new Box2D.Common.Math.b2Vec2(40/30,0.6666)));
    }
})
});
