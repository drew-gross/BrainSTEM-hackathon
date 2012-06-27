(function(){
	var level = window.Demo2 = {};
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
	level.startPosition = { x: 380, y: 400 };
    level.endPosition = {x: 4 * 80 + 10, y: 10, w: 140, h: 70};
    level.instructions = "<p>Motors can also run in reverse. Try setting the motor speeds to a negative value and see what happens.</p>";
})();