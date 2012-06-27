(function(){
	var level = window.Level1 = {};
	var xTranslate = 0;
	var yTranslate = 180;
	
	level.walls = [
	[[0,0], [3,0], [3,2], [4,2], [4,0], [6,0], [6,4], [1,4], [1,2]],
        [[1,4], [0,4], [0,0]],
        [[0,1], [2,1], [2,3], [5,3], [5,1]]
	];

    level.panels = [
        [[84 + yTranslate + 6, 10 + xTranslate - 6],[156 + yTranslate + 6, 10 + xTranslate - 6], 'Red'],
        [[84 + yTranslate + 6, 84 + xTranslate - 6],[84 + yTranslate + 6, 162 + xTranslate - 6], 'Red'],
        [[224 + yTranslate + 6,170 + xTranslate - 6],[224 + yTranslate + 6,240 + xTranslate - 6], 'Red'],
        [[164 + yTranslate + 6, 390 + xTranslate - 6],[236 + yTranslate + 6, 390 + xTranslate - 6], 'Red']
    ];
	
	_.each(level.walls,function(eachList){
		_.each(eachList, function(eachPoint){
			eachPoint[0] *= 80;
			eachPoint[0] += xTranslate;
			eachPoint[1] *= 80;
			eachPoint[1] += yTranslate;
			
			var hackySwitch = eachPoint[0];
			eachPoint[0] = eachPoint[1];
			eachPoint[1] = hackySwitch;
			});
			});
	
	level.sensors = [new Sensors.ProximitySensor("ProxSensor"), new Sensors.GyroSensor("Compass"),
            new Sensors.LightSensor("ColorSensor")];
	level.actuators = [new Actuators.LeftMotor("LeftMotor"), new Actuators.RightMotor("RightMotor")];

	level.startPosition = { x: 20  + yTranslate, y: 20 + xTranslate};
    level.endPosition = {x: 250 + yTranslate, y: 10 + xTranslate, w: 60, h: 60};

    level.instructions = "Using what you know about gyroscopes and light sensors, \
	have your robot traverse the colour-marked passage to get to the goal.";
})();