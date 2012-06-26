(function(){
	var level = window.Demo3 = {};
	level.walls = [
	[[3,0],[7,0],[7,6],[3,6],[3,0]],
	[[5,0],[5,4]]
	];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
			
	level.sensors = [new Sensors.ProximitySensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
	level.startPosition = { x: 460, y: 30 };
    level.endPosition = {x: 3 * 80 + 10, y: 10, w: 140, h: 70};
    level.instructions = "This level makes it necesarry to avoid hitting \
	walls. Using the proximity sensor, you can tell when your robot is about \
	to hit a wall. Try to use your proximity sensor to navigate to the goal.";
})();