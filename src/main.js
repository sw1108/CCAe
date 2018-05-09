const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    main.init()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    main.init()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const Color = require('./CCAcolor')

global.sharedObject = {
    foregroundColor : Color.rgb(0, 0, 0), // White
    backgroundColor : Color.rgb(255, 255, 255), // Black
    contrastRatio : 21,
    contrastRatioRounded : 21
}

const browsers = require('./browsers')(__dirname)
const {main, picker} = browsers

const CCAController = require('./CCAcontroller')
const mainController = new CCAController(browsers, global.sharedObject)

require('./controllers')(browsers, mainController)