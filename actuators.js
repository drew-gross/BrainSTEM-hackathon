(function() {
    window.Actuators = {};

    var leftMotorNameCounter = 0;
    var LeftMotor = Actuators.LeftMotor = function() {
        this.imageSrc = "img/motor_left.png";
        this.name = "LeftMotor" + (leftMotorNameCounter++);
        this.type = "LeftMotor";
        this.state = 0;
    };
	
	var rightMotorNameCounter = 0;
    var RightMotor = Actuators.RightMotor = function() {
        this.imageSrc = "img/motor_right.png";
        this.name = "RightMotor" + (rightMotorNameCounter++);
        this.type = "RightMotor";
        this.state = 0;
    };

    var laserNameCounter = 0;
    var Laser = Actuators.Laser = function() {
        this.imageSrc = "img/laser.bmp";
        this.name = "Laser" + (laserNameCounter++);
        this.state = 0;
        this.type = "Laser";
    };
})();