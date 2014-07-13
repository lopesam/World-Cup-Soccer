// TODO :
//
// GET THE RADIO BUTTONS ON THE SIDE W/ IMAGES!
//
// LEARN ABOUT VELOCITY AND TRY TO MAKE THE BALL KICKABLE
//
// CLEAN UP THE CODE A LOT AND ADD COMMENTS!
//
// Initializes the canvas
var canvas = document.getElementById("cvs"),
	context = canvas.getContext("2d"),
	GAME = GAME || {},
	fps = 10,
	drawInterval,
	playersImg = new Image(),
	keysDown = {};

playersImg.src = "source/img/players.png";

canvas.width = 800,
canvas.height = 400;

// Disable blurring when images get resized
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

// The game namespace
GAME = {
	gen: {
		x: canvas.width,
		y: canvas.height
	},
	player: {
		x: canvas.width /2,
		y: canvas.height /2,
		X: 12
	},
	players: {
		messi: [75, 25],
		ronaldo: [100, 50],
		balotelli: [125, 75]
	},
	team1: {
		goals: 0
	},
	team2: {
		goals: 0
	},
	func: {
		// Draws the soccer field
		drawField: function (x, y) {
			// Drawing grass
			context.beginPath();
			context.rect(0, 0, x, y);
			context.fillStyle = "#526F35";
			context.fill();
			context.closePath();

			// Drawing middle white circles
			context.beginPath();
			context.arc(x / 2, y / 2, 50, 0, 2 * Math.PI, false);
			context.moveTo(x / 2, y / 2);
			context.arc(x / 2, y / 2, 5, 0, 2 * Math.PI, false);

			// Drawing all the white lines
			context.moveTo(800, 100);
			context.lineTo(725, 100);
			context.lineTo(725, 300);
			context.lineTo(800, 300);
			context.moveTo(0, 100);
			context.lineTo(75, 100);
			context.lineTo(75, 300);
			context.lineTo(0, 300);
			context.moveTo(x / 2, 0);
			context.lineTo(x / 2, y);

			// How all the lines and circles are styled
			context.lineWidth = 5;
			context.strokeStyle = "#ffffff";
			context.stroke();
			context.closePath();
		},
		drawPlayer: function (x, y, posX, posY) {
			context.drawImage(playersImg, x, y, 6, 8, posX, posY, 24, 32);
		},
		checkKeys: function (e) {
			if (65 in keysDown) {
				GAME.player.x = GAME.player.x - 400 / GAME.players.balotelli[0];
				GAME.player.X = 6;
				console.log("left");
			} else if (68 in keysDown) {
				GAME.player.x = GAME.player.x + 400 / GAME.players.balotelli[0];
				GAME.player.X = 0;
				console.log("right");
			} else if (83 in keysDown) {
				GAME.player.y = GAME.player.y + 400 / GAME.players.balotelli[0];
				console.log("down");
			} else if (87 in keysDown) {
				GAME.player.y = GAME.player.y - 400 / GAME.players.balotelli[0];
				console.log("up");
			} else {
				GAME.player.X = 12;
				console.log("I don't know what key was pressed");
			}
		},
		startDraw: function () {
			GAME.func.stopDraw();
			drawInterval = setInterval(GAME.func.draw, fps);
		},
		stopDraw: function () {
			clearInterval(drawInterval);
		},
		draw: function () {
			context.clearRect(0,0, GAME.gen.x, GAME.gen.y);
			GAME.func.checkKeys();
			GAME.func.drawField(GAME.gen.x, GAME.gen.y);
			GAME.func.drawPlayer(GAME.player.X, 0, GAME.player.x, GAME.player.y);
		},
		checkCollisions: function () {

		}
	}
};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);