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
	
	level.sensors = [new Sensors.ProximitySensor(), new Sensors.ProximitySensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
    level.startPosition = {x:16, y:16};
    level.endPosition = { x: 8*80 - 20, y: 3*80 + 42, w: 50, h: 48 };
    level.instructions = 
'Welcome to Robuzzle. Robuzzle is a game where you design and program a '+
'robot to solve puzzles and get to a goal. You can add parts to your '+
'robot from the toolbox, and write code for your robot in the windows '+
'below. Try to make the robot reach the goal by adding motors to your '+
'robot. You can control the motors by assigning speeds to the motors '+
'in the code window. Try this example:'+
'<p><code>outputs.RightMotor0 = 0.5;</code></p>'+
'Then, upload your code to see what happens! If you\'ve attached the '+
'right facing motor, your robot should start moving.';
})();