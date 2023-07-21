const { ipcRenderer ,contextBridge} = require('electron');

// Sending data to the main process
ipcRenderer.send('message-from-renderer', { data:"some data here" });

// Listening for messages from the main process
ipcRenderer.on('message-from-main', (event, data) => {
  console.log(data,"data that recive from the main process"); // { key: 'value' }
  // Process the data received from the main process here
});