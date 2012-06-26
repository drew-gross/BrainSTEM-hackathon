(function() {
    window.Actuators = {};

    var motorNameCounter = 0;
    var Motor = Actuators.Motor = function() {
        this.imageSrc = "img/motor.bmp";
        this.name = "Motor" + (motorNameCounter++);
        this.type = "Motor";
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