(function(){
	var level = window.Level3 = {};
	level.walls = [
	[[0,0], [3,0], [3,2], [4,2], [4,0], [6,0], [6,4], [1,4], [1,2]],
        [[1,4], [0,4], [0,0]],
        [[0,1], [2,1], [2,3], [5,3], [5,1]]
	];

        level.panels = [
            [[10,84],[10,156], 'Red'],
            [[84,84],[162,84], 'Red'],
            [[170,224],[240,224], 'Red'],
            [[390,164],[390,236], 'Red']
        ];
	
	_.each(level.walls,function(eachList){
		_.each(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[1] *= 80;
			});
			});
	
	level.sensors = [new Sensors.ProximitySensor(), new Sensors.GyroSensor(),
            new Sensors.LightSensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
	level.startPosition = { x: 20, y: 20 };
    level.endPosition = {x: 8, y: 240, w: 64, h: 72};
})();
