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

_.each(walls, function(p,i){
    Component.Wall(p, walls[(i+1)%walls.length]);
});

var rToD = (360/(2*Math.PI));

window.Game = {}
Game.running = false;

var makeAdjustments = function(body, engines){
    var factor = body.GetMass()/engines.length;
    _.each(engines, function(engine){
        var worldPos = body.GetWorldPoint(engine.position);
        var worldTarget = body.GetWorldVector(engine.target);
        var worldCurrent = body.GetLinearVelocityFromWorldPoint(worldPos);
        var impulse = new Box2D.Common.Math.b2Vec2();
        impulse.SetV(worldTarget);
        impulse.Subtract(worldCurrent);
        impulse.Multiply(factor);
        if(impulse.LengthSquared() > 1e-5){
            body.ApplyImpulse(impulse, worldPos);
        }
    });
};

var Robot = function(sensors, motors){
    var theRobot =  Crafty.e("Canvas, Box2D, DrawPolygon")
        .attr({x: 375, y: 425, w: 40, h: 40, type:"dynamic",
            leftMotor: 0, rightMotor: 0,
            draw_polygons:[[[0,0],[40,0],[40,40],[0,40]]]})
        .bind('EnterFrame', function (data) {
            var self = this;
            if(Game.running && data.frame % 1 == 0){
                var list = this.body.GetContactList();
                var inputs = {};
                _.each(this.sensors, function(sensor){
                    var collisions = [];
                    var rawList = list;
                    while(rawList){
                        var contact = rawList.contact;
                        if(contact.GetFixtureA() === sensor.fixture ||
                            contact.GetFixtureB() === sensor.fixture){
                                var id = rawList.other.GetUserData();
                                if(id){
                                    collisions.push([Crafty(id),
                                        self.body.GetLocalPoint(
                                            rawList.other.GetWorldCenter())
                                        ]);
                                }
                        }
                        rawList = rawList.next;
                    }
                    sensor.sensor.sensor.update(collisions);
                    inputs[sensor.sensor.sensor.name] =
                    sensor.sensor.sensor.state;
                });
                var outputs = UserCode.run(inputs);
                var motors = [
                {position: new Box2D.Common.Math.b2Vec2(0,this.h/2/PPM),
                    target: new Box2D.Common.Math.b2Vec2(0,outputs.motor1)},
                {position: new Box2D.Common.Math.b2Vec2(
                                            this.w/2/PPM, this.h/2/PPM),
                    target: new Box2D.Common.Math.b2Vec2(0,
                                                outputs.motor2 - 1.0e-5)}
                ];
                makeAdjustments(this.body, motors);
            }
        });
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
        return {fixture:fixture, sensor:s};
    });
    return theRobot;
};

Game.resetRobot = function() {
    robot.destroy();
    robot = Robot(UserCode.inputs, UserCode.outputs);
};

var robot = Robot([]);

});
