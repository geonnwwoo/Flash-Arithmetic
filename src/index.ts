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

  win.loadFile('./src/main/dist/index.html');
  win.webContents.openDevTools();

  ipc.on('ready for game', function() {
    win.loadFile(path.join(__dirname, './game/dist/index.html'));
  });

  ipc.on('back to main', function() {
    win.loadFile(path.join(__dirname, './main/dist/index.html'));
  })
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