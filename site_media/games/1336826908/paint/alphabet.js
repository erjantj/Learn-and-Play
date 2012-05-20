var paintBucketApp = (function () {

	"use strict";

	var context,
		canvasWidth = 890,
		canvasHeight = 600,
		colorWhite = {
			r: 255,
			g: 255,
			b: 255
		},
		colorPurple = {
			r: 203,
			g: 53,
			b: 148
		},
		colorGreen = {
			r: 101,
			g: 155,
			b: 65
		},
		colorYellow = {
			r: 255,
			g: 207,
			b: 51
		},
		
		colorBrown = {
			r: 152,
			g: 105,
			b: 40
		},
		colorGreen2 = {
			r: 0,
			g: 255,
			b: 0
		},

		colorYellow2 = {
			r: 255,
			g: 255,
			b: 0
		},
		colorBlue = {
			r: 0,
			g: 174,
			b: 239
		},
		colorBlue2 = {
			r: 0,
			g: 74,
			b: 128
		},
		colorMagenta = {
			r: 242,
			g: 109,
			b: 125
		},
		colorGrey = {
			r: 99,
			g: 99,
			b: 99
		},
		curColor = colorPurple,
		outlineImage = new Image(),
		swatchImage = new Image(),
		backgroundImage = new Image(),
		swatchStartX = 18,
		swatchStartY = 19,
		swatchImageWidth = 94,
		swatchImageHeight = 46,
		drawingAreaX = 111,
		drawingAreaY = 11,
		drawingAreaWidth = 767,
		drawingAreaHeight = 580,
		colorLayerData,
		outlineLayerData,
		totalLoadResources = 3,
		curLoadResNum = 0,

		clearCanvas = function () {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		},

		drawColorSwatch = function (color, x, y) {

			context.beginPath();
			context.arc(x + 46, y + 23, 18, 0, Math.PI * 2, true);
			context.closePath();
			context.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
			context.fill();

			if (curColor === color) {
				context.drawImage(swatchImage, 0, 0, 59, swatchImageHeight, x, y, 59, swatchImageHeight);
			} else {
				context.drawImage(swatchImage, x, y, swatchImageWidth, swatchImageHeight);
			}
		},

		// Draw the elements on the canvas
		redraw = function () {

			var locX,
				locY;

			// Make sure required resources are loaded before redrawing
			if (curLoadResNum < totalLoadResources) {
				return;
			}

			clearCanvas();

			// Draw the current state of the color layer to the canvas
			context.putImageData(colorLayerData, 0, 0);

			// Draw the background
			context.drawImage(backgroundImage, 55, 0, canvasWidth, canvasHeight);

			// Draw the color swatches
			locX = 55;
			locY = 19;
			drawColorSwatch(colorWhite, locX, locY);

			locY += 46;
			drawColorSwatch(colorPurple, locX, locY);

			locY += 46;
			drawColorSwatch(colorGreen, locX, locY);

			locY += 46;
			drawColorSwatch(colorYellow, locX, locY);

			locY += 46;
			drawColorSwatch(colorBrown, locX, locY);

			locY += 46;
			drawColorSwatch(colorGreen2, locX, locY);

			locY += 46;
			drawColorSwatch(colorYellow2, locX, locY);

			locY += 46;
			drawColorSwatch(colorBlue, locX, locY);

			locY += 46;
			drawColorSwatch(colorBlue2, locX, locY);

			locY += 46;
			drawColorSwatch(colorMagenta, locX, locY);

			locY += 46;
			drawColorSwatch(colorGrey, locX, locY);

			// Draw the outline image on top of everything. We could move this to a separate 
			//   canvas so we did not have to redraw this everyime.
			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
		},

		matchOutlineColor = function (r, g, b, a) {

			return (r + g + b < 100 && a === 255);
		},

		matchStartColor = function (pixelPos, startR, startG, startB) {

			var r = outlineLayerData.data[pixelPos],
				g = outlineLayerData.data[pixelPos + 1],
				b = outlineLayerData.data[pixelPos + 2],
				a = outlineLayerData.data[pixelPos + 3];

			// If current pixel of the outline image is black
			if (matchOutlineColor(r, g, b, a)) {
				return false;
			}

			r = colorLayerData.data[pixelPos];
			g = colorLayerData.data[pixelPos + 1];
			b = colorLayerData.data[pixelPos + 2];

			// If the current pixel matches the clicked color
			if (r === startR && g === startG && b === startB) {
				return true;
			}

			// If current pixel matches the new color
			if (r === curColor.r && g === curColor.g && b === curColor.b) {
				return false;
			}

			return true;
		},

		colorPixel = function (pixelPos, r, g, b, a) {

			colorLayerData.data[pixelPos] = r;
			colorLayerData.data[pixelPos + 1] = g;
			colorLayerData.data[pixelPos + 2] = b;
			colorLayerData.data[pixelPos + 3] = a !== undefined ? a : 255;
		},

		floodFill = function (startX, startY, startR, startG, startB) {

			var newPos,
				x,
				y,
				pixelPos,
				reachLeft,
				reachRight,
				drawingBoundLeft = drawingAreaX,
				drawingBoundTop = drawingAreaY,
				drawingBoundRight = drawingAreaX + drawingAreaWidth - 1,
				drawingBoundBottom = drawingAreaY + drawingAreaHeight - 1,
				pixelStack = [[startX, startY]];

			while (pixelStack.length) {

				newPos = pixelStack.pop();
				x = newPos[0];
				y = newPos[1];

				// Get current pixel position
				pixelPos = (y * canvasWidth + x) * 4;

				// Go up as long as the color matches and are inside the canvas
				while (y >= drawingBoundTop && matchStartColor(pixelPos, startR, startG, startB)) {
					y -= 1;
					pixelPos -= canvasWidth * 4;
				}

				pixelPos += canvasWidth * 4;
				y += 1;
				reachLeft = false;
				reachRight = false;

				// Go down as long as the color matches and in inside the canvas
				while (y <= drawingBoundBottom && matchStartColor(pixelPos, startR, startG, startB)) {
					y += 1;

					colorPixel(pixelPos, curColor.r, curColor.g, curColor.b);

					if (x > drawingBoundLeft) {
						if (matchStartColor(pixelPos - 4, startR, startG, startB)) {
							if (!reachLeft) {
								// Add pixel to stack
								pixelStack.push([x - 1, y]);
								reachLeft = true;
							}
						} else if (reachLeft) {
							reachLeft = false;
						}
					}

					if (x < drawingBoundRight) {
						if (matchStartColor(pixelPos + 4, startR, startG, startB)) {
							if (!reachRight) {
								// Add pixel to stack
								pixelStack.push([x + 1, y]);
								reachRight = true;
							}
						} else if (reachRight) {
							reachRight = false;
						}
					}

					pixelPos += canvasWidth * 4;
				}
			}
		},

		// Start painting with paint bucket tool starting from pixel specified by startX and startY
		paintAt = function (startX, startY) {

			var pixelPos = (startY * canvasWidth + startX) * 4,
				r = colorLayerData.data[pixelPos],
				g = colorLayerData.data[pixelPos + 1],
				b = colorLayerData.data[pixelPos + 2],
				a = colorLayerData.data[pixelPos + 3];

			if (r === curColor.r && g === curColor.g && b === curColor.b) {
				// Return because trying to fill with the same color
				return;
			}

			if (matchOutlineColor(r, g, b, a)) {
				// Return because clicked outline
				return;
			}

			floodFill(startX, startY, r, g, b);

			redraw();
		},

		// Add mouse event listeners to the canvas
		createMouseEvents = function () {

			$('#canvas').mousedown(function (e) {
				// Mouse down location
				var mouseX = e.pageX - this.offsetLeft,
					mouseY = e.pageY - this.offsetTop;

				if (mouseX < drawingAreaX) { // Left of the drawing area
					if (mouseX > swatchStartX) {
						if (mouseY > swatchStartY && mouseY < swatchStartY + swatchImageHeight) {
							curColor = colorWhite;
							redraw();
						}else if (mouseY > swatchStartY && mouseY < swatchStartY + swatchImageHeight) {
							curColor = colorPurple;
							redraw();
						} else if (mouseY > swatchStartY + swatchImageHeight && mouseY < swatchStartY + swatchImageHeight * 2) {
							curColor = colorPurple;
							redraw();
						} else if (mouseY > swatchStartY + swatchImageHeight * 2 && mouseY < swatchStartY + swatchImageHeight * 3) {
							curColor = colorGreen;
							redraw();
						} else if (mouseY > swatchStartY + swatchImageHeight * 3 && mouseY < swatchStartY + swatchImageHeight * 4) {
							curColor = colorYellow;
							redraw();
						}else if (mouseY > swatchStartY + swatchImageHeight * 4 && mouseY < swatchStartY + swatchImageHeight * 5) {
							curColor = colorBrown;
							redraw();
						}else if (mouseY > swatchStartY + swatchImageHeight * 5 && mouseY < swatchStartY + swatchImageHeight * 6) {
							curColor = colorGreen2;
							redraw();
						}else if (mouseY > swatchStartY + swatchImageHeight * 6 && mouseY < swatchStartY + swatchImageHeight * 7) {
							curColor = colorYellow2;
							redraw();
						}else if (mouseY > swatchStartY + swatchImageHeight * 7 && mouseY < swatchStartY + swatchImageHeight * 8) {
							curColor = colorBlue;
							redraw();
						}else if (mouseY > swatchStartY + swatchImageHeight * 8 && mouseY < swatchStartY + swatchImageHeight * 9) {
							curColor = colorBlue2;
							redraw();
						}
						else if (mouseY > swatchStartY + swatchImageHeight * 10 && mouseY < swatchStartY + swatchImageHeight * 11) {
							curColor = colorGrey;
							redraw();
						}
						else if (mouseY > swatchStartY + swatchImageHeight * 11 && mouseY < swatchStartY + swatchImageHeight * 12) {
							curColor = colorMagenta;
							redraw();
						}//add colors
					}
				} else if ((mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight) && (mouseX <= drawingAreaX + drawingAreaWidth)) {
					// Mouse click location on drawing area
					paintAt(mouseX, mouseY);
				}
			});
		},

		// Calls the redraw function after all neccessary resources are loaded.
		resourceLoaded = function () {

			curLoadResNum += 1;
			if (curLoadResNum === totalLoadResources) {
				createMouseEvents();
				redraw();
			}
		},

		// Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
		init = function () {
			var canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			if (typeof G_vmlCanvasManager !== "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
			}
			context = canvas.getContext("2d"); // Grab the 2d canvas context
			// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
			//     context = document.getElementById('canvas').getContext("2d");

			// Load images
			backgroundImage.onload = resourceLoaded;
			backgroundImage.src = "images/background.png";

			swatchImage.onload = resourceLoaded;
			swatchImage.src = "images/paint-outline.png";

			outlineImage.onload = function () {
				context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);

				// Test for cross origin security error (SECURITY_ERR: DOM Exception 18)
				try {
					outlineLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight);
				} catch (ex) {
					window.alert("Application cannot be run locally. Please run on a server.");
					return;
				}
				clearCanvas();
				colorLayerData = context.getImageData(0, 0, canvasWidth, canvasHeight);
				resourceLoaded();
			};
			outlineImage.src = "images/watermelon-duck-outline.png";
		};

	return {
		init: init
	};
}());