const { menu } = require('electron')

module.exports.menuTemplate = [{
		label: 'AIMI',
		submenu: [
			{ label: 'About AIMI', role: 'about' },
			{ label: 'View License' },
			{ label: 'Check for update' },
			{ label: 'Settings' }
		]
	}, {
		label: 'File',
		submenu: [
			{ label: 'New File' },
			{ label: 'Open' },
			{ role: 'recentDocuments' }
		]
	}, {
		label: 'Edit',
		submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			{ type: 'separator' },
			{ role: 'delete' },
			{ role: 'selectall' }
		]
	}, {
		label: 'Control',
		submenu: [
			{ label: 'Mouse Control', type: 'radio' },
			{ label: 'Keybord Control', type: 'radio' },
			{ label: 'Voice Control', type: 'radio' }
		]
	}, {
		label: 'Window',
		submenu: [
			{ role: 'toggleFullScreen' },
			{
				label: 'Presets',
				submenu: [
					{ label: 'Full', type: 'radio' },
					{ label: 'Popup', type: 'radio' },
					{ label: 'Half-Screen', type: 'radio' },
					{ label: 'minimize', type: 'radio' }
				]
			},
			{ role: 'hide' },
			{ role: 'minimize' },
			{ role: 'close' }
		]
	},
	{
		label: 'Developer',
		submenu: [
			{ role: 'toggleDevTools' },
			{ role: 'reload' },
			{ role: 'forceReload' }
		]
	}
]