const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  generatePDF: (data) => ipcRenderer.invoke('generate-pdf', data),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info')
});