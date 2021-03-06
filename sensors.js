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

        var attachHitSensor = function(robot, sensor, position){
            var wGridToPixel = robot.w/4;
            var hGridToPixel = robot.h/4;
            var points = _.map(sensor.points, function(point){
                return [point[0] + wGridToPixel/2 + position.x * wGridToPixel,
                point[1] + hGridToPixel/2 + position.y * hGridToPixel];
            });
            robot.draw_polygons.push(points);
            var physicsPoints = _.map(points, function(point){
                return new Box2D.Common.Math.b2Vec2(
                    point[0]/Game.PPM, point[1]/Game.PPM);
            });
            var polygon = Box2D.Collision.Shapes.b2PolygonShape.AsArray(
                    physicsPoints, physicsPoints.length);
            var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
            fixtureDef.density = fixtureDef.friction =
                fixtureDef.restitution = 0;
            fixtureDef.isSensor = true;
            fixtureDef.shape = polygon;
            sensor.fixture = robot.body.CreateFixture(fixtureDef);
        };

        var collisions = function(robot, sensor){
            var collisions = [];
            var rawList = robot.body.GetContactList();
            while(rawList){
                var contact = rawList.contact;
                if(contact.IsTouching() && (
                            contact.GetFixtureA() === sensor.fixture ||
                            contact.GetFixtureB() === sensor.fixture)){
                        var id = rawList.other.GetUserData();
                        if(id){
                            collisions.push([Crafty(id),
                                robot.body.GetLocalPoint(
                                rawList.other.GetWorldCenter())
                                ]);
                            }
                        }
                rawList = rawList.next;
            }
            return collisions;
        };
	
	var lightNameCounter = 0;
	var LightSensor = Sensors.LightSensor = function(nme){
		this.imageSrc = "PI_hackathon/light_sensor.png";
		this.name = nme;
		this.state = "Nothing";
		this.update = function(robot){
                        var touchList = collisions(robot, this);
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
                this.attach = function(robot, position){
                    attachHitSensor(robot, this, position);
                }
        this.points = makeArc(8, Math.PI / 3, 30);
        this.title = "inputs." + this.name;
        this.usage = "Returns 'Black', 'White', or another color";
	};
	LightSensor.states = ["Nothing", "Black", "White"];
	
	var gyroNameCounter = 0;
	var GyroSensor = Sensors.GyroSensor = function(nme){
		this.imageSrc = "PI_hackathon/compass.png";
		this.name = nme;
		this.state = 0;
		this.update = function(robot){
                    this.state = (robot.rotation + 720) % 360;
		}	
        this.attach = function(robot, position){
            // Nothing to do here.
			// http://i3.kym-cdn.com/entries/icons/original/000/006/707/nothing-to-do-here-template.jpg.scaled500.jpg
        }
        this.title = "inputs." + this.name;
        this.usage = "Returns a number from 0 to 360";
	};
	GyroSensor.states = [];
	
	var proxNameCounter = 0;
	var ProximitySensor = Sensors.ProximitySensor = function(nme){
		this.imageSrc = "PI_hackathon/proximity_sensor.png";
		this.name = nme;
		this.state = "Off";
		this.update = function(robot){
                        var touchList = collisions(robot, this);
			//Make sure that we're only looking at objects that are coloured panels.
			var filteredList = _.filter(touchList,function(x){return(x[0].name === "Wall")});
	
			if(filteredList.length){
				this.state = "On";
			}
			else
			{
				this.state = "Off";
			}
		}

        this.attach = function(robot, position){
            attachHitSensor(robot, this, position);
        };
        this.points = makeArc(14, Math.PI*2/3, 5);
        this.title = "inputs." + this.name;
        this.usage = "Returns 'On' or 'Off'"
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
		this.update = function(robot){
                        var touchList = collisions(robot, this);
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
        this.attach = function(robot, position){
            attachHitSensor(robot, this, position);
        };
        this.points = makeCircle(500, 50);
        this.title = "inputs." + this.name;
        this.helptext = this.name + ". Use this sensor by reading inputs." + this.name + ", the value will be a number";
	};
})();
