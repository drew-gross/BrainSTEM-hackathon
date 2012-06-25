$(function () {
    editAreaLoader.init({
        id: "usercode"		// textarea id
	    , syntax: "js"			// syntax to be uses for highgliting
	    , start_highlight: true		// to display with highlight mode on start-up
    });
    $("#run").click(function () {
        eval(editAreaLoader.getValue("usercode"));
    });
});