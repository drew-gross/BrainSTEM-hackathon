$(function () {
    
    //helper functions
    var getPosition = function (id) {
        var indexRegex = /robot-(\d+)/g;
        var matches = indexRegex.exec(id);
        var index = matches[1];
        return {
                   x:index % 4,
                   y:Math.floor(index / 4)
               }
    };

    //set up the code editor
    enableHighlight = true
    if (navigator.vendor === "Apple Computer, Inc.") {
        enableHighlight = false;
    }
    editAreaLoader.init({
        id: "usercode"		// textarea id
	    , syntax: "js"			// syntax to be uses for highgliting
	    , start_highlight: enableHighlight		// to display with highlight mode on start-up
    });

    //set up knockout stuff
    ko.bindingHandlers.data = {
        init: function (element, valueAccessor) {
            var set = function (key, data) {
                $(element).data(key, data);
            };
            var dict = valueAccessor();
            _.each(dict, function (value, key) {
                set(key, value);
            });
        }
    };

    var viewModel;
	window.ViewModel = viewModel = {};
    viewModel.level = ko.observable();
    viewModel.level.subscribe(function (lvl) {
        Game.loadLevel(lvl);
        //set up the robot editor
        _.defer(function(){ // allow ko to update the DOM
            $("#droptarget").on("ondrop", function (ev) {
                drop(ev);
            });
            $(".robot-part").draggable({ revert: "invalid", snap: ".robot-cell, .tool-box-cell", snapMode: "inner", snapTolerance: 40 });
            $(".robot-cell").droppable({
                accept: ".robot-part",
                drop: function (event, ui) {
					var $item = ui.draggable;
					$item.appendTo( this );
					$item.css( {"left":"", "top":"", "bottom":"", "right":"" }).fadeIn();
                    $item.data("object").position(getPosition(this.id));
                }
            });
            $(".tool-box-cell").droppable({
                accept: ".robot-part",
                drop: function (event, ui) {
					var $item = ui.draggable;
					$item.appendTo( this );
					$item.css( {"left":"", "top":"", "bottom":"", "right":"" }).fadeIn();
                    $item.data("object").position(null);
                }
            });
        });
    });
    viewModel.currentLevel = 0;
    viewModel.level(Game.levels[viewModel.currentLevel]);
    viewModel.instructions = ko.computed(function () {
        return viewModel.level().instructions;
    });
    viewModel.sensors = ko.computed(function(){
        return _.collect(viewModel.level().sensors, function (sensor) {
            return { object: sensor, position: ko.observable(null) };
        });
    });
    viewModel.actuators = ko.computed(function () {
        return _.collect(viewModel.level().actuators, function (actuator) {
            return { object: actuator, position: ko.observable(null) };
        });
    });
    var filterselected = function(objects){
        return _.filter(_.collect(objects, function (object) {
            return { object: object.object, position: object.position() };
        }), function (object) {
            return (object.position !== null);
        });
    };
    viewModel.selectedActuators = ko.computed(function () {
        return filterselected(viewModel.actuators());
    });
    viewModel.selectedSensors = ko.computed(function () {
        return filterselected(viewModel.sensors());
    });
    viewModel.selectedObjects = ko.computed(function(){
        return viewModel.selectedActuators().concat(viewModel.selectedSensors());
    });
	ko.applyBindings(viewModel);
	
    //build the things used by the engine and supplied by the user
    window.UserCode = {};
    UserCode.code = "";
    UserCode.inputs = [];
    UserCode.outputs = [];
    UserCode.robot = {};
    UserCode.running = false;
    UserCode.runtime = 0;
    UserCode.userCodeRunner = new Worker('userCodeWorker.js');
    UserCode.userCodeRunner.addEventListener('message', function (e) {
        UserCode.running = false;
        UserCode.runtime = 0;
        if (typeof e.data === "string") {
            $.fancybox('<div id="victory-screen">' + e.data + '</div>');
            Game.running = false;
        } else {
            UserCode.robot.useroutputs = e.data;   
        }
    }, false);
    UserCode.run = function(inputs, memory, robot){
        UserCode.robot = robot;
        if (UserCode.running === false) {
            UserCode.running = true;
            UserCode.userCodeRunner.postMessage({'code':UserCode.code, 'inputs':inputs, 'memory':memory});
        } else {
            UserCode.runtime = UserCode.runtime + 1;
            if (UserCode.runtime > 1000) {
                UserCode.userCodeRunner.terminate();
                UserCode.userCodeRunner = new Worker('userCodeWorker.js');
                UserCode.userCodeRunner.addEventListener('message', function (e) {
                    UserCode.running = false;
                    UserCode.runtime = 0;
                    if (typeof e.data === "string") {
                        $.fancybox('<div id="victory-screen">' + e.data + '</div>');
                        Game.running = false;
                    } else {
                        UserCode.robot.useroutputs = e.data;   
                    }
                }, false);
                $.fancybox('<div id="victory-screen">' + 'Your code is taking a long time! Maybe you have an infinite loop?' + '</div>');
                Game.running = false;
                UserCode.runtime = 0;
                UserCode.running = false;
            }
        }
    };

    $("#run").click(function () {
        UserCode.code = editAreaLoader.getValue("usercode");
        UserCode.inputs = viewModel.selectedSensors();
        UserCode.outputs = viewModel.selectedActuators();
        Game.running = true;
        Game.resetRobot();
    });
    
    //level management
    $("#instructions").html(viewModel.level().instructions);
    $("body").on("click", "#next-level", function () {
        viewModel.currentLevel++;
        $(".robot-cell, .tool-box-cell").html("");
        viewModel.level(Game.levels[viewModel.currentLevel]);
        $.fancybox.close();
    });
});
