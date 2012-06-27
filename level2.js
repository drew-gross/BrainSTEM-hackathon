(function(){
	var level = window.Level2 = {};
	level.walls = [
	[[0,0],[0,7],[10,7],[10,0],[0,0]],
	[[1,0],[1,1]],
	[[0,2],[2,2],[2,1],[3,1],[3,3],[9,3]],
	[[4,0],[4,2],[9,2]],
	[[5,1],[8,1],[8,2]],
	[[9,1],[10,1]],
	[[1,3],[2,3],[2,4],[0,4]],
	[[1,5],[4,5],[4,6],[7,6],[7,5]],
	[[3,4],[3,5]],
	[[4,5],[4,4],[5,4],[5,3]],
	[[1,6],[3,6],[3,7]],
	[[5,5],[6,5],[6,4],[10,4]],
	[[9,5],[10,5]],
	[[8,4],[8,6],[9,6]]
	];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 68;
			eachPoint[1] *= 68;
			});
			});
	
	level.sensors = [new Sensors.ProximitySensor("ProxSensor0"), new Sensors.ProximitySensor("ProxSensor1")];
	level.actuators = [new Actuators.LeftMotor("LeftMotor"), new Actuators.RightMotor("RightMotor")];
    level.startPosition = {x:16, y:16};
    level.endPosition = { x: 8*80 - 20, y: 3*80 + 42, w: 50, h: 48 };
    level.instructions = "This is a classic puzzle about solving mazes. Use the knowledge that you've\
	aquired over the course of the tutorial to navigate your robot through the maze.";
})();