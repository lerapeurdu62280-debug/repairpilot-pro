const { app, BrowserWindow, ipcMain, session, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Store = require('electron-store');
const { autoUpdater } = require('electron-updater');

// ── Load .env (secrets stay out of git) ──────────────────────────────────────
try {
  fs.readFileSync(path.join(__dirname, '../../.env'), 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
} catch(e) {}

const store = new Store({ encryptionKey: process.env.STORE_KEY || 'repairpilot-sosinfoludo-2026' });

// ── Build type (Owner vs Client) ─────────────────────────────────────
// Triple détection : productName, execPath, et argv — robuste même si un seul fonctionne
const IS_OWNER_BUILD =
  app.getName().toLowerCase().includes('owner') ||
  process.execPath.toLowerCase().includes('owner') ||
  (process.argv[0] || '').toLowerCase().includes('owner') ||
  __dirname.toLowerCase().includes('owner');

// Sécurité : si Owner, forcer la licence activée dans le store
if (IS_OWNER_BUILD) {
  store.set('licenseKey', 'RPRO0000FFFFFFFFFFFFFFFF');
  store.set('ownerBuild', true);
}

// ── Licence ─────────────────────────────────────────────────────────
const LIC_SECRET = process.env.LICENSE_SECRET || '';
const TRIAL_DAYS = 30;

function validateLicenseKey(input) {
  if (!input) return false;
  const clean = input.replace(/[-\s]/g, '').toUpperCase();
  // Format: RPRO + 4 char ID + 16 char HMAC = 24 chars
  if (!clean.startsWith('RPRO') || clean.length !== 24) return false;
  const raw = clean.substring(4);
  const id = raw.substring(0, 4);
  const provided = raw.substring(4);
  const expected = crypto.createHmac('sha256', LIC_SECRET)
    .update('RPRO-' + id).digest('hex').toUpperCase().substring(0, 16);
  return provided === expected;
}

function getLicenseStatus() {
  // Owner build = toujours activé, jamais d'essai
  if (IS_OWNER_BUILD || store.get('ownerBuild')) {
    return { activated: true, trial: false, daysLeft: 0, expired: false, owner: true };
  }
  const key = store.get('licenseKey');
  if (key && validateLicenseKey(key)) {
    return { activated: true, trial: false, daysLeft: 0, expired: false };
  }
  const firstLaunch = store.get('firstLaunchDate');
  if (!firstLaunch) {
    store.set('firstLaunchDate', Date.now());
    return { activated: false, trial: true, daysLeft: TRIAL_DAYS, expired: false };
  }
  const daysUsed = Math.floor((Date.now() - firstLaunch) / 86400000);
  const daysLeft = Math.max(0, TRIAL_DAYS - daysUsed);
  return { activated: false, trial: daysLeft > 0, daysLeft, expired: daysLeft === 0 };
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 680,
    frame: false,
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'hidden',
    backgroundColor: '#f0f0f5',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
      webSecurity: true
    },
    icon: path.join(__dirname, '../../assets/icon.ico'),
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

app.whenReady().then(() => {
  // Autoriser les webviews à charger des sites externes
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src * 'unsafe-inline' 'unsafe-eval' data: blob:"]
      }
    });
  });

  createWindow();

  // ── Auto-update (après que la fenêtre soit prête)
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('checking-for-update', () => {
    mainWindow?.webContents.send('update-status', { type: 'checking' });
  });
  autoUpdater.on('update-available', (info) => {
    mainWindow?.webContents.send('update-status', { type: 'available', version: info.version });
  });
  autoUpdater.on('update-not-available', () => {
    mainWindow?.webContents.send('update-status', { type: 'none' });
  });
  autoUpdater.on('download-progress', (p) => {
    mainWindow?.webContents.send('update-status', { type: 'downloading', percent: Math.round(p.percent) });
  });
  autoUpdater.on('update-downloaded', (info) => {
    mainWindow?.webContents.send('update-status', { type: 'ready', version: info.version });
  });
  autoUpdater.on('error', (err) => {
    mainWindow?.webContents.send('update-status', { type: 'error', message: err.message });
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ── Sauvegarde automatique à la fermeture (si dossier configuré)
ipcMain.on('save-backup-on-close', (_, folderPath, content) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const fileName = `repairpilot_backup_${today}.json`;
    const filePath = require('path').join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
  } catch(e) {
    console.error('Erreur sauvegarde auto:', e.message);
  }
});

// ── IPC : Contrôles fenêtre ──────────────────────────────────────
ipcMain.on('window-minimize', () => mainWindow.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.close());

// ── IPC : Paramètres sécurisés ───────────────────────────────────
ipcMain.handle('settings-get', (_, key) => store.get(key));
ipcMain.handle('settings-set', (_, key, value) => store.set(key, value));
ipcMain.handle('settings-delete', (_, key) => store.delete(key));

// ── IPC : Licence ───────────────────────────────────────────────
ipcMain.handle('license-get-status', () => getLicenseStatus());
ipcMain.handle('license-activate', (_, key) => {
  if (!validateLicenseKey(key)) return { success: false, error: 'Clé invalide' };
  store.set('licenseKey', key.replace(/[-\s]/g,'').toUpperCase());
  return { success: true };
});
ipcMain.handle('license-get-key', () => store.get('licenseKey') || null);
ipcMain.handle('is-owner', () => IS_OWNER_BUILD);

// ── IPC : Sauvegarde dossier synchronisé ────────────────
ipcMain.handle('dialog-open-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Choisir un dossier de sauvegarde automatique'
  });
  if (result.canceled || !result.filePaths.length) return null;
  return result.filePaths[0];
});

ipcMain.handle('save-backup-file', async (_, folderPath, fileName, content) => {
  try {
    const filePath = require('path').join(folderPath, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true, filePath };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// ── IPC : Mises à jour ──────────────────────────────────
ipcMain.handle('check-for-update', () => {
  try { autoUpdater.checkForUpdates(); } catch(e) { return { error: e.message }; }
});
ipcMain.on('install-update', () => autoUpdater.quitAndInstall());

// ── IPC : Claude AI ─────────────────────────────────────────────
ipcMain.handle('ai-chat', async (_, messages) => {
  const apiKey = store.get('anthropicApiKey');
  if (!apiKey) {
    return { error: 'Clé API non configurée. Allez dans Paramètres pour l\'ajouter.' };
  }

  console.log('Clé utilisée (5 premiers chars):', apiKey.substring(0, 10) + '...');
  try {
    const AnthropicModule = require('@anthropic-ai/sdk');
    const Anthropic = AnthropicModule.default || AnthropicModule;
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `Tu es un assistant expert en réparation pour ${store.get('userCompany')||'un atelier de réparation'}.
Tu aides le technicien à diagnostiquer les pannes et trouver les bonnes pièces dans ces domaines :
- Informatique & mobile (PC, Mac, iPhone, Android, tablettes)
- Téléviseurs (dalles LCD/OLED, cartes alimentation, T-Con, main board)
- Consoles de jeux (PS4, PS5, Xbox, Nintendo Switch — lecteurs, ventilateurs, écrans, joy-cons)
- Trottinettes électriques (batteries, contrôleurs, moteurs roue, écrans)
Réponds toujours en français, de façon concise et pratique.
Quand tu identifies des pièces à chercher, mets-les en évidence avec le format **NOM_PIECE**.
Suggère les fournisseurs pertinents parmi : Utopya, Brico-Phone, Mobilesentrix, Jensmobiles, ASWO, Amazon, AliExpress, GSMCheap, Uni-Android.`,
      messages
    });

    return { content: response.content[0].text };
  } catch (err) {
    console.error('Erreur API Claude:', err.status, err.message);
    return { error: `${err.status || ''} — ${err.message}` };
  }
});
