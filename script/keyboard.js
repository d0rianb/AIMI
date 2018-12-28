const electron = require('electron')
const { BrowserWindow, ipcMain } = electron
const robot = require('robotjs')


let keyboardControl = true

/* Bind key array to mouse position
 *  y (from 0 to 3) * screenHeight / 4
 * x (depends on y) */
const keyToPos = {
	'@': { x: 0, y: 0 },
	'&': { x: 1, y: 0 },
	'é': { x: 2, y: 0 },
	'\"': { x: 3, y: 0 },
	'\'': { x: 4, y: 0 },
	'(': { x: 5, y: 0 },
	'§': { x: 6, y: 0 },
	'è': { x: 7, y: 0 },
	'!': { x: 8, y: 0 },
	'ç': { x: 9, y: 0 },
	'à': { x: 10, y: 0 },
	')': { x: 11, y: 0 },
	'-': { x: 12, y: 0 },

	'a': { x: 0, y: 1 },
	'z': { x: 1, y: 1 },
	'e': { x: 2, y: 1 },
	'r': { x: 3, y: 1 },
	't': { x: 4, y: 1 },
	'y': { x: 5, y: 1 },
	'u': { x: 6, y: 1 },
	'i': { x: 7, y: 1 },
	'o': { x: 8, y: 1 },
	'p': { x: 9, y: 1 },
	'^': { x: 10, y: 1 },
	'BracketLeft': { x: 10, y: 1 }, // ^
	'$': { x: 11, y: 1 },

	'q': { x: 0, y: 2 },
	's': { x: 1, y: 2 },
	'd': { x: 2, y: 2 },
	'f': { x: 3, y: 2 },
	'g': { x: 4, y: 2 },
	'h': { x: 5, y: 2 },
	'j': { x: 6, y: 2 },
	'k': { x: 7, y: 2 },
	'l': { x: 8, y: 2 },
	'm': { x: 9, y: 2 },
	'ù': { x: 10, y: 2 },
	'\`': { x: 11, y: 2 },
	'Backslash': { x: 11, y: 2 }, // `

	'<': { x: 0, y: 3 },
	'w': { x: 1, y: 3 },
	'x': { x: 2, y: 3 },
	'c': { x: 3, y: 3 },
	'v': { x: 4, y: 3 },
	'b': { x: 5, y: 3 },
	'n': { x: 6, y: 3 },
	',': { x: 7, y: 3 },
	';': { x: 8, y: 3 },
	':': { x: 9, y: 3 },
	'=': { x: 10, y: 3 }
}
const yLength = {
	0: 13,
	1: 12,
	2: 12,
	3: 11
}
if (keyboardControl) {
	ipcMain.on('keypress', (event, key, isShifted = false) => {
		let currentWindow = BrowserWindow.getFocusedWindow();
		[windowWidth, windowHeight] = currentWindow.getSize();
		[windowX, windowY] = currentWindow.getPosition()
		let { x, y } = robot.getMousePos()
		if (keyToPos.hasOwnProperty(key)) {
			let mouseX = keyToPos[key].x * windowWidth / yLength[keyToPos[key].y]
			let mouseY = keyToPos[key].y * windowHeight / 4
			let offsetX = (windowWidth / yLength[keyToPos[key].y]) / 2
			let offsetY = windowWidth / 8
			robot.setMouseDelay(3)
			let deltaX = mouseX + offsetX - x
			let deltaY = mouseY + offsetY - y
			let step = 20
			for (let i = 0; i < step; i++) { // Animation
				x = robot.getMousePos().x
				y = robot.getMousePos().y
				robot.moveMouse(x + deltaX / step, y + deltaY / step)
				console.log(x + deltaX / step, y + deltaY / step)
			}
		} else if (key == 'Enter') {
			robot.mouseClick()
		} else {
			let offset = isShifted ? 10 : 30
			if (key == 'ArrowUp') { robot.moveMouseSmooth(x, y - offset) }
			if (key == 'ArrowDown') { robot.moveMouseSmooth(x, y + offset) }
			if (key == 'ArrowLeft') { robot.moveMouseSmooth(x - offset, y) }
			if (key == 'ArrowRight') { robot.moveMouseSmooth(x + offset, y) }
		}

	})
}