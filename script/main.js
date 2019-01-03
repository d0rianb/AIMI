const electron = require('electron')
const { app, BrowserWindow, ipcMain, Menu } = electron
const notification = require('./notification')
const { menuTemplate } = require('./menu')
const keyboard = require('./keyboard')

let win

app.on('ready', () => {
	let { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

	win = new BrowserWindow({
		width: width,
		height: height,
		titleBarStyle: 'hiddenInset'
	})

	const appMenu = Menu.buildFromTemplate(menuTemplate)
	Menu.setApplicationMenu(appMenu)

	win.maximize()
	win.center()
	win.setBackgroundColor('#424242')
	win.loadFile('index.html')

	win.on('resize', () => {
		[width, height] = win.getSize()
	})
	win.on('closed', () => {
		win = null
	})
})


app.on('window-all-closed', () => {
	app.quit()
})
app.on('activate', () => {
	if (win === null) {
		init()
	}
})