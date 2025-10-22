const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	const win = new BrowserWindow({
		width: width,
		height: height,
		fullscreen: true,
		kiosk: true, // 强制信息亭模式
		webPreferences: {
			devTools: false, // 禁用开发者工具
			contextIsolation: true,
			sandbox: false
		},
		frame: false, // 无边框
		autoHideMenuBar: true
	});

	// 加载本地 HTML
	win.loadFile('index.html');

	// 阻止新窗口打开（如 target="_blank"）
	win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
	win.webContents.on('before-input-event', (event, input) => {
		if (
			input.type === 'keyDown' &&
			(
				input.key === 'F11' ||
				input.key === 'Escape' ||
				(input.alt && input.key === 'F4') ||
				(input.control && input.key === 'r')
			)
		) {
			event.preventDefault();
		}
	});
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});