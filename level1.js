(function(){
	var level = window.Level1 = {};
	level.walls = [
	[[0,0],[1,0],[1,2]],
	[[1,0],[6,0],[6,4],[4,4],[4,2],[3,2],[3,4],[0,4],[0,0]],
	[[0,3],[2,3],[2,1],[5,1],[5,3]]
	];
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
			
			
	
	level.sensors = [new Sensors.LightSensor(), new Sensors.ProximitySensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.Laser(), new Actuators.RightMotor()];
	level.startPosition = { x: 100, y: 100 };
    level.endPosition = {x: 100, y: 200, w: 50, h: 50};
    level.instructions = "<p>asdgfasdfgadefs gaewrg qawegfa wf </p>"
})();