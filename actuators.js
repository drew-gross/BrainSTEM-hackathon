(function() {
    window.Actuators = {};

    var LeftMotorNameCounter = 0;
    var LeftMotor = Actuators.LeftMotor = function() {
        this.imageSrc = "img/motor_left.png";
        this.name = "LeftMotor" + (LeftMotorNameCounter++);
        this.type = "LeftMotor";
        this.state = 0;
        this.helptext = this.name + ". Use this motor by setting outputs." + this.name + " to any number.";
    };
	
	var RightMotorNameCounter = 0;
    var RightMotor = Actuators.RightMotor = function() {
        this.imageSrc = "img/motor_right.png";
        this.name = "RightMotor" + (RightMotorNameCounter++);
        this.type = "RightMotor";
        this.state = 0;
        this.helptext = this.name + ". Use this motor by setting outputs." + this.name + " to any number.";
    };

    var laserNameCounter = 0;
    var Laser = Actuators.Laser = function() {
        this.imageSrc = "img/laser.bmp";
        this.name = "Laser" + (laserNameCounter++);
        this.state = 0;
        this.type = "Laser";
        this.helptext = this.name + ". Use this laser by setting outputs." + this.name  + " to any number.";
    };
})();