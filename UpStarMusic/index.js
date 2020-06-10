const { app, BrowserWindow } = require("electron");
let win;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(`file://${__dirname}/index.html`);
});
