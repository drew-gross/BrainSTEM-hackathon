(function(){
	window.Sensors = {};
	
	//The arc is assumed to be oriented upwards and centred.
	var makeArc = function(radius,angle,granularity){
		rotatedStartAngle = Math.PI/2 + angle/2;
		var arcPoints = [[0,0]];
		for (var x = 0, x < granularity, x++){
			currentAngle = (rotatedStartAngle - ((x / granularity) * angle));
			arcPoints[x+1] = [Math.cos(currentAngle) * radius , Math.sin(currentAngle) * radius];
		}
		//arcPoints[granularity+1] = [0,0];
		return(arcPoints);
	};
	
	var magnitude = function(point){
		return(Math.sqrt((point[0] * point[0]) + (point[1] * point[1])));
	}
	
	var lightNameCounter = 0;
	var LightSensor = Sensors.LightSensor = function(){
		this.name = "LightSensor" + (lightNameCounter++);
		this.state = "Nothing";
		this.update = function(touchList){
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Panel";)};
	
			if(filteredList){
				//if multiple are touching, just set the colour to the first one for
				//the sake of ease.
				this.state = filteredList[0].color;
			}
		}	

		var sensorShapePoints = makeArc(3,Math.PI,30);
		sensorShapePoints = _.map(sensorShapePoints,function(inputPoint){return(new b2Vec2(inputPoint[0],inputPoint[1]))};);
		this.sensorShape = Box2D.Collision.Shapes.b2PolygonShape.AsArray(sensorShapePoints);
	};
	LightSensor.states = ["Nothing", "Black", "White"];
	
	var touchNameCounter = 0;
	var TouchSensor = Sensors.TouchSensor = function(){
		this.name = "TouchSensor" + (touchNameCounter++);
		this.state = "Off";
		this.update = function(touchList){
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Wall";)};
	
			if(filteredList){
				this.state = "On";
			}
		}	

		var sensorShapePoints = makeArc(0.2,Math.PI,5);
		sensorShapePoints = _.map(sensorShapePoints,function(inputPoint){return(new b2Vec2(inputPoint[0],inputPoint[1]))};);
		this.sensorShape = Box2D.Collision.Shapes.b2PolygonShape.AsArray(sensorShapePoints);
	};
	TouchSensor.states = ["Off", "On"];
	
	var soundNameCounter = 0;
	var SoundSensor = Sensors.SoundSensor = function(){
		this.name = "SoundSensor" + (soundNameCounter++);
		this.state = 1000;
		this.update = function(touchList){
			this.state = 1000;
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Speaker";)};
			
			if(filteredList){
				for (var i in filteredList)
					if(this.state > magnitude(i[1])){
						this.state = magnitude(i[1]);
					}
				}
			}
			//take the inverse square, which gives you the sound level that
			//you'd expect to hear from the speaker
			this.state = 1/(this.state * this.state);
		}	
		this.sensorShape = Box2D.Collision.Shapes.b2CircleShape.b2CircleShape(10);
	};
})();