const { app, BrowserWindow, systemPreferences } = require('electron');
const electron = require('electron');
const path = require('path');
const ipc = electron.ipcMain;

if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow () {
  const win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, './preload.cjs'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.setBackgroundColor('#000000');

  win.loadFile('./src/game/dist/index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})