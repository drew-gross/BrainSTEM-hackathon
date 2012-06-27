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
    editAreaLoader.init({
        id: "usercode"		// textarea id
	    , syntax: "js"			// syntax to be uses for highgliting
	    , start_highlight: true		// to display with highlight mode on start-up
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
	var viewModel = {
		sensors: _.collect(window.level.sensors, function(sensor){
            return {object:sensor, position:ko.observable(null)};
        }),
        actuators: _.collect(window.level.actuators, function (actuator) {
            return {object:actuator, position: ko.observable(null) };
        })
	};
    var filterselected = function(objects){
        return _.filter(_.collect(objects, function (object) {
            return { object: object.object, position: object.position() };
        }), function (object) {
            return (object.position !== null);
        });
    };
    viewModel.selectedActuators = ko.computed(function () {
        return filterselected(viewModel.actuators);
    });
    viewModel.selectedSensors = ko.computed(function () {
        return filterselected(viewModel.sensors);
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
    UserCode.run = function(inputs, memory){
        try {
            var outputs = {};
            eval(UserCode.code);
            return outputs;
        } catch(err){
	    confirm(err);
            Game.running = false;
            // TODO: Display the error to the user.
            return {};
        }
    };

    $("#run").click(function () {
        UserCode.code = editAreaLoader.getValue("usercode");
        UserCode.inputs = viewModel.selectedSensors();
        UserCode.outputs = viewModel.selectedActuators();
        Game.running = true;
        Game.resetRobot();
    });

    //set up the robot editor
    $("#droptarget").on("ondrop", function(ev){
        drop(ev);
    });
    $(".robot-part").draggable({ revert: "invalid", snap: ".robot-cell, .tool-box-cell", snapMode: "inner", snapTolerance:40});
    $(".robot-cell").droppable({ 
        accept: ".robot-part",
        drop: function (event, ui) {
            ui.draggable.data("object").position(getPosition(this.id));
        }
    });
    $(".tool-box-cell").droppable({ 
        accept: ".robot-part",
        drop: function (event, ui) {
            ui.draggable.data("object").position(null);
        }
    });

    //level management
    $("#instructions").html(window.level.instructions);
    $("body").on("click", "#next-level", function () {
        alert("nect!");
    });
});
