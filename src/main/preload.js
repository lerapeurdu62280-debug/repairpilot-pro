const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('repairpilot', {
  // Contrôles fenêtre
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close:    () => ipcRenderer.send('window-close'),

  // Paramètres sécurisés
  getSetting: (key)        => ipcRenderer.invoke('settings-get', key),
  setSetting: (key, value) => ipcRenderer.invoke('settings-set', key, value),
  deleteSetting: (key)     => ipcRenderer.invoke('settings-delete', key),

  // IA Claude
  aiChat: (messages) => ipcRenderer.invoke('ai-chat', messages),

  // Mises à jour
  checkForUpdate: () => ipcRenderer.invoke('check-for-update'),
  installUpdate:  () => ipcRenderer.send('install-update'),
  onUpdateStatus: (cb) => ipcRenderer.on('update-status', (_, data) => cb(data)),

  // Build type
  isOwner: () => ipcRenderer.invoke('is-owner'),

  // Licence
  getLicenseStatus: ()      => ipcRenderer.invoke('license-get-status'),
  activateLicense:  (key)   => ipcRenderer.invoke('license-activate', key),
  getLicenseKey:    ()      => ipcRenderer.invoke('license-get-key'),

  // Dossier de sauvegarde
  chooseFolder:     ()      => ipcRenderer.invoke('dialog-open-folder'),
  saveBackupFile:   (folder, fileName, content) => ipcRenderer.invoke('save-backup-file', folder, fileName, content),
  saveBackupOnClose:(folder, content) => ipcRenderer.send('save-backup-on-close', folder, content)
});
