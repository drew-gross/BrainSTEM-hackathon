(function(){
	var level = window.Demo4 = {};
	level.walls = [
	[[3,0],[3,2]],
	[[3,4],[5,4],[5,6],[7,6],[7,2]],
	[[5,2],[5,0],[3,0]]
	];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
			
	level.sensors = [new Sensors.LightSensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
	level.startPosition = { x: 300, y: 30 };
    level.endPosition = {x: 5 * 80 + 10, y: 400, w: 140, h: 70};
    level.instructions = ""
})();