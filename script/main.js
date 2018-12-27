const electron = require('electron')
const { app, BrowserWindow } = require('electron')

let mainWindow
let width, height

function init() {
	width = electron.screen.getPrimaryDisplay().workArea.width
	height = electron.screen.getPrimaryDisplay().workArea.height
	console.log(electron.screen.getPrimaryDisplay())

	mainWindow = new BrowserWindow({ width: width, height: height })
	mainWindow.loadFile('index.html')

	mainWindow.on('resize', () => {
		width = mainWindow.getSize()[0]
		height = mainWindow.getSize()[1]
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