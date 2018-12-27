const electron = require('electron')
const { ipcRenderer } = electron

// Renderer Side
const main = document.querySelector('.main')
const canvas = document.querySelector('.canvas')

function mainCanvas(sketch) {
	sketch.setup = function() {
		let can = sketch.createCanvas(main.offsetWidth, main.offsetHeight)
		can.addClass('canvas')
	}

	sketch.draw = function() {
		sketch.background('#516676')
		sketch.stroke('#11111')
		sketch.line(sketch.mouseX, 0, sketch.mouseX, main.offsetHeight)
		sketch.line(0, sketch.mouseY, main.offsetWidth, sketch.mouseY)
	}
}

let myp5 = new p5(mainCanvas, main)