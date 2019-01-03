const electron = require('electron')
const { app, BrowserWindow, ipcMain, Menu } = electron

const packagejson = require('../package.json');
const notification = require('./notification')
const { menuTemplate } = require('./menu')
const keyboard = require('./keyboard')

const debug = true

let win

app.setAboutPanelOptions({
	applicationName: 'AIMI',
	applicationVersion: packagejson.version
})

/* Transparent Window with grid to help styling */
let gridWin

app.on('ready', () => {
	let { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

	win = new BrowserWindow({
		width: width,
		height: height,
		titleBarStyle: 'hiddenInset'
	})

	if (debug) {
		gridWin = new BrowserWindow({
			width: width,
			height: height,
			titleBarStyle: 'normal',
			transparent: true,
			frame: true
		})
		gridWin.maximize()
		gridWin.loadFile('grid.html')
	}

	const appMenu = Menu.buildFromTemplate(menuTemplate)
	Menu.setApplicationMenu(appMenu)

	win.maximize()
	win.center()
	win.setBackgroundColor('#424242')
	win.loadFile('index.html')

	win.on('resize', () => {
		[width, height] = win.getSize()
		win.reload()
	})
	win.on('closed', () => {
		win = null
	})
})


app.on('window-all-closed', () => {
	app.quit()
})