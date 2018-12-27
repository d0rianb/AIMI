const electron = require('electron')
const { app, BrowserWindow } = require('electron')

let mainWindow
// let width, height

app.on('ready', () => {
	let { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
	console.log(width, height);

	mainWindow = new BrowserWindow({ width: width, height: height })
	mainWindow.maximize()
	mainWindow.loadFile('index.html')

	mainWindow.on('resize', () => {
		[width, height] = mainWindow.getSize()
	})
	mainWindow.on('closed', () => {
		mainWindow = null
	})
})
app.on('window-all-closed', () => {
	app.quit()
})
app.on('activate', () => {
	if (mainWindow === null) {
		init()
	}
})