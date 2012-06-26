$(function () {

    //helper functions
    var getPosition = function (htmlElem) {
        var indexRegex = /robot-(\d+)/g;
        var matches = indexRegex.exec($(htmlElem).data("location"));
        var index = matches[1];
        return {
                   x:index % 4,
                   y:Math.floor(index / 4)
               }
    };

    var isOnRobot = function () {
        var partLocation = $(this).data("location");
        if (typeof(partLocation) !== "string") {
            return false;
        }
        return (partLocation.search("robot") === 0);
    }

    var inputs = function() {
        elems = $(".input").filter(isOnRobot);
        return _.map(elems,function (elem, key) {
            return {
                        sensor:$(elem).data("sensor"),
                        position: getPosition(elem)
                   };
                   
        });
    };

    var outputs = function() {
        elems = $(".output").filter(isOnRobot);
        return _.map(elems, function (elem, key) {
            return {
                        actuator:$(elem).data("actuator"),
                        position:getPosition(elem)
                   }
        });
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
	var viewModel = function(){
		this.sensors = window.Level1.sensors;
		this.actuators = [];
	};
	ko.applyBindings(new viewModel());
	
    //build the things used by the engine and supplied by the user
    window.UserCode = {};
    UserCode.code = "";
    UserCode.inputs = [];
    UserCode.outputs = [];
    UserCode.run = function(inputs){
        var outputs = {};
        eval(UserCode.code);
        return outputs;
    };

    $("#run").click(function () {
        UserCode.code = editAreaLoader.getValue("usercode");
        UserCode.inputs = inputs();
        UserCode.outputs = outputs();
        Game.running = true;
    });

    //set up the robot editor
    $("#droptarget").on("ondrop", function(ev){
        drop(ev);
    });
    $(".robot-part").draggable({ revert: "invalid", snap: ".robot-cell, .tool-box-cell", snapMode: "inner" });
    $(".robot-cell").droppable({ 
        accept: ".robot-part",
        drop: function (event, ui) {
            ui.draggable.data("location", this.id);
        }
    });
    $(".tool-box-cell").droppable({ 
        accept: ".robot-part",
        drop: function (event, ui) {
            ui.draggable.removeData("location");
        }
    });
});
