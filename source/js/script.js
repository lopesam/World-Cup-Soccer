//
// TODO:
//
// 1. TRY MAKING THE BUG FUNCTIONS VARIABLES AND NOT ON A SCOPE WHERE THEY CANT BE USED
//
// 2. if you pick any(player) Y = 0 || 9 || 17;
//
// 3. FIX ALL BUGS THEN WORRY ABOUT OTHER STUFF
//

// Initializes the canvas
var canvas = document.getElementById("cvs"),
	context = canvas.getContext("2d"),
	GAME = GAME || {};

canvas.width = 800,
canvas.height = 400;

// Disable blurring when images get resized
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

// The game namespace
GAME = {
	// Holds the different playable characters data
	players: {
		messi: {sp:[75, 25]},
		ronaldo: [50, 50],
		balotelli: [25, 75]
	},
	team1: {
		goals: 0
	},
	team2: {
		goals: 0
	},
	func: {

		// Draws the soccer field
		drawField: function () {
			var x = canvas.width,
				y = canvas.height;

			// Drawing grass
			context.beginPath();
			context.rect(0, 0, canvas.width, canvas.height);
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
		// Calls all the methods
		update: function () {
			var values = this.getInput();
			this.drawField();
			this.drawPlayer(values,0,0,0);
		},
		// Attempts and fails to get input... should be deleted!
		getInput: function () {
			var keysDown = {},
				srcX,
				posX,
				posY,
				values;

			addEventListener("keydown", function (e) {
				keysDown[e.keyCode] = true;
			}, false);

			addEventListener("keyup", function (e) {
				delete keysDown[e.keyCode];
			}, false);

			switch (keysDown) {
				case 65:
					srcX = 7;
					break;
				case 68:
					srcX = 0;
					break;
				case 0:
					posX = 0;
					break;
				case 0:
					posX = 0;
					posY = 0;
				default:
					srcX = 13;
					break;
			}
			values = [srxX, posX, posY];
			return values;
		},
		// Attempts and fails to init spritesheet
		// Try to make it a variable
		loadPlayersImg: function () {
			var playersImg = new Image();

			playersImg.onload = function () {
				window.playersImg = playersImg;
			}
			playersImg.src = "source/img/players.png";
		},
		// Causes a buttload of errors that I can't fix
		drawPlayer: function (x, y, posX, posY) {
			context.drawImage(window.playersImg, x, y, 6, 8, posX, posY, 24, 32);
		}
	}
};

// Run the game!
GAME.func.update();