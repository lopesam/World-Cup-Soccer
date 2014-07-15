// General variable declarations
var canvas = document.getElementById("cvs"),
	context = canvas.getContext("2d"),
	GAME = GAME || {},
	fps = 10,
	drawInterval,
	playersImg = new Image(),
	keysDown = {},
	randPlaceX,
	randPlaceY,
	randSizeX,
	randSizeY;

// Sets the path of the spritesheet
playersImg.src = "source/img/players.png";

// Sets The width and height of the game
canvas.width = 800,
canvas.height = 400;

// Disables blurring when images get resized
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;

// The GAME namespace
GAME = {
	pills: {
		x: (canvas.width / 2) - 100,
		y: (canvas.height / 2) - 100,
		Y: 27,
		X: 0,
		sizeX: 48,
		sizeY: 24,
		count: 0
	},

	// The player's properties
	player: {
		x: (canvas.width /2) - 12,
		y: (canvas.height /2) - 16,
		X: 12,
		Y: 8,
		sizeX: 24,
		sizeY: 32,
		speed: 100
	},

	// Not implemented yet
	team1: {
		goals: 0
	},

	// Not implemented yet
	team2: {
		goals: 0
	},

	// the canvas's width and height
	width: canvas.width,
	height: canvas.height,
	functions: {
		// Alerts you if you are getting too big
		alertSize: function () {
			if (GAME.pills.count > 2900) {
				context.font = "48px soccer";
				context.fillStyle = "#000000";
				context.fillText("You broke it...", (canvas.width / 2) - 160, canvas.height / 2);
			}
		},

		// Checks if the player touches the border
		checkBorderCollisions: function () {
			if (GAME.player.x > (GAME.width + GAME.player.sizeX)) {
				GAME.player.x -= GAME.player.sizeX;
			} else if (GAME.player.x > (GAME.width - GAME.player.sizeX)) {
				GAME.player.x -= 1;
			} else if (GAME.player.x < -(GAME.player.sizeX * 2)) {
				GAME.player.x += GAME.player.sizeX;
			} else if (GAME.player.x < 0) {
				GAME.player.x += 1;
			} else if (GAME.player.y < -(GAME.player.sizeY * 2)) {
				GAME.player.y += GAME.player.sizeY;
			} else if (GAME.player.y < 0) {
				GAME.player.y += 1;
			} else if (GAME.player.y > (GAME.height + GAME.player.sizeY)) {
				GAME.player.y -= GAME.player.sizeY;
			} else if (GAME.player.y > (GAME.height - GAME.player.sizeY)) {
				GAME.player.y -= 1;
			}
		},

		// Checks to see what keys were pressed and moves the player if the arrow/wasd keys were pressed
		checkKeys: function (e) {
			if (65 in keysDown || 37 in keysDown) {
				GAME.player.x = GAME.player.x - 400 / GAME.player.speed;
				GAME.player.X = 6;
			} else if (68 in keysDown || 39 in keysDown) {
				GAME.player.x = GAME.player.x + 400 / GAME.player.speed;
				GAME.player.X = 0;
			} else if (83 in keysDown || 40 in keysDown) {
				GAME.player.y = GAME.player.y + 400 / GAME.player.speed;
			} else if (87 in keysDown || 38 in keysDown) {
				GAME.player.y = GAME.player.y - 400 / GAME.player.speed;
			} else {
				GAME.player.X = 12;
			}
			return false;
		},

		// Checks to see if playeer touches the pills
		checkPillCollisions: function () {
			if ((GAME.player.y + GAME.player.sizeY) > GAME.pills.y && GAME.player.y < (GAME.pills.y + 24) && (GAME.player.x + GAME.player.sizeX) > GAME.pills.x && GAME.player.x < (GAME.pills.x + 48)) {
				GAME.player.sizeX *= 1.03;
				GAME.player.sizeY *= 1.03;
				GAME.player.speed *= 1.02;
				flag = true;
				while (flag === true) {
					console.log("pill teleporting");
					randPlaceX = (Math.floor(Math.random() * 1000));
					randPlaceY = (Math.floor(Math.random() * 500));
					if (randPlaceX < 742 && randPlaceX > 10 && randPlaceY > 10 && randPlaceY < 376) {
						GAME.pills.x = randPlaceX;
						GAME.pills.y = randPlaceY;
						GAME.pills.count += 1;
						flag = false;
					}
				}
				console.log("pill teleported");
			}
		},

		// Checks to see if the human player clicked one of the radio buttons and switches player
		checkRadioBtnsTicked: function () {
			var messiBtn = document.getElementById("messiRdio"),
				ronaldoBtn = document.getElementById("ronaldoRdio"),
				balotelliBtn = document.getElementById("balotelliRdio");

			if (messiBtn.checked === true) {
				GAME.player.Y = 0;
				GAME.player.speed = 75;
			} else if (ronaldoBtn.checked === true) {
				GAME.player.Y = 8;
				GAME.player.speed = 115;
			} else if (balotelliBtn.checked === true) {
				GAME.player.Y = 16;
				GAME.player.speed = 150;
			}
		},

		// Calls all of the methods that are looped
		draw: function () {
			context.clearRect(0,0, GAME.width, GAME.height);
			GAME.functions.checkKeys();
			GAME.functions.checkRadioBtnsTicked();
			GAME.functions.drawField(GAME.width, GAME.height);
			GAME.functions.drawPill(GAME.pills.X, GAME.pills.Y, GAME.pills.x, GAME.pills.y, GAME.pills.sizeX, GAME.pills.sizeY);
			GAME.functions.drawPlayer(GAME.player.X, GAME.player.Y, GAME.player.x, GAME.player.y, GAME.player.sizeX, GAME.player.sizeY);
			GAME.functions.checkBorderCollisions();
			GAME.functions.checkPillCollisions();
			GAME.functions.drawText();
			GAME.functions.alertSize();
		},

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

		// Draws the player
		drawPlayer: function (srcX, srcY, posX, posY, sizeX, sizeY) {
			context.drawImage(playersImg, srcX, srcY, 6, 8, posX, posY, sizeX, sizeY);
		},

		drawPill: function (srcX, srcY, posX, posY, sizeX, sizeY) {
			context.drawImage(playersImg, srcX, srcY, 16, 8, posX, posY, sizeX, sizeY);
		},

		// Draws text
		drawText: function () {
			context.font = "16px soccer";
			context.fillStyle = "#ffffff"
			context.fillText("You found " + GAME.pills.count + " pills and ate them.", 5, 15);
		},

		// Begins the loop
		startDrawing: function () {
			GAME.functions.stopDrawing();
			drawInterval = setInterval(GAME.functions.draw, fps);
		},

		// This is called at the beginning of startDrawing() to make sure that an interval isn't already set
		stopDrawing: function () {
			clearInterval(drawInterval);
		}
	}
};

// Listens for when any key is pressed down
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

// Listens for when any key is let go of
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);