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
	[[3,2],[3,4],[2,4]],
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
	
	_.map(level.walls,function(eachList){
		_.map(eachList, function(eachPoint){
			eachPoint[0] *= 68;
			eachPoint[1] *= 68;
			});
			});
	
	level.sensors = [new Sensors.ProximitySensor(), new Sensors.ProximitySensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
    level.startPosition = {x:629, y:28};
    level.endPosition = { x: 700, y: 200, w: 50, h: 50 };
    level.instructions = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent congue lorem quis nulla pretium non auctor libero elementum. Phasellus tincidunt urna in neque auctor ac viverra eros feugiat. Curabitur dapibus risus dolor. Phasellus ultrices nisl vel massa mattis tempor quis eget nisi. Etiam pellentesque faucibus leo quis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacinia sodales felis vel placerat. Donec sit amet neque eget metus luctus lobortis eu nec dui. Aliquam et tellus sed enim ullamcorper pulvinar ornare vitae magna. Quisque placerat magna in felis placerat interdum. Phasellus vel nulla justo, ac gravida nisl."
})();