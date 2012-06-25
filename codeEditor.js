$(function () {
    //set up the code editor
    editAreaLoader.init({
        id: "usercode"		// textarea id
	    , syntax: "js"			// syntax to be uses for highgliting
	    , start_highlight: true		// to display with highlight mode on start-up
    });
    window.UserCode = {};
    UserCode.code = "";
    UserCode.run = function(inputs){
        var outputs = {};
        eval(UserCode.code);
        return outputs;
    };

    $("#run").click(function () {
        UserCode.code = editAreaLoader.getValue("usercode");
        Game.running = true;
    });
    //set up the robot editor
    $("#droptarget").on("ondrop", function(ev){
        drop(ev);
    });
    $(".robot-part").draggable({ revert: "invalid", snap: ".robot-cell, .tool-box-cell", snapMode: "inner" });
    $(".robot-cell").droppable({ accept: ".robot-part" });
    $(".tool-box-cell").droppable({ accept: ".robot-part" });
});
