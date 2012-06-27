(function(){
	var level = window.Level3 = {};
	
	var xTranslate = 100;
	var yTranslate = 80;
	
	level.walls = [
	[[0,0], [3,0], [3,2], [4,2], [4,0], [6,0], [6,4], [1,4], [1,2]],
        [[1,4], [0,4], [0,0]],
        [[0,1], [2,1], [2,3], [5,3], [5,1]]
	];

    level.panels = [
        [[10 + xTranslate,84 + yTranslate],[10 + xTranslate,156 + yTranslate], 'Red'],
        [[84 + xTranslate,84 + yTranslate],[162 + xTranslate,84 + yTranslate], 'Red'],
        [[170 + xTranslate,224 + yTranslate],[240 + xTranslate,224 + yTranslate], 'Red'],
        [[390 + xTranslate,164 + yTranslate],[390 + xTranslate,236 + yTranslate], 'Red']
    ];
	
	_.each(level.walls,function(eachList){
		_.each(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[0] += xTranslate;
			eachPoint[1] *= 80;
			eachPoint[1] += yTranslate;
			});
			});
	
	level.sensors = [new Sensors.ProximitySensor(), new Sensors.GyroSensor(),
            new Sensors.LightSensor()];
	level.actuators = [new Actuators.LeftMotor(), new Actuators.RightMotor()];
	level.startPosition = { x: 20 + xTranslate, y: 20  + yTranslate};
    level.endPosition = {x: 10 + xTranslate, y: 250 + yTranslate, w: 60, h: 60};
})();
