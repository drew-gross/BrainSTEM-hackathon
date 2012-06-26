$(function () {
    //helper functions
    var inputs = function() {
        elems = $(".input").filter(function () {
            var partLocation = $(this).data("location");
            if (typeof(partLocation) !== "string") {
                return false;
            }
            return (partLocation.search("robot") === 0);
        });
        return _.map(elems,function (elem, key) {
            var indexRegex = /robot-(\d+)/g;
            var matches = indexRegex.exec($(elem).data("location"));
            var index = matches[1];
            return {
                        sensor:{},
                        position:
                        {
                            x:index % 4,
                            y:Math.floor(index / 4)
                        }
                   };
                   
        });
    };
    //set up the code editor
    editAreaLoader.init({
        id: "usercode"		// textarea id
	    , syntax: "js"			// syntax to be uses for highgliting
	    , start_highlight: true		// to display with highlight mode on start-up
    });
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
    $(".tool-box-cell").droppable({ accept: ".robot-part" });
});
