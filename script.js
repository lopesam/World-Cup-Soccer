var WORLDCUPSOCCER = WORLDCUPSOCCER || {};

WORLDCUPSOCCER = {
	canvas: document.getElementById("cvs"),
	context: canvas.getContext("2d")

	keyIsPressed: function () {
		console.log("A key has been pressed");
	};
}

document.addEventListener("keydown", WORLDCUPSOCCER.keyIsPressed, false);