$(function () {
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
        console.log(inputs);
        console.log(outputs);
        return outputs;
    };

    $("#run").click(function () {
        UserCode.code = editAreaLoader.getValue("usercode");
    });
});