(function(){
var PPM = 30; // Pixels per meter.

Game = window.Game = {}
Game.levels = [window.Level1, window.Level2, window.Demo3, window.Demo4, window.Level1, window.Level2];
var goal;
var level;



var loadLevel = Game.loadLevel = function (theLevel) {
    if (level===undefined){
        Crafty.init(700, 480);
        Crafty.DrawManager.draw = Crafty.DrawManager.drawAll; //force redraw everytime
        Crafty.Box2D.init();
        Crafty.background('rgb(255,255,255)');
    }
    _.each(Crafty.entities, function(entity){
        entity.destroy();
    });

    window.level = Game.level = level = theLevel;
    goal = Component.Goal(level.endPosition);
    _.each(level.walls, function(pointlist,i){
        _.each(pointlist, function(p,i){
            var pointhelper = {};
            var nextPointHelper = {};
            if(i != pointlist.length-1){
                nextPointHelper.x = pointlist[(i+1)][0];
                nextPointHelper.y = pointlist[(i+1)][1];
                pointhelper.x = p[0];
                pointhelper.y = p[1];
                Component.Wall(pointhelper,nextPointHelper);
            }
        });
    });
    _.each(level.panels, function(panel){
        var p1 = {x:panel[0][0], y:panel[0][1]};
        var p2 = {x:panel[1][0], y:panel[1][1]};
        Component.Panel(p1, p2, panel[2]);
    });
    Game.resetRobot();
};

var rToD = (360/(2*Math.PI));
window.scaleFactor = 0.88;

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
	var robotGrid = [
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
            ];
			
			_.map(robotGrid,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= window.scaleFactor;
			eachPoint[1] *= window.scaleFactor;
			});
			});
    var theRobot =  Crafty.e("Canvas, Box2D, DrawPolygon")
        .attr({x: level.startPosition.x, y: level.startPosition.y, w: 40 * window.scaleFactor, h: 40 * window.scaleFactor, type:"dynamic",
            leftMotor: 0, rightMotor: 0, memory: {},
            draw_polygons:robotGrid
			})
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
                var outputs = UserCode.run(inputs, this.memory, this);
                _.each(this.useroutputs,function(value, key){
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
                makeAdjustments(this.body, LeftMotors.concat(RightMotors));
                if (theRobot.intersect(goal)) {
                    Game.running = false;
                    var victoryHtml  ='';
                    if (ViewModel.currentLevel+1 < Game.levels.length) {
                        victoryHtml = '<div id="victory-screen">Congratulations!<p><img src="PI_hackathon/victory_button.png" id="next-level"/></p></div>'
                    } else {
                        victoryHtml = '<div id="victory-screen">Congratulations! You beat the whole game!</div>'
                    }
                    
                    $.fancybox(victoryHtml);
                }
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

var robot;

Game.resetRobot = function() {
    if(robot){robot.destroy();}
    _.delay(function(){
        robot = Robot(UserCode.inputs, UserCode.outputs);
    }, 50);
};

})();
