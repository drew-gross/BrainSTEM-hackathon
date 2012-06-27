(function(){
	var level = window.Demo1 = {};
	level.walls = [
	[[4,0],[6,0],[6,6],[4,6],[4,0]]
	];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
			
	level.sensors = [];
	
	level.actuators = [new Actuators.LeftMotor("LeftMotor"), new Actuators.RightMotor("RightMotor")];
	level.startPosition = { x: 380, y: 40 };
    level.endPosition = {x: 4 * 80 + 10, y: 5 * 80, w: 140, h: 70};
    level.instructions = 
	'Welcome to Robuzzle. Robuzzle is a game where you design and program a '+
	'robot to solve puzzles and get to a goal. You can add parts to your '+
	'robot from the toolbox, and write code for your robot in the windows '+
	'below. Try to make the robot reach the goal by adding motors to your '+
	'robot. You can control the motors by assigning speeds to the motors '+
	'in the code window. Try this example:'+
	'<p><code>outputs.RightMotor = 0.5;</code></p>'+
	'Then, upload your code to see what happens! If you\'ve attached the '+
	'right facing motor, your robot should start moving.';
})();