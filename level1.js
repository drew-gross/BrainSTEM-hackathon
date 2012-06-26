(function(){
	var level = window.Level1 = {};
	level.walls = [
	[[0,0],[1,0],[1,2]],
	[[1,0],[6,0],[6,4],[4,4],[4,2],[3,2],[3,4],[0,4],[0,0]],
	[[0,3],[2,3],[2,1],[5,1],[5,3]]
	];
	level.sensors = [new Sensors.LightSensor(), new Sensors.ProximitySensor()];
	level.actuators = [];
	
})();