(function(){
	var level = window.Demo1 = {};
	level.walls = [
	[[4,0],[6,0],[6,8],[4,8],[4,0]]
	];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
			
	level.sensors = [];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
	level.startPosition = { x: 380, y: 40 };
    level.endPosition = {x: 4*80 + 10, y: 7*80, w: 140, h: 70};
    level.instructions = ""
})();