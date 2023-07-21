const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { contextBridge, ipcRenderer } = require("electron");

const path = require('path');
const { shell } = require('electron')
const template = [
  {
    label: "New",
    submenu: [
      {
        label: "New Window",
        click: () => {
          let win = new BrowserWindow(
            {
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
              height: 400,
              width: 300
            }
          )
          win.loadFile('newFile.html')
        }
      }, {
        label: "Open Camera",
        click: () => {
          let win = new BrowserWindow(
            {
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                preload: path.join(__dirname, 'camera.js'),
              },
              height: 400,
              width: 300
            }
          )
          win.loadFile('camera.html');
        }
      }
    ]
  },
  {
    label: "File",
    submenu: [
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow) {
            focusedWindow.minimize();
          }
        }
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+Esc",
        click: () => {
          app.quit()
        }
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Open DevTool",
        click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow) {
            focusedWindow.webContents.openDevTools();
          }
        }

      },
      {
        label: "Close",
        click: () => {
          app.quit()
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "Lern More",
        click: async () => {
          await shell.openExternal('https://electronjs.org')
        }

      }
    ]
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// sending data from main?? to rander

const createWindow = () => {

  const win = new BrowserWindow(
    {
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'),
        experimentalFeatures: true
      },
      show: false,
      minHeight: 200,
      width: 600
    }
  )
  win.webContents.send('message-from-main', { key: 'send by main js' });
  ipcMain.on('message-from-renderer', (event, data) => {
    console.log(data, "Recive data form the main process"); // { key: 'value' }
    // Process the data received from the renderer here
  });
  win.loadFile('index.html');
  win.once('ready-to-show', () => {
    win.show()
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
