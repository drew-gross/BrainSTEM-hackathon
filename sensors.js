(function(){
	window.Sensors = {};
	
	//The arc is assumed to be oriented upwards and centred.
	var makeArc = function(radius,angle,granularity){
		rotatedStartAngle = Math.PI/2 + angle/2;
		var arcPoints = [[0,0]];
		for (var x = 0; x <= granularity; x++){
			currentAngle = (rotatedStartAngle - ((x / granularity) * angle));
			arcPoints[x+1] = [Math.cos(currentAngle) * radius , Math.sin(currentAngle) * radius];
		}
		return(arcPoints);
	};
	
	var makeCircle = function(radius,granularity){
		var circlePoints = [];
		for (var x = 0; x < granularity; x++){
			currentAngle = ((x / granularity) * 2 * Math.PI);
			circlePoints[x] = [Math.cos(currentAngle) * radius , Math.sin(currentAngle) * radius];
		}
		return(circlePoints);
	};
	
	var magnitude = function(point){
		return(Math.sqrt((point[0] * point[0]) + (point[1] * point[1])));
	};
	
	var lightNameCounter = 0;
	var LightSensor = Sensors.LightSensor = function(){
		this.imageSrc = "img/lightsensor.bmp";
		this.name = "LightSensor" + (lightNameCounter++);
		this.state = "Nothing";
		this.update = function(touchList){
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Panel" || x[0].name === "Wall")});
	
			if(filteredList.length){
				//if multiple are touching, just set the colour to the first one for
				//the sake of ease.
				this.state = filteredList[0][0].sensor_color;
			} else {
                this.state = "Nothing";
            }
		}

        this.points = makeArc(50, Math.PI / 2, 30);
        this.helptext = this.name + ". Use this sensor by reading inputs." + this.name + ", the value will be 'Nothing', 'Black', or 'White'";
	};
	LightSensor.states = ["Nothing", "Black", "White"];
	
	var proxNameCounter = 0;
	var ProximitySensor = Sensors.ProximitySensor = function(){
		this.imageSrc = "img/touch_sensor.png";
		this.name = "ProximitySensor" + (proxNameCounter++);
		this.state = "Off";
		this.update = function(touchList){
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Wall")});
	
			if(filteredList){
				this.state = "On";
			}
		}

        this.points = makeArc(3, Math.PI, 5);
        this.helptext = this.name + ". Use this sensor by reading inputs." + this.name + ", the value will be 'On' or 'Off'";
	};
	ProximitySensor.states = ["Off", "On"];
	
	/*var touchNameCounter = 0;
	var TouchSensor = Sensors.TouchSensor = function(){
		this.imageSrc = "img/touch_sensor.png";
		this.name = "TouchSensor" + (touchNameCounter++);
		this.state = "Off";
		this.update = function(touchList){
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Wall")});
	
			if(filteredList){
				this.state = "On";
			}
		}	

		this.points = makeArc(3,Math.PI,5);
        this.helptext = this.name + ". Use this sensor by reading inputs." + this.name + ", the value will be 'On' or 'Off'";
	};
	TouchSensor.states = ["Off", "On"];
	*/
	var soundNameCounter = 0;
	var SoundSensor = Sensors.SoundSensor = function(){
		this.imageSrc = "img/soundsensor.bmp";
		this.name = "SoundSensor" + (soundNameCounter++);
		this.state = 1000;
		this.update = function(touchList){
			this.state = 1000;
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Speaker")});
			
			if(filteredList){
				for (var i in filteredList){
					if(this.state > magnitude(i[1])){
						this.state = magnitude(i[1]);
					}
				}
			}
			//take the inverse square, which gives you the sound level that
			//you'd expect to hear from the speaker
			this.state = 1/(this.state * this.state);
		}
        this.points = makeCircle(500, 50);
        this.helptext = this.name + ". Use this sensor by reading inputs." + this.name + ", the value will be a number";
	};
})();
