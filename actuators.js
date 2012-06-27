(function() {
    window.Actuators = {};

    var LeftMotorNameCounter = 0;
    var LeftMotor = Actuators.LeftMotor = function(nme) {
        this.imageSrc = "PI_hackathon/motorwheel_left.png";
        this.name = nme;
        this.type = "LeftMotor";
        this.state = 0;
        this.title = "outputs." + this.name;
        this.usage = "Assign a speed to the motor."
    };
	
	var RightMotorNameCounter = 0;
    var RightMotor = Actuators.RightMotor = function(nme) {
        this.imageSrc = "PI_hackathon/motorwheel_right.png";
        this.name = nme;
        this.type = "RightMotor";
        this.state = 0;
        this.title = "outputs." + this.name;
        this.usage = "Assign a speed to the motor."
    };

    var laserNameCounter = 0;
    var Laser = Actuators.Laser = function() {
        this.imageSrc = "img/laser.bmp";
        this.name = "Laser" + (laserNameCounter++);
        this.state = 0;
        this.type = "Laser";
        this.title = "outputs." + this.name;
        this.usage = "Power the laser";
    };
})();