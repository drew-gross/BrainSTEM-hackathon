$(function(){
Crafty.init(500, 500);
Crafty.DrawManager.draw = Crafty.DrawManager.drawAll;
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
var PPM = Game.PPM = 30; // Pixels per meter.
Game.running = false;

var makeAdjustments = function(body, engines){
    var factor = body.GetMass()/engines.length/2;
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

var Robot = function(inputs, outputs){
    var theRobot =  Crafty.e("Canvas, Box2D, DrawPolygon")
        .attr({x: 375, y: 425, w: 40, h: 40, type:"dynamic",
            leftMotor: 0, rightMotor: 0,
            draw_polygons:[
            [[00,00],[10,00],[10,10],[00,10]],
            [[00,10],[10,10],[10,20],[00,20]],
            [[00,20],[10,20],[10,30],[00,30]],
            [[00,30],[10,30],[10,40],[00,40]],
            [[10,00],[20,00],[20,10],[10,10]],
            [[10,10],[20,10],[20,20],[10,20]],
            [[10,20],[20,20],[20,30],[10,30]],
            [[10,30],[20,30],[20,40],[10,40]],
            [[20,00],[30,00],[30,10],[20,10]],
            [[20,10],[30,10],[30,20],[20,20]],
            [[20,20],[30,20],[30,30],[20,30]],
            [[20,30],[30,30],[30,40],[20,40]],
            [[30,00],[40,00],[40,10],[30,10]],
            [[30,10],[40,10],[40,20],[30,20]],
            [[30,20],[40,20],[40,30],[30,30]],
            [[30,30],[40,30],[40,40],[30,40]]
            ]})
        .bind('EnterFrame', function (data) {
            var self = this;
            if(Game.running && data.frame % 1 == 0){
                var list = this.body.GetContactList();
                var inputs = {};
                _.each(this.inputs, function(input){
                    input.update(self);
                    inputs[input.name] =
                    input.state;
                });
                var outputs = UserCode.run(inputs);
                _.each(outputs,function(value, key){
                    var out = _.find(self.outputs, function(out){
                        return out.object.name === key;
                    });
                    if(out){
                        out.object.state = value;
                    }
                });
                var LeftMotors = [];
                _.each(self.outputs, function (out) {
                    if(out.object.type === 'LeftMotor'){
                        LeftMotors.push(
                            {position: new Box2D.Common.Math.b2Vec2(
                                (out.position.x+0.5)*self.w/4/PPM,
                                (out.position.y+0.5)*self.h/4/PPM),
                            target: new Box2D.Common.Math.b2Vec2(
                                0, out.object.state)});
                    }
                });
                makeAdjustments(this.body, LeftMotors);
				var RightMotors = [];
                _.each(self.outputs, function (out) {
                    if(out.object.type === 'RightMotor'){
                        RightMotors.push(
                            {position: new Box2D.Common.Math.b2Vec2(
                                (out.position.x+0.5)*self.w/4/PPM,
                                (out.position.y+0.5)*self.h/4/PPM),
                            target: new Box2D.Common.Math.b2Vec2(
                                0, out.object.state)});
                    }
                });
                makeAdjustments(this.body, RightMotors);
            }
        });
    var wGridToPixel = theRobot.w/4;
    var hGridToPixel = theRobot.h/4;
    theRobot.inputs = _.collect(inputs, function(s){
        s.object.attach(theRobot, s.position);
        return s.object;
    });
    theRobot.outputs = outputs;
    return theRobot;
};

Game.resetRobot = function() {
    robot.destroy();
    _.delay(function(){
        robot = Robot(UserCode.inputs, UserCode.outputs);
    }, 50);
};

var robot = Robot([]);

});
