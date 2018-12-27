const electron = require('electron')
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let width, height

function init() {
	mainWindow = new BrowserWindow({ width: 800, height: 600 })
	width = electron.screen.getPrimaryDisplay().workAreaSize.width
	height = electron.screen.getPrimaryDisplay().workAreaSize.height

	mainWindow.loadFile('index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	mainWindow.on('resize', () => {
		width = electron.screen.getPrimaryDisplay().workAreaSize.width
		height = electron.screen.getPrimaryDisplay().workAreaSize.height
		console.log(width, height)
	})
	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

app.on('ready', init)

app.on('window-all-closed', () => {
	app.quit()
})

app.on('activate', () => {
	if (mainWindow === null) {
		init()
	}
})