var canvas = document.getElementById("cvs"),
	context = canvas.getContext("2d");
canvas.width = 150,
canvas.height = 150;



function render () {
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#000000";
	context.fill();
	context.closePath();
}

function keyPressed () {
	console.log("A key has been pressed");
};

document.addEventListener("keydown", keyPressed, false);

render();