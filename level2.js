(function(){
	var level = window.Level2 = {};
	level.walls = [
	[[0,10],[0,0],[9,0],[9,2]],
	[[0,1],[1,1]],
	[[0,3],[2,3]],
	[[3,0],[3,1],[2,1]],
	[[9,1],[8,1],[8,2],[7,2],[7,3],[6,3],[6,1],[7,1]],
	[[1,10],[10,10],[10,0]],
	[[1,4],[1,2],[5,2],[5,1],[4,1]],
	[[0,9],[1,9]],
	[[0,7],[2,7],[2,9],[3,9],[3,8]],
	[[1,8],[2,8]],
	[[0,6],[1,6],[1,5],[2,5],[2,6]],
	[[3,2],[2,4],[2,4]],
	[[4,2],[4,5],[3,5],[3,7],[4,7],[4,8]],
	[[4,7],[4,6]],
	[[4,9],[4,10]],
	[[5,10],[5,7],[7,7],[7,8],[8,8]],
	[[8,10],[8,9],[6,9],[6,8]],
	[[5,6],[5,3]],
	[[5,4],[8,4],[8,3],[10,3]],
	[[6,4],[6,6]],
	[[7,5],[7,7]],
	[[8,4],[8,5],[9,5]],
	[[9,3],[9,4]],
	[[10,7],[8,7],[8,6]],
	[[9,7],[9,6]],
	[[10,8],[9,8]],
	[[9,10],[9,9]]
	];
	
	level.sensors = [new Sensors.ProximitySensor(), new Sensors.ProximitySensor()];
	level.actuators = [];
	
})();