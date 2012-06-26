(function() {
    window.Actuators = {};

    var LeftMotorNameCounter = 0;
    var LeftMotor = Actuators.LeftMotor = function() {
        this.imageSrc = "img/motor_left.png";
        this.name = "LeftMotor" + (LeftMotorNameCounter++);
        this.type = "LeftMotor";
        this.state = 0;
    };
	
	var RightMotorNameCounter = 0;
    var RightMotor = Actuators.RightMotor = function() {
        this.imageSrc = "img/motor_right.png";
        this.name = "RightMotor" + (RightMotorNameCounter++);
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