$(function(){
var PPM = 30; // Pixels per meter.
Crafty.init(500, 500);
Crafty.Box2D.init();
Crafty.background('rgb(255,255,255)');

var walls = [
{x:250, y:500},
{x:0, y:500},
{x:0, y:0},
{x:500, y:0},
{x:500, y:500},
{x:250, y:500},
{x:250, y:150}
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
            h: len + 16,
            restitution: 0
        };
    } else {
        var start = Math.min(p1.x, p2.x);
        var len = Math.max(p1.x, p2.x) - start;
        attrs = {
            x: start - 8,
            y: p1.y - 8,
            w: len + 16,
            h: 16,
            restitution: 0
        };
    }
    Crafty.e("Wall, Canvas, Color, Box2D")
        .color('rgb(0,0,0)')
        .attr(attrs);
};

_.each(walls, function(p,i){
    wall(p, walls[(i+1)%walls.length]);
});

var rToD = (360/(2*Math.PI));

window.Game = {}
Game.running = false;

var Robot = function(sensors, motors){
    var theRobot =  Crafty.e("Canvas, Box2D, DrawPolygon")
        .attr({x: 375, y: 425, w: 40, h: 40, type:"dynamic",
            leftMotor: 0, rightMotor: 0,
            draw_polygons:[[[0,0],[40,0],[40,40],[0,40]]]})
        .bind('EnterFrame', function (data) {
            var center = this.body.GetLocalCenter();
            if(Game.running && data.frame % 1 == 0){
                var outputs = UserCode.run({lightsensor1: 60});
                this.leftMotor = new Box2D.Common.Math.b2Vec2(0,outputs.motor1);
                this.rightMotor =  new Box2D.Common.Math.b2Vec2(0,
                    outputs.motor2 - 1.0e-5);
            }
            if(Math.abs(this.leftMotor.y) > 0.001){
                this.body.ApplyForce(
                    this.body.GetWorldVector(this.leftMotor),
                    this.body.GetWorldPoint(
                        new Box2D.Common.Math.b2Vec2(0,this.h/2/PPM)));
            }
            if(Math.abs(this.rightMotor.y) > 0.001){
                this.body.ApplyForce(
                    this.body.GetWorldVector(this.rightMotor),
                    this.body.GetWorldPoint(
                        new Box2D.Common.Math.b2Vec2(this.w/PPM,this.h/2/PPM)));
            }
        })
    var wGridToPixel = theRobot.w/4;
    var hGridToPixel = theRobot.h/4;
    theRobot.sensors = _.collect(sensors, function(s){
        var points = _.map(s.sensor.points, function(point){
            return [point[0] + wGridToPixel/2 + s.position.x * wGridToPixel,
               point[1] + hGridToPixel/2 + s.position.y * hGridToPixel];
        });
        theRobot.draw_polygons.push(points);
        var physicsPoints = _.map(points, function(point){
            return new Box2D.Common.Math.b2Vec2(point[0]/PPM, point[1]/PPM);
        });
        var polygon = Box2D.Collision.Shapes.b2PolygonShape.AsArray(physicsPoints,
            physicsPoints.length);
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.density = fixtureDef.friction = fixtureDef.restitution = 0;
        fixtureDef.isSensor = true;
        fixtureDef.shape = polygon;
        var fixture = theRobot.body.CreateFixture(fixtureDef);
        return [fixture, s];
    });
};

Game.Robot = Robot([{sensor:{points:[[0,0], [-5,30], [5,30]]}, position:{x:2, y:2}}]);

});
