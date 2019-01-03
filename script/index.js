const electron = require('electron')
const { ipcRenderer } = electron

// Renderer Side
const container = document.querySelector('.container')
const main = document.querySelector('.main')
const canvas = document.querySelector('.canvas')

document.onkeydown = e => {
	e.preventDefault()
	let key = (e.key == 'Dead') ? e.code : e.key
	ipcRenderer.send('keypress', key, e.shiftKey)
	console.log(e);
}

function mainCanvas(sketch) {
	sketch.setup = function() {
		let can = sketch.createCanvas(main.offsetWidth, main.offsetHeight)
		can.addClass('canvas')
	}

	sketch.draw = function() {
		sketch.background('#37474F')
		sketch.stroke('#11111')
		sketch.line(sketch.mouseX, 0, sketch.mouseX, main.offsetHeight)
		sketch.line(0, sketch.mouseY, main.offsetWidth, sketch.mouseY)
	}
}

let myp5 = new p5(mainCanvas, main)