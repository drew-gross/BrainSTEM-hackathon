(function(){
	var level = window.Demo4 = {};
	level.walls = [
		[[3,0],[3,2]],
		[[3,4],[5,4],[5,6],[7,6],[7,2]],
		[[5,2],[5,0],[3,0]]
	];
	level.panels = [
        [[240,304],[412,304], 'Red']
    ];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
			
	level.sensors = [new Sensors.LightSensor("ColorSensor"), new Sensors.GyroSensor("Compass")];
	level.actuators = [new Actuators.LeftMotor("LeftMotor"), new Actuators.RightMotor("RightMotor")];
	level.startPosition = { x: 300, y: 30 };
    level.endPosition = {x: 5 * 80 + 10, y: 400, w: 140, h: 70};
    level.instructions = "Sometimes simply following the wall is not enough. In this level you'll\
	have to make sure that your robot doesn't lose track of where it is. This level introduces a light\
	sensor, which will tell you the colour of the walls and panels that you're about to hit. Try using\
	this information to navigate your robot safely to the goal.";
})();