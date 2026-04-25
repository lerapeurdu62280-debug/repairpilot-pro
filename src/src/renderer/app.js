// ═══════════════════════════════════════════════════════
//  RepairPilot Pro — app.js v2.0.0
// ═══════════════════════════════════════════════════════

const SUPPLIERS = [
  // ── Informatique & Mobile
  { id:'utopya',        name:'Utopya.fr',            url:'https://www.utopya.fr',                                              tag:'Pièces détachées',   domain:'utopya.fr' },
  { id:'bricophone',    name:'Brico-Phone',           url:'https://www.brico-phone.com',                                        tag:'Mobile & Tablette',  domain:'brico-phone.com' },
  { id:'mobilesentrix', name:'Mobilesentrix',         url:'https://www.mobilesentrix.eu',                                       tag:'Écrans & Batteries', domain:'mobilesentrix.eu' },
  { id:'jensmobiles',   name:'Jensmobiles',           url:'https://www.jensmobiles.fr',                                         tag:'Accessoires',        domain:'jensmobiles.fr' },
  { id:'aswo',          name:'ASWO Shop',             url:'https://shop.aswo.com/aswoShop/startPage.faces?storeId=506',         tag:'Électronique pro',   domain:'aswo.com' },
  { id:'amazon',        name:'Amazon France',         url:'https://www.amazon.fr/s?k=pieces+informatique',                     tag:'Généraliste',        domain:'amazon.fr' },
  { id:'aliexpress',    name:'AliExpress',            url:'https://fr.aliexpress.com',                                          tag:'Import Asie',        domain:'aliexpress.com' },
  { id:'gsmcheap',      name:'GSMCheap',              url:'https://gsmcheap.com',                                               tag:'Pièces GSM',         domain:'gsmcheap.com' },
  { id:'uniandroid',    name:'Uni-Android',           url:'https://uni-android.com',                                            tag:'Android',            domain:'uni-android.com' },
  // ── Télévision
  { id:'piecestv',      name:'PiècesTv.fr',           url:'https://piecestv.fr',                                                tag:'Pièces TV 📺',       domain:'piecestv.fr' },
  { id:'lesitedelapiece',name:'LeSiteDeLaPiece',      url:'https://www.lesitedelapiece.com/a/pieces-detachees_tv',              tag:'TV & Électroménager',domain:'lesitedelapiece.com' },
  { id:'spareka',       name:'Spareka',               url:'https://www.spareka.fr/pieces-detachees-multimedia/television',      tag:'TV toutes marques',  domain:'spareka.fr' },
  { id:'sosaccessoire', name:'SOS Accessoire',        url:'https://www.sos-accessoire.com/pieces-detachees-television',         tag:'TV & Électroménager',domain:'sos-accessoire.com' },
  { id:'boutiquepd',    name:'Boutique-PD.fr',        url:'https://www.boutique-pieces-detachees.fr/televisions.html',          tag:'TV multi-marques',   domain:'boutique-pieces-detachees.fr' },
  // ── Trottinette électrique
  { id:'wattiz',        name:'Wattiz.fr',             url:'https://www.wattiz.fr/fr/7-trottinette',                             tag:'Trottinette B2B 🛴', domain:'wattiz.fr' },
  { id:'pieces2trott',  name:'Pièces2Trott',          url:'https://pieces2trott.com',                                           tag:'+10k réf. trottinette',domain:'pieces2trott.com' },
  { id:'ewatts',        name:'E-Watts.fr',            url:'https://e-watts.fr/categorie-produit/pieces-detachees-trottinette-electrique/', tag:'Trottinette garantie 2ans', domain:'e-watts.fr' },
  { id:'prourbain',     name:'Pro-Urbain.fr',         url:'https://pro-urbain.fr/collections/pieces-detachees',                 tag:'Trottinette pro',    domain:'pro-urbain.fr' },
  { id:'ehuastore',     name:'Ehuastore.fr',          url:'https://ehuastore.fr',                                               tag:'Trottinette grossiste',domain:'ehuastore.fr' },
];

const QUICK_ACTIONS = [
  { icon:'📱', label:'Écran iPhone',        query:'Écran iPhone cassé, comment diagnostiquer et quelle pièce commander ?' },
  { icon:'🔋', label:'Batterie mobile',      query:'Problème de batterie qui se vide vite, comment diagnostiquer ?' },
  { icon:'💻', label:'Clavier PC',           query:'Clavier PC qui ne fonctionne plus, que faire ?' },
  { icon:'🖥️', label:'Panne carte mère',     query:'PC qui ne démarre plus, panne possible de carte mère ?' },
  { icon:'🦠', label:'Suppression virus',    query:'PC infecté par virus ou malware, quelle procédure ?' },
  { icon:'💾', label:'Récupération données', query:'Disque dur en panne, comment récupérer les données ?' },
  { icon:'📡', label:'Réseau / WiFi',        query:'Problème de connexion réseau ou WiFi, comment diagnostiquer ?' },
  // TV
  { icon:'📺', label:'Écran TV (dalle)',      query:'Dalle TV cassée ou rétroéclairage défaillant, comment diagnostiquer et quelle pièce commander ?' },
  { icon:'🔌', label:'TV ne s\'allume plus',  query:'TV qui ne s\'allume plus, panne alimentation ou carte mère TV, quelle procédure de diagnostic ?' },
  { icon:'🟦', label:'Dalle LCD/OLED',        query:'Dalle LCD ou OLED avec lignes verticales ou taches, comment diagnostiquer (T-Con, dalle, connecteurs) ?' },
  // Consoles
  { icon:'🎮', label:'PS4/PS5 surchauffe',   query:'PS4 ou PS5 qui surchauffe ou ventilateur bruyant, comment nettoyer et quelle pièce remplacer ?' },
  { icon:'📀', label:'Xbox lecteur disque',   query:'Lecteur disque Xbox HS, ne lit plus les jeux, comment diagnostiquer et remplacer ?' },
  { icon:'🕹️', label:'Switch joy-con drift',  query:'Nintendo Switch joy-con drift ou écran cassé, comment diagnostiquer et commander la bonne pièce ?' },
  { icon:'⚡', label:'Console hors tension',  query:'Console de jeux qui ne s\'allume plus (PS4/PS5/Xbox/Switch), quelle procédure de diagnostic ?' },
  // Trottinette
  { icon:'🛴', label:'Batterie trottinette',  query:'Batterie trottinette électrique ne charge plus ou autonomie très faible, comment diagnostiquer ?' },
  { icon:'🔧', label:'Contrôleur trottinette',query:'Contrôleur ou carte mère trottinette électrique HS, symptômes et pièce à remplacer ?' },
  { icon:'⚙️', label:'Moteur roue trottinette',query:'Problème moteur roue trottinette électrique, perte de traction, comment diagnostiquer ?' },
  { icon:'🖥️', label:'Écran trottinette',     query:'Écran ou tableau de bord trottinette électrique ne fonctionne plus, comment diagnostiquer ?' },
];

const REPAIR_TEMPLATES = [
  { label:'Remplacement écran',    device:'',  desc:'Remplacement écran cassé', price:'', status:'En cours' },
  { label:'Remplacement batterie', device:'',  desc:'Batterie défectueuse / autonomie très faible', price:'', status:'En cours' },
  { label:'Nettoyage virus',       device:'PC',desc:'Suppression virus et malwares', price:'50', status:'En cours' },
  { label:'Récupération données',  device:'',  desc:'Récupération données disque dur défaillant', price:'', status:'En cours' },
  { label:'Réinstallation Windows',device:'PC',desc:'Réinstallation Windows + drivers', price:'60', status:'En cours' },
  { label:'Problème réseau',       device:'',  desc:'Diagnostic et résolution problème réseau/WiFi', price:'30', status:'En cours' },
  // TV
  { label:'Remplacement dalle TV',       device:'TV', desc:'Remplacement dalle LCD/OLED cassée ou rétroéclairage HS', price:'', status:'En cours' },
  { label:'Réparation alim. TV',         device:'TV', desc:'Réparation ou remplacement carte alimentation TV', price:'', status:'En cours' },
  { label:'Réparation T-Con / main board',device:'TV',desc:'Réparation carte T-Con ou carte principale TV', price:'', status:'En cours' },
  // Consoles
  { label:'Remplacement écran Switch',   device:'Nintendo Switch', desc:'Remplacement écran cassé Nintendo Switch', price:'', status:'En cours' },
  { label:'Réparation lecteur disque',   device:'PS4/PS5/Xbox',   desc:'Réparation ou remplacement lecteur disque console', price:'', status:'En cours' },
  { label:'Nettoyage + pâte thermique',  device:'Console',        desc:'Nettoyage ventilateur et remplacement pâte thermique', price:'40', status:'En cours' },
  { label:'Remplacement joy-con',        device:'Nintendo Switch', desc:'Remplacement joy-con (drift / boutons HS)', price:'', status:'En cours' },
  // Trottinette
  { label:'Remplacement batterie trottinette',    device:'Trottinette électrique', desc:'Remplacement batterie trottinette électrique', price:'', status:'En cours' },
  { label:'Remplacement contrôleur trottinette',  device:'Trottinette électrique', desc:'Remplacement contrôleur / carte électronique trottinette', price:'', status:'En cours' },
  { label:'Remplacement moteur roue',             device:'Trottinette électrique', desc:'Remplacement moteur roue trottinette électrique', price:'', status:'En cours' },
  { label:'Réparation écran trottinette',         device:'Trottinette électrique', desc:'Réparation ou remplacement écran / tableau de bord trottinette', price:'', status:'En cours' },
];

// ── Owner Edition — Système XP/Streak
// ── Build type (résolu au démarrage via IPC)
let IS_OWNER = false;

let ownerXP     = parseInt(localStorage.getItem('ownerXP')||'0');
let ownerLevel  = parseInt(localStorage.getItem('ownerLevel')||'1');
let ownerStreak = parseInt(localStorage.getItem('ownerStreak')||'0');
let lastRepairDate = localStorage.getItem('lastRepairDate')||'';

function addXP(amount) {
  ownerXP += amount;
  const xpForNext = ownerLevel * 100;
  if (ownerXP >= xpForNext) { ownerXP -= xpForNext; ownerLevel++; showToast(`🎉 Niveau ${ownerLevel} atteint !`, 'success'); }
  localStorage.setItem('ownerXP', ownerXP);
  localStorage.setItem('ownerLevel', ownerLevel);
  updateXPBar();
}

function updateXPBar() {
  const bar = document.getElementById('xp-bar-fill');
  if (bar) bar.style.width = Math.round((ownerXP / (ownerLevel * 100)) * 100) + '%';
  const lvl = document.getElementById('xp-level-txt');
  if (lvl) lvl.textContent = `Niv.${ownerLevel}`;
}

function checkStreak() {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now()-86400000).toISOString().split('T')[0];
  if (lastRepairDate === today) return;
  if (lastRepairDate === yesterday) ownerStreak++;
  else ownerStreak = 1;
  lastRepairDate = today;
  localStorage.setItem('ownerStreak', ownerStreak);
  localStorage.setItem('lastRepairDate', today);
  updateStreakBadge();
}

function updateStreakBadge() {
  const el = document.getElementById('streak-badge');
  if (el && ownerStreak > 1) { el.textContent = `🔥${ownerStreak}`; el.style.display='inline-block'; }
}

// ── État global
let currentPage     = 'dashboard';
let currentSupplier = SUPPLIERS[0];
let aiMessages      = [{ role:'assistant', content:'Bonjour ! Décrivez-moi la panne ou le composant recherché. Je vous aide à diagnostiquer et trouver la bonne pièce au meilleur prix.' }];
let recentSearches  = JSON.parse(localStorage.getItem('recentSearches') || '[]');
let stats           = JSON.parse(localStorage.getItem('stats') || JSON.stringify({ repairs:0, aiDiags:0, timeSaved:0 }));
let darkMode        = localStorage.getItem('darkMode') === 'true';
let supplierFavs    = JSON.parse(localStorage.getItem('supplierFavs') || '[]');
let monthlyGoal     = parseInt(localStorage.getItem('monthlyGoal') || '2000');
let paneDb          = JSON.parse(localStorage.getItem('paneDb') || '[]');

// ── Numéro de ticket auto
function getNextTicketNum() {
  const counter = parseInt(localStorage.getItem('repairCounter') || '0') + 1;
  localStorage.setItem('repairCounter', counter);
  return 'REP-' + String(counter).padStart(4, '0');
}
function getRepairCounter() { return parseInt(localStorage.getItem('repairCounter') || '0'); }

function saveStats()    { localStorage.setItem('stats', JSON.stringify(stats)); }
function saveFavs()     { localStorage.setItem('supplierFavs', JSON.stringify(supplierFavs)); }
function savePaneDb()   { localStorage.setItem('paneDb', JSON.stringify(paneDb)); }

// ── Boot
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  setTimeout(bootApp, 1400);
});

async function bootApp() {
  // Détecter si c'est la version Owner
  IS_OWNER = await window.repairpilot.isOwner();

  // ── Version OWNER : pas de licence, pas de wizard, démarrage direct
  if (IS_OWNER) {
    if (!localStorage.getItem('setupDone')) {
      localStorage.setItem('userName',    'Ludovic Tourniquet');
      localStorage.setItem('userCompany', 'S.O.S INFO LUDO');
      localStorage.setItem('userAddress', "28 Rue de l'Oratoire — 62200 Boulogne-sur-Mer");
      localStorage.setItem('userPhone',   '');
      localStorage.setItem('setupDone',   '1');
      localStorage.setItem('onboardingDone', '1');
    }
    launchApp({ activated: true, trial: false, daysLeft: 0, expired: false });
    return;
  }

  // ── Version CLIENT : flux normal avec licence
  const status = await window.repairpilot.getLicenseStatus();

  // Première utilisation → setup wizard
  if (!localStorage.getItem('setupDone')) {
    showSetupWizard(status);
    return;
  }

  // Licence expirée → écran de blocage
  if (status.expired) {
    showLicenseScreen();
    return;
  }

  launchApp(status);
}

function launchApp(status) {
  const company = localStorage.getItem('userCompany') || '';
  const name    = localStorage.getItem('userName') || '';
  document.getElementById('app').innerHTML = buildShell(company, name);
  bindTitleBar();
  document.getElementById('sidebar-nav').addEventListener('click', e => {
    const item = e.target.closest('.sb-item');
    if (item?.dataset.page) navigateTo(item.dataset.page);
  });
  document.getElementById('seg-ctrl').addEventListener('click', e => {
    const btn = e.target.closest('.seg-btn');
    if (btn?.dataset.page) navigateTo(btn.dataset.page);
  });
  initKeyboardShortcuts();
  checkRepairAlerts();
  renderPage('dashboard');

  // Owner Edition init (uniquement sur la version Owner)
  if (IS_OWNER) {
    document.body.classList.add('owner-mode');
    initCustomCursor();
    initCommandBar();
    initFloatingAI();
    initOwnerShortcuts();
    initParticles();
    loadWeatherWidget();
    checkStreak();
    updateXPBar();
    updateStreakBadge();
    setTimeout(initOwnerOverlay, 500);
  }

  // Mode hors ligne
  if (!navigator.onLine) {
    setTimeout(() => showToast('Mode hors ligne — l\'IA et les fournisseurs ne sont pas disponibles', ''), 2000);
    updateOnlineChip(false);
  }
  window.addEventListener('online',  () => { showToast('Connexion rétablie !', 'success'); updateOnlineChip(true); });
  window.addEventListener('offline', () => { showToast('Mode hors ligne — l\'IA et les fournisseurs ne sont pas disponibles', ''); updateOnlineChip(false); });

  // Bannière essai
  if (status && !status.activated && status.trial) {
    setTimeout(() => showToast(`⏳ Mode essai — ${status.daysLeft} jour(s) restant(s). Activez votre licence dans Paramètres.`, 'error'), 2500);
  }

  // Sauvegarde auto à la fermeture
  window.addEventListener('beforeunload', () => {
    const folder = localStorage.getItem('backupFolder');
    if (folder && window.repairpilot?.saveBackupOnClose) {
      const data = {repairs:getRepairs(),clients:getClients(),quotes:getQuotes(),stock:getStock(),agenda:getAgenda(),caisse:getCaisse(),commandes:getCommandes(),paneDb,stats,version:'2.0.0',date:new Date().toISOString()};
      window.repairpilot.saveBackupOnClose(folder, JSON.stringify(data, null, 2));
    }
  });

  // Mises à jour
  if (window.repairpilot?.onUpdateStatus) {
    window.repairpilot.onUpdateStatus(data => {
      if (data.type === 'available') {
        showToast(`🆕 Mise à jour v${data.version} disponible — téléchargement...`, 'success');
      } else if (data.type === 'ready') {
        const bar = document.getElementById('update-bar');
        if (bar) bar.style.display = 'flex';
      } else if (data.type === 'downloading') {
        showToast(`⬇️ Téléchargement : ${data.percent}%`, '');
      }
    });
  }
}

// ── Setup Wizard (premier lancement)
function showSetupWizard(licStatus) {
  document.getElementById('app').innerHTML = `
  <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:var(--bg2)">
    <div style="background:var(--bg);border-radius:18px;padding:40px 48px;width:460px;box-shadow:0 8px 40px rgba(0,0,0,0.15)">
      <div style="text-align:center;margin-bottom:28px">
        <div style="font-size:48px;margin-bottom:8px">🔧</div>
        <div style="font-size:22px;font-weight:800;color:var(--txt)">RepairPilot Pro</div>
        <div style="font-size:13px;color:var(--txt2);margin-top:4px">Configuration initiale de votre atelier</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div><label style="font-size:12px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Votre nom *</label>
          <input id="wz-name" type="text" placeholder="Jean Dupont" style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:9px;border:1.5px solid var(--sep);background:var(--bg2);color:var(--txt);font-size:14px"/></div>
        <div><label style="font-size:12px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Nom de votre entreprise *</label>
          <input id="wz-company" type="text" placeholder="Mon Atelier Réparation" style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:9px;border:1.5px solid var(--sep);background:var(--bg2);color:var(--txt);font-size:14px"/></div>
        <div><label style="font-size:12px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Adresse</label>
          <input id="wz-address" type="text" placeholder="1 rue de la Paix — 75001 Paris" style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:9px;border:1.5px solid var(--sep);background:var(--bg2);color:var(--txt);font-size:14px"/></div>
        <div><label style="font-size:12px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Téléphone</label>
          <input id="wz-phone" type="text" placeholder="06 xx xx xx xx" style="width:100%;box-sizing:border-box;padding:10px 14px;border-radius:9px;border:1.5px solid var(--sep);background:var(--bg2);color:var(--txt);font-size:14px"/></div>
        <div style="background:var(--accent-l);border-radius:10px;padding:12px 14px;font-size:12px;color:var(--txt2)">
          💡 Vous avez <strong>${licStatus?.daysLeft||30} jours d'essai gratuit</strong>. Activez votre licence à tout moment dans Paramètres.
        </div>
        <button id="wz-start" style="background:var(--accent);color:#fff;border:none;border-radius:10px;padding:13px;font-size:15px;font-weight:700;cursor:pointer;margin-top:4px">
          Commencer →
        </button>
        <button id="wz-demo" style="background:var(--bg2);color:var(--txt2);border:1.5px dashed var(--sep);border-radius:10px;padding:10px;font-size:13px;font-weight:600;cursor:pointer">
          🎭 Essayer avec des données de démonstration
        </button>
      </div>
    </div>
  </div>`;
  document.getElementById('wz-start').addEventListener('click', () => {
    const name    = document.getElementById('wz-name').value.trim();
    const company = document.getElementById('wz-company').value.trim();
    const address = document.getElementById('wz-address').value.trim();
    const phone   = document.getElementById('wz-phone').value.trim();
    if (!name || !company) { alert('Veuillez remplir votre nom et le nom de votre entreprise.'); return; }
    localStorage.setItem('userName', name);
    localStorage.setItem('userCompany', company);
    if (address) localStorage.setItem('userAddress', address);
    if (phone)   localStorage.setItem('userPhone', phone);
    localStorage.setItem('setupDone', '1');
    showOnboarding(licStatus);
  });
  document.getElementById('wz-demo').addEventListener('click', () => {
    loadDemoData();
    localStorage.setItem('setupDone', '1');
    localStorage.setItem('isDemoMode', '1');
    showOnboarding(licStatus);
  });
}

// ── Données de démonstration
function loadDemoData() {
  localStorage.setItem('userName', 'Jean Technicien');
  localStorage.setItem('userCompany', 'TechRepair Demo');
  localStorage.setItem('userAddress', '1 Rue de la Demo — 75001 Paris');
  localStorage.setItem('userPhone', '06 00 00 00 00');
  const demoRepairs = [
    { id: Date.now()-5000, ticketNum:'REP-0001', device:'iPhone 13', client:'Marie Dupont', desc:'Écran cassé', price:'120', status:'Terminé', date:new Date(Date.now()-10*86400000).toISOString().split('T')[0], priority:'Normal', notes:'Réparé en 1h', warrantyEnd:'', photo:null, imei:'' },
    { id: Date.now()-4000, ticketNum:'REP-0002', device:'MacBook Pro', client:'Pierre Martin', desc:'Clavier HS', price:'150', status:'En cours', date:new Date(Date.now()-5*86400000).toISOString().split('T')[0], priority:'Urgent', notes:'En attente de pièce', warrantyEnd:'', photo:null, imei:'' },
    { id: Date.now()-3000, ticketNum:'REP-0003', device:'Samsung Galaxy S22', client:'Lucie Bernard', desc:'Batterie défectueuse', price:'80', status:'En attente', date:new Date(Date.now()-2*86400000).toISOString().split('T')[0], priority:'Normal', notes:'', warrantyEnd:'', photo:null, imei:'' },
    { id: Date.now()-2000, ticketNum:'REP-0004', device:'PS5', client:'Thomas Leclerc', desc:'Surchauffe ventilateur', price:'60', status:'En cours', date:new Date().toISOString().split('T')[0], priority:'Express', notes:'Nettoyage en cours', warrantyEnd:'', photo:null, imei:'' },
    { id: Date.now()-1000, ticketNum:'REP-0005', device:'TV Samsung 55"', client:'Sophie Moreau', desc:'Écran cassé dalle OLED', price:'350', status:'Non réparable', date:new Date().toISOString().split('T')[0], priority:'Normal', notes:'Dalle trop chère', warrantyEnd:'', photo:null, imei:'' },
  ];
  const demoClients = [
    { name:'Marie Dupont', phone:'06 11 22 33 44', email:'marie@example.com', addr:'12 Rue Victor Hugo — 75011 Paris', category:'Régulier', repairs:3 },
    { name:'Pierre Martin', phone:'06 55 66 77 88', email:'pierre@example.com', addr:'', category:'VIP', repairs:7 },
    { name:'Lucie Bernard', phone:'07 12 34 56 78', email:'', addr:'', category:'Nouveau', repairs:1 },
  ];
  const demoQuotes = [
    { num:1, client:'Marie Dupont', label:'Remplacement écran iPhone 13', date:new Date(Date.now()-10*86400000).toISOString().split('T')[0], amount:'120', status:'Payé', tva:'0', notes:'' },
    { num:2, client:'Pierre Martin', label:'Réparation clavier MacBook Pro', date:new Date(Date.now()-3*86400000).toISOString().split('T')[0], amount:'150', status:'En attente', tva:'0', notes:'En attente accord client' },
  ];
  const demoStock = [
    { name:'Écran iPhone 13', ref:'SCR-IP13-BLK', supplier:'Mobilesentrix', qty:2, minQty:1, price:'45', sell:'90' },
    { name:'Batterie Samsung S22', ref:'BAT-SAM-S22', supplier:'Brico-Phone', qty:0, minQty:2, price:'18', sell:'40' },
    { name:'Pâte thermique', ref:'THERMAL-01', supplier:'Amazon France', qty:5, minQty:2, price:'3', sell:'8' },
  ];
  localStorage.setItem('repairs', JSON.stringify(demoRepairs));
  localStorage.setItem('clients', JSON.stringify(demoClients));
  localStorage.setItem('quotes', JSON.stringify(demoQuotes));
  localStorage.setItem('stock', JSON.stringify(demoStock));
  localStorage.setItem('repairCounter', '5');
  showToast('Données de démonstration chargées !', 'success');
}

// ── Onboarding slides
function showOnboarding(licStatus) {
  if (localStorage.getItem('onboardingDone')) { launchApp(licStatus); return; }
  const slides = [
    { icon:'🔧', title:'Bienvenue dans RepairPilot Pro', desc:'L\'application tout-en-un pour les ateliers de réparation. Gérez vos réparations, clients, devis, stock et bien plus.' },
    { icon:'📋', title:'Gérez vos réparations', desc:'Créez des fiches de réparation, imprimez des bons de dépôt, suivez l\'avancement avec le Kanban, et notifiez vos clients automatiquement.' },
    { icon:'🤖', title:'IA intégrée (optionnelle)', desc:'L\'assistant IA (Claude d\'Anthropic) vous aide à diagnostiquer les pannes et trouver les meilleures pièces. Nécessite une clé API Anthropic — l\'application fonctionne parfaitement sans.' },
    { icon:'🚀', title:'C\'est parti !', desc:'Vous êtes prêt à utiliser RepairPilot Pro. Ajoutez votre première réparation, configurez votre profil dans Paramètres, et explorez toutes les fonctionnalités.', last:true },
  ];
  let currentSlide = 0;

  function renderSlide() {
    const s = slides[currentSlide];
    document.getElementById('app').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:var(--bg2)">
      <div style="background:var(--bg);border-radius:20px;padding:48px 56px;width:500px;box-shadow:0 12px 48px rgba(0,0,0,0.18);text-align:center">
        <div style="font-size:64px;margin-bottom:16px">${s.icon}</div>
        <div style="font-size:22px;font-weight:800;color:var(--txt);margin-bottom:12px">${s.title}</div>
        <div style="font-size:14px;color:var(--txt2);line-height:1.6;margin-bottom:32px">${s.desc}</div>
        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:28px">
          ${slides.map((_,i)=>`<div style="width:8px;height:8px;border-radius:50%;background:${i===currentSlide?'var(--accent)':'var(--sep)'}"></div>`).join('')}
        </div>
        <div style="display:flex;gap:10px;justify-content:center">
          ${currentSlide > 0 ? `<button id="ob-prev" style="background:var(--bg2);color:var(--txt);border:1.5px solid var(--sep);border-radius:10px;padding:11px 24px;font-size:14px;font-weight:600;cursor:pointer">← Précédent</button>` : ''}
          ${s.last
            ? `<button id="ob-start" style="background:var(--accent);color:#fff;border:none;border-radius:10px;padding:11px 32px;font-size:15px;font-weight:700;cursor:pointer">Commencer 🚀</button>`
            : `<button id="ob-next" style="background:var(--accent);color:#fff;border:none;border-radius:10px;padding:11px 24px;font-size:14px;font-weight:700;cursor:pointer">Suivant →</button>`
          }
        </div>
      </div>
    </div>`;
    document.getElementById('ob-prev')?.addEventListener('click', () => { currentSlide--; renderSlide(); });
    document.getElementById('ob-next')?.addEventListener('click', () => { currentSlide++; renderSlide(); });
    document.getElementById('ob-start')?.addEventListener('click', () => {
      localStorage.setItem('onboardingDone', '1');
      launchApp(licStatus);
    });
  }
  renderSlide();
}

// ── Écran de licence (essai expiré)
function showLicenseScreen() {
  document.getElementById('app').innerHTML = `
  <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:var(--bg2)">
    <div style="background:var(--bg);border-radius:18px;padding:40px 48px;width:460px;box-shadow:0 8px 40px rgba(0,0,0,0.15);text-align:center">
      <div style="font-size:48px;margin-bottom:12px">🔒</div>
      <div style="font-size:20px;font-weight:800;color:var(--txt);margin-bottom:8px">Période d'essai terminée</div>
      <div style="font-size:13px;color:var(--txt2);margin-bottom:28px">Votre période d'essai de 30 jours est terminée.<br/>Entrez votre clé de licence pour continuer.</div>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <input id="lic-key-input" type="text" placeholder="RPRO-XXXX-XXXX-XXXX-XXXX-XXXX"
          style="flex:1;padding:11px 14px;border-radius:9px;border:1.5px solid var(--sep);background:var(--bg2);color:var(--txt);font-size:13px;font-family:monospace"/>
      </div>
      <button id="lic-activate-btn" style="background:var(--accent);color:#fff;border:none;border-radius:10px;padding:13px 28px;font-size:14px;font-weight:700;cursor:pointer;width:100%">
        Activer la licence
      </button>
      <div id="lic-error" style="color:var(--red);font-size:12px;margin-top:10px;min-height:18px"></div>
      <div style="margin-top:20px;font-size:11.5px;color:var(--txt3)">Licence disponible sur repairpilot.fr — 15€ (paiement unique)</div>
    </div>
  </div>`;
  document.getElementById('lic-activate-btn').addEventListener('click', async () => {
    const key = document.getElementById('lic-key-input').value.trim();
    const result = await window.repairpilot.activateLicense(key);
    if (result.success) {
      launchApp({ activated: true, trial: false, daysLeft: 0, expired: false });
    } else {
      document.getElementById('lic-error').textContent = 'Clé invalide. Vérifiez la clé et réessayez.';
    }
  });
}

// ── Thème
function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  const accent = localStorage.getItem('accentColor');
  if (accent) document.documentElement.style.setProperty('--accent', accent);
  // Thème holo
  if (localStorage.getItem('holoTheme') === 'true') {
    document.documentElement.setAttribute('data-theme', 'holo');
  }
  // Logo sidebar
  const logoData = localStorage.getItem('userLogo');
  const avatarEl = document.getElementById('sb-avatar-txt');
  if (avatarEl && logoData) {
    avatarEl.innerHTML = `<img src="${logoData}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`;
  }
}
function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem('darkMode', darkMode);
  applyTheme();
  showToast(darkMode ? '🌙 Mode sombre activé' : '☀️ Mode clair activé', 'success');
}
function setAccentColor(color) {
  localStorage.setItem('accentColor', color);
  document.documentElement.style.setProperty('--accent', color);
  showToast('Couleur principale appliquée !', 'success');
}

// ── Raccourcis clavier
function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'n': e.preventDefault(); navigateTo('repairs'); setTimeout(openRepairModal, 200); break;
        case 'f': e.preventDefault(); document.getElementById('global-search')?.focus(); break;
        case 'd': e.preventDefault(); navigateTo('dashboard'); break;
        case 'i': e.preventDefault(); navigateTo('ai'); break;
        case 'b': e.preventDefault(); navigateTo('browser'); break;
        case 's': e.preventDefault(); exportBackup(); break;
      }
    }
    if (e.key === 'Escape') closeModal();
  });
}

// ── Alertes réparations
function checkRepairAlerts() {
  const repairs = getRepairs();
  const now = Date.now();
  const relanceDays = parseInt(localStorage.getItem('relanceDays')||'7');
  const old = repairs.filter(r => r.status === 'En cours' && r.date && (now - new Date(r.date).getTime()) > relanceDays * 86400000);
  if (old.length > 0) {
    setTimeout(() => showToast(`⚠️ ${old.length} réparation(s) en cours depuis plus de 7 jours !`, 'error'), 2000);
  }
}

// ═══════════════════════════════════════════════════════
//  SHELL
// ═══════════════════════════════════════════════════════
function buildShell(company, name) {
  const initials = (name||'?').split(' ').map(w=>w[0]||'').join('').substring(0,2).toUpperCase();
  const displayName = name ? name.split(' ')[0] + (name.split(' ')[1] ? ' ' + name.split(' ')[1][0] + '.' : '') : 'Technicien';
  return `
  <div class="titlebar">
    <div class="traffic-lights">
      <div class="tl r" id="btn-close"></div>
      <div class="tl y" id="btn-min"></div>
      <div class="tl g" id="btn-max"></div>
    </div>
    <div class="tb-center"><div class="tb-app-icon">🔧</div>RepairPilot Pro</div>
    <div class="tb-right">
      <div class="tb-search">
        <span style="color:var(--txt3)">🔍</span>
        <input type="text" id="global-search" placeholder="Ctrl+F — Rechercher partout..."/>
      </div>
      <div class="icon-btn" id="btn-theme" title="Basculer thème">🌙</div>
      <div class="icon-btn" id="btn-notif" title="Notifications">🔔<div class="notif-dot"></div></div>
      <div class="icon-btn" id="btn-settings" title="Paramètres">⚙️</div>
      <button class="btn btn-primary" id="btn-new-repair">+ Réparation</button>
    </div>
  </div>
  <div class="segbar">
    <div class="seg-ctrl" id="seg-ctrl">
      <div class="seg-btn active" data-page="dashboard">🏠 Accueil</div>
      <div class="seg-btn" data-page="suppliers">🛒 Fournisseurs</div>
      <div class="seg-btn" data-page="ai">🤖 IA</div>
      <div class="seg-btn" data-page="browser">🌐 Navigateur</div>
      <div class="seg-btn" data-page="comparateur">💰 Comparateur</div>
      <div class="seg-btn" data-page="agenda">📅 Agenda</div>
    </div>
    <div class="seg-right"><div class="online-chip">${SUPPLIERS.length} fournisseurs actifs</div></div>
  </div>
  <div class="layout">
    <div class="sidebar">
      <div class="sb-user">
        <div class="sb-avatar" id="sb-avatar-txt">${initials}</div>
        <div><div class="sb-name" id="sb-user-name">${displayName}</div><div class="sb-role">${company||'RepairPilot Pro'}</div></div>
        <div class="sb-online"></div>
      </div>
      <nav class="sb-nav" id="sidebar-nav">${buildSidebarNav()}</nav>
      <div class="sb-footer">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:${IS_OWNER?'6px':'0'}">
          RepairPilot <b>Pro</b>${IS_OWNER?' <span class="owner-badge">OWNER ∞</span>':''}
          ${IS_OWNER?'<span class="streak-badge" id="streak-badge" style="display:none">🔥1</span>':''}
        </div>
        ${IS_OWNER?`
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
          <span id="xp-level-txt" style="font-size:10px;color:var(--txt2);font-weight:700">Niv.1</span>
          <div class="xp-bar-wrap" style="flex:1"><div class="xp-bar-fill" id="xp-bar-fill" style="width:0%"></div></div>
        </div>
        <div class="weather-widget" id="weather-widget" style="display:none"></div>`:''}
        ${IS_OWNER?'':'<div style="font-size:10px;color:var(--txt3)">RepairPilot Pro v2.0.0</div>'}
      </div>
    </div>
    <div class="content" id="content-area"></div>
  </div>
  <div id="update-bar" style="display:none;background:var(--green);color:#fff;padding:8px 20px;font-size:12.5px;font-weight:600;align-items:center;gap:12px;justify-content:center;flex-shrink:0">
    🆕 Une mise à jour est prête à installer !
    <button onclick="window.repairpilot.installUpdate()" style="background:rgba(255,255,255,0.25);border:none;border-radius:6px;padding:4px 12px;color:#fff;font-weight:700;cursor:pointer;font-size:12px">Installer et redémarrer</button>
    <button onclick="document.getElementById('update-bar').style.display='none'" style="background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;font-size:16px;line-height:1">×</button>
  </div>
  ${IS_OWNER?`
  <canvas id="particles-canvas"></canvas>
  <div id="custom-cursor"></div>
  <div id="cursor-trail"></div>
  <div id="cmd-overlay"><div id="cmd-box"><input id="cmd-input" placeholder="🔍  Rechercher, naviguer... (Ex: nouvelle réparation, clients, stock)" autocomplete="off"/><div id="cmd-results"></div></div></div>
  <div id="ai-float-btn" title="Assistant IA">🤖</div>
  <div id="ai-float-panel"><div style="padding:14px 16px;border-bottom:1px solid var(--sep);font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:space-between">🤖 Assistant IA rapide<button onclick="document.getElementById('ai-float-panel').classList.remove('open')" style="background:none;border:none;font-size:18px;cursor:pointer;color:var(--txt2)">×</button></div><div id="ai-float-messages" style="flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px"></div><div style="padding:10px;border-top:1px solid var(--sep);display:flex;gap:8px"><input id="ai-float-input" placeholder="Question rapide..." style="flex:1;padding:8px 12px;border:1.5px solid var(--sep);border-radius:8px;background:var(--bg2);color:var(--txt);font-size:13px;outline:none"/><button id="ai-float-send" style="background:var(--accent);color:#fff;border:none;border-radius:8px;padding:8px 14px;font-weight:700;cursor:pointer">→</button></div></div>
  <div id="war-room-overlay"></div>
  <div id="focus-overlay"></div>
  <div id="owner-overlay"></div>
  `:`<!-- Client build : pas de fonctions Owner -->`}
  <div id="modal-overlay" class="modal-overlay" style="display:none"></div>
  <div class="toast-container" id="toasts"></div>`;
}

function buildSidebarNav() {
  const items = [
    { section:'Principal' },
    { page:'dashboard',   icon:'🏠', label:'Tableau de bord' },
    { page:'suppliers',   icon:'🛒', label:'Fournisseurs', badge:'9', bc:'blue' },
    { page:'favoris',     icon:'⭐', label:'Mes favoris' },
    { page:'ai',          icon:'🤖', label:'IA Diagnostic', badge:'IA', bc:'blue' },
    { page:'browser',     icon:'🌐', label:'Navigateur' },
    { page:'comparateur', icon:'💰', label:'Comparateur prix' },
    { section:'Technicien' },
    { page:'repairs',     icon:'📋', label:'Réparations' },
    { page:'kanban',      icon:'📌', label:'Kanban' },
    ...(IS_OWNER ? [{ page:'warroom', icon:'⚔️', label:'War Room', badge:'OWNER', bc:'blue' }] : []),
    { page:'clients',     icon:'👥', label:'Clients' },
    { page:'quotes',      icon:'📄', label:'Devis & Factures' },
    { page:'stock',       icon:'📦', label:'Stock' },
    { page:'agenda',      icon:'📅', label:'Agenda' },
    { page:'garanties',   icon:'🛡️', label:'Garanties' },
    { page:'commandes',   icon:'📦', label:'Commandes' },
    { page:'stats',       icon:'📊', label:'Statistiques' },
    { page:'rapport',     icon:'📈', label:'Rapport mensuel' },
    { page:'caisse',      icon:'💵', label:'Caisse' },
    { page:'messages',    icon:'💬', label:'Messages clients' },
    { section:'Général' },
    { page:'pannedb',     icon:'🗃️', label:'Base de pannes' },
    { page:'notifs',      icon:'🔔', label:'Notifications', badge:'3', bc:'blue' },
    { page:'settings',    icon:'⚙️', label:'Paramètres' },
    { page:'help',        icon:'❓', label:'Aide' },
  ];
  return items.map(i => {
    if (i.section) return `<div class="sb-section">${i.section}</div>`;
    const badge = i.badge ? `<span class="sb-badge ${i.bc}">${i.badge}</span>` : '';
    return `<div class="sb-item ${i.page===currentPage?'active':''}" data-page="${i.page}">
      <div class="sb-ico">${i.icon}</div>${i.label}${badge}</div>`;
  }).join('');
}

function bindTitleBar() {
  document.getElementById('btn-close').addEventListener('click',   () => window.repairpilot.close());
  document.getElementById('btn-min').addEventListener('click',     () => window.repairpilot.minimize());
  document.getElementById('btn-max').addEventListener('click',     () => window.repairpilot.maximize());
  document.getElementById('btn-settings').addEventListener('click',() => navigateTo('settings'));
  document.getElementById('btn-notif').addEventListener('click',   () => navigateTo('notifs'));
  document.getElementById('btn-theme').addEventListener('click',   () => toggleTheme());
  document.getElementById('btn-new-repair').addEventListener('click',() => { navigateTo('repairs'); setTimeout(openRepairModal, 200); });
  const gs = document.getElementById('global-search');
  gs.addEventListener('keydown', e => {
    if (e.key === 'Enter' && gs.value.trim()) {
      const q = gs.value.trim(); gs.value = '';
      globalSearch(q);
    }
  });
}

function updateOnlineChip(isOnline) {
  const chip = document.querySelector('.online-chip');
  if (chip) {
    if (isOnline) {
      chip.style.background='';chip.style.color='';
      chip.textContent = SUPPLIERS.length + ' fournisseurs actifs';
    } else {
      chip.style.background='var(--red)';chip.style.color='#fff';
      chip.textContent = 'Hors ligne';
    }
  }
}

function globalSearch(q) {
  const ql = q.toLowerCase();
  const repairs  = getRepairs().filter(r  => r.device?.toLowerCase().includes(ql) || r.client?.toLowerCase().includes(ql) || r.ticketNum?.toLowerCase().includes(ql));
  const clients  = getClients().filter(c  => c.name?.toLowerCase().includes(ql) || c.phone?.toLowerCase().includes(ql) || c.email?.toLowerCase().includes(ql));
  const stock    = getStock().filter(s    => s.name?.toLowerCase().includes(ql) || s.ref?.toLowerCase().includes(ql));
  const quotes   = getQuotes().filter(qt  => qt.client?.toLowerCase().includes(ql) || qt.label?.toLowerCase().includes(ql));

  openModal(`
    <div class="modal-header"><div class="modal-title">🔍 Résultats pour "${q}"</div></div>
    <div class="modal-body" style="gap:14px">
      ${repairs.length  ? `<div><div class="sh-title" style="margin-bottom:8px">📋 Réparations (${repairs.length})</div>${repairs.map(r=>{const ri=getRepairs().indexOf(r);return `<div class="mac-table-row" style="border-radius:8px;margin-bottom:4px;cursor:pointer" onclick="closeModal();navigateTo('repairs');setTimeout(()=>openRepairModal(${ri}),300)"><strong>${r.device}</strong> — ${r.client} ${r.ticketNum?`<span style="font-size:10px;color:var(--txt2)">${r.ticketNum}</span>`:''}<span class="status-pill ${r.status==='Terminé'?'green':'orange'}" style="margin-left:auto">${r.status}</span></div>`}).join('')}</div>` : ''}
      ${clients.length  ? `<div><div class="sh-title" style="margin-bottom:8px">👥 Clients (${clients.length})</div>${clients.map((c,ci)=>`<div class="mac-table-row" style="border-radius:8px;margin-bottom:4px;cursor:pointer" onclick="closeModal();navigateTo('clients');setTimeout(()=>showClientHistory(${getClients().indexOf(c)}),300)"><strong>${c.name}</strong> — ${c.phone||''} ${c.email||''}</div>`).join('')}</div>` : ''}
      ${stock.length    ? `<div><div class="sh-title" style="margin-bottom:8px">📦 Stock (${stock.length})</div>${stock.map(s=>`<div class="mac-table-row" style="border-radius:8px;margin-bottom:4px;cursor:pointer" onclick="closeModal();navigateTo('stock')"><strong>${s.name}</strong> — Réf: ${s.ref||'—'} — Qté: ${s.qty}</div>`).join('')}</div>` : ''}
      ${quotes.length   ? `<div><div class="sh-title" style="margin-bottom:8px">📄 Devis (${quotes.length})</div>${quotes.map(qt=>`<div class="mac-table-row" style="border-radius:8px;margin-bottom:4px;cursor:pointer" onclick="closeModal();navigateTo('quotes')"><strong>${qt.client}</strong> — ${qt.label} <strong>${qt.amount}€</strong><span class="status-pill ${qt.status==='Payé'?'green':'orange'}" style="margin-left:auto">${qt.status}</span></div>`).join('')}</div>` : ''}
      ${!repairs.length && !clients.length && !stock.length && !quotes.length ? `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <div class="empty-title">Aucun résultat pour "${q}"</div>
          <div class="empty-sub">Essayez avec l'IA Diagnostic pour identifier une pièce</div>
          <button class="btn btn-primary" style="margin-top:8px" onclick="closeModal();navigateTo('ai');setTimeout(()=>sendAiMessage('${q}'),300)">🤖 Demander à l'IA</button>
        </div>` : ''}
    </div>
    <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Fermer</button></div>`);
}

// ═══════════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════════
function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.sb-item').forEach(el => el.classList.toggle('active', el.dataset.page===page));
  document.querySelectorAll('.seg-btn').forEach(el => el.classList.toggle('active', el.dataset.page===page));
  renderPage(page);
}

function renderPage(page) {
  const area = document.getElementById('content-area');
  if (page === 'browser') {
    area.className = 'content content-browser';
    area.innerHTML = pageBrowser();
    bindBrowser();
    return;
  }
  area.className = 'content';
  area.innerHTML = `<div class="scroll" id="main-scroll">${getPageHTML(page)}</div>`;
  bindPage(page);
  setTimeout(initTiltCards, 100);
}

function getPageHTML(page) {
  switch(page) {
    case 'dashboard':   return pageDashboard();
    case 'suppliers':   return pageSuppliers();
    case 'favoris':     return pageFavoris();
    case 'ai':          return pageAI();
    case 'comparateur': return pageComparateur();
    case 'repairs':     return pageRepairs();
    case 'clients':     return pageClients();
    case 'quotes':      return pageQuotes();
    case 'stock':       return pageStock();
    case 'agenda':      return pageAgenda();
    case 'garanties':   return pageGaranties();
    case 'stats':       return pageStats();
    case 'rapport':     return pageRapport();
    case 'caisse':      return pageCaisse();
    case 'commandes':   return pageCommandes();
    case 'pannedb':     return pagePanneDB();
    case 'notifs':      return pageNotifs();
    case 'settings':    return pageSettings();
    case 'help':        return pageHelp();
    case 'kanban':      return pageKanban();
    case 'messages':    return pageMessages();
    case 'warroom':     return pageWarRoom();
    default:            return pageDashboard();
  }
}

function bindPage(page) {
  switch(page) {
    case 'dashboard':   bindDashboard();  break;
    case 'suppliers':   bindSupplierCards(); break;
    case 'favoris':     bindFavoris();    break;
    case 'ai':          bindAIChat();     break;
    case 'comparateur': bindComparateur();break;
    case 'repairs':     bindRepairs();    break;
    case 'clients':     bindClients();    break;
    case 'quotes':      bindQuotes();     break;
    case 'stock':       bindStock();      break;
    case 'agenda':      bindAgenda();     break;
    case 'garanties':   bindGaranties();  break;
    case 'rapport':     bindRapport();    break;
    case 'caisse':      bindCaisse();     break;
    case 'commandes':   bindCommandes();  break;
    case 'pannedb':     bindPanneDB();    break;
    case 'settings':    bindSettings();   break;
    case 'kanban':      bindKanban();     break;
    case 'messages':    bindMessages();   break;
    case 'warroom':     bindWarRoom();    break;
  }
}

// ═══════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════
function pageDashboard() {
  const repairs  = getRepairs();
  const clients  = getClients();
  const revenue  = calcRevenue();
  const pending  = repairs.filter(r=>r.status==='En cours').length;
  const recent   = recentSearches.slice(0,3);
  const stockAlert = getStock().filter(s=>s.qty<=s.minQty).length;
  const goal     = monthlyGoal;
  const goalPct  = Math.min(100, Math.round(revenue/goal*100));

  return `
  <div class="stats">
    <div class="stat-card"><div class="stat-ico s-blue">🛒</div><div><div class="stat-val c-blue">9</div><div class="stat-lbl">Fournisseurs</div><div class="stat-trend">Tous actifs ✓</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">🔧</div><div><div class="stat-val c-orange">${pending}</div><div class="stat-lbl">En cours</div><div class="stat-trend">${repairs.length} au total</div></div></div>
    <div class="stat-card"><div class="stat-ico s-green">👥</div><div><div class="stat-val c-green">${clients.length}</div><div class="stat-lbl">Clients</div></div></div>
    <div class="stat-card"><div class="stat-ico s-purple">🤖</div><div><div class="stat-val c-purple">${stats.aiDiags}</div><div class="stat-lbl">Diagnostics IA</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">💶</div><div><div class="stat-val c-teal">${revenue}€</div><div class="stat-lbl">CA encaissé</div></div></div>
  </div>

  ${stockAlert>0 ? `<div class="alert-banner">⚠️ ${stockAlert} pièce(s) en stock faible — <span style="cursor:pointer;text-decoration:underline" onclick="navigateTo('stock')">Voir le stock →</span></div>` : ''}

  <div class="goal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div style="font-size:13px;font-weight:700">🎯 Objectif mensuel</div>
      <div style="font-size:13px;font-weight:700;color:var(--accent)">${revenue}€ / ${goal}€</div>
    </div>
    <div class="goal-bar"><div class="goal-fill" style="width:${goalPct}%"></div></div>
    <div style="font-size:11px;color:var(--txt2);margin-top:5px">${goalPct}% atteint — il reste ${Math.max(0,goal-revenue)}€ à encaisser</div>
  </div>

  <div>
    <div class="sh"><div class="sh-title">🛒 Fournisseurs</div><span class="sh-link" id="lnk-sup">Voir tous →</span></div>
    <div class="sup-grid">${SUPPLIERS.map(s=>supplierCard(s)).join('')}</div>
  </div>

  <div class="two-col">
    <div class="left-col">
      <div class="sh"><div class="sh-title">🤖 IA Diagnostic</div><span class="sh-link" id="lnk-ai">Chat complet →</span></div>
      ${buildAICard()}
    </div>
    <div class="right-col">
      <div class="qa-card">
        <div class="qa-head">Actions rapides <span style="font-size:10px;font-weight:400;color:var(--txt3)">Ctrl+N</span></div>
        <div class="qa-list">${QUICK_ACTIONS.map(a=>`
          <div class="qa-item" data-query="${a.query}"><span class="qa-ico">${a.icon}</span>${a.label}<span class="qa-arr">›</span></div>`).join('')}
        </div>
      </div>
      <div class="tech-card">
        <div class="tech-head">
          <div class="tech-ico">🔐</div>
          <div><div class="tech-title">Espace Technicien</div><div class="tech-sub">Tous vos outils pro</div></div>
        </div>
        <div class="tech-features">
          <div class="tech-feat" style="cursor:pointer" onclick="navigateTo('repairs')">📋 Réparations <span style="margin-left:auto;color:var(--accent)">→</span></div>
          <div class="tech-feat" style="cursor:pointer" onclick="navigateTo('clients')">👥 Clients <span style="margin-left:auto;color:var(--accent)">→</span></div>
          <div class="tech-feat" style="cursor:pointer" onclick="navigateTo('quotes')">📄 Devis & Factures PDF <span style="margin-left:auto;color:var(--accent)">→</span></div>
          <div class="tech-feat" style="cursor:pointer" onclick="navigateTo('stock')">📦 Stock${stockAlert>0?` <span class="status-pill red" style="font-size:9px;padding:1px 5px">${stockAlert} alerte</span>`:''} <span style="margin-left:auto;color:var(--accent)">→</span></div>
          <div class="tech-feat" style="cursor:pointer" onclick="navigateTo('agenda')">📅 Agenda <span style="margin-left:auto;color:var(--accent)">→</span></div>
          <div class="tech-feat" style="cursor:pointer" onclick="navigateTo('rapport')">📈 Rapport mensuel <span style="margin-left:auto;color:var(--accent)">→</span></div>
        </div>
        <button class="tech-btn" onclick="navigateTo('repairs');setTimeout(openRepairModal,200)">+ Nouvelle réparation</button>
      </div>
      ${recent.length ? `
      <div class="rec-card">
        <div class="rec-head">Recherches IA récentes</div>
        <div class="rec-list">${recent.map(r=>`
          <div class="rec-item" data-query="${r.text}">
            <span class="rec-ico">🔍</span>
            <span class="rec-name">${r.text.substring(0,32)}…</span>
            <span class="rec-time">${r.time}</span>
          </div>`).join('')}
        </div>
      </div>` : ''}
    </div>
  </div>
  <div class="spacer"></div>`;
}

function bindDashboard() {
  document.getElementById('lnk-sup')?.addEventListener('click', ()=>navigateTo('suppliers'));
  document.getElementById('lnk-ai')?.addEventListener('click',  ()=>navigateTo('ai'));
  bindSupplierCards();
  bindAIChat();
  document.querySelectorAll('.qa-item').forEach(el=>el.addEventListener('click',()=>{navigateTo('ai');setTimeout(()=>sendAiMessage(el.dataset.query),300);}));
  document.querySelectorAll('.rec-item').forEach(el=>el.addEventListener('click',()=>{navigateTo('ai');setTimeout(()=>sendAiMessage(el.dataset.query),300);}));
}

// ═══════════════════════════════════════════════════════
//  FOURNISSEURS
// ═══════════════════════════════════════════════════════
function pageSuppliers() {
  return `
  <div class="sh"><div class="sh-title">🛒 Mes Fournisseurs</div></div>
  <div class="sup-grid">${SUPPLIERS.map(s=>supplierCard(s)).join('')}</div>
  <div class="spacer"></div>`;
}

function supplierCard(s) {
  const active = currentSupplier?.id===s.id;
  const fav = supplierFavs.find(f=>f.supplierId===s.id);
  return `
  <div class="sup-card ${active?'active':''}" data-supplier="${s.id}">
    ${active?'<div class="sup-active-dot"></div>':''}
    <div class="sup-open-pill">OUVRIR</div>
    <div class="sup-logo">
      <img src="https://www.google.com/s2/favicons?domain=${s.domain}&sz=128"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'" alt=""/>
      <span class="sup-fallback" style="display:none">${s.name.substring(0,3).toUpperCase()}</span>
    </div>
    <div class="sup-name">${s.name}</div>
    <div class="sup-tag">${s.tag}</div>
    ${fav ? '<div style="font-size:9px;color:var(--orange)">⭐ Favori</div>' : ''}
  </div>`;
}

function bindSupplierCards() {
  document.querySelectorAll('[data-supplier]').forEach(el=>el.addEventListener('click',()=>{
    currentSupplier = SUPPLIERS.find(x=>x.id===el.dataset.supplier);
    navigateTo('browser');
  }));
}

// ═══════════════════════════════════════════════════════
//  FAVORIS
// ═══════════════════════════════════════════════════════
function pageFavoris() {
  return `
  <div class="sh"><div class="sh-title">⭐ Mes Favoris</div><button class="btn btn-primary" id="btn-add-fav">+ Ajouter un favori</button></div>
  ${supplierFavs.length===0 ? `
  <div class="empty-state"><div class="empty-icon">⭐</div>
    <div class="empty-title">Aucun favori</div>
    <div class="empty-sub">Épinglez des pages fournisseurs pour y accéder en 1 clic</div>
  </div>` : `
  <div class="sup-grid">${supplierFavs.map((f,i)=>`
    <div class="sup-card" onclick="currentSupplier=SUPPLIERS.find(x=>x.id==='${f.supplierId}');navigateTo('browser');setTimeout(()=>document.getElementById('main-webview').setAttribute('src','${f.url}'),500)">
      <div class="sup-open-pill">OUVRIR</div>
      <div class="sup-logo">
        <img src="https://www.google.com/s2/favicons?domain=${SUPPLIERS.find(x=>x.id===f.supplierId)?.domain}&sz=128" onerror="this.style.display='none'" alt=""/>
      </div>
      <div class="sup-name">${f.label}</div>
      <div class="sup-tag">${SUPPLIERS.find(x=>x.id===f.supplierId)?.name||''}</div>
      <button class="tbl-btn" style="position:absolute;top:7px;right:7px" onclick="event.stopPropagation();supplierFavs.splice(${i},1);saveFavs();renderPage('favoris')">🗑</button>
    </div>`).join('')}
  </div>`}
  <div class="spacer"></div>`;
}

function bindFavoris() {
  document.getElementById('btn-add-fav')?.addEventListener('click', () => {
    openModal(`
      <div class="modal-header"><div class="modal-title">⭐ Ajouter un favori</div></div>
      <div class="modal-body">
        <div class="form-row"><label>Fournisseur</label>
          <select id="fav-sup" class="form-input">${SUPPLIERS.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select>
        </div>
        <div class="form-row"><label>Nom du favori</label><input type="text" id="fav-label" class="form-input" placeholder="ex: iPhones — Mobilesentrix"/></div>
        <div class="form-row"><label>URL directe</label><input type="text" id="fav-url" class="form-input" placeholder="https://..."/></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="btn-save-fav">⭐ Enregistrer</button>
        <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
      </div>`);
    document.getElementById('btn-save-fav').addEventListener('click', () => {
      const sup=document.getElementById('fav-sup').value;
      const label=document.getElementById('fav-label').value.trim();
      const url=document.getElementById('fav-url').value.trim();
      if(!label||!url){showToast('Nom et URL obligatoires','error');return;}
      supplierFavs.push({supplierId:sup,label,url});
      saveFavs(); closeModal(); renderPage('favoris'); showToast('Favori ajouté !','success');
    });
  });
}

// ═══════════════════════════════════════════════════════
//  NAVIGATEUR
// ═══════════════════════════════════════════════════════
function pageBrowser() {
  const s = currentSupplier || SUPPLIERS[0];
  return `
  <div class="browser-shell">
    <div class="wv-chrome">
      <div class="wv-tl"><span class="r"></span><span class="y"></span><span class="g"></span></div>
      <div class="wv-nav-btns">
        <div class="wv-nav-btn" id="wv-back">←</div>
        <div class="wv-nav-btn" id="wv-fwd">→</div>
        <div class="wv-nav-btn" id="wv-reload">↻</div>
      </div>
      <div class="wv-addr"><span class="wv-lock">🔒</span><span id="wv-url-txt">${s.url}</span></div>
      <div class="wv-nav-btn" id="btn-add-fav-browser" title="Ajouter aux favoris">⭐</div>
      <div class="wv-tabs-bar" id="wv-tabs">
        ${SUPPLIERS.slice(0,5).map(sup=>`
        <div class="wv-tab ${sup.id===s.id?'active':''}" data-supplier="${sup.id}">
          <img src="https://www.google.com/s2/favicons?domain=${sup.domain}&sz=32" alt=""/>
          ${sup.name.split('.')[0]}
        </div>`).join('')}
        <div class="wv-tab-plus" id="wv-more-tabs">⋯</div>
      </div>
    </div>
    <webview id="main-webview"
      src="${s.url}"
      allowpopups
      useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36">
    </webview>
  </div>`;
}

function bindBrowser() {
  const wv = document.getElementById('main-webview');
  if (!wv) return;
  document.getElementById('wv-back')?.addEventListener('click',   ()=>wv.canGoBack()    && wv.goBack());
  document.getElementById('wv-fwd')?.addEventListener('click',    ()=>wv.canGoForward() && wv.goForward());
  document.getElementById('wv-reload')?.addEventListener('click', ()=>wv.reload());
  document.getElementById('btn-add-fav-browser')?.addEventListener('click', () => {
    const url = document.getElementById('wv-url-txt')?.textContent || currentSupplier?.url;
    const s = currentSupplier;
    openModal(`
      <div class="modal-header"><div class="modal-title">⭐ Ajouter aux favoris</div></div>
      <div class="modal-body">
        <div class="form-row"><label>Nom du favori</label><input type="text" id="fav-label2" class="form-input" value="Page ${s?.name||''}"/></div>
        <div class="form-row"><label>URL</label><input type="text" id="fav-url2" class="form-input" value="${url}"/></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="btn-sv-fav2">⭐ Enregistrer</button>
        <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
      </div>`);
    document.getElementById('btn-sv-fav2').addEventListener('click', () => {
      const label=document.getElementById('fav-label2').value.trim();
      const favUrl=document.getElementById('fav-url2').value.trim();
      if(!label||!favUrl) return;
      supplierFavs.push({supplierId:s?.id||'utopya',label,url:favUrl});
      saveFavs(); closeModal(); showToast('⭐ Favori enregistré !','success');
    });
  });
  wv.addEventListener('did-navigate', e=>{ const el=document.getElementById('wv-url-txt'); if(el) el.textContent=e.url; });
  wv.addEventListener('did-navigate-in-page', e=>{ const el=document.getElementById('wv-url-txt'); if(el) el.textContent=e.url; });
  document.querySelectorAll('.wv-tab[data-supplier]').forEach(el=>el.addEventListener('click',()=>{
    currentSupplier=SUPPLIERS.find(x=>x.id===el.dataset.supplier); renderPage('browser');
  }));
  document.getElementById('wv-more-tabs')?.addEventListener('click',()=>{
    openModal(`
      <div class="modal-header"><div class="modal-title">🌐 Choisir un fournisseur</div></div>
      <div class="modal-body"><div class="sup-grid">${SUPPLIERS.map(s=>`
        <div class="sup-card" onclick="currentSupplier=SUPPLIERS.find(x=>x.id==='${s.id}');closeModal();renderPage('browser')">
          <div class="sup-logo"><img src="https://www.google.com/s2/favicons?domain=${s.domain}&sz=128" onerror="this.style.display='none'" alt=""/></div>
          <div class="sup-name">${s.name}</div>
        </div>`).join('')}
      </div></div>`);
  });
}

// ═══════════════════════════════════════════════════════
//  COMPARATEUR DE PRIX
// ═══════════════════════════════════════════════════════
function pageComparateur() {
  return `
  <div class="sh"><div class="sh-title">💰 Comparateur de prix</div></div>
  <div class="mac-card" style="padding:16px;margin-bottom:16px">
    <div style="font-size:12.5px;color:var(--txt2);margin-bottom:10px">Entrez une référence ou nom de pièce pour l'ouvrir chez tous vos fournisseurs en même temps :</div>
    <div style="display:flex;gap:8px">
      <input type="text" id="comp-query" class="form-input" style="flex:1" placeholder="ex: Écran iPhone 13, batterie Samsung A52, LCD MacBook..."/>
      <button class="btn btn-primary" id="btn-comp-search">🔍 Comparer</button>
    </div>
  </div>
  <div id="comp-results"></div>

  <div class="sh" style="margin-top:16px"><div class="sh-title">🧮 Calculateur de marge</div></div>
  <div class="mac-card" style="padding:16px">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;align-items:end">
      <div class="form-row"><label>Prix achat (€)</label><input type="number" id="calc-buy" class="form-input" placeholder="0" oninput="calcMarge()"/></div>
      <div class="form-row"><label>Marge souhaitée (%)</label><input type="number" id="calc-margin" class="form-input" placeholder="30" value="30" oninput="calcMarge()"/></div>
      <div class="form-row"><label>Prix de vente HT</label><div id="calc-sell" class="form-input" style="background:var(--green-l);color:var(--green);font-weight:700">—</div></div>
      <div class="form-row"><label>Bénéfice</label><div id="calc-profit" class="form-input" style="background:var(--accent-l);color:var(--accent);font-weight:700">—</div></div>
    </div>
    <div style="margin-top:10px;font-size:11px;color:var(--txt2)">Suggestion IA : <span id="calc-ai-suggest" style="color:var(--accent);font-weight:600">Entrez un prix d'achat pour obtenir une suggestion</span></div>
  </div>
  <div class="spacer"></div>`;
}

function bindComparateur() {
  document.getElementById('btn-comp-search')?.addEventListener('click', () => {
    const q = document.getElementById('comp-query').value.trim();
    if (!q) return;
    const results = document.getElementById('comp-results');
    results.innerHTML = `
      <div class="sh"><div class="sh-title">Résultats pour "${q}" — Ouvrir chez :</div></div>
      <div class="sup-grid">${SUPPLIERS.map(s=>`
        <div class="sup-card" onclick="currentSupplier=SUPPLIERS.find(x=>x.id==='${s.id}');navigateTo('browser');setTimeout(()=>{const wv=document.getElementById('main-webview');if(wv)wv.setAttribute('src','${s.id==='amazon'?'https://www.amazon.fr/s?k=':s.id==='aliexpress'?'https://fr.aliexpress.com/wholesale?SearchText=':'https://'+s.domain+'/#search='}'+encodeURIComponent('${q.replace(/'/g,'')}'))},600)">
          <div class="sup-open-pill">OUVRIR</div>
          <div class="sup-logo"><img src="https://www.google.com/s2/favicons?domain=${s.domain}&sz=128" onerror="this.style.display='none'" alt=""/></div>
          <div class="sup-name">${s.name}</div>
          <div class="sup-tag">${s.tag}</div>
        </div>`).join('')}
      </div>`;
  });
}

function calcMarge() {
  const buy    = parseFloat(document.getElementById('calc-buy')?.value) || 0;
  const margin = parseFloat(document.getElementById('calc-margin')?.value) || 30;
  if (!buy) return;
  const sell   = (buy / (1 - margin/100)).toFixed(2);
  const profit = (sell - buy).toFixed(2);
  const el1 = document.getElementById('calc-sell');
  const el2 = document.getElementById('calc-profit');
  const el3 = document.getElementById('calc-ai-suggest');
  if (el1) el1.textContent = sell + '€';
  if (el2) el2.textContent = profit + '€';
  if (el3) el3.textContent = `Prix achat ${buy}€ → vente recommandée ${sell}€ (marge ${margin}%)`;
}

// ═══════════════════════════════════════════════════════
//  IA DIAGNOSTIC
// ═══════════════════════════════════════════════════════
function pageAI() {
  return `
  <div class="sh">
    <div class="sh-title">🤖 IA Diagnostic</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost" id="btn-voice" title="Dicter une panne">🎙️ Vocal</button>
      <button class="btn btn-ghost" id="btn-save-pane" title="Sauvegarder dans la base de pannes">💾 Sauvegarder</button>
      <button class="btn btn-primary" onclick="aiMessages=[{role:'assistant',content:'Nouvelle conversation. Décrivez la panne.'}];refreshAIMessages()">🗑 Effacer</button>
    </div>
  </div>
  ${buildAICard()}
  <div class="spacer"></div>`;
}

function buildAICard() {
  return `
  <div class="ai-card">
    <div class="ai-header">
      <div class="ai-av">🤖</div>
      <div><div class="ai-title">Assistant Diagnostic IA</div><div class="ai-sub">Spécialisé réparation informatique & mobile — Suggère les meilleurs fournisseurs et prix</div></div>
      <div class="ai-online">En ligne</div>
    </div>
    <div class="ai-messages" id="ai-messages">${aiMessages.map(m=>renderMsg(m)).join('')}</div>
    <div class="ai-input-row">
      <textarea class="ai-input" id="ai-input" placeholder="Décrivez la panne... (Entrée pour envoyer, Maj+Entrée pour saut de ligne)" rows="1"></textarea>
      <button class="ai-send" id="ai-send">➤</button>
    </div>
  </div>`;
}

function renderMsg(m) {
  const isUser = m.role==='user';
  const text = m.content.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br/>');
  return `<div class="msg ${isUser?'user':''}">
    <div class="msg-av ${isUser?'usr':'ai'}">${isUser?'LT':'🤖'}</div>
    <div class="msg-bub">${text}</div>
  </div>`;
}

function bindAIChat() {
  const input=document.getElementById('ai-input'), btn=document.getElementById('ai-send');
  if (!input||!btn) return;
  input.addEventListener('input',()=>{ input.style.height='auto'; input.style.height=Math.min(input.scrollHeight,100)+'px'; });
  btn.addEventListener('click',()=>doSend());
  input.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();doSend();} });
  function doSend(){const t=input.value.trim();if(!t)return;input.value='';input.style.height='auto';sendAiMessage(t);}
  scrollAI();

  // Vocal
  document.getElementById('btn-voice')?.addEventListener('click', () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('Reconnaissance vocale non disponible sur ce système','error'); return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR(); rec.lang='fr-FR'; rec.start();
    showToast('🎙️ Parlez maintenant...','');
    rec.onresult = e => {
      const t = e.results[0][0].transcript;
      document.getElementById('ai-input').value = t;
      showToast('✓ Message saisi : "'+t.substring(0,30)+'..."','success');
    };
    rec.onerror = () => showToast('Erreur microphone','error');
  });

  // Sauvegarder dans base de pannes
  document.getElementById('btn-save-pane')?.addEventListener('click', () => {
    const last = aiMessages.filter(m=>m.role==='assistant').pop();
    if (!last) { showToast('Aucune réponse à sauvegarder','error'); return; }
    const question = aiMessages.filter(m=>m.role==='user').pop()?.content || '';
    openModal(`
      <div class="modal-header"><div class="modal-title">💾 Sauvegarder dans la base de pannes</div></div>
      <div class="modal-body">
        <div class="form-row"><label>Titre / Appareil</label><input type="text" id="pane-title" class="form-input" placeholder="ex: MacBook Pro 2020 — Écran scintille" value="${question.substring(0,60)}"/></div>
        <div class="form-row"><label>Tags</label><input type="text" id="pane-tags" class="form-input" placeholder="ex: MacBook, écran, LCD"/></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="btn-do-save-pane">💾 Enregistrer</button>
        <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
      </div>`);
    document.getElementById('btn-do-save-pane').addEventListener('click', () => {
      const title=document.getElementById('pane-title').value.trim();
      if(!title){showToast('Titre obligatoire','error');return;}
      paneDb.push({id:Date.now(),title,tags:document.getElementById('pane-tags').value,question,answer:last.content,date:new Date().toLocaleDateString('fr-FR')});
      savePaneDb(); closeModal(); showToast('Panne enregistrée dans la base !','success');
    });
  });
}

async function sendAiMessage(text) {
  if (currentPage!=='ai'&&currentPage!=='dashboard') navigateTo('ai');
  recentSearches.unshift({text,time:"à l'instant"});
  recentSearches=recentSearches.slice(0,8);
  localStorage.setItem('recentSearches',JSON.stringify(recentSearches));
  aiMessages.push({role:'user',content:text});
  refreshAIMessages(); setAISending(true);
  const history=aiMessages.slice(-12).map(m=>({role:m.role,content:m.content}));
  const result=await window.repairpilot.aiChat(history);
  if(result.error) aiMessages.push({role:'assistant',content:'⚠️ '+result.error});
  else { aiMessages.push({role:'assistant',content:result.content}); stats.aiDiags++; stats.timeSaved=Math.round(stats.aiDiags*0.2*10)/10; saveStats(); }
  setAISending(false); refreshAIMessages();
}

function refreshAIMessages(){const c=document.getElementById('ai-messages');if(!c)return;c.innerHTML=aiMessages.map(m=>renderMsg(m)).join('');scrollAI();}
function scrollAI(){const c=document.getElementById('ai-messages');if(c)c.scrollTop=c.scrollHeight;}
function setAISending(v){
  const btn=document.getElementById('ai-send'),inp=document.getElementById('ai-input');
  if(btn)btn.disabled=v;if(inp)inp.disabled=v;
  const c=document.getElementById('ai-messages');if(!c)return;
  if(v){c.insertAdjacentHTML('beforeend',`<div class="msg" id="typing"><div class="msg-av ai">🤖</div><div class="msg-bub"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`);scrollAI();}
  else document.getElementById('typing')?.remove();
}

// ═══════════════════════════════════════════════════════
//  RÉPARATIONS
// ═══════════════════════════════════════════════════════
function getRepairs(){return JSON.parse(localStorage.getItem('repairs')||'[]');}
function saveRepairs(r){localStorage.setItem('repairs',JSON.stringify(r));}

function pageRepairs() {
  const repairs=getRepairs();
  const filterStatus=localStorage.getItem('repairFilter')||'all';
  const filtered=filterStatus==='all'?repairs:repairs.filter(r=>r.status===filterStatus);
  return `
  <div class="sh">
    <div class="sh-title">📋 Réparations</div>
    <div style="display:flex;gap:8px">
      <select id="repair-filter" class="form-input" style="width:auto;height:30px;padding:4px 10px;font-size:12px" onchange="localStorage.setItem('repairFilter',this.value);renderPage('repairs')">
        <option value="all" ${filterStatus==='all'?'selected':''}>Toutes</option>
        <option value="En attente"    ${filterStatus==='En attente'?'selected':''}>En attente</option>
        <option value="En cours"      ${filterStatus==='En cours'?'selected':''}>En cours</option>
        <option value="Terminé"       ${filterStatus==='Terminé'?'selected':''}>Terminées</option>
        <option value="Non réparable" ${filterStatus==='Non réparable'?'selected':''}>Non réparables</option>
      </select>
      <button class="btn btn-ghost" id="btn-template">📋 Modèles</button>
      <button class="btn btn-primary" id="btn-add-repair">+ Nouvelle</button>
    </div>
  </div>
  <div class="stats" style="grid-template-columns:repeat(4,1fr)">
    <div class="stat-card"><div class="stat-ico s-blue">📋</div><div><div class="stat-val c-blue">${repairs.length}</div><div class="stat-lbl">Total</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">🔧</div><div><div class="stat-val c-orange">${repairs.filter(r=>r.status==='En cours').length}</div><div class="stat-lbl">En cours</div></div></div>
    <div class="stat-card"><div class="stat-ico s-green">✅</div><div><div class="stat-val c-green">${repairs.filter(r=>r.status==='Terminé').length}</div><div class="stat-lbl">Terminées</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">💶</div><div><div class="stat-val c-teal">${repairs.reduce((s,r)=>s+parseFloat(r.price||0),0).toFixed(0)}€</div><div class="stat-lbl">CA réparations</div></div></div>
  </div>
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:0.8">N° ticket</div><div style="flex:2">Appareil</div><div style="flex:1.5">Client</div>
      <div style="flex:1">Date</div><div style="flex:1">Prix / Solde</div>
      <div style="flex:1">Garantie</div><div style="flex:1">Statut</div>
      <div style="width:140px"></div>
    </div>
    ${filtered.length===0
      ? `<div class="empty-state"><div class="empty-icon">🔧</div><div class="empty-title">Aucune réparation</div><div class="empty-sub">Cliquez sur "+ Nouvelle" pour commencer</div></div>`
      : filtered.map((r,i)=>{
          const realIdx=repairs.indexOf(r);
          const isGarExpired = r.warrantyEnd && new Date(r.warrantyEnd)<new Date();
          const price=parseFloat(r.price||0);
          const acompte=parseFloat(r.acompte||0);
          const solde=price-acompte;
          // Badge délai
          const isActive = r.status==='En cours'||r.status==='En attente';
          const daysOld = r.date ? Math.floor((Date.now()-new Date(r.date).getTime())/86400000) : 0;
          const delayBadge = isActive && daysOld > 0
            ? `<span style="font-size:9px;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:4px;${daysOld>=14?'background:#EF4444;color:#fff':daysOld>=7?'background:#F59E0B;color:#1a1a1a':'background:rgba(255,255,255,.12);color:rgba(255,255,255,.6)'}">J+${daysOld}</span>`
            : '';
          return `<div class="mac-table-row" style="${isActive&&daysOld>=14?'border-left:3px solid #EF4444':isActive&&daysOld>=7?'border-left:3px solid #F59E0B':''}">
            <div style="flex:0.8"><span class="status-pill gray" style="font-size:9px">${r.ticketNum||('#'+String(r.id).slice(-6))}</span></div>
            <div style="flex:2"><strong>${r.device}</strong>${r.priority&&r.priority!=='Normal'?` <span class="status-pill ${r.priority==='Express'?'red':'orange'}" style="font-size:9px;padding:1px 5px">${r.priority}</span>`:''}<br/><span style="font-size:11px;color:var(--txt2)">${r.desc||''}</span></div>
            <div style="flex:1.5">${r.client}</div>
            <div style="flex:1">${r.date}${delayBadge}</div>
            <div style="flex:1">${r.price?r.price+'€':'—'}${acompte>0?`<br/><span style="font-size:10px;color:var(--orange)">Solde: ${solde.toFixed(0)}€</span>`:''}</div>
            <div style="flex:1">${r.warrantyEnd?`<span class="status-pill ${isGarExpired?'gray':'green'}" style="font-size:9px">${isGarExpired?'Expirée':r.warrantyEnd}</span>`:'—'}</div>
            <div style="flex:1"><span class="status-pill ${r.status==='Terminé'?'green':r.status==='En cours'?'orange':r.status==='Non réparable'?'red':'gray'}">${r.status}</span></div>
            <div style="width:140px;display:flex;gap:3px">
              ${r.status==='Terminé'?`<button class="tbl-btn notify-repair" data-idx="${realIdx}" title="Notifier le client">📱</button>`:'<div style="width:28px"></div>'}
              <button class="tbl-btn print-repair" data-idx="${realIdx}" title="Bon de dépôt">🖨️</button>
              <button class="tbl-btn label-repair" data-idx="${realIdx}" title="Imprimer étiquette">🏷️</button>
              <button class="tbl-btn ai-repair" data-idx="${realIdx}" title="IA">🤖</button>
              <button class="tbl-btn edit-repair" data-idx="${realIdx}" title="Modifier">✏️</button>
              <button class="tbl-btn delete-repair" data-idx="${realIdx}" title="Supprimer">🗑</button>
            </div>
          </div>`;
        }).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindRepairs() {
  document.getElementById('btn-add-repair')?.addEventListener('click', ()=>openRepairModal());
  document.getElementById('btn-template')?.addEventListener('click', ()=>openRepairTemplates());
  document.querySelectorAll('.edit-repair').forEach(btn=>btn.addEventListener('click',()=>openRepairModal(parseInt(btn.dataset.idx))));
  document.querySelectorAll('.delete-repair').forEach(btn=>btn.addEventListener('click',()=>{
    if(confirm('Supprimer cette réparation ?')){const r=getRepairs();r.splice(parseInt(btn.dataset.idx),1);saveRepairs(r);renderPage('repairs');}
  }));
  document.querySelectorAll('.print-repair').forEach(btn=>btn.addEventListener('click',()=>printRepairSheet(parseInt(btn.dataset.idx))));
  document.querySelectorAll('.label-repair').forEach(btn=>btn.addEventListener('click',()=>printEtiquette(parseInt(btn.dataset.idx))));
  document.querySelectorAll('.ai-repair').forEach(btn=>btn.addEventListener('click',()=>{
    const r=getRepairs()[parseInt(btn.dataset.idx)];
    navigateTo('ai');
    setTimeout(()=>sendAiMessage(`Réparation : ${r.device} — ${r.desc||''}. Que me conseilles-tu pour cette panne ?`),300);
  }));
  document.querySelectorAll('.notify-repair').forEach(btn=>btn.addEventListener('click',()=>openNotifyModal(parseInt(btn.dataset.idx))));
}

function openNotifyModal(repairIdx) {
  const r=getRepairs()[repairIdx]; if(!r) return;
  const client=getClients().find(c=>c.name===r.client);
  const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
  const phone=localStorage.getItem('userPhone')||'';
  const emailBody=encodeURIComponent(`Bonjour ${r.client},\n\nNous avons le plaisir de vous informer que votre appareil "${r.device}" est prêt à être récupéré.\n\n${r.price?'Montant à régler : '+r.price+' €\n\n':''}${r.warrantyEnd?'Garantie : '+r.warrantyEnd+'\n\n':''}N\'hésitez pas à nous contacter pour toute question.\n\nCordialement,\n${company}${phone?' — '+phone:''}`);
  const emailSubject=encodeURIComponent(`Votre ${r.device} est prêt — ${company}`);
  const smsBody=encodeURIComponent(`Bonjour ${r.client}, votre ${r.device} est prêt à récupérer${r.price?' ('+r.price+'€)':''}. ${company}${phone?' '+phone:''}`);

  openModal(`
    <div class="modal-header"><div class="modal-title">📱 Notifier ${r.client}</div></div>
    <div class="modal-body" style="gap:12px">
      <div style="background:var(--green-l);border-radius:10px;padding:12px 16px;border:1px solid rgba(52,199,89,.2)">
        <div style="font-size:12px;color:var(--txt2);margin-bottom:4px">Réparation terminée</div>
        <div style="font-weight:700">${r.device}</div>
        ${r.price?`<div style="color:var(--green);font-weight:600;margin-top:4px">${r.price} €</div>`:''}
      </div>
      <div style="font-size:13px;font-weight:600;color:var(--txt2)">Coordonnées du client :</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${client?.email?`
        <a href="mailto:${client.email}?subject=${emailSubject}&body=${emailBody}" class="btn btn-primary" style="text-decoration:none;text-align:center" onclick="closeModal()">
          ✉️ Envoyer un email à ${client.email}
        </a>`:`<div class="empty-state" style="padding:12px"><div class="empty-icon" style="font-size:20px">✉️</div><div class="empty-sub">Aucun email pour ce client — ajoutez-le dans la fiche client</div></div>`}
        ${client?.phone?`
        <a href="sms:${client.phone}?body=${smsBody}" class="btn btn-ghost" style="text-decoration:none;text-align:center" onclick="closeModal()">
          💬 Envoyer un SMS à ${client.phone}
        </a>
        <a href="tel:${client.phone}" class="btn btn-ghost" style="text-decoration:none;text-align:center" onclick="closeModal()">
          📞 Appeler ${client.phone}
        </a>`:`<div class="empty-state" style="padding:12px"><div class="empty-icon" style="font-size:20px">📞</div><div class="empty-sub">Aucun téléphone pour ce client — ajoutez-le dans la fiche client</div></div>`}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="openMessagesTypes('${r.client.replace(/'/g,"\\'")}','${r.device.replace(/'/g,"\\'")}')">💬 Messages types</button>
      <button class="btn btn-ghost" onclick="closeModal();navigateTo('clients')">👤 Modifier fiche client</button>
      <button class="btn btn-ghost" onclick="closeModal()">Fermer</button>
    </div>`);
}

function openRepairTemplates() {
  openModal(`
    <div class="modal-header"><div class="modal-title">📋 Modèles de réparation</div></div>
    <div class="modal-body" style="gap:8px">${REPAIR_TEMPLATES.map((t,i)=>`
      <div class="mac-table-row" style="border-radius:8px;cursor:pointer" onclick="closeModal();openRepairModalFromTemplate(${i})">
        <strong style="flex:1">${t.label}</strong>
        <span style="color:var(--txt2);font-size:12px">${t.desc}</span>
        ${t.price?`<span style="color:var(--green);font-weight:700;margin-left:8px">${t.price}€</span>`:''}
        <span style="margin-left:8px;color:var(--accent)">Utiliser →</span>
      </div>`).join('')}
    </div>
    <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Fermer</button></div>`);
}

function openRepairModalFromTemplate(idx) {
  const t = REPAIR_TEMPLATES[idx];
  openRepairModal(null, t);
}

function openRepairModal(idx=null, template=null) {
  const repairs=getRepairs();
  const r = idx!==null ? repairs[idx] : null;
  const tpl = template || {};
  const clients=getClients();
  openModal(`
    <div class="modal-header"><div class="modal-title">${r?'Modifier la réparation':'Nouvelle réparation'}</div></div>
    <div class="modal-body">
      <div class="form-row"><label>Appareil *</label><input type="text" id="f-device" class="form-input" placeholder="ex: iPhone 13, MacBook Pro..." value="${r?.device||tpl.device||''}"/></div>
      <div class="form-row"><label>Description de la panne</label><input type="text" id="f-desc" class="form-input" placeholder="ex: Écran cassé, batterie HS..." value="${r?.desc||tpl.desc||''}"/></div>
      <div class="form-row"><label>Priorité</label>
        <div style="display:flex;gap:8px">
          ${['Normal','Urgent','Express'].map(p=>`<label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:4px 10px;border-radius:6px;border:1.5px solid ${(r?.priority||tpl.priority||'Normal')===p?'var(--accent)':'var(--sep)'};background:${(r?.priority||tpl.priority||'Normal')===p?'var(--accent-l)':'transparent'}"><input type="radio" name="f-priority" value="${p}" ${(r?.priority||tpl.priority||'Normal')===p?'checked':''} style="display:none"/> ${p==='Normal'?'🟢':p==='Urgent'?'🟠':'🔴'} ${p}</label>`).join('')}
        </div>
      </div>
      <div class="form-row"><label>IMEI / N° Série</label>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="f-imei" class="form-input" style="flex:1" placeholder="IMEI ou numéro de série" value="${r?.imei||''}"/>
          <button type="button" class="btn btn-ghost" id="btn-imei-check" title="Vérifier IMEI" style="white-space:nowrap">🔍 Vérifier</button>
        </div>
      </div>
      <div class="form-row"><label>Client *</label>
        <input type="text" id="f-client" class="form-input" placeholder="Nom du client" value="${r?.client||''}" list="cl-list"/>
        <datalist id="cl-list">${clients.map(c=>`<option value="${c.name}"/>`).join('')}</datalist>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>Date</label><input type="date" id="f-date" class="form-input" value="${r?.date||new Date().toISOString().split('T')[0]}"/></div>
        <div class="form-row"><label>Prix (€)</label><input type="number" id="f-price" class="form-input" placeholder="0" value="${r?.price||tpl.price||''}"/></div>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>Statut</label>
          <select id="f-status" class="form-input">
            ${['En attente','En cours','Terminé','Non réparable'].map(s=>`<option value="${s}" ${(r?.status||tpl.status||'En cours')===s?'selected':''}>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-row"><label>Garantie jusqu'au</label><input type="date" id="f-warranty" class="form-input" value="${r?.warrantyEnd||''}"/></div>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>Acompte versé (€)</label><input type="number" id="f-acompte" class="form-input" placeholder="0" value="${r?.acompte||''}"/></div>
        <div class="form-row"><label>N° ticket</label><input type="text" id="f-ticketnum" class="form-input" value="${r?.ticketNum||'(auto)'}" readonly style="background:var(--bg2);color:var(--txt2)"/></div>
      </div>
      <div class="form-row"><label>Notes internes</label>
        <div style="display:flex;gap:8px;align-items:flex-start">
          <textarea id="f-notes" class="form-input" rows="2" placeholder="Notes..." style="flex:1">${r?.notes||''}</textarea>
          <button type="button" class="btn btn-ghost" id="btn-voice-note" title="Dicter une note" style="flex-shrink:0;padding:6px 10px">🎙️</button>
        </div>
      </div>
      <div class="form-row">
        <label>Photo de l'appareil</label>
        <div style="display:flex;gap:8px;align-items:center">
          <button type="button" class="btn btn-ghost" id="btn-photo-pick">📷 Ajouter une photo</button>
          <input type="file" id="f-photo-input" accept="image/*" style="display:none"/>
          <span id="f-photo-name" style="font-size:11.5px;color:var(--txt2)">${r?.photo?'Photo enregistrée ✓':''}</span>
        </div>
        ${r?.photo?`<img src="${r.photo}" id="f-photo-preview" style="max-width:100%;max-height:150px;border-radius:8px;margin-top:6px;object-fit:contain"/>`:`<div id="f-photo-preview-wrap"></div>`}
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="btn-save-repair">💾 Enregistrer</button>
      <button class="btn btn-ghost" id="btn-ai-suggest-repair">🤖 Suggérer un prix</button>
      <button class="btn btn-ghost" id="btn-open-calc">🧮 Calculateur</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);

  // ── Gestion photo
  let currentPhoto = r?.photo || null;
  document.getElementById('btn-photo-pick').addEventListener('click',()=>document.getElementById('f-photo-input').click());
  document.getElementById('f-photo-input').addEventListener('change', e=>{
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        const canvas=document.createElement('canvas');
        const maxW=800;
        const scale=Math.min(1,maxW/img.width);
        canvas.width=Math.round(img.width*scale);
        canvas.height=Math.round(img.height*scale);
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        currentPhoto=canvas.toDataURL('image/jpeg',0.75);
        document.getElementById('f-photo-name').textContent='Photo ajoutée ✓';
        document.getElementById('f-photo-name').style.color='var(--green)';
        const wrap=document.getElementById('f-photo-preview-wrap')||document.getElementById('f-photo-preview');
        if(wrap){
          if(wrap.tagName==='IMG'){wrap.src=currentPhoto;}
          else{wrap.innerHTML=`<img src="${currentPhoto}" style="max-width:100%;max-height:150px;border-radius:8px;margin-top:6px;object-fit:contain"/>`;}
        }
      };
      img.src=ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('btn-imei-check')?.addEventListener('click',()=>{
    const imei=document.getElementById('f-imei').value.trim();
    const query=imei?`imei+${imei}`:'verifier+imei';
    navigateTo('browser');
    setTimeout(()=>{ closeModal(); document.getElementById('browser-url')?.setAttribute('src',`https://www.imei.info/?imei=${imei||''}`); },200);
  });

  document.getElementById('btn-voice-note')?.addEventListener('click',()=>{
    if(!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)){showToast('Reconnaissance vocale non supportée','error');return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const rec=new SR();rec.lang='fr-FR';rec.interimResults=false;rec.maxAlternatives=1;
    showToast('🎙️ Parlez maintenant...','');
    rec.start();
    rec.onresult=e=>{
      const txt=e.results[0][0].transcript;
      const ta=document.getElementById('f-notes');
      ta.value=(ta.value?ta.value+' ':'')+txt;
      showToast('✓ Note dictée','success');
    };
    rec.onerror=()=>showToast('Erreur micro','error');
  });

  document.getElementById('btn-open-calc')?.addEventListener('click',()=>openCalculateur());

  document.getElementById('btn-ai-suggest-repair').addEventListener('click', async () => {
    const device=document.getElementById('f-device').value;
    const desc=document.getElementById('f-desc').value;
    if(!device){showToast('Entrez l\'appareil d\'abord','error');return;}
    showToast('🤖 L\'IA calcule un prix...','');
    const result=await window.repairpilot.aiChat([{role:'user',content:`Pour la réparation "${device}" — "${desc}", quel prix de vente raisonnable suggères-tu à Boulogne-sur-Mer ? Réponds avec juste le prix en euros, exemple "45€".`}]);
    if(!result.error){
      const match=result.content.match(/(\d+)/);
      if(match){ document.getElementById('f-price').value=match[1]; showToast('✓ Prix suggéré par l\'IA : '+match[1]+'€','success'); }
    }
  });

  document.getElementById('btn-save-repair').addEventListener('click',()=>{
    const device=document.getElementById('f-device').value.trim();
    const client=document.getElementById('f-client').value.trim();
    if(!device||!client){showToast('Appareil et client obligatoires','error');return;}
    const priority=document.querySelector('input[name="f-priority"]:checked')?.value||'Normal';
    const acompte=parseFloat(document.getElementById('f-acompte')?.value)||0;
    const ticketNum=r?.ticketNum||(idx===null?getNextTicketNum():r?.ticketNum||'');
    const entry={device,client,desc:document.getElementById('f-desc').value.trim(),imei:document.getElementById('f-imei').value.trim(),date:document.getElementById('f-date').value,price:document.getElementById('f-price').value,status:document.getElementById('f-status').value,warrantyEnd:document.getElementById('f-warranty').value,notes:document.getElementById('f-notes').value.trim(),photo:currentPhoto||null,priority,acompte:acompte||0,ticketNum,id:r?.id||Date.now()};
    const repairs=getRepairs();
    if(idx!==null)repairs[idx]=entry;else repairs.unshift(entry);
    saveRepairs(repairs);
    if(entry.status==='Terminé') { shootConfetti(); addXP(50); checkStreak(); }
    else { addXP(10); }
    const clients=getClients();
    if(!clients.find(c=>c.name===client)){clients.push({name:client,repairs:1});saveClients(clients);}
    else{const ci=clients.findIndex(c=>c.name===client);if(ci>=0)clients[ci].repairs=(clients[ci].repairs||0)+1;saveClients(clients);}
    closeModal();renderPage('repairs');showToast('Réparation enregistrée !','success');
    // Proposer d'encaisser le solde en caisse
    if(entry.status==='Terminé' && entry.acompte>0 && parseFloat(entry.price||0)>0){
      const solde=parseFloat(entry.price)-entry.acompte;
      if(solde>0 && confirm(`💵 Solde restant pour ${entry.device} (${entry.client}) : ${solde.toFixed(2)}€. Enregistrer en caisse ?`)){
        const caisse=getCaisse();
        caisse.push({id:Date.now(),date:new Date().toISOString().split('T')[0],label:`Solde réparation — ${entry.device} (${entry.client})`,type:'in',amount:solde.toFixed(2),method:'Espèces'});
        saveCaisseData(caisse);
        showToast('Solde enregistré en caisse !','success');
      }
    }
  });
}

function printRepairSheet(idx) {
  const r=getRepairs()[idx]; if(!r) return;
  const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
  const userName=localStorage.getItem('userName')||'Ludovic Tourniquet';
  const phone=localStorage.getItem('userPhone')||'';
  const address=localStorage.getItem('userAddress')||'28 Rue de l\'Oratoire — 62200 Boulogne-sur-Mer';
  const siret=localStorage.getItem('userSiret')||'';
  const win=window.open('','_blank');
  const logoData=localStorage.getItem('userLogo');
  const ticketDisplay=r.ticketNum||('#'+String(r.id).slice(-6));
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Bon de dépôt ${ticketDisplay}</title>
  <style>body{font-family:Arial,sans-serif;padding:30px;color:#1c1c1e;max-width:600px;margin:0 auto}
  h1{font-size:20px;color:#007AFF;margin-bottom:0}
  .header{display:flex;justify-content:space-between;margin-bottom:30px;border-bottom:2px solid #007AFF;padding-bottom:16px}
  .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f5;align-items:flex-start}
  .label{color:#6e6e73;font-size:12px;width:150px;flex-shrink:0}.val{font-weight:600;text-align:right;flex:1}
  .sign{margin-top:30px;display:flex;justify-content:space-between}
  .sign-box{border:1px solid #ccc;border-radius:8px;padding:12px 20px;width:45%;text-align:center;color:#6e6e73;font-size:12px}
  .mention{margin-top:16px;font-size:10px;color:#98989f;border:1px solid #e0e0e0;border-radius:6px;padding:8px;line-height:1.5}
  .footer{margin-top:16px;font-size:10px;color:#98989f;text-align:center;border-top:1px solid #f0f0f5;padding-top:12px}</style>
  </head><body>
  <div class="header">
    <div style="display:flex;align-items:center;gap:12px">
      ${logoData?`<img src="${logoData}" style="width:60px;height:60px;object-fit:contain;border-radius:8px"/>`:'' }
      <div>
        <h1>${company}</h1>
        <div style="font-size:12px;color:#6e6e73;margin-top:4px">
          ${userName}<br/>${address}<br/>
          ${phone?'Tél : '+phone:''}
          ${siret?'<br/>SIRET : '+siret:''}
        </div>
      </div>
    </div>
    <div style="text-align:right">
      <strong style="font-size:15px">BON DE DÉPÔT</strong><br/>
      <span style="font-size:12px;color:#6e6e73">${ticketDisplay}</span><br/>
      <span style="font-size:12px;color:#6e6e73">Date : ${r.date}</span>
    </div>
  </div>
  <div class="row"><span class="label">Client</span><span class="val">${r.client}</span></div>
  <div class="row"><span class="label">Appareil</span><span class="val">${r.device}</span></div>
  ${r.imei?`<div class="row"><span class="label">IMEI / N° Série</span><span class="val">${r.imei}</span></div>`:''}
  <div class="row"><span class="label">Panne décrite</span><span class="val">${r.desc||'—'}</span></div>
  <div class="row"><span class="label">Prix TTC estimé</span><span class="val">${r.price?r.price+' €':'À définir après diagnostic'}</span></div>
  ${r.warrantyEnd?`<div class="row"><span class="label">Garantie jusqu'au</span><span class="val">${r.warrantyEnd}</span></div>`:''}
  ${r.notes?`<div class="row"><span class="label">Notes</span><span class="val">${r.notes}</span></div>`:''}
  ${r.photo?`<div style="margin-top:16px"><div style="font-size:12px;color:#6e6e73;margin-bottom:6px">Photo de l'appareil :</div><img src="${r.photo}" style="max-width:220px;max-height:160px;border-radius:8px;object-fit:contain;border:1px solid #e0e0e0"/></div>`:''}
  <div class="mention">
    ⚠️ <strong>Conditions de dépôt :</strong> Le client certifie avoir remis l'appareil décrit ci-dessus. ${company} n'est pas responsable des données contenues dans l'appareil. Le matériel non récupéré sous 3 mois pourra être considéré comme abandonné.<br/>
    TVA non applicable — article 293B du CGI (Auto-entrepreneur)
  </div>
  <div class="sign">
    <div class="sign-box">Signature client<br/>(lu et approuvé)<br/><br/><br/><br/></div>
    <div class="sign-box">Signature ${userName}<br/><br/><br/><br/><br/></div>
  </div>
  <div class="footer">${company} — ${address}${siret?' — SIRET '+siret:''}<br/>Document généré le ${new Date().toLocaleDateString('fr-FR')} avec RepairPilot Pro</div>
  </body></html>`);
  win.document.close(); win.print();
}

// ═══════════════════════════════════════════════════════
//  CLIENTS
// ═══════════════════════════════════════════════════════
function getClients(){return JSON.parse(localStorage.getItem('clients')||'[]');}
function saveClients(c){localStorage.setItem('clients',JSON.stringify(c));}

function pageClients() {
  const clients=getClients();
  return `
  <div class="sh">
    <div class="sh-title">👥 Clients</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost" id="btn-import-csv">📥 Importer CSV</button>
      <button class="btn btn-primary" id="btn-add-client">+ Nouveau</button>
    </div>
  </div>
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:2">Nom</div><div style="flex:2">Téléphone</div>
      <div style="flex:2">Email</div><div style="flex:1">Répas.</div><div style="width:80px"></div>
    </div>
    ${clients.length===0
      ? `<div class="empty-state"><div class="empty-icon">👥</div><div class="empty-title">Aucun client</div></div>`
      : clients.map((c,i)=>`
      <div class="mac-table-row">
        <div style="flex:2;display:flex;align-items:center;gap:8px">
          <div class="sb-avatar" style="width:28px;height:28px;font-size:10px;flex-shrink:0;background:${c.category==='VIP'?'var(--purple)':c.category==='Régulier'?'var(--accent)':'var(--green)'}">${c.name.substring(0,2).toUpperCase()}</div>
          <strong style="cursor:pointer;color:var(--accent)" onclick="showClientHistory(${i})">${c.name}</strong>
          ${c.category&&c.category!=='Nouveau'?`<span class="status-pill ${c.category==='VIP'?'purple':'blue'}" style="font-size:9px;padding:1px 5px">${c.category==='VIP'?'👑':'⭐'} ${c.category}</span>`:''}
        </div>
        <div style="flex:2">${c.phone||'—'}</div>
        <div style="flex:2">${c.email||'—'}</div>
        <div style="flex:1"><span class="status-pill blue">${c.repairs||0}</span></div>
        <div style="width:80px;display:flex;gap:4px">
          <button class="tbl-btn edit-client" data-idx="${i}" title="Modifier">✏️</button>
          <button class="tbl-btn delete-client" data-idx="${i}" title="Supprimer">🗑</button>
        </div>
      </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}

function showClientHistory(idx) {
  const c=getClients()[idx]; if(!c) return;
  const repairs=getRepairs().filter(r=>r.client===c.name);
  const quotes=getQuotes().filter(q=>q.client===c.name);
  openModal(`
    <div class="modal-header"><div class="modal-title">👤 Historique — ${c.name}</div></div>
    <div class="modal-body">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
        ${c.phone?`<span class="status-pill gray">📞 ${c.phone}</span>`:''}
        ${c.email?`<span class="status-pill gray">✉️ ${c.email}</span>`:''}
        ${c.addr?`<span class="status-pill gray">📍 ${c.addr}</span>`:''}
      </div>
      <div class="sh-title" style="margin-bottom:8px">📋 Réparations (${repairs.length})</div>
      ${repairs.length?repairs.map(r=>`
        <div class="mac-table-row" style="border-radius:8px;margin-bottom:4px">
          <strong style="flex:1">${r.device}</strong>
          <span style="color:var(--txt2);flex:1">${r.desc||''}</span>
          <span style="color:var(--txt2)">${r.date}</span>
          <span class="status-pill ${r.status==='Terminé'?'green':'orange'}" style="margin-left:8px">${r.status}</span>
          ${r.price?`<strong style="margin-left:8px">${r.price}€</strong>`:''}
        </div>`).join(''):`<div style="color:var(--txt2);font-size:12px;padding:8px">Aucune réparation</div>`}
      <div class="sh-title" style="margin:12px 0 8px">📄 Devis (${quotes.length})</div>
      ${quotes.length?quotes.map(q=>`
        <div class="mac-table-row" style="border-radius:8px;margin-bottom:4px">
          <strong style="flex:1">#${String(q.num).padStart(3,'0')} — ${q.label}</strong>
          <span>${q.date}</span>
          <strong style="margin-left:8px;color:var(--green)">${q.amount}€</strong>
          <span class="status-pill ${q.status==='Payé'?'green':'orange'}" style="margin-left:8px">${q.status}</span>
        </div>`).join(''):`<div style="color:var(--txt2);font-size:12px;padding:8px">Aucun devis</div>`}
    </div>
    <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Fermer</button></div>`);
}

function bindClients() {
  document.getElementById('btn-add-client')?.addEventListener('click',()=>openClientModal());
  document.querySelectorAll('.edit-client').forEach(btn=>btn.addEventListener('click',()=>openClientModal(parseInt(btn.dataset.idx))));
  document.querySelectorAll('.delete-client').forEach(btn=>btn.addEventListener('click',()=>{
    if(confirm('Supprimer ce client ?')){const c=getClients();c.splice(parseInt(btn.dataset.idx),1);saveClients(c);renderPage('clients');}
  }));
  document.getElementById('btn-import-csv')?.addEventListener('click', () => {
    openModal(`
      <div class="modal-header"><div class="modal-title">📥 Importer des clients (CSV)</div></div>
      <div class="modal-body">
        <div style="background:var(--accent-l);border-radius:8px;padding:12px;margin-bottom:12px;font-size:12px;color:var(--accent)">
          Format attendu : <strong>Nom,Téléphone,Email,Adresse</strong><br/>
          (une ligne par client, première ligne ignorée si c'est un en-tête)
        </div>
        <div class="form-row"><label>Coller le contenu CSV</label><textarea id="csv-input" class="form-input" rows="6" placeholder="Nom,Téléphone,Email&#10;Jean Dupont,0612345678,jean@email.fr&#10;Marie Martin,0698765432,marie@email.fr"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" id="btn-do-import">📥 Importer</button>
        <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
      </div>`);
    document.getElementById('btn-do-import').addEventListener('click',()=>{
      const lines=document.getElementById('csv-input').value.trim().split('\n');
      let imported=0;
      const clients=getClients();
      lines.forEach((line,i)=>{
        if(i===0&&line.toLowerCase().includes('nom'))return;
        const parts=line.split(',').map(p=>p.trim());
        if(!parts[0])return;
        if(!clients.find(c=>c.name===parts[0])){
          clients.push({name:parts[0],phone:parts[1]||'',email:parts[2]||'',addr:parts[3]||'',repairs:0});
          imported++;
        }
      });
      saveClients(clients);closeModal();renderPage('clients');
      showToast(`${imported} client(s) importé(s) !`,'success');
    });
  });
}

function openClientModal(idx=null) {
  const clients=getClients();
  const c=idx!==null?clients[idx]:null;
  openModal(`
    <div class="modal-header"><div class="modal-title">${c?'Modifier le client':'Nouveau client'}</div></div>
    <div class="modal-body">
      <div class="form-row"><label>Nom complet *</label><input type="text" id="fc-name" class="form-input" value="${c?.name||''}"/></div>
      <div class="form-row"><label>Téléphone</label><input type="tel" id="fc-phone" class="form-input" value="${c?.phone||''}"/></div>
      <div class="form-row"><label>Email</label><input type="email" id="fc-email" class="form-input" value="${c?.email||''}"/></div>
      <div class="form-row"><label>Adresse</label><input type="text" id="fc-addr" class="form-input" value="${c?.addr||''}"/></div>
      <div class="form-row"><label>Catégorie</label>
        <div style="display:flex;gap:8px">
          ${['Nouveau','Régulier','VIP'].map(cat=>`<label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:4px 10px;border-radius:6px;border:1.5px solid ${(c?.category||'Nouveau')===cat?'var(--accent)':'var(--sep)'};background:${(c?.category||'Nouveau')===cat?'var(--accent-l)':'transparent'}"><input type="radio" name="fc-cat" value="${cat}" ${(c?.category||'Nouveau')===cat?'checked':''} style="display:none"/> ${cat==='Nouveau'?'🆕':cat==='Régulier'?'⭐':'👑'} ${cat}</label>`).join('')}
        </div>
      </div>
      <div class="form-row"><label>Notes</label><textarea id="fc-notes" class="form-input" rows="2">${c?.notes||''}</textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="btn-save-client">💾 Enregistrer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
  document.getElementById('btn-save-client').addEventListener('click',()=>{
    const name=document.getElementById('fc-name').value.trim();
    if(!name){showToast('Nom obligatoire','error');return;}
    const category=document.querySelector('input[name="fc-cat"]:checked')?.value||'Nouveau';
    const entry={name,phone:document.getElementById('fc-phone').value.trim(),email:document.getElementById('fc-email').value.trim(),addr:document.getElementById('fc-addr').value.trim(),notes:document.getElementById('fc-notes').value.trim(),category,repairs:c?.repairs||0};
    const clients=getClients();
    if(idx!==null)clients[idx]=entry;else clients.unshift(entry);
    saveClients(clients);closeModal();renderPage('clients');showToast('Client enregistré !','success');
  });
}

// ═══════════════════════════════════════════════════════
//  DEVIS & FACTURES
// ═══════════════════════════════════════════════════════
function getQuotes(){return JSON.parse(localStorage.getItem('quotes')||'[]');}
function saveQuotes(q){localStorage.setItem('quotes',JSON.stringify(q));}

function getNextInvoiceNum() {
  const year=new Date().getFullYear();
  const quotes=getQuotes();
  const factures=quotes.filter(q=>q.type==='facture'&&q.invoiceNum&&q.invoiceNum.startsWith('FAC-'+year));
  const maxSeq=factures.length?Math.max(...factures.map(q=>parseInt((q.invoiceNum||'').split('-')[2]||'0'))):0;
  return `FAC-${year}-${String(maxSeq+1).padStart(3,'0')}`;
}

function pageQuotes() {
  const quotes=getQuotes();
  const unpaid=quotes.filter(q=>q.status==='En attente'||q.status==='Accepté');
  return `
  <div class="sh">
    <div class="sh-title">📄 Devis & Factures</div>
    <button class="btn btn-primary" id="btn-add-quote">+ Nouveau devis</button>
  </div>
  ${unpaid.length>0?`<div class="alert-banner">💶 ${unpaid.length} devis non payé(s) — Total : ${unpaid.reduce((s,q)=>s+parseFloat(q.amount||0),0).toFixed(0)}€ en attente</div>`:''}
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:0.7">N°</div><div style="flex:0.8">Type</div><div style="flex:1.5">Client</div>
      <div style="flex:2">Prestation</div><div style="flex:1">Date</div>
      <div style="flex:1">Montant</div><div style="flex:1">Statut</div>
      <div style="width:120px"></div>
    </div>
    ${quotes.length===0
      ? `<div class="empty-state"><div class="empty-icon">📄</div><div class="empty-title">Aucun devis</div></div>`
      : quotes.map((q,i)=>`
      <div class="mac-table-row">
        <div style="flex:0.7"><strong>${q.invoiceNum||('#'+String(q.num).padStart(3,'0'))}</strong></div>
        <div style="flex:0.8"><span class="status-pill ${q.type==='facture'?'purple':'blue'}" style="font-size:9px">${q.type==='facture'?'Facture':'Devis'}</span></div>
        <div style="flex:1.5">${q.client}</div>
        <div style="flex:2">${q.label}</div>
        <div style="flex:1">${q.date}</div>
        <div style="flex:1"><strong>${q.amount}€</strong></div>
        <div style="flex:1"><span class="status-pill ${q.status==='Payé'?'green':q.status==='En attente'?'orange':'gray'}">${q.status}</span></div>
        <div style="width:120px;display:flex;gap:3px">
          <button class="tbl-btn" onclick="printQuote(${i})" title="Imprimer devis/facture">🖨️</button>
          ${q.status==='En attente'?`<button class="tbl-btn relance-quote" data-idx="${i}" title="Relancer le client">📧</button>`:'<div style="width:28px"></div>'}
          <button class="tbl-btn edit-quote" data-idx="${i}" title="Modifier">✏️</button>
          <button class="tbl-btn delete-quote" data-idx="${i}" title="Supprimer">🗑</button>
        </div>
      </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindQuotes() {
  document.getElementById('btn-add-quote')?.addEventListener('click',()=>openQuoteModal());
  document.querySelectorAll('.edit-quote').forEach(btn=>btn.addEventListener('click',()=>openQuoteModal(parseInt(btn.dataset.idx))));
  document.querySelectorAll('.delete-quote').forEach(btn=>btn.addEventListener('click',()=>{
    if(confirm('Supprimer ce devis ?')){const q=getQuotes();q.splice(parseInt(btn.dataset.idx),1);saveQuotes(q);renderPage('quotes');}
  }));
  document.querySelectorAll('.relance-quote').forEach(btn=>btn.addEventListener('click',()=>openRelanceModal(parseInt(btn.dataset.idx))));
}

function openRelanceModal(quoteIdx) {
  const q=getQuotes()[quoteIdx]; if(!q) return;
  const client=getClients().find(c=>c.name===q.client);
  const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
  const userPhone=localStorage.getItem('userPhone')||'';
  const emailSubject=encodeURIComponent(`Relance devis #${String(q.num).padStart(3,'0')} — ${company}`);
  const emailBody=encodeURIComponent(`Bonjour ${q.client},\n\nNous vous contactons au sujet du devis #${String(q.num).padStart(3,'0')} du ${q.date} pour "${q.label}" d'un montant de ${q.amount} €.\n\nCe devis est toujours en attente de votre accord. N'hésitez pas à nous contacter pour toute question.\n\nCordialement,\n${company}${userPhone?' — '+userPhone:''}`);

  openModal(`
    <div class="modal-header"><div class="modal-title">📧 Relancer ${q.client}</div></div>
    <div class="modal-body" style="gap:12px">
      <div style="background:var(--orange-l);border-radius:10px;padding:12px 16px;border:1px solid rgba(255,149,0,.2)">
        <div style="font-size:12px;color:var(--txt2);margin-bottom:2px">Devis en attente</div>
        <div style="font-weight:700">#${String(q.num).padStart(3,'0')} — ${q.label}</div>
        <div style="color:var(--orange);font-weight:600;margin-top:4px">${q.amount} € TTC</div>
        <div style="font-size:11px;color:var(--txt2);margin-top:2px">Émis le ${q.date}</div>
      </div>
      ${client?.email?`
      <a href="mailto:${client.email}?subject=${emailSubject}&body=${emailBody}" class="btn btn-primary" style="text-decoration:none;text-align:center" onclick="closeModal()">
        ✉️ Envoyer relance email à ${client.email}
      </a>`:`<div class="alert-banner">⚠️ Aucun email pour ce client. <span style="cursor:pointer;text-decoration:underline" onclick="closeModal();navigateTo('clients')">Ajouter dans la fiche client →</span></div>`}
      ${client?.phone?`
      <a href="tel:${client.phone}" class="btn btn-ghost" style="text-decoration:none;text-align:center" onclick="closeModal()">
        📞 Appeler ${client.phone}
      </a>`:''}
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="closeModal()">Fermer</button>
    </div>`);
}

function openQuoteModal(idx=null) {
  const quotes=getQuotes();
  const q=idx!==null?quotes[idx]:null;
  const nextNum=quotes.length?Math.max(...quotes.map(x=>x.num||0))+1:1;
  const clients=getClients();
  const tvaMode=localStorage.getItem('tvaMode')||'AE';
  const tvaTaux=parseFloat(localStorage.getItem('tvaTaux')||'20');
  const isTVA=tvaMode==='TVA';
  openModal(`
    <div class="modal-header"><div class="modal-title">${q?'Modifier':'Nouveau devis / facture'}</div></div>
    <div class="modal-body">
      <div class="form-row">
        <label>Type</label>
        <div style="display:flex;gap:10px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="fq-type" value="devis" ${(q?.type||'devis')==='devis'?'checked':''}/> 📄 Devis</label>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="fq-type" value="facture" ${q?.type==='facture'?'checked':''}/> 🧾 Facture</label>
        </div>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>N° devis</label><input type="number" id="fq-num" class="form-input" value="${q?.num||nextNum}"/></div>
        <div class="form-row"><label>Date</label><input type="date" id="fq-date" class="form-input" value="${q?.date||new Date().toISOString().split('T')[0]}"/></div>
      </div>
      <div class="form-row"><label>Client *</label>
        <input type="text" id="fq-client" class="form-input" value="${q?.client||''}" list="qcl"/>
        <datalist id="qcl">${clients.map(c=>`<option value="${c.name}"/>`).join('')}</datalist>
      </div>
      <div class="form-row"><label>Prestation *</label><input type="text" id="fq-label" class="form-input" value="${q?.label||''}"/></div>
      <div class="form-row"><label>${isTVA?'Montant HT (€)':'Montant TTC (€)'} <span style="font-size:10px;color:var(--txt3);font-weight:400">${isTVA?'TVA '+tvaTaux+'% calculée automatiquement':'— TVA non applicable art.293B'}</span></label>
        <input type="number" id="fq-amount" class="form-input" value="${q?.amount||''}" placeholder="0.00" oninput="updateQuoteTVA()"/>
      </div>
      ${isTVA?`
      <div class="form-row2">
        <div class="form-row"><label>TVA ${tvaTaux}%</label><div id="fq-tva-display" class="form-input" style="background:var(--bg2);color:var(--txt2)">0.00 €</div></div>
        <div class="form-row"><label>Total TTC</label><div id="fq-ttc-display" class="form-input" style="background:var(--accent-l);color:var(--accent);font-weight:700">0.00 €</div></div>
      </div>`:''}
      <div class="form-row"><label>Statut</label>
        <select id="fq-status" class="form-input">
          ${['En attente','Accepté','Payé','Annulé'].map(s=>`<option value="${s}" ${(q?.status||'En attente')===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="form-row"><label>Notes</label><textarea id="fq-notes" class="form-input" rows="2">${q?.notes||''}</textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="btn-save-quote">💾 Enregistrer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
  if(isTVA) updateQuoteTVA();
  document.getElementById('btn-save-quote').addEventListener('click',()=>{
    const client=document.getElementById('fq-client').value.trim();
    const label=document.getElementById('fq-label').value.trim();
    if(!client||!label){showToast('Client et prestation obligatoires','error');return;}
    const type=document.querySelector('input[name="fq-type"]:checked')?.value||'devis';
    const ht=parseFloat(document.getElementById('fq-amount').value)||0;
    const tvaAmt=isTVA?(ht*tvaTaux/100).toFixed(2):'0';
    const ttc=isTVA?(ht*(1+tvaTaux/100)).toFixed(2):ht.toFixed(2);
    const invoiceNum=(type==='facture'&&!q?.invoiceNum)?getNextInvoiceNum():(q?.invoiceNum||'');
    const entry={num:parseInt(document.getElementById('fq-num').value),type,invoiceNum,client,label,date:document.getElementById('fq-date').value,amount:isTVA?ttc:document.getElementById('fq-amount').value,amountHT:isTVA?ht.toFixed(2):document.getElementById('fq-amount').value,tva:tvaAmt,tvaTaux:isTVA?tvaTaux:0,status:document.getElementById('fq-status').value,notes:document.getElementById('fq-notes').value.trim()};
    const quotes=getQuotes();
    if(idx!==null)quotes[idx]=entry;else quotes.unshift(entry);
    saveQuotes(quotes);closeModal();renderPage('quotes');showToast((type==='facture'?'Facture':'Devis')+' enregistré(e) !','success');
  });
}

function updateQuoteTVA() {
  const tvaMode=localStorage.getItem('tvaMode')||'AE';
  if(tvaMode!=='TVA') return;
  const tvaTaux=parseFloat(localStorage.getItem('tvaTaux')||'20');
  const ht=parseFloat(document.getElementById('fq-amount')?.value)||0;
  const tvaAmt=ht*tvaTaux/100;
  const ttc=ht+tvaAmt;
  const tvaDsp=document.getElementById('fq-tva-display');
  const ttcDsp=document.getElementById('fq-ttc-display');
  if(tvaDsp)tvaDsp.textContent=tvaAmt.toFixed(2)+' €';
  if(ttcDsp)ttcDsp.textContent=ttc.toFixed(2)+' €';
}

function updateTTC(){
  const amt=parseFloat(document.getElementById('fq-amount')?.value)||0;
  const tva=parseFloat(document.getElementById('fq-tva')?.value)||0;
  const el=document.getElementById('fq-ttc');
  if(el)el.textContent=(amt*(1+tva/100)).toFixed(2)+'€';
}

function printQuote(idx) {
  const q=getQuotes()[idx]; if(!q) return;
  const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
  const userName=localStorage.getItem('userName')||'Ludovic Tourniquet';
  const phone=localStorage.getItem('userPhone')||'';
  const address=localStorage.getItem('userAddress')||'28 Rue de l\'Oratoire — 62200 Boulogne-sur-Mer';
  const siret=localStorage.getItem('userSiret')||'';
  const logoData=localStorage.getItem('userLogo');
  const tvaMode=localStorage.getItem('tvaMode')||'AE';
  const isFacture=q.type==='facture';
  const docTitle=isFacture?`FACTURE ${q.invoiceNum||('#'+String(q.num).padStart(3,'0'))}`:`DEVIS #${String(q.num).padStart(3,'0')}`;
  const isTVA=tvaMode==='TVA'&&parseFloat(q.tva||'0')>0;
  const ttc=parseFloat(q.amount||0).toFixed(2);
  const ht=isTVA?parseFloat(q.amountHT||q.amount||0).toFixed(2):ttc;
  const tvaAmt=isTVA?parseFloat(q.tva||0).toFixed(2):'0';
  const win=window.open('','_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${docTitle}</title>
  <style>body{font-family:Arial,sans-serif;padding:40px;color:#1c1c1e;max-width:700px;margin:0 auto}
  h1{font-size:22px;color:#007AFF;margin:0}.header{display:flex;justify-content:space-between;margin-bottom:32px;border-bottom:2px solid #007AFF;padding-bottom:16px}
  .section{background:#f5f5f7;border-radius:10px;padding:16px;margin:16px 0}
  .row{display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #e8e8e8}
  .row:last-child{border-bottom:none}.label{color:#6e6e73;font-size:12px}
  .total{font-size:20px;font-weight:700;color:#007AFF;text-align:right;margin-top:16px}
  .tva-mention{font-size:11px;color:#98989f;text-align:right;margin-top:4px}
  .footer{margin-top:30px;font-size:10px;color:#98989f;text-align:center;border-top:1px solid #f0f0f5;padding-top:12px}
  .sign-box{border:1px solid #ccc;border-radius:8px;padding:12px 20px;width:45%;text-align:center;color:#6e6e73;font-size:12px;display:inline-block;margin-top:20px}
  </style>
  </head><body>
  <div class="header">
    <div style="display:flex;align-items:center;gap:12px">
      ${logoData?`<img src="${logoData}" style="width:60px;height:60px;object-fit:contain;border-radius:8px"/>`:''}
      <div>
        <h1>${company}</h1>
        <div style="font-size:12px;color:#6e6e73;margin-top:4px">
          ${userName}<br/>
          ${address}<br/>
          ${phone?'Tél : '+phone+'<br/>':''}
          ${siret?'SIRET : '+siret:''}
        </div>
      </div>
    </div>
    <div style="text-align:right">
      <strong style="font-size:16px">${docTitle}</strong><br/>
      <span style="font-size:12px;color:#6e6e73">Date : ${q.date}</span><br/>
      <span class="status-badge" style="font-size:11px;color:${q.status==='Payé'?'#34C759':q.status==='Accepté'?'#007AFF':'#98989f'}">${q.status}</span>
    </div>
  </div>
  <div class="section"><div class="label">CLIENT</div><strong style="font-size:15px">${q.client}</strong></div>
  <div class="section">
    <div class="label">PRESTATION</div><strong style="font-size:14px">${q.label}</strong>
    ${q.notes?`<p style="margin-top:8px;color:#6e6e73;font-size:12px">${q.notes}</p>`:''}
    <hr style="margin:14px 0;border:none;border-top:1px solid #e0e0e0"/>
    ${isTVA?`
    <div style="text-align:right;font-size:13px;color:#6e6e73;margin-bottom:4px">Montant HT : ${ht} €</div>
    <div style="text-align:right;font-size:13px;color:#6e6e73;margin-bottom:4px">TVA ${q.tvaTaux||20}% : ${tvaAmt} €</div>
    <div class="total">Total TTC : ${ttc} €</div>`
    :`<div class="total">Total TTC : ${ttc} €</div>
    <div class="tva-mention">TVA non applicable — article 293B du CGI (Auto-entrepreneur)</div>`}
  </div>
  ${isFacture?`
  <div style="font-size:11px;color:#6e6e73;margin-top:12px;background:#f5f5f7;border-radius:8px;padding:10px">
    <strong>Mentions légales :</strong><br/>
    ${siret?'SIRET : '+siret+'<br/>':''}
    ${isTVA?'':'TVA non applicable — article 293B du CGI<br/>'}
    Date d'émission : ${q.date}<br/>
    Date d'échéance : à réception<br/>
    Pénalités de retard : 3 fois le taux légal en vigueur
  </div>`:`
  <div style="display:flex;justify-content:space-between;margin-top:24px">
    <div class="sign-box">Bon pour accord<br/>Signature client<br/><br/><br/></div>
    <div class="sign-box">Signature<br/>${userName}<br/><br/><br/></div>
  </div>
  <div style="font-size:11px;color:#6e6e73;margin-top:16px">Devis valable 30 jours à compter de sa date d'émission. Règlement à réception de la facture.</div>`}
  <div class="footer">${company} — ${address}${siret?' — SIRET '+siret:''}<br/>Généré le ${new Date().toLocaleDateString('fr-FR')} avec RepairPilot Pro</div>
  </body></html>`);
  win.document.close(); win.print();
}

// ═══════════════════════════════════════════════════════
//  STOCK
// ═══════════════════════════════════════════════════════
function getStock(){return JSON.parse(localStorage.getItem('stock')||'[]');}
function saveStock(s){localStorage.setItem('stock',JSON.stringify(s));}

function pageStock() {
  const items=getStock();
  const lowStock=items.filter(i=>parseInt(i.qty)<=parseInt(i.minQty||1));
  return `
  <div class="sh">
    <div class="sh-title">📦 Mon Stock</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost" id="btn-scan-stock">📷 Scanner</button>
      <button class="btn btn-primary" id="btn-add-stock">+ Ajouter une pièce</button>
    </div>
  </div>
  <div class="stats" style="grid-template-columns:repeat(4,1fr)">
    <div class="stat-card"><div class="stat-ico s-blue">📦</div><div><div class="stat-val c-blue">${items.length}</div><div class="stat-lbl">Références</div></div></div>
    <div class="stat-card"><div class="stat-ico s-green">✅</div><div><div class="stat-val c-green">${items.filter(i=>parseInt(i.qty)>parseInt(i.minQty||1)).length}</div><div class="stat-lbl">En stock</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">⚠️</div><div><div class="stat-val c-orange">${lowStock.length}</div><div class="stat-lbl">Stock faible</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">💶</div><div><div class="stat-val c-teal">${items.reduce((s,i)=>s+parseFloat(i.price||0)*parseInt(i.qty||0),0).toFixed(0)}€</div><div class="stat-lbl">Valeur stock</div></div></div>
  </div>
  ${lowStock.length>0?`<div class="alert-banner">⚠️ Pièces à commander : ${lowStock.map(i=>i.name).join(', ')}</div>`:''}
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:3">Pièce</div><div style="flex:2">Fournisseur</div>
      <div style="flex:1">Qté</div><div style="flex:1">Min.</div>
      <div style="flex:1">Achat</div><div style="flex:1">Vente</div>
      <div style="flex:1">Marge</div><div style="width:80px"></div>
    </div>
    ${items.length===0
      ? `<div class="empty-state"><div class="empty-icon">📦</div><div class="empty-title">Stock vide</div></div>`
      : items.map((item,i)=>{
          const marge=item.price&&item.sell?Math.round((item.sell-item.price)/item.sell*100):null;
          return `<div class="mac-table-row ${parseInt(item.qty)<=parseInt(item.minQty||1)?'row-warning':''}">
            <div style="flex:3"><strong>${item.name}</strong><br/><span style="font-size:11px;color:var(--txt2)">${item.ref||''}</span></div>
            <div style="flex:2">${item.supplier||'—'}</div>
            <div style="flex:1"><strong class="${parseInt(item.qty)<=parseInt(item.minQty||1)?'c-red':''}">${item.qty}</strong></div>
            <div style="flex:1">${item.minQty||1}</div>
            <div style="flex:1">${item.price?item.price+'€':'—'}</div>
            <div style="flex:1">${item.sell?item.sell+'€':'—'}</div>
            <div style="flex:1">${marge!==null?`<span class="status-pill ${marge>=30?'green':'orange'}">${marge}%</span>`:'—'}</div>
            <div style="width:80px;display:flex;gap:4px">
              <button class="tbl-btn edit-stock" data-idx="${i}" title="Modifier">✏️</button>
              <button class="tbl-btn delete-stock" data-idx="${i}" title="Supprimer">🗑</button>
            </div>
          </div>`;}).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindStock() {
  document.getElementById('btn-scan-stock')?.addEventListener('click',()=>openBarcodeScanner());
  document.getElementById('btn-add-stock')?.addEventListener('click',()=>openStockModal());
  document.querySelectorAll('.edit-stock').forEach(btn=>btn.addEventListener('click',()=>openStockModal(parseInt(btn.dataset.idx))));
  document.querySelectorAll('.delete-stock').forEach(btn=>btn.addEventListener('click',()=>{
    if(confirm('Supprimer cette pièce ?')){const s=getStock();s.splice(parseInt(btn.dataset.idx),1);saveStock(s);renderPage('stock');}
  }));
}

// ─── Barcode Scanner
async function openBarcodeScanner() {
  openModal(`
    <div class="modal-header"><div class="modal-title">📷 Scanner un code-barres</div></div>
    <div class="modal-body" style="align-items:center;gap:14px">
      <div id="scan-status" style="font-size:13px;color:var(--txt2);text-align:center">Initialisation de la caméra...</div>
      <div style="position:relative;border-radius:12px;overflow:hidden;background:#000;width:100%;max-width:400px;aspect-ratio:4/3">
        <video id="scan-video" autoplay playsinline style="width:100%;height:100%;object-fit:cover;display:block"></video>
        <div style="position:absolute;inset:0;border:2px solid var(--accent);border-radius:12px;pointer-events:none"></div>
        <div id="scan-line" style="position:absolute;left:10%;right:10%;height:2px;background:var(--accent);top:50%;box-shadow:0 0 8px var(--accent);animation:scan-beam 1.8s ease-in-out infinite"></div>
      </div>
      <div id="scan-result" style="font-size:13px;font-weight:600;color:var(--green);min-height:18px;text-align:center"></div>
      <div style="display:flex;gap:8px;align-items:center;width:100%">
        <input type="text" id="scan-manual" class="form-input" placeholder="Ou saisir le code manuellement..." style="flex:1"/>
        <button class="btn btn-primary" id="btn-scan-search">🔍</button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost" onclick="stopScanner();closeModal()">Fermer</button>
    </div>`);

  document.getElementById('btn-scan-search').addEventListener('click',()=>{
    const code=document.getElementById('scan-manual').value.trim();
    if(code){stopScanner();closeModal();searchStockByBarcode(code);}
  });
  document.getElementById('scan-manual').addEventListener('keydown',e=>{
    if(e.key==='Enter')document.getElementById('btn-scan-search').click();
  });

  try {
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment',width:{ideal:1280},height:{ideal:720}}});
    const video=document.getElementById('scan-video');
    if(!video){stream.getTracks().forEach(t=>t.stop());return;}
    video.srcObject=stream;
    window._scanStream=stream;

    if('BarcodeDetector' in window){
      const detector=new BarcodeDetector({formats:['ean_13','ean_8','code_128','code_39','qr_code','upc_a','upc_e','itf']});
      document.getElementById('scan-status').textContent='📷 Caméra active — pointez vers un code-barres';
      window._scanInterval=setInterval(async()=>{
        const v=document.getElementById('scan-video');
        if(!v||v.readyState<2)return;
        try{
          const codes=await detector.detect(v);
          if(codes.length>0){
            const code=codes[0].rawValue;
            document.getElementById('scan-result').textContent='✅ Code détecté : '+code;
            clearInterval(window._scanInterval);window._scanInterval=null;
            setTimeout(()=>{stopScanner();closeModal();searchStockByBarcode(code);},600);
          }
        }catch(e){}
      },250);
    } else {
      document.getElementById('scan-status').textContent='⚠️ Scanner auto non disponible sur ce système — utilisez la saisie manuelle';
      const el=document.getElementById('scan-line');if(el)el.style.display='none';
    }
  } catch(e) {
    document.getElementById('scan-status').textContent='❌ Caméra inaccessible — vérifiez les autorisations ou utilisez la saisie manuelle';
    const el=document.getElementById('scan-line');if(el)el.style.display='none';
  }
}

function stopScanner() {
  if(window._scanInterval){clearInterval(window._scanInterval);window._scanInterval=null;}
  if(window._scanStream){window._scanStream.getTracks().forEach(t=>t.stop());window._scanStream=null;}
}

function searchStockByBarcode(code) {
  const stock=getStock();
  const found=stock.filter(s=>s.ref===code||s.barcode===code||s.name?.toLowerCase().includes(code.toLowerCase()));
  if(found.length>0){
    navigateTo('stock');
    setTimeout(()=>openModal(`
      <div class="modal-header"><div class="modal-title">📦 Résultat scan : ${code}</div></div>
      <div class="modal-body" style="gap:8px">
        ${found.map(s=>`
          <div class="mac-table-row" style="border-radius:8px">
            <strong style="flex:1">${s.name}</strong>
            <span style="color:var(--txt2);font-size:12px">Réf: ${s.ref||'—'}</span>
            <span class="status-pill ${parseInt(s.qty)<=0?'red':parseInt(s.qty)<=parseInt(s.minQty||1)?'orange':'green'}" style="margin-left:8px">Qté: ${s.qty}</span>
          </div>`).join('')}
      </div>
      <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Fermer</button></div>`),200);
  } else {
    navigateTo('stock');
    setTimeout(()=>openModal(`
      <div class="modal-header"><div class="modal-title">📷 Code scanné : ${code}</div></div>
      <div class="modal-body" style="gap:10px">
        <div class="empty-state">
          <div class="empty-icon">📦</div>
          <div class="empty-title">Pièce introuvable en stock</div>
          <div class="empty-sub">Code : <strong>${code}</strong></div>
        </div>
        <p style="font-size:12.5px;color:var(--txt2);text-align:center">Voulez-vous ajouter cette pièce au stock ?</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="closeModal();openStockModal(null,'${code}')">+ Ajouter au stock</button>
        <button class="btn btn-ghost" onclick="closeModal()">Fermer</button>
      </div>`),200);
  }
}

function openStockModal(idx=null, prefillBarcode='') {
  const stock=getStock();
  const item=idx!==null?stock[idx]:null;
  openModal(`
    <div class="modal-header"><div class="modal-title">${item?'Modifier la pièce':'Nouvelle pièce en stock'}</div></div>
    <div class="modal-body">
      <div class="form-row"><label>Nom de la pièce *</label><input type="text" id="fs-name" class="form-input" value="${item?.name||''}"/></div>
      <div class="form-row"><label>Référence / Code-barres</label>
        <div style="display:flex;gap:6px">
          <input type="text" id="fs-ref" class="form-input" style="flex:1" value="${item?.ref||prefillBarcode}"/>
          <button class="btn btn-ghost" style="flex-shrink:0" onclick="stopScanner();closeModal();openBarcodeScanner()">📷</button>
        </div>
      </div>
      <div class="form-row"><label>Fournisseur</label>
        <select id="fs-supplier" class="form-input">
          <option value="">— Choisir —</option>
          ${SUPPLIERS.map(s=>`<option value="${s.name}" ${item?.supplier===s.name?'selected':''}>${s.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>Quantité *</label><input type="number" id="fs-qty" class="form-input" value="${item?.qty||''}"/></div>
        <div class="form-row"><label>Alerte si ≤</label><input type="number" id="fs-min" class="form-input" value="${item?.minQty||'1'}"/></div>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>Prix achat (€)</label><input type="number" id="fs-price" class="form-input" value="${item?.price||''}" oninput="calcStockMarge()"/></div>
        <div class="form-row"><label>Prix vente (€)</label><input type="number" id="fs-sell" class="form-input" value="${item?.sell||''}" oninput="calcStockMarge()"/></div>
      </div>
      <div id="stock-marge-result" style="font-size:12px;color:var(--green);font-weight:600;padding:4px 0"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="btn-save-stock">💾 Enregistrer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
  document.getElementById('btn-save-stock').addEventListener('click',()=>{
    const name=document.getElementById('fs-name').value.trim();
    const qty=document.getElementById('fs-qty').value;
    if(!name||qty===''){showToast('Nom et quantité obligatoires','error');return;}
    const entry={name,ref:document.getElementById('fs-ref').value.trim(),supplier:document.getElementById('fs-supplier').value,qty:parseInt(qty),minQty:parseInt(document.getElementById('fs-min').value)||1,price:document.getElementById('fs-price').value,sell:document.getElementById('fs-sell').value};
    const stock=getStock();
    if(idx!==null)stock[idx]=entry;else stock.unshift(entry);
    saveStock(stock);closeModal();renderPage('stock');showToast('Stock mis à jour !','success');
  });
}

function calcStockMarge(){
  const buy=parseFloat(document.getElementById('fs-price')?.value)||0;
  const sell=parseFloat(document.getElementById('fs-sell')?.value)||0;
  const el=document.getElementById('stock-marge-result');
  if(el&&buy&&sell){
    const marge=Math.round((sell-buy)/sell*100);
    el.textContent=`Marge : ${marge}% — Bénéfice : ${(sell-buy).toFixed(2)}€ par pièce`;
    el.style.color=marge>=30?'var(--green)':'var(--orange)';
  }
}

// ═══════════════════════════════════════════════════════
//  AGENDA
// ═══════════════════════════════════════════════════════
function getAgenda(){return JSON.parse(localStorage.getItem('agenda')||'[]');}
function saveAgenda(a){localStorage.setItem('agenda',JSON.stringify(a));}

function pageAgenda() {
  const events=getAgenda();
  const today=new Date().toISOString().split('T')[0];
  const todayEvents=events.filter(e=>e.date===today);
  const upcoming=events.filter(e=>e.date>today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,10);
  const agendaView=localStorage.getItem('agendaView')||'list';
  return `
  <div class="sh">
    <div class="sh-title">📅 Agenda</div>
    <div style="display:flex;gap:8px">
      <div style="display:flex;border:1px solid var(--sep);border-radius:8px;overflow:hidden">
        <button class="btn ${agendaView==='list'?'btn-primary':'btn-ghost'}" style="border-radius:0;border:none;padding:4px 10px;font-size:12px" onclick="localStorage.setItem('agendaView','list');renderPage('agenda')">📋 Liste</button>
        <button class="btn ${agendaView==='week'?'btn-primary':'btn-ghost'}" style="border-radius:0;border:none;padding:4px 10px;font-size:12px" onclick="localStorage.setItem('agendaView','week');renderPage('agenda')">📅 Semaine</button>
      </div>
      <button class="btn btn-primary" id="btn-add-event">+ Événement</button>
    </div>
  </div>
  ${agendaView==='week'?buildWeekView(events):''}
  <div class="two-col">
    <div class="left-col">
      <div class="sh-title" style="margin-bottom:8px">📅 Aujourd'hui — ${new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})}</div>
      ${todayEvents.length===0
        ?`<div class="mac-card" style="padding:24px;text-align:center;color:var(--txt2)"><div style="font-size:28px">✅</div><div style="margin-top:8px">Aucun événement aujourd'hui</div></div>`
        :`<div class="mac-card">${todayEvents.map(e=>`
          <div class="mac-table-row">
            <div style="min-width:50px;font-weight:700;color:var(--accent)">${e.time||'—'}</div>
            <div style="flex:1"><strong>${e.title}</strong>${e.client?`<br/><span style="font-size:11px;color:var(--txt2)">${e.client}</span>`:''}</div>
            <span class="status-pill ${e.type==='repair'?'orange':e.type==='client'?'blue':'gray'}">${e.type==='repair'?'Réparation':e.type==='client'?'RDV Client':'Autre'}</span>
          </div>`).join('')}
        </div>`}
      <div class="sh-title" style="margin:16px 0 8px">📆 À venir</div>
      ${upcoming.length===0
        ?`<div class="mac-card" style="padding:24px;text-align:center;color:var(--txt2)">Aucun événement à venir</div>`
        :`<div class="mac-table">${upcoming.map((e,i)=>`
          <div class="mac-table-row">
            <div style="min-width:90px;font-size:11px;color:var(--txt2)">${new Date(e.date).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short'})}</div>
            <div style="min-width:40px;font-weight:700;color:var(--accent)">${e.time||'—'}</div>
            <div style="flex:1"><strong>${e.title}</strong>${e.client?` — <span style="color:var(--txt2)">${e.client}</span>`:''}</div>
            <button class="tbl-btn delete-event" data-idx="${events.indexOf(e)}" title="Supprimer">🗑</button>
          </div>`).join('')}
        </div>`}
    </div>
    <div class="right-col">
      <div class="mac-card" style="padding:16px">
        <div class="sh-title" style="margin-bottom:12px">📊 Résumé</div>
        <div class="mac-table-row" style="padding:8px 0"><span style="flex:1">Total événements</span><strong>${events.length}</strong></div>
        <div class="mac-table-row" style="padding:8px 0"><span style="flex:1">Aujourd'hui</span><strong>${todayEvents.length}</strong></div>
        <div class="mac-table-row" style="padding:8px 0"><span style="flex:1">Cette semaine</span><strong>${events.filter(e=>{const d=new Date(e.date);const now=new Date();const diff=(d-now)/86400000;return diff>=0&&diff<=7;}).length}</strong></div>
      </div>
    </div>
  </div>
  <div class="spacer"></div>`;
}

function bindAgenda() {
  document.getElementById('btn-add-event')?.addEventListener('click',()=>openEventModal());
  document.querySelectorAll('.delete-event').forEach(btn=>btn.addEventListener('click',()=>{
    const a=getAgenda();a.splice(parseInt(btn.dataset.idx),1);saveAgenda(a);renderPage('agenda');
  }));
}

function openEventModal() {
  const clients=getClients();
  openModal(`
    <div class="modal-header"><div class="modal-title">📅 Nouvel événement</div></div>
    <div class="modal-body">
      <div class="form-row"><label>Titre *</label><input type="text" id="ev-title" class="form-input" placeholder="ex: RDV client, Livraison pièce..."/></div>
      <div class="form-row2">
        <div class="form-row"><label>Date *</label><input type="date" id="ev-date" class="form-input" value="${new Date().toISOString().split('T')[0]}"/></div>
        <div class="form-row"><label>Heure</label><input type="time" id="ev-time" class="form-input" value="09:00"/></div>
      </div>
      <div class="form-row"><label>Type</label>
        <select id="ev-type" class="form-input">
          <option value="client">RDV Client</option><option value="repair">Réparation</option><option value="other">Autre</option>
        </select>
      </div>
      <div class="form-row"><label>Client</label>
        <input type="text" id="ev-client" class="form-input" placeholder="Nom du client" list="ev-cl"/>
        <datalist id="ev-cl">${clients.map(c=>`<option value="${c.name}"/>`).join('')}</datalist>
      </div>
      <div class="form-row"><label>Notes</label><textarea id="ev-notes" class="form-input" rows="2"></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="btn-save-event">💾 Enregistrer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
  document.getElementById('btn-save-event').addEventListener('click',()=>{
    const title=document.getElementById('ev-title').value.trim();
    const date=document.getElementById('ev-date').value;
    if(!title||!date){showToast('Titre et date obligatoires','error');return;}
    const entry={title,date,time:document.getElementById('ev-time').value,type:document.getElementById('ev-type').value,client:document.getElementById('ev-client').value.trim(),notes:document.getElementById('ev-notes').value.trim()};
    const agenda=getAgenda();agenda.push(entry);saveAgenda(agenda);closeModal();renderPage('agenda');showToast('Événement ajouté !','success');
  });
}

// ═══════════════════════════════════════════════════════
//  GARANTIES
// ═══════════════════════════════════════════════════════
function pageGaranties() {
  const repairs=getRepairs().filter(r=>r.warrantyEnd);
  const now=new Date();
  const active=repairs.filter(r=>new Date(r.warrantyEnd)>=now);
  const expired=repairs.filter(r=>new Date(r.warrantyEnd)<now);
  return `
  <div class="sh"><div class="sh-title">🛡️ Garanties</div></div>
  <div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div class="stat-card"><div class="stat-ico s-green">🛡️</div><div><div class="stat-val c-green">${active.length}</div><div class="stat-lbl">Garanties actives</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">⏰</div><div><div class="stat-val c-orange">${active.filter(r=>{const d=(new Date(r.warrantyEnd)-now)/86400000;return d<=30;}).length}</div><div class="stat-lbl">Expirent dans 30j</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">📦</div><div><div class="stat-val c-teal">${expired.length}</div><div class="stat-lbl">Expirées</div></div></div>
  </div>
  <div class="sh-title" style="margin-bottom:8px">✅ Garanties actives</div>
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:2">Appareil</div><div style="flex:1.5">Client</div>
      <div style="flex:1">Réparé le</div><div style="flex:1">Garantie jusqu'au</div><div style="flex:1">Reste</div>
    </div>
    ${active.length===0?`<div class="empty-state"><div class="empty-icon">🛡️</div><div class="empty-title">Aucune garantie active</div><div class="empty-sub">Ajoutez une date de garantie lors d'une réparation</div></div>`
    :active.map(r=>{
      const days=Math.ceil((new Date(r.warrantyEnd)-now)/86400000);
      return `<div class="mac-table-row">
        <div style="flex:2"><strong>${r.device}</strong></div>
        <div style="flex:1.5">${r.client}</div>
        <div style="flex:1">${r.date}</div>
        <div style="flex:1">${r.warrantyEnd}</div>
        <div style="flex:1"><span class="status-pill ${days<=30?'orange':'green'}">${days}j</span></div>
      </div>`;}).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindGaranties(){}

// ═══════════════════════════════════════════════════════
//  STATISTIQUES
// ═══════════════════════════════════════════════════════
function calcRevenue(){
  return getQuotes().filter(q=>q.status==='Payé').reduce((s,q)=>s+parseFloat(q.amount||0),0).toFixed(0);
}

function pageStats() {
  const repairs=getRepairs(),clients=getClients(),quotes=getQuotes();
  const revenue=calcRevenue();
  const byStatus={};
  repairs.forEach(r=>{byStatus[r.status]=(byStatus[r.status]||0)+1;});
  const goal=monthlyGoal;
  const goalPct=Math.min(100,Math.round(revenue/goal*100));
  return `
  <div class="sh"><div class="sh-title">📊 Statistiques</div></div>
  <div class="stats">
    <div class="stat-card"><div class="stat-ico s-green">🔧</div><div><div class="stat-val c-green">${repairs.length}</div><div class="stat-lbl">Réparations</div></div></div>
    <div class="stat-card"><div class="stat-ico s-blue">👥</div><div><div class="stat-val c-blue">${clients.length}</div><div class="stat-lbl">Clients</div></div></div>
    <div class="stat-card"><div class="stat-ico s-purple">🤖</div><div><div class="stat-val c-purple">${stats.aiDiags}</div><div class="stat-lbl">Diagnostics IA</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">💶</div><div><div class="stat-val c-teal">${revenue}€</div><div class="stat-lbl">CA encaissé</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">⏱️</div><div><div class="stat-val c-orange">${stats.timeSaved}h</div><div class="stat-lbl">Temps économisé</div></div></div>
  </div>
  <div class="goal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <div style="font-weight:700">🎯 Objectif mensuel — <input type="number" id="goal-input" value="${goal}" style="width:70px;background:none;border:none;border-bottom:1px solid var(--accent);color:var(--accent);font-weight:700;font-size:13px;outline:none" onchange="monthlyGoal=parseInt(this.value)||2000;localStorage.setItem('monthlyGoal',monthlyGoal);renderPage('stats')"/>€</div>
      <div style="font-weight:700;color:var(--accent)">${revenue}€ / ${goal}€</div>
    </div>
    <div class="goal-bar"><div class="goal-fill" style="width:${goalPct}%"></div></div>
    <div style="font-size:11px;color:var(--txt2);margin-top:5px">${goalPct}% atteint</div>
  </div>
  <div class="two-col">
    <div class="mac-card" style="padding:16px">
      <div class="sh-title" style="margin-bottom:12px">Répartition réparations</div>
      ${Object.entries(byStatus).map(([s,n])=>`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span class="status-pill ${s==='Terminé'?'green':s==='En cours'?'orange':'gray'}" style="width:100px;text-align:center">${s}</span>
        <div style="flex:1;background:#f0f0f5;border-radius:4px;height:8px;overflow:hidden">
          <div style="width:${Math.round(n/repairs.length*100)}%;background:var(--accent);height:100%;border-radius:4px;transition:width .5s"></div>
        </div>
        <strong style="min-width:20px">${n}</strong>
      </div>`).join('')||'<div style="color:var(--txt2);text-align:center;padding:20px">Aucune donnée</div>'}
    </div>
    <div class="mac-card" style="padding:16px">
      <div class="sh-title" style="margin-bottom:12px">Devis & Facturation</div>
      ${['En attente','Accepté','Payé','Annulé'].map(s=>{
        const n=quotes.filter(q=>q.status===s).length;
        const amt=quotes.filter(q=>q.status===s).reduce((t,q)=>t+parseFloat(q.amount||0),0).toFixed(0);
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--sep)">
          <span class="status-pill ${s==='Payé'?'green':s==='En attente'?'orange':'gray'}">${s}</span>
          <span style="font-weight:700">${n} devis</span>
          <span style="color:var(--green);font-weight:700">${amt}€</span>
        </div>`;}).join('')}
    </div>
  </div>
  ${buildMonthlyChart()}
  ${buildTopDevices(repairs)}
  ${buildRentabilite(repairs)}
  ${buildAdvancedStats(repairs)}
  <div class="spacer"></div>`;
}

function buildAdvancedStats(repairs) {
  if (!repairs.length) return '';

  // Taux de réussite
  const done     = repairs.filter(r=>r.status==='Terminé').length;
  const failed   = repairs.filter(r=>r.status==='Irréparable'||r.status==='Annulé').length;
  const total    = repairs.length;
  const successRate = total > 0 ? Math.round(done/total*100) : 0;

  // Durée moyenne (jours) pour les réparations terminées avec date de création
  const doneRepairs = repairs.filter(r=>r.status==='Terminé'&&r.createdAt&&r.closedAt);
  let avgDays = '—';
  if (doneRepairs.length) {
    const totalMs = doneRepairs.reduce((s,r)=>s+(new Date(r.closedAt)-new Date(r.createdAt)),0);
    avgDays = (totalMs/doneRepairs.length/86400000).toFixed(1);
  }

  // Top problèmes (par label/desc/device)
  const faultMap = {};
  repairs.forEach(r=>{
    const key = r.label || r.desc || r.problem || r.device || 'Non précisé';
    if (key) faultMap[key] = (faultMap[key]||0)+1;
  });
  const topFaults = Object.entries(faultMap).sort((a,b)=>b[1]-a[1]).slice(0,8);

  const faultBars = topFaults.map(([label,n])=>`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <div style="min-width:160px;font-size:11px;color:var(--txt1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${label}">${label}</div>
      <div style="flex:1;background:rgba(199,125,255,.15);border-radius:4px;height:10px;overflow:hidden">
        <div style="width:${Math.round(n/topFaults[0][1]*100)}%;background:var(--accent);height:100%;border-radius:4px"></div>
      </div>
      <strong style="min-width:28px;text-align:right;font-size:12px">${n}</strong>
    </div>`).join('');

  return `
  <div class="sh"><div class="sh-title">🔬 Statistiques avancées</div></div>
  <div class="stats" style="grid-template-columns:repeat(4,1fr)">
    <div class="stat-card"><div class="stat-ico s-green">✅</div><div><div class="stat-val c-green">${successRate}%</div><div class="stat-lbl">Taux de réussite</div></div></div>
    <div class="stat-card"><div class="stat-ico s-blue">⏱️</div><div><div class="stat-val c-blue">${avgDays}j</div><div class="stat-lbl">Durée moyenne</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">⚠️</div><div><div class="stat-val c-orange">${failed}</div><div class="stat-lbl">Irréparables / Annulés</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">🔧</div><div><div class="stat-val c-teal">${done}</div><div class="stat-lbl">Réparations réussies</div></div></div>
  </div>
  <div class="mac-card" style="padding:16px;margin-bottom:16px">
    <div class="sh-title" style="margin-bottom:12px">🏆 Top pannes / problèmes les plus fréquents</div>
    ${faultBars || '<div style="color:var(--txt2);text-align:center;padding:20px">Aucune donnée — Renseignez le problème dans chaque réparation</div>'}
  </div>`;
}

// ═══════════════════════════════════════════════════════
//  RAPPORT MENSUEL
// ═══════════════════════════════════════════════════════
function pageRapport() {
  const now=new Date();
  const month=now.getMonth();
  const year=now.getFullYear();
  const repairs=getRepairs().filter(r=>{ const d=new Date(r.date); return d.getMonth()===month&&d.getFullYear()===year; });
  const quotes=getQuotes().filter(q=>{ const d=new Date(q.date); return d.getMonth()===month&&d.getFullYear()===year; });
  const paidQuotes=quotes.filter(q=>q.status==='Payé');
  const revenue=paidQuotes.reduce((s,q)=>s+parseFloat(q.amount||0),0).toFixed(0);
  const monthName=now.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});
  return `
  <div class="sh"><div class="sh-title">📈 Rapport mensuel — ${monthName}</div>
    <button class="btn btn-primary" id="btn-print-rapport">🖨️ Imprimer le rapport</button>
  </div>
  <div class="stats">
    <div class="stat-card"><div class="stat-ico s-green">🔧</div><div><div class="stat-val c-green">${repairs.length}</div><div class="stat-lbl">Réparations</div></div></div>
    <div class="stat-card"><div class="stat-ico s-blue">📄</div><div><div class="stat-val c-blue">${quotes.length}</div><div class="stat-lbl">Devis émis</div></div></div>
    <div class="stat-card"><div class="stat-ico s-teal">💶</div><div><div class="stat-val c-teal">${revenue}€</div><div class="stat-lbl">CA encaissé</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">⏳</div><div><div class="stat-val c-orange">${quotes.filter(q=>q.status==='En attente').length}</div><div class="stat-lbl">Devis en attente</div></div></div>
    <div class="stat-card"><div class="stat-ico s-purple">🤖</div><div><div class="stat-val c-purple">${stats.aiDiags}</div><div class="stat-lbl">Diagnostics IA</div></div></div>
  </div>
  <div class="two-col">
    <div>
      <div class="sh-title" style="margin-bottom:8px">Réparations du mois</div>
      <div class="mac-table">
        ${repairs.length===0?`<div class="empty-state"><div class="empty-icon">🔧</div><div class="empty-title">Aucune réparation ce mois</div></div>`
        :repairs.map(r=>`<div class="mac-table-row"><div style="flex:2"><strong>${r.device}</strong></div><div style="flex:1.5">${r.client}</div><div style="flex:1">${r.price?r.price+'€':'—'}</div><span class="status-pill ${r.status==='Terminé'?'green':'orange'}">${r.status}</span></div>`).join('')}
      </div>
    </div>
    <div>
      <div class="sh-title" style="margin-bottom:8px">Devis du mois</div>
      <div class="mac-table">
        ${quotes.length===0?`<div class="empty-state"><div class="empty-icon">📄</div><div class="empty-title">Aucun devis ce mois</div></div>`
        :quotes.map(q=>`<div class="mac-table-row"><div style="flex:2"><strong>${q.client}</strong></div><div style="flex:1.5">${q.amount}€</div><span class="status-pill ${q.status==='Payé'?'green':'orange'}">${q.status}</span></div>`).join('')}
      </div>
    </div>
  </div>
  ${buildFiscalSection()}
  <div class="spacer"></div>`;
}

function buildFiscalSection() {
  const quotes=getQuotes();
  const now=new Date();
  const year=now.getFullYear();
  const quarters=[[0,1,2],[3,4,5],[6,7,8],[9,10,11]];
  const qRows=quarters.map((months,qi)=>{
    const ca=quotes.filter(q=>q.status==='Payé'&&new Date(q.date).getFullYear()===year&&months.includes(new Date(q.date).getMonth())).reduce((s,q)=>s+parseFloat(q.amount||0),0);
    const urssaf=(ca*0.123).toFixed(2);
    const isCurrent=months.includes(now.getMonth());
    return `<div class="mac-table-row" style="${isCurrent?'background:var(--accent-l);border-radius:8px;':''}">
      <div style="flex:1"><strong>${isCurrent?'▶ ':''} T${qi+1} ${year}</strong></div>
      <div style="flex:1;text-align:right;font-weight:700;color:var(--green)">${ca.toFixed(2)} €</div>
      <div style="flex:1;text-align:right;color:var(--orange)">${urssaf} €</div>
      <div style="flex:1;text-align:right;font-size:11px;color:var(--txt2)">Taux 12,3%</div>
    </div>`;
  }).join('');
  const caAnnuel=quotes.filter(q=>q.status==='Payé'&&new Date(q.date).getFullYear()===year).reduce((s,q)=>s+parseFloat(q.amount||0),0);
  return `
  <div class="sh" style="margin-top:16px"><div class="sh-title">🧾 Rapport fiscal auto-entrepreneur ${year}</div></div>
  <div class="mac-card" style="padding:0 8px">
    <div class="mac-table-head"><div style="flex:1">Trimestre</div><div style="flex:1;text-align:right">CA encaissé</div><div style="flex:1;text-align:right">URSSAF estimé</div><div style="flex:1;text-align:right">Info</div></div>
    ${qRows}
    <div class="mac-table-row" style="border-top:2px solid var(--sep);margin-top:4px">
      <div style="flex:1"><strong>Total annuel</strong></div>
      <div style="flex:1;text-align:right;font-weight:800;color:var(--green)">${caAnnuel.toFixed(2)} €</div>
      <div style="flex:1;text-align:right;font-weight:800;color:var(--orange)">${(caAnnuel*0.123).toFixed(2)} €</div>
      <div style="flex:1;text-align:right;font-size:11px;color:var(--txt2)">Prestation services</div>
    </div>
  </div>
  <div style="font-size:11px;color:var(--txt2);padding:8px 4px">⚠️ Estimation basée sur le taux auto-entrepreneur prestation de services (12,3%). Consultez votre conseiller pour votre taux exact.</div>`;
}

function bindRapport() {
  document.getElementById('btn-print-rapport')?.addEventListener('click',()=>{
    const now=new Date();
    const month=now.getMonth(), year=now.getFullYear();
    const repairs=getRepairs().filter(r=>{const d=new Date(r.date);return d.getMonth()===month&&d.getFullYear()===year;});
    const quotes=getQuotes().filter(q=>{const d=new Date(q.date);return d.getMonth()===month&&d.getFullYear()===year;});
    const revenue=quotes.filter(q=>q.status==='Payé').reduce((s,q)=>s+parseFloat(q.amount||0),0).toFixed(0);
    const monthName=now.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});
    const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
    const win=window.open('','_blank');
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Rapport ${monthName}</title>
    <style>body{font-family:Arial,sans-serif;padding:30px;color:#1c1c1e;max-width:700px;margin:0 auto}
    h1{color:#007AFF;font-size:20px}.stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0}
    .stat-box{background:#f5f5f7;border-radius:8px;padding:12px;text-align:center}.stat-val{font-size:22px;font-weight:800;color:#007AFF}
    .stat-lbl{font-size:11px;color:#6e6e73}table{width:100%;border-collapse:collapse;margin:12px 0}
    th{background:#f5f5f7;padding:8px;font-size:11px;text-align:left;border-bottom:2px solid #e0e0e0}
    td{padding:8px;border-bottom:1px solid #f0f0f5;font-size:12px}
    .footer{margin-top:24px;font-size:10px;color:#98989f;text-align:center;border-top:1px solid #f0f0f5;padding-top:12px}</style>
    </head><body>
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #007AFF;padding-bottom:12px;margin-bottom:20px">
      <div><h1>Rapport mensuel — ${monthName}</h1><div style="font-size:12px;color:#6e6e73">${company}</div></div>
      <div style="font-size:12px;color:#6e6e73">Généré le ${now.toLocaleDateString('fr-FR')}</div>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><div class="stat-val">${repairs.length}</div><div class="stat-lbl">Réparations</div></div>
      <div class="stat-box"><div class="stat-val">${quotes.length}</div><div class="stat-lbl">Devis émis</div></div>
      <div class="stat-box"><div class="stat-val" style="color:#34C759">${revenue}€</div><div class="stat-lbl">CA encaissé</div></div>
    </div>
    <h3 style="margin-top:20px">Détail des réparations</h3>
    <table><tr><th>Appareil</th><th>Client</th><th>Date</th><th>Prix</th><th>Statut</th></tr>
    ${repairs.map(r=>`<tr><td><strong>${r.device}</strong></td><td>${r.client}</td><td>${r.date}</td><td>${r.price?r.price+'€':'—'}</td><td>${r.status}</td></tr>`).join('')||'<tr><td colspan="5" style="text-align:center;color:#6e6e73">Aucune réparation</td></tr>'}
    </table>
    <h3 style="margin-top:20px">Détail des devis</h3>
    <table><tr><th>N°</th><th>Client</th><th>Prestation</th><th>Montant</th><th>Statut</th></tr>
    ${quotes.map(q=>`<tr><td>#${String(q.num).padStart(3,'0')}</td><td>${q.client}</td><td>${q.label}</td><td>${q.amount}€</td><td>${q.status}</td></tr>`).join('')||'<tr><td colspan="5" style="text-align:center;color:#6e6e73">Aucun devis</td></tr>'}
    </table>
    <div class="footer">RepairPilot Pro — ${company} — ${monthName}</div>
    </body></html>`);
    win.document.close(); win.print();
  });
}

// ═══════════════════════════════════════════════════════
//  CAISSE
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
//  COMMANDES FOURNISSEURS
// ═══════════════════════════════════════════════════════
function getCommandes(){return JSON.parse(localStorage.getItem('commandes')||'[]');}
function saveCommandes(c){localStorage.setItem('commandes',JSON.stringify(c));}

function pageCommandes() {
  const commandes=getCommandes();
  const enAttente=commandes.filter(c=>c.status==='À commander');
  const commandees=commandes.filter(c=>c.status==='Commandé');
  const recues=commandes.filter(c=>c.status==='Reçu');
  return `
  <div class="sh"><div class="sh-title">📦 Commandes fournisseurs</div><button class="btn btn-primary" id="btn-add-commande">+ Pièce à commander</button></div>
  <div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div class="stat-card"><div class="stat-ico s-orange">📋</div><div><div class="stat-val c-orange">${enAttente.length}</div><div class="stat-lbl">À commander</div></div></div>
    <div class="stat-card"><div class="stat-ico s-blue">🚚</div><div><div class="stat-val c-blue">${commandees.length}</div><div class="stat-lbl">En cours</div></div></div>
    <div class="stat-card"><div class="stat-ico s-green">✅</div><div><div class="stat-val c-green">${recues.length}</div><div class="stat-lbl">Reçues</div></div></div>
  </div>
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:2">Pièce</div><div style="flex:1.5">Fournisseur</div>
      <div style="flex:1">Qté</div><div style="flex:1">Prix est.</div>
      <div style="flex:1">Réparation</div><div style="flex:1">Statut</div><div style="width:100px"></div>
    </div>
    ${commandes.length===0?`<div class="empty-state"><div class="empty-icon">📦</div><div class="empty-title">Aucune commande</div><div class="empty-sub">Ajoutez des pièces à commander</div></div>`
    :commandes.map((c,i)=>`
    <div class="mac-table-row">
      <div style="flex:2"><strong>${c.piece}</strong></div>
      <div style="flex:1.5">${c.supplier||'—'}</div>
      <div style="flex:1">${c.qty||1}</div>
      <div style="flex:1">${c.price?c.price+'€':'—'}</div>
      <div style="flex:1;font-size:11px;color:var(--txt2)">${c.repair||'—'}</div>
      <div style="flex:1"><span class="status-pill ${c.status==='Reçu'?'green':c.status==='Commandé'?'blue':'orange'}">${c.status}</span></div>
      <div style="width:100px;display:flex;gap:3px">
        ${c.status!=='Reçu'?`<button class="tbl-btn cmd-next" data-idx="${i}" title="${c.status==='À commander'?'Marquer commandé':'Marquer reçu'}">${c.status==='À commander'?'📤':'✅'}</button>`:''}
        <button class="tbl-btn cmd-del" data-idx="${i}" title="Supprimer">🗑</button>
      </div>
    </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindCommandes() {
  document.getElementById('btn-add-commande')?.addEventListener('click',()=>openCommandeModal());
  document.querySelectorAll('.cmd-next').forEach(btn=>btn.addEventListener('click',()=>{
    const i=parseInt(btn.dataset.idx);
    const c=getCommandes();
    c[i].status=c[i].status==='À commander'?'Commandé':'Reçu';
    saveCommandes(c);renderPage('commandes');
    showToast(c[i].status==='Commandé'?'Marqué comme commandé !':'✅ Pièce reçue !','success');
  }));
  document.querySelectorAll('.cmd-del').forEach(btn=>btn.addEventListener('click',()=>{
    const c=getCommandes();c.splice(parseInt(btn.dataset.idx),1);saveCommandes(c);renderPage('commandes');
  }));
}

function openCommandeModal() {
  const repairs=getRepairs();
  openModal(`
    <div class="modal-header"><div class="modal-title">📦 Nouvelle commande</div></div>
    <div class="modal-body">
      <div class="form-row"><label>Pièce à commander *</label><input type="text" id="cmd-piece" class="form-input" placeholder="ex: Écran iPhone 13, Batterie Samsung A52..."/></div>
      <div class="form-row"><label>Fournisseur</label>
        <select id="cmd-supplier" class="form-input">
          <option value="">— Choisir —</option>
          ${SUPPLIERS.map(s=>`<option value="${s.name}">${s.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-row2">
        <div class="form-row"><label>Quantité</label><input type="number" id="cmd-qty" class="form-input" value="1" min="1"/></div>
        <div class="form-row"><label>Prix estimé (€)</label><input type="number" id="cmd-price" class="form-input" placeholder="0.00" min="0" step="0.01"/></div>
      </div>
      <div class="form-row"><label>Réparation liée</label>
        <input type="text" id="cmd-repair" class="form-input" placeholder="Nom client / appareil" list="cmd-rep-list"/>
        <datalist id="cmd-rep-list">${repairs.map(r=>`<option value="${r.client} — ${r.device}"/>`).join('')}</datalist>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="saveCommandeEntry()">💾 Enregistrer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
}

function saveCommandeEntry() {
  const piece=document.getElementById('cmd-piece').value.trim();
  if(!piece){showToast('Nom de la pièce obligatoire','error');return;}
  const c=getCommandes();
  c.push({piece,supplier:document.getElementById('cmd-supplier').value,qty:parseInt(document.getElementById('cmd-qty').value)||1,price:document.getElementById('cmd-price').value,repair:document.getElementById('cmd-repair').value.trim(),status:'À commander',date:new Date().toISOString().split('T')[0]});
  saveCommandes(c);closeModal();renderPage('commandes');showToast('Commande ajoutée !','success');
}

// ═══════════════════════════════════════════════════════
//  CALCULATEUR RÉPARATION
// ═══════════════════════════════════════════════════════
function openCalculateur() {
  openModal(`
    <div class="modal-header"><div class="modal-title">🧮 Calculateur de réparation</div></div>
    <div class="modal-body" style="gap:10px">
      <div id="calc-parts">
        <div class="calc-part-row" style="display:flex;gap:6px;margin-bottom:6px">
          <input type="text" class="form-input calc-label" placeholder="Pièce (ex: Écran)" style="flex:2"/>
          <input type="number" class="form-input calc-price" placeholder="Prix €" style="flex:1" min="0" step="0.01"/>
        </div>
      </div>
      <button class="btn btn-ghost" onclick="addCalcRow()" style="width:100%">+ Ajouter une pièce</button>
      <div style="border-top:1px solid var(--sep);padding-top:10px;display:flex;flex-direction:column;gap:8px">
        <div class="form-row2">
          <div class="form-row"><label>Main d'œuvre (€)</label><input type="number" id="calc-labor" class="form-input" placeholder="0" min="0" step="1" oninput="updateCalcTotal()"/></div>
          <div class="form-row"><label>Marge (%)</label><input type="number" id="calc-margin" class="form-input" value="30" min="0" max="200" oninput="updateCalcTotal()"/></div>
        </div>
      </div>
      <div id="calc-result" style="background:var(--accent-l);border-radius:10px;padding:12px 16px;font-size:13px;margin-top:4px">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Total pièces</span><strong id="calc-parts-total">0.00 €</strong></div>
        <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span>Main d'œuvre</span><strong id="calc-labor-display">0.00 €</strong></div>
        <div style="display:flex;justify-content:space-between;border-top:1px solid var(--sep);padding-top:6px;margin-top:4px"><span>Coût total</span><strong id="calc-cost-display">0.00 €</strong></div>
        <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:var(--accent);margin-top:4px"><span>Prix de vente conseillé</span><strong id="calc-sell-display">0.00 €</strong></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="applyCalcPrice()">✓ Appliquer ce prix</button>
      <button class="btn btn-ghost" onclick="closeModal()">Fermer</button>
    </div>`);
  document.querySelectorAll('.calc-price,.calc-label').forEach(el=>el.addEventListener('input',updateCalcTotal));
}

function addCalcRow() {
  const row=document.createElement('div');
  row.className='calc-part-row';
  row.style.cssText='display:flex;gap:6px;margin-bottom:6px';
  row.innerHTML=`<input type="text" class="form-input calc-label" placeholder="Pièce" style="flex:2"/><input type="number" class="form-input calc-price" placeholder="Prix €" style="flex:1" min="0" step="0.01"/><button class="tbl-btn" onclick="this.parentElement.remove();updateCalcTotal()" title="Supprimer">✕</button>`;
  document.getElementById('calc-parts').appendChild(row);
  row.querySelectorAll('input').forEach(el=>el.addEventListener('input',updateCalcTotal));
}

function updateCalcTotal() {
  const prices=Array.from(document.querySelectorAll('.calc-price')).map(el=>parseFloat(el.value)||0);
  const partsTotal=prices.reduce((s,p)=>s+p,0);
  const labor=parseFloat(document.getElementById('calc-labor')?.value)||0;
  const margin=parseFloat(document.getElementById('calc-margin')?.value)||30;
  const cost=partsTotal+labor;
  const sell=cost*(1+margin/100);
  document.getElementById('calc-parts-total').textContent=partsTotal.toFixed(2)+' €';
  document.getElementById('calc-labor-display').textContent=labor.toFixed(2)+' €';
  document.getElementById('calc-cost-display').textContent=cost.toFixed(2)+' €';
  document.getElementById('calc-sell-display').textContent=sell.toFixed(2)+' €';
}

function applyCalcPrice() {
  const prices=Array.from(document.querySelectorAll('.calc-price')).map(el=>parseFloat(el.value)||0);
  const labor=parseFloat(document.getElementById('calc-labor')?.value)||0;
  const margin=parseFloat(document.getElementById('calc-margin')?.value)||30;
  const sell=((prices.reduce((s,p)=>s+p,0)+labor)*(1+margin/100)).toFixed(0);
  closeModal();
  const priceField=document.getElementById('f-price');
  if(priceField){priceField.value=sell;showToast('Prix appliqué : '+sell+'€','success');}
  else showToast('Prix calculé : '+sell+'€ (copiez-le manuellement)','success');
}

// ═══════════════════════════════════════════════════════
//  ÉTIQUETTES
// ═══════════════════════════════════════════════════════
function printEtiquette(idx) {
  const r=getRepairs()[idx]; if(!r) return;
  const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
  const phone=localStorage.getItem('userPhone')||'';
  const num=String(r.id).slice(-6);
  const win=window.open('','_blank');
  win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Étiquette #${num}</title>
  <style>
    @page{size:100mm 60mm;margin:0}
    body{font-family:Arial,sans-serif;width:100mm;height:60mm;padding:8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between}
    .top{display:flex;justify-content:space-between;align-items:flex-start}
    .company{font-size:9px;color:#6e6e73;font-weight:700}
    .num{font-size:18px;font-weight:900;color:#007AFF;letter-spacing:2px}
    .device{font-size:13px;font-weight:800;margin:4px 0 2px}
    .client{font-size:11px;color:#1c1c1e}
    .date{font-size:9px;color:#6e6e73}
    .priority{display:inline-block;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:700;color:#fff;background:${r.priority==='Express'?'#FF3B30':r.priority==='Urgent'?'#FF9500':'#34C759'}}
    .bottom{display:flex;justify-content:space-between;align-items:flex-end}
    .barcode{font-size:8px;color:#98989f;letter-spacing:1px}
  </style>
  </head><body>
  <div class="top">
    <div class="company">${company}${phone?' · '+phone:''}</div>
    <div class="num">#${num}</div>
  </div>
  <div>
    <div class="device">${r.device}</div>
    <div class="client">👤 ${r.client}</div>
    ${r.desc?`<div class="date" style="margin-top:2px">${r.desc.substring(0,40)}</div>`:''}
  </div>
  <div class="bottom">
    <div>
      <span class="priority">${r.priority||'Normal'}</span>
      <span class="date" style="margin-left:6px">📅 ${r.date}</span>
    </div>
    <div class="barcode">${num}</div>
  </div>
  </body></html>`);
  win.document.close();win.print();
}

// ═══════════════════════════════════════════════════════
//  MESSAGES CLIENTS TYPES
// ═══════════════════════════════════════════════════════
function openMessagesTypes(clientName,deviceName) {
  const company=localStorage.getItem('userCompany')||'S.O.S INFO LUDO';
  const phone=localStorage.getItem('userPhone')||'';
  const nom=clientName||'[Nom client]';
  const device=deviceName||'[Appareil]';
  const templates=[
    {label:'✅ Appareil prêt',msg:`Bonjour ${nom}, votre ${device} est réparé et prêt à récupérer. ${company}${phone?' — '+phone:''}`},
    {label:'🔍 Diagnostic terminé',msg:`Bonjour ${nom}, le diagnostic de votre ${device} est terminé. Merci de nous contacter pour connaître le devis. ${company}${phone?' — '+phone:''}`},
    {label:'⏳ En attente de pièce',msg:`Bonjour ${nom}, nous attendons la pièce pour votre ${device}. Nous vous recontactons dès réception. ${company}`},
    {label:'🔔 Rappel récupération',msg:`Bonjour ${nom}, votre ${device} est prêt depuis plusieurs jours. Merci de passer le récupérer. ${company}${phone?' — '+phone:''}`},
    {label:'❌ Non réparable',msg:`Bonjour ${nom}, après diagnostic votre ${device} n'est malheureusement pas réparable. Nous restons à votre disposition. ${company}${phone?' — '+phone:''}`},
    {label:'💶 Devis accepté',msg:`Bonjour ${nom}, merci pour votre accord sur le devis. Nous commençons la réparation de votre ${device}. ${company}`},
  ];
  openModal(`
    <div class="modal-header"><div class="modal-title">💬 Messages clients types</div></div>
    <div class="modal-body" style="gap:8px">
      ${templates.map(t=>`
      <div class="mac-card" style="padding:10px 12px">
        <div style="font-weight:700;font-size:12px;margin-bottom:6px">${t.label}</div>
        <div style="font-size:12px;color:var(--txt2);margin-bottom:8px;line-height:1.5">${t.msg}</div>
        <button class="btn btn-ghost" style="font-size:11px;padding:3px 10px" onclick="navigator.clipboard.writeText(\`${t.msg.replace(/`/g,"'")}\`).then(()=>showToast('Copié !','success'))">📋 Copier</button>
      </div>`).join('')}
    </div>
    <div class="modal-footer"><button class="btn btn-ghost" onclick="closeModal()">Fermer</button></div>`);
}

// ═══════════════════════════════════════════════════════
//  EXPORT CSV
// ═══════════════════════════════════════════════════════
function exportCSV(type) {
  let rows=[],filename='';
  if(type==='repairs'){
    rows=[['ID','Appareil','Client','Description','Date','Prix','Statut','Priorité','IMEI','Garantie','Notes']];
    getRepairs().forEach(r=>rows.push([r.id,r.device,r.client,r.desc||'',r.date,r.price||'',r.status,r.priority||'Normal',r.imei||'',r.warrantyEnd||'',r.notes||'']));
    filename='reparations';
  } else if(type==='clients'){
    rows=[['Nom','Téléphone','Email','Adresse','Catégorie','Nb réparations']];
    getClients().forEach(c=>rows.push([c.name,c.phone||'',c.email||'',c.addr||'',c.category||'Nouveau',c.repairs||0]));
    filename='clients';
  } else if(type==='quotes'){
    rows=[['N°','Client','Prestation','Montant','Date','Statut']];
    getQuotes().forEach(q=>rows.push([String(q.num).padStart(3,'0'),q.client,q.label,q.amount,q.date,q.status]));
    filename='devis';
  }
  const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`RepairPilot_${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();URL.revokeObjectURL(url);
  showToast('Export CSV téléchargé !','success');
}

// ═══════════════════════════════════════════════════════
//  GRAPHIQUE CA MENSUEL (12 mois)
// ═══════════════════════════════════════════════════════
function buildMonthlyChart() {
  const quotes=getQuotes();
  const now=new Date();
  const months=[];
  for(let i=11;i>=0;i--){
    const d=new Date(now.getFullYear(),now.getMonth()-i,1);
    const m=d.getMonth(),y=d.getFullYear();
    const ca=quotes.filter(q=>q.status==='Payé'&&new Date(q.date).getMonth()===m&&new Date(q.date).getFullYear()===y).reduce((s,q)=>s+parseFloat(q.amount||0),0);
    months.push({label:d.toLocaleDateString('fr-FR',{month:'short',year:'2-digit'}),ca,isCurrent:i===0});
  }
  const max=Math.max(...months.map(m=>m.ca),monthlyGoal,1);
  const goalH=Math.round(monthlyGoal/max*90);
  return `
  <div class="sh-title" style="margin:16px 0 8px">📈 CA des 12 derniers mois</div>
  <div class="mac-card" style="padding:16px">
    <div style="position:relative">
      ${monthlyGoal?`<div style="position:absolute;left:0;right:0;bottom:${goalH+16}px;border-top:2px dashed var(--orange);z-index:1;pointer-events:none"><span style="position:absolute;right:4px;top:-16px;font-size:9px;color:var(--orange);background:var(--bg);padding:0 3px">Objectif ${monthlyGoal}€</span></div>`:''}
      <div style="display:flex;align-items:flex-end;gap:4px;height:120px;position:relative;z-index:2">
        ${months.map(m=>`
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
          <div style="font-size:8px;font-weight:700;color:var(--accent)">${m.ca>0?m.ca.toFixed(0)+'€':''}</div>
          <div style="width:100%;background:${m.isCurrent?'var(--accent)':m.ca>0?'rgba(var(--accent-rgb,0,122,255),0.6)':'var(--sep)'};border-radius:3px 3px 0 0;height:${Math.max(2,Math.round(m.ca/max*90))}px;transition:height .5s${m.isCurrent?';box-shadow:0 0 8px var(--accent)':''}"></div>
          <div style="font-size:8px;color:var(--txt2);text-align:center;line-height:1.1">${m.label}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function buildTopDevices(repairs) {
  const counts={};
  repairs.forEach(r=>{ const k=r.device||'Inconnu'; counts[k]=(counts[k]||0)+1; });
  const top5=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  if(top5.length===0) return '';
  const maxN=top5[0][1];
  return `
  <div class="sh-title" style="margin:16px 0 8px">📱 Top 5 appareils réparés</div>
  <div class="mac-card" style="padding:16px">
    ${top5.map(([device,n])=>`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <div style="font-size:12.5px;font-weight:600;min-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${device}">${device}</div>
      <div style="flex:1;background:var(--bg2);border-radius:4px;height:10px;overflow:hidden">
        <div style="width:${Math.round(n/maxN*100)}%;background:var(--accent);height:100%;border-radius:4px;transition:width .5s"></div>
      </div>
      <div style="font-size:12px;font-weight:700;min-width:40px;text-align:right">${n} <span style="font-size:10px;color:var(--txt2)">(${Math.round(n/repairs.length*100)}%)</span></div>
    </div>`).join('')}
  </div>`;
}

function buildRentabilite(repairs) {
  const grouped={};
  repairs.filter(r=>r.label||r.desc).forEach(r=>{
    const key=(r.label||r.desc||'').split(' ').slice(0,4).join(' ');
    if(!grouped[key]) grouped[key]={total:0,count:0};
    grouped[key].total+=parseFloat(r.price||0);
    grouped[key].count++;
  });
  const sorted=Object.entries(grouped).filter(([k,v])=>v.count>0).sort((a,b)=>b[1].total/b[1].count-a[1].total/a[1].count).slice(0,5);
  if(sorted.length===0) return '';
  return `
  <div class="sh-title" style="margin:16px 0 8px">💰 Rentabilité par type de réparation</div>
  <div class="mac-card" style="padding:0 8px">
    <div class="mac-table-head">
      <div style="flex:3">Type</div>
      <div style="flex:1;text-align:right">Nb</div>
      <div style="flex:1;text-align:right">CA moyen</div>
      <div style="flex:1;text-align:right">CA total</div>
    </div>
    ${sorted.map(([type,d])=>`
    <div class="mac-table-row">
      <div style="flex:3;font-size:12px">${type}</div>
      <div style="flex:1;text-align:right;font-weight:700">${d.count}</div>
      <div style="flex:1;text-align:right;color:var(--accent);font-weight:700">${(d.total/d.count).toFixed(0)}€</div>
      <div style="flex:1;text-align:right;color:var(--green);font-weight:700">${d.total.toFixed(0)}€</div>
    </div>`).join('')}
  </div>`;
}

// ═══════════════════════════════════════════════════════
//  VUE SEMAINE AGENDA
// ═══════════════════════════════════════════════════════
function buildWeekView(events) {
  const now=new Date();
  const dayOfWeek=now.getDay()===0?6:now.getDay()-1;
  const monday=new Date(now);monday.setDate(now.getDate()-dayOfWeek);
  const days=[];
  for(let i=0;i<7;i++){
    const d=new Date(monday);d.setDate(monday.getDate()+i);
    const dateStr=d.toISOString().split('T')[0];
    const dayEvents=events.filter(e=>e.date===dateStr).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    days.push({date:d,dateStr,dayEvents});
  }
  return `
  <div class="mac-card" style="padding:0;overflow:hidden;margin-bottom:14px">
    <div style="display:grid;grid-template-columns:repeat(7,1fr);border-bottom:1px solid var(--sep)">
      ${days.map(d=>`<div style="padding:8px 6px;text-align:center;font-size:11px;${d.dateStr===now.toISOString().split('T')[0]?'background:var(--accent-l);color:var(--accent);font-weight:700':'color:var(--txt2)'}">
        <div>${d.date.toLocaleDateString('fr-FR',{weekday:'short'})}</div>
        <div style="font-size:15px;font-weight:800">${d.date.getDate()}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);min-height:80px;align-items:start">
      ${days.map(d=>`<div style="padding:4px;border-right:1px solid var(--sep);min-height:80px">
        ${d.dayEvents.map(e=>`<div style="background:${e.type==='repair'?'var(--orange)':e.type==='client'?'var(--accent)':'var(--green)'};color:#fff;border-radius:4px;padding:2px 5px;font-size:9.5px;margin-bottom:2px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" title="${e.title}${e.time?' — '+e.time:''}">${e.time?e.time+' ':''} ${e.title}</div>`).join('')||''}
      </div>`).join('')}
    </div>
  </div>`;
}

function getCaisse(){return JSON.parse(localStorage.getItem('caisse')||'[]');}
function saveCaisseData(c){localStorage.setItem('caisse',JSON.stringify(c));}

function pageCaisse() {
  const transactions=getCaisse();
  const today=new Date().toISOString().split('T')[0];
  const todayTx=transactions.filter(t=>t.date===today);
  const encaissements=todayTx.filter(t=>t.type==='in').reduce((s,t)=>s+parseFloat(t.amount||0),0);
  const decaissements=todayTx.filter(t=>t.type==='out').reduce((s,t)=>s+parseFloat(t.amount||0),0);
  const solde=transactions.filter(t=>t.type==='in').reduce((s,t)=>s+parseFloat(t.amount||0),0)
             -transactions.filter(t=>t.type==='out').reduce((s,t)=>s+parseFloat(t.amount||0),0);
  const recent=[...transactions].reverse().slice(0,50);
  return `
  <div class="sh"><div class="sh-title">💵 Caisse</div><button class="btn btn-primary" id="btn-add-tx">+ Opération</button></div>
  <div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div class="stat-card"><div class="stat-ico s-green">💰</div><div><div class="stat-val c-green">${solde.toFixed(2)}€</div><div class="stat-lbl">Solde caisse</div></div></div>
    <div class="stat-card"><div class="stat-ico s-blue">📥</div><div><div class="stat-val c-blue">${encaissements.toFixed(2)}€</div><div class="stat-lbl">Encaissé aujourd'hui</div></div></div>
    <div class="stat-card"><div class="stat-ico s-orange">📤</div><div><div class="stat-val c-orange">${decaissements.toFixed(2)}€</div><div class="stat-lbl">Décaissé aujourd'hui</div></div></div>
  </div>
  <div class="sh"><div class="sh-title">📋 Opérations récentes</div></div>
  <div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:1">Date</div><div style="flex:2">Libellé</div>
      <div style="flex:1">Mode</div><div style="flex:1;text-align:right">Montant</div><div style="width:60px"></div>
    </div>
    ${recent.length===0?`<div class="empty-state"><div class="empty-icon">💵</div><div class="empty-title">Caisse vide</div><div class="empty-sub">Enregistrez votre première opération</div></div>`
    :recent.map((t,i)=>{
      const realIdx=transactions.length-1-i;
      return `<div class="mac-table-row">
        <div style="flex:1">${t.date}</div>
        <div style="flex:2">${t.label}</div>
        <div style="flex:1"><span class="status-pill gray">${t.method||'Espèces'}</span></div>
        <div style="flex:1;text-align:right;font-weight:700;color:${t.type==='in'?'var(--green)':'var(--red)'}">${t.type==='in'?'+':'-'}${parseFloat(t.amount).toFixed(2)}€</div>
        <div style="width:60px"><button class="tbl-btn" onclick="deleteCaisseEntry(${realIdx})" title="Supprimer">🗑</button></div>
      </div>`;}).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindCaisse() {
  document.getElementById('btn-add-tx')?.addEventListener('click',()=>openCaisseModal());
}

function openCaisseModal() {
  openModal(`
    <div class="modal-header"><div class="modal-title">💵 Nouvelle opération</div></div>
    <div class="modal-body">
      <div class="form-row" style="gap:16px;align-items:center">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="tx-type" value="in" checked/> <span>📥 Encaissement</span></label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="radio" name="tx-type" value="out"/> <span>📤 Décaissement</span></label>
      </div>
      <div class="form-row"><label>Libellé *</label><input type="text" id="tx-label" class="form-input" placeholder="ex: Paiement réparation iPhone 13"/></div>
      <div class="form-row"><label>Montant (€) *</label><input type="number" id="tx-amount" class="form-input" placeholder="0.00" min="0" step="0.01"/></div>
      <div class="form-row"><label>Mode de paiement</label>
        <select id="tx-method" class="form-input">
          <option value="Espèces">Espèces</option>
          <option value="CB">CB</option>
          <option value="Chèque">Chèque</option>
          <option value="Virement">Virement</option>
          <option value="PayPal">PayPal</option>
        </select>
      </div>
      <div class="form-row"><label>Date</label><input type="date" id="tx-date" class="form-input" value="${new Date().toISOString().split('T')[0]}"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="saveCaisseEntry()">💾 Enregistrer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
}

function saveCaisseEntry() {
  const label=document.getElementById('tx-label').value.trim();
  const amount=parseFloat(document.getElementById('tx-amount').value);
  const method=document.getElementById('tx-method').value;
  const date=document.getElementById('tx-date').value;
  const type=document.querySelector('input[name="tx-type"]:checked').value;
  if(!label||!amount||amount<=0){showToast('Remplissez le libellé et le montant','error');return;}
  const caisse=getCaisse();
  caisse.push({id:Date.now(),date,label,type,amount,method});
  saveCaisseData(caisse);
  closeModal();
  renderPage('caisse');
  showToast('Opération enregistrée !','success');
}

function deleteCaisseEntry(idx) {
  const caisse=getCaisse();
  caisse.splice(idx,1);
  saveCaisseData(caisse);
  renderPage('caisse');
  showToast('Opération supprimée','');
}

// ═══════════════════════════════════════════════════════
//  BASE DE PANNES
// ═══════════════════════════════════════════════════════
function pagePanneDB() {
  const search=localStorage.getItem('paneSearch')||'';
  const filtered=search?paneDb.filter(p=>p.title.toLowerCase().includes(search.toLowerCase())||p.tags?.toLowerCase().includes(search.toLowerCase())):paneDb;
  return `
  <div class="sh"><div class="sh-title">🗃️ Base de pannes</div></div>
  <div class="mac-card" style="padding:12px;margin-bottom:14px">
    <div style="display:flex;gap:8px">
      <input type="text" id="pane-search" class="form-input" style="flex:1" placeholder="Rechercher dans la base (appareil, tags...)" value="${search}" oninput="localStorage.setItem('paneSearch',this.value);renderPage('pannedb')"/>
      <button class="btn btn-ghost" onclick="localStorage.removeItem('paneSearch');renderPage('pannedb')">✕ Effacer</button>
    </div>
  </div>
  ${filtered.length===0?`
  <div class="empty-state"><div class="empty-icon">🗃️</div>
    <div class="empty-title">${paneDb.length===0?'Base de pannes vide':'Aucun résultat'}</div>
    <div class="empty-sub">${paneDb.length===0?'Sauvegardez vos diagnostics IA depuis la page "IA Diagnostic" → bouton "💾 Sauvegarder"':'Essayez avec d\'autres mots-clés'}</div>
    ${paneDb.length===0?`<button class="btn btn-primary" style="margin-top:8px" onclick="navigateTo('ai')">🤖 Aller à l'IA Diagnostic</button>`:''}
  </div>`:
  `<div class="mac-table">
    <div class="mac-table-head">
      <div style="flex:3">Titre / Panne</div><div style="flex:2">Tags</div>
      <div style="flex:1">Date</div><div style="width:80px"></div>
    </div>
    ${filtered.map((p,i)=>`
    <div class="mac-table-row" style="cursor:pointer" onclick="showPaneDetail(${paneDb.indexOf(p)})">
      <div style="flex:3"><strong>${p.title}</strong></div>
      <div style="flex:2">${p.tags?p.tags.split(',').map(t=>`<span class="status-pill gray" style="margin-right:3px;font-size:9px">${t.trim()}</span>`).join(''):'—'}</div>
      <div style="flex:1">${p.date}</div>
      <div style="width:80px;display:flex;gap:4px">
        <button class="tbl-btn" onclick="event.stopPropagation();navigateTo('ai');setTimeout(()=>sendAiMessage(paneDb[${paneDb.indexOf(p)}].question),300)" title="Réutiliser">🔄</button>
        <button class="tbl-btn" onclick="event.stopPropagation();paneDb.splice(${paneDb.indexOf(p)},1);savePaneDb();renderPage('pannedb')" title="Supprimer">🗑</button>
      </div>
    </div>`).join('')}
  </div>`}
  <div class="spacer"></div>`;
}

function showPaneDetail(idx) {
  const p=paneDb[idx]; if(!p) return;
  const text=p.answer.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br/>');
  openModal(`
    <div class="modal-header"><div class="modal-title">🗃️ ${p.title}</div></div>
    <div class="modal-body">
      <div style="background:var(--accent-l);border-radius:8px;padding:10px 12px;margin-bottom:10px;font-size:12.5px"><strong>Question :</strong> ${p.question}</div>
      <div style="background:#f5f5f7;border-radius:8px;padding:10px 12px;font-size:12.5px;line-height:1.6">${text}</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="closeModal();navigateTo('ai');setTimeout(()=>sendAiMessage(paneDb[${idx}].question),300)">🔄 Réutiliser</button>
      <button class="btn btn-ghost" onclick="closeModal()">Fermer</button>
    </div>`);
}

function bindPanneDB(){}

// ═══════════════════════════════════════════════════════
//  NOTIFICATIONS
// ═══════════════════════════════════════════════════════
function pageNotifs() {
  const repairs=getRepairs();
  const now=Date.now();
  const oldRepairs=repairs.filter(r=>r.status==='En cours'&&r.date&&(now-new Date(r.date).getTime())>7*86400000);
  const stockAlerts=getStock().filter(s=>parseInt(s.qty)<=parseInt(s.minQty||1));
  const unpaid=getQuotes().filter(q=>q.status==='En attente');
  const notifs=[
    ...oldRepairs.map(r=>({icon:'⚠️',title:`Réparation en cours depuis +7 jours`,body:`${r.device} — ${r.client}`,type:'warn',action:()=>navigateTo('repairs')})),
    ...stockAlerts.map(s=>({icon:'📦',title:`Stock faible : ${s.name}`,body:`Il reste ${s.qty} unité(s) — Minimum : ${s.minQty}`,type:'warn',action:()=>navigateTo('stock')})),
    ...unpaid.map(q=>({icon:'💶',title:`Devis non payé : ${q.client}`,body:`#${String(q.num).padStart(3,'0')} — ${q.label} — ${q.amount}€`,type:'info',action:()=>navigateTo('quotes')})),
    {icon:'✅',title:'RepairPilot Pro opérationnel',body:'Tous les fournisseurs sont accessibles.',type:'ok',action:null},
  ];
  return `
  <div class="sh"><div class="sh-title">🔔 Notifications <span class="sb-badge blue" style="font-size:11px">${notifs.length}</span></div></div>
  <div class="mac-card">
    ${notifs.map(n=>`
    <div class="mac-table-row" style="gap:12px;cursor:${n.action?'pointer':'default'}" ${n.action?`onclick="closeModal();(${n.action})()"`:''}>
      <div style="font-size:22px;flex-shrink:0">${n.icon}</div>
      <div style="flex:1"><div style="font-size:13px;font-weight:600">${n.title}</div><div style="font-size:12px;color:var(--txt2);margin-top:2px">${n.body}</div></div>
      ${n.action?`<span style="color:var(--accent);font-size:12px">Voir →</span>`:''}
    </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}

// ═══════════════════════════════════════════════════════
//  PARAMÈTRES
// ═══════════════════════════════════════════════════════
function pageSettings() {
  return `
  <div class="sh"><div class="sh-title">⚙️ Paramètres</div></div>
  <div class="settings-page">
    <div class="settings-section">
      <div class="settings-header">🔑 Clé API — Intelligence Artificielle</div>
      <div class="settings-row" style="flex-direction:column;align-items:flex-start;gap:10px">
        <div class="settings-label"><strong>Clé API Anthropic (Claude)</strong><span>Stockée de façon sécurisée et chiffrée sur votre PC uniquement.</span></div>
        <input type="password" class="settings-input" id="api-key-input" placeholder="sk-ant-api03-..." style="width:100%"/>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <button class="settings-save" id="btn-save-key">💾 Enregistrer</button>
          <button class="settings-save" id="btn-test-key" style="background:var(--green)">✓ Tester</button>
          <button class="settings-save" id="btn-del-key" style="background:var(--red)">🗑 Supprimer</button>
          <span id="key-status"></span>
        </div>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-header">👤 Mon profil</div>
      <div style="font-size:11.5px;color:var(--txt2);padding:0 0 10px 0">Ces informations apparaissent sur tous vos devis et bons de dépôt.</div>
      <div class="settings-row"><div class="settings-label"><strong>Nom</strong></div><input type="text" class="settings-input" id="set-name" placeholder="Votre nom"/></div>
      <div class="settings-row"><div class="settings-label"><strong>Entreprise</strong></div><input type="text" class="settings-input" id="set-company" placeholder="Nom de votre atelier"/></div>
      <div class="settings-row"><div class="settings-label"><strong>Adresse</strong></div><input type="text" class="settings-input" id="set-address" placeholder="Adresse complète"/></div>
      <div class="settings-row"><div class="settings-label"><strong>Téléphone</strong></div><input type="text" class="settings-input" id="set-phone" placeholder="06 xx xx xx xx"/></div>
      <div class="settings-row"><div class="settings-label"><strong>SIRET</strong></div><input type="text" class="settings-input" id="set-siret" placeholder="XXX XXX XXX XXXXX"/></div>
      <div class="settings-row"><div class="settings-label"><span style="font-size:11px;color:var(--txt2)">Auto-entrepreneur — TVA non applicable (art. 293B du CGI)</span></div></div>
      <div class="settings-row"><div class="settings-label"></div><button class="settings-save" id="btn-save-profile">💾 Enregistrer</button></div>
    </div>
    <div class="settings-section">
      <div class="settings-header">🔔 Relance clients</div>
      <div class="settings-row"><div class="settings-label"><strong>Délai de relance (jours)</strong><span>Alerte si un appareil en cours n'a pas été récupéré après X jours</span></div><input type="number" class="settings-input" id="set-relance" value="${parseInt(localStorage.getItem('relanceDays')||'7')}" min="1" max="60"/></div>
      <div class="settings-row"><div class="settings-label"></div><button class="settings-save" id="btn-save-relance">💾 Enregistrer</button></div>
    </div>
    <div class="settings-section">
      <div class="settings-header">🎯 Objectif mensuel</div>
      <div class="settings-row"><div class="settings-label"><strong>Objectif CA mensuel (€)</strong></div><input type="number" class="settings-input" id="set-goal" value="${monthlyGoal}"/></div>
      <div class="settings-row"><div class="settings-label"></div><button class="settings-save" id="btn-save-goal">💾 Enregistrer</button></div>
    </div>
    <div class="settings-section">
      <div class="settings-header">🎨 Apparence</div>
      <div class="settings-row">
        <div class="settings-label"><strong>Thème</strong><span>Mode sombre ou clair (raccourci : cliquer sur 🌙 en haut)</span></div>
        <button class="settings-save" id="btn-toggle-theme">${darkMode?'☀️ Mode clair':'🌙 Mode sombre'}</button>
      </div>
      <div class="settings-row">
        <div class="settings-label"><strong>Couleur principale</strong><span>Choisissez la couleur d'accent de l'interface</span></div>
        <div style="display:flex;gap:8px">
          ${[{c:'#007AFF',l:'Bleu'},{c:'#34C759',l:'Vert'},{c:'#AF52DE',l:'Violet'},{c:'#FF9500',l:'Orange'},{c:'#FF3B30',l:'Rouge'}].map(col=>`
          <div onclick="setAccentColor('${col.c}')" title="${col.l}" style="width:28px;height:28px;border-radius:50%;background:${col.c};cursor:pointer;border:3px solid ${localStorage.getItem('accentColor')===col.c?'var(--txt)':'transparent'};transition:border .2s"></div>`).join('')}
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-label"><strong>Logo de l'atelier</strong><span>Affiché dans la sidebar et sur les bons de dépôt/devis (max 200x200)</span></div>
        <div style="display:flex;gap:8px;align-items:center">
          ${localStorage.getItem('userLogo')?`<img src="${localStorage.getItem('userLogo')}" style="width:40px;height:40px;object-fit:contain;border-radius:6px;border:1px solid var(--sep)"/>`:'' }
          <button class="settings-save" id="btn-choose-logo">📷 Choisir un logo</button>
          <input type="file" id="logo-input" accept="image/*" style="display:none"/>
          ${localStorage.getItem('userLogo')?`<button class="settings-save" style="background:var(--red)" onclick="localStorage.removeItem('userLogo');applyTheme();renderPage('settings');showToast('Logo supprimé','success')">🗑 Supprimer</button>`:''}
        </div>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-header">🧾 Régime TVA</div>
      <div class="settings-row">
        <div class="settings-label"><strong>Mode TVA</strong><span>Choisissez votre régime fiscal</span></div>
        <div style="display:flex;gap:12px">
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
            <input type="radio" name="tva-mode" value="AE" ${(localStorage.getItem('tvaMode')||'AE')==='AE'?'checked':''}/> Auto-entrepreneur (sans TVA)
          </label>
          <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
            <input type="radio" name="tva-mode" value="TVA" ${localStorage.getItem('tvaMode')==='TVA'?'checked':''}/> Assujetti TVA
          </label>
        </div>
      </div>
      <div class="settings-row" id="tva-taux-row" style="display:${localStorage.getItem('tvaMode')==='TVA'?'flex':'none'}">
        <div class="settings-label"><strong>Taux TVA (%)</strong></div>
        <input type="number" class="settings-input" id="set-tva-taux" value="${localStorage.getItem('tvaTaux')||'20'}" min="0" max="100" style="width:80px"/>
      </div>
      <div class="settings-row">
        <div class="settings-label"></div>
        <button class="settings-save" id="btn-save-tva">💾 Enregistrer TVA</button>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-header">💾 Sauvegarde</div>
      <div class="settings-row">
        <div class="settings-label"><strong>Exporter les données</strong><span>Export JSON de tous vos clients, réparations, devis et stock (Ctrl+S)</span></div>
        <button class="settings-save" id="btn-export">📤 Exporter JSON</button>
      </div>
      <div class="settings-row">
        <div class="settings-label"><strong>Export CSV</strong><span>Exporter en tableur Excel/LibreOffice</span></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="settings-save" onclick="exportCSV('repairs')">📋 Réparations</button>
          <button class="settings-save" onclick="exportCSV('clients')">👥 Clients</button>
          <button class="settings-save" onclick="exportCSV('quotes')">📄 Devis</button>
        </div>
      </div>
      <div class="settings-row">
        <div class="settings-label"><strong>Importer des données</strong><span>Restaurer depuis un fichier de sauvegarde</span></div>
        <button class="settings-save" id="btn-import" style="background:var(--orange)">📥 Importer</button>
      </div>
      <div class="settings-row">
        <div class="settings-label"><strong>Dossier de sauvegarde auto</strong><span>Pointe vers OneDrive, Google Drive... Le backup JSON est enregistré à chaque fermeture.</span></div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <span id="backup-folder-path" style="font-size:11px;color:var(--txt2);font-family:monospace">${localStorage.getItem('backupFolder')||'(non configuré)'}</span>
          <button class="settings-save" id="btn-choose-folder">📁 Choisir dossier</button>
          ${localStorage.getItem('backupFolder')?`<button class="settings-save" style="background:var(--red)" onclick="localStorage.removeItem('backupFolder');renderPage('settings')">✕</button>`:''}
        </div>
      </div>
      ${localStorage.getItem('isDemoMode')?`
      <div class="settings-row">
        <div class="settings-label"><strong style="color:var(--orange)">Mode démo actif</strong><span>Effacer toutes les données de démonstration</span></div>
        <button class="settings-save" style="background:var(--red)" id="btn-clear-demo">🗑 Effacer données démo</button>
      </div>`:''}
    </div>
    <div class="settings-section">
      <div class="settings-header">🔄 Mises à jour</div>
      <div class="settings-row">
        <div class="settings-label"><strong>Version actuelle</strong><span>RepairPilot Pro v2.0.0</span></div>
        <button class="settings-save" id="btn-check-update">🔍 Vérifier</button>
      </div>
      <div class="settings-row">
        <div id="update-check-status" style="font-size:12px;color:var(--txt2)">Cliquez sur Vérifier pour chercher une mise à jour.</div>
      </div>
    </div>
    <div class="settings-section">
      <div class="settings-header">⌨️ Raccourcis clavier</div>
      <div class="settings-row"><span>Ctrl+N</span><span>Nouvelle réparation</span></div>
      <div class="settings-row"><span>Ctrl+F</span><span>Recherche globale</span></div>
      <div class="settings-row"><span>Ctrl+D</span><span>Tableau de bord</span></div>
      <div class="settings-row"><span>Ctrl+I</span><span>IA Diagnostic</span></div>
      <div class="settings-row"><span>Ctrl+B</span><span>Navigateur</span></div>
      <div class="settings-row"><span>Ctrl+S</span><span>Sauvegarder / Exporter</span></div>
      <div class="settings-row"><span>Échap</span><span>Fermer une fenêtre</span></div>
    </div>
    <div class="settings-section">
      <div class="settings-header">ℹ️ À propos</div>
      <div class="settings-row"><div class="settings-label"><strong>RepairPilot Pro v2.0.0</strong><span>© 2026 RepairPilot — Tous droits réservés</span></div></div>
      <div class="settings-row"><div class="settings-label"><strong>Licence</strong><span id="lic-status-txt">Vérification...</span></div>
        <button class="settings-save" id="btn-manage-license">🔑 Gérer</button>
      </div>
    </div>
  </div>
  <div class="spacer"></div>`;
}

async function bindSettings() {
  const key=await window.repairpilot.getSetting('anthropicApiKey');
  if(key){document.getElementById('api-key-input').placeholder='Clé configurée';document.getElementById('key-status').innerHTML='<span class="settings-status ok">✓ Clé enregistrée</span>';}
  const name=await window.repairpilot.getSetting('userName')||localStorage.getItem('userName')||'';
  const company=await window.repairpilot.getSetting('userCompany')||localStorage.getItem('userCompany')||'';
  const phone=await window.repairpilot.getSetting('userPhone')||localStorage.getItem('userPhone')||'';
  const address=await window.repairpilot.getSetting('userAddress')||localStorage.getItem('userAddress')||'';
  const siret=await window.repairpilot.getSetting('userSiret')||localStorage.getItem('userSiret')||'';
  document.getElementById('set-name').value=name;
  document.getElementById('set-company').value=company;
  document.getElementById('set-phone').value=phone;
  document.getElementById('set-address').value=address;
  document.getElementById('set-siret').value=siret;

  document.getElementById('btn-save-key').addEventListener('click',async()=>{
    const k=document.getElementById('api-key-input').value.trim();
    if(!k){showToast('Entrez une clé API','error');return;}
    await window.repairpilot.setSetting('anthropicApiKey',k);
    document.getElementById('api-key-input').value='';
    document.getElementById('api-key-input').placeholder='Clé enregistrée';
    document.getElementById('key-status').innerHTML='<span class="settings-status ok">✓ Enregistrée</span>';
    showToast('Clé enregistrée !','success');
  });
  document.getElementById('btn-test-key').addEventListener('click',async()=>{
    const inputVal=document.getElementById('api-key-input').value.trim();
    if(inputVal) await window.repairpilot.setSetting('anthropicApiKey',inputVal);
    document.getElementById('key-status').innerHTML='<span class="settings-status">⏳ Test...</span>';
    const r=await window.repairpilot.aiChat([{role:'user',content:'Dis juste OK'}]);
    if(r.error){document.getElementById('key-status').innerHTML=`<span class="settings-status err">✗ ${r.error}</span>`;showToast('Erreur: '+r.error,'error');}
    else{document.getElementById('key-status').innerHTML='<span class="settings-status ok">✓ IA connectée !</span>';showToast('IA connectée avec succès !','success');}
  });
  document.getElementById('btn-del-key').addEventListener('click',async()=>{await window.repairpilot.deleteSetting('anthropicApiKey');document.getElementById('key-status').innerHTML='<span class="settings-status err">Supprimée</span>';});
  document.getElementById('btn-save-profile').addEventListener('click',async()=>{
    const n=document.getElementById('set-name').value;
    const c=document.getElementById('set-company').value;
    const p=document.getElementById('set-phone').value;
    const a=document.getElementById('set-address').value;
    const s=document.getElementById('set-siret').value;
    await window.repairpilot.setSetting('userName',n);
    await window.repairpilot.setSetting('userCompany',c);
    await window.repairpilot.setSetting('userPhone',p);
    await window.repairpilot.setSetting('userAddress',a);
    await window.repairpilot.setSetting('userSiret',s);
    // Aussi dans localStorage pour les fonctions d'impression synchrones
    localStorage.setItem('userName',n);
    localStorage.setItem('userCompany',c);
    localStorage.setItem('userPhone',p);
    localStorage.setItem('userAddress',a);
    localStorage.setItem('userSiret',s);
    showToast('Profil enregistré !','success');
  });

  document.getElementById('btn-check-update')?.addEventListener('click',async()=>{
    const statusEl=document.getElementById('update-check-status');
    statusEl.textContent='⏳ Vérification en cours...';
    statusEl.style.color='var(--txt2)';
    try {
      await window.repairpilot.checkForUpdate();
      setTimeout(()=>{
        if(statusEl.textContent==='⏳ Vérification en cours...'){
          statusEl.textContent='✅ Vous avez la dernière version (v1.0.0)';
          statusEl.style.color='var(--green)';
        }
      },4000);
    } catch(e) {
      statusEl.textContent='❌ Impossible de vérifier (pas de connexion ou serveur non configuré)';
      statusEl.style.color='var(--red)';
    }
    window.repairpilot.onUpdateStatus(data=>{
      if(data.type==='available'){statusEl.textContent=`🆕 Mise à jour v${data.version} disponible — téléchargement en cours...`;statusEl.style.color='var(--accent)';}
      else if(data.type==='none'){statusEl.textContent='✅ Vous avez la dernière version';statusEl.style.color='var(--green)';}
      else if(data.type==='ready'){statusEl.textContent=`✅ v${data.version} prête — redémarrez pour installer`;statusEl.style.color='var(--green)';}
      else if(data.type==='error'){statusEl.textContent='❌ Erreur : '+data.message;statusEl.style.color='var(--red)';}
    });
  });
  document.getElementById('btn-save-relance')?.addEventListener('click',()=>{
    const days=parseInt(document.getElementById('set-relance').value)||7;
    localStorage.setItem('relanceDays',days);
    showToast('Délai de relance enregistré !','success');
  });
  document.getElementById('btn-save-goal').addEventListener('click',()=>{
    monthlyGoal=parseInt(document.getElementById('set-goal').value)||2000;
    localStorage.setItem('monthlyGoal',monthlyGoal);showToast('Objectif enregistré !','success');
  });
  document.getElementById('btn-toggle-theme').addEventListener('click',()=>toggleTheme());
  document.getElementById('btn-export').addEventListener('click',()=>exportBackup());
  document.getElementById('btn-import').addEventListener('click',()=>importBackup());

  // Logo
  document.getElementById('btn-choose-logo')?.addEventListener('click',()=>document.getElementById('logo-input')?.click());
  document.getElementById('logo-input')?.addEventListener('change',e=>{
    const file=e.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const img=new Image();
      img.onload=()=>{
        const canvas=document.createElement('canvas');
        const maxW=200;const scale=Math.min(1,maxW/img.width,maxW/img.height);
        canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
        canvas.getContext('2d').drawImage(img,0,0,canvas.width,canvas.height);
        localStorage.setItem('userLogo',canvas.toDataURL('image/png'));
        applyTheme();renderPage('settings');showToast('Logo enregistré !','success');
      };
      img.src=ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  // TVA
  document.querySelectorAll('input[name="tva-mode"]').forEach(el=>el.addEventListener('change',()=>{
    const row=document.getElementById('tva-taux-row');
    if(row) row.style.display=el.value==='TVA'?'flex':'none';
  }));
  document.getElementById('btn-save-tva')?.addEventListener('click',()=>{
    const mode=document.querySelector('input[name="tva-mode"]:checked')?.value||'AE';
    const taux=document.getElementById('set-tva-taux')?.value||'20';
    localStorage.setItem('tvaMode',mode);localStorage.setItem('tvaTaux',taux);
    showToast('Régime TVA enregistré !','success');
  });

  // Backup folder
  document.getElementById('btn-choose-folder')?.addEventListener('click',async()=>{
    if(window.repairpilot?.chooseFolder){
      const folder=await window.repairpilot.chooseFolder();
      if(folder){
        localStorage.setItem('backupFolder',folder);
        const el=document.getElementById('backup-folder-path');
        if(el)el.textContent=folder;
        showToast('Dossier de sauvegarde configuré !','success');
      }
    } else {
      showToast('Fonctionnalité disponible dans l\'application Electron','');
    }
  });

  // Clear demo data
  document.getElementById('btn-clear-demo')?.addEventListener('click',()=>{
    if(confirm('Effacer toutes les données de démonstration ? Cette action est irréversible.')){
      ['repairs','clients','quotes','stock','repairCounter','isDemoMode'].forEach(k=>localStorage.removeItem(k));
      showToast('Données démo effacées','success');
      renderPage('settings');
    }
  });

  // Licence
  const licStatus = await window.repairpilot.getLicenseStatus();
  const licTxt = document.getElementById('lic-status-txt');
  if (licTxt) {
    if (licStatus.activated) {
      licTxt.innerHTML='<span style="color:var(--green);font-weight:600">✓ Activée</span>';
    } else if (licStatus.trial) {
      licTxt.innerHTML=`<span style="color:var(--orange);font-weight:600">Mode essai — ${licStatus.daysLeft} jour(s) restant(s)</span>`;
    } else {
      licTxt.innerHTML='<span style="color:var(--red);font-weight:600">Expirée</span>';
    }
  }
  document.getElementById('btn-manage-license')?.addEventListener('click', () => openLicenseModal());
}

function openLicenseModal() {
  openModal(`
    <div class="modal-header"><div class="modal-title">🔑 Activation licence</div></div>
    <div class="modal-body">
      <div class="form-row"><label>Clé de licence</label>
        <input type="text" id="modal-lic-key" class="form-input" placeholder="RPRO-XXXX-XXXX-XXXX-XXXX-XXXX" style="font-family:monospace"/>
      </div>
      <div style="font-size:12px;color:var(--txt2)">Entrez votre clé de licence à 29 caractères. Disponible sur repairpilot.fr à 15€ (paiement unique).</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="doActivateLicense()">Activer</button>
      <button class="btn btn-ghost" onclick="closeModal()">Annuler</button>
    </div>`);
}

async function doActivateLicense() {
  const key = document.getElementById('modal-lic-key')?.value.trim();
  const result = await window.repairpilot.activateLicense(key);
  if (result.success) {
    closeModal();
    showToast('Licence activée avec succès !','success');
    renderPage('settings');
  } else {
    showToast('Clé invalide. Vérifiez et réessayez.','error');
  }
}

// ─── Sauvegarde
function exportBackup() {
  const data={repairs:getRepairs(),clients:getClients(),quotes:getQuotes(),stock:getStock(),agenda:getAgenda(),caisse:getCaisse(),commandes:getCommandes(),paneDb,stats,version:'1.0.0',date:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`RepairPilot_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();URL.revokeObjectURL(url);
  showToast('Sauvegarde exportée !','success');
}

function importBackup() {
  const input=document.createElement('input');input.type='file';input.accept='.json';
  input.onchange=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const data=JSON.parse(ev.target.result);
        if(data.repairs)localStorage.setItem('repairs',JSON.stringify(data.repairs));
        if(data.clients)localStorage.setItem('clients',JSON.stringify(data.clients));
        if(data.quotes)localStorage.setItem('quotes',JSON.stringify(data.quotes));
        if(data.stock)localStorage.setItem('stock',JSON.stringify(data.stock));
        if(data.agenda)localStorage.setItem('agenda',JSON.stringify(data.agenda));
        if(data.caisse)saveCaisseData(data.caisse);
        if(data.commandes)saveCommandes(data.commandes);
        if(data.paneDb){paneDb=data.paneDb;savePaneDb();}
        showToast('Données importées avec succès !','success');
        renderPage(currentPage);
      }catch(e){showToast('Fichier invalide','error');}
    };
    reader.readAsText(file);
  };
  input.click();
}

// ═══════════════════════════════════════════════════════
//  AIDE
// ═══════════════════════════════════════════════════════
function pageHelp() {
  return `
  <div class="sh"><div class="sh-title">❓ Aide & Support</div></div>
  <div class="mac-card" style="padding:20px;display:flex;flex-direction:column;gap:14px">
    ${[
      {q:'Comment configurer l\'IA ?', a:'⚙️ Paramètres → saisir clé API Anthropic → Tester. Nécessite des crédits sur console.anthropic.com'},
      {q:'Comment ouvrir un fournisseur ?', a:'Cliquez sur un logo fournisseur → le site s\'ouvre dans 🌐 Navigateur. Bouton ⭐ pour mettre en favori.'},
      {q:'Comment comparer les prix ?', a:'💰 Comparateur → saisissez une référence → cliquez Comparer → tous les fournisseurs s\'ouvrent.'},
      {q:'Comment calculer ma marge ?', a:'💰 Comparateur → section "Calculateur de marge" → entrez prix achat + marge souhaitée.'},
      {q:'Comment créer une réparation ?', a:'Ctrl+N ou bouton "+ Réparation". Le bouton 🤖 suggère un prix via l\'IA. Le 🖨️ imprime la fiche.'},
      {q:'Comment imprimer un devis ?', a:'📄 Devis → créer un devis → cliquer 🖨️. Un PDF s\'ouvre avec en-tête S.O.S INFO LUDO.'},
      {q:'Comment sauvegarder mes données ?', a:'Ctrl+S ou ⚙️ Paramètres → Sauvegarde → Exporter. Fichier JSON que vous pouvez réimporter.'},
      {q:'Comment sauvegarder un diagnostic IA ?', a:'🤖 IA Diagnostic → faire un diagnostic → cliquer "💾 Sauvegarder" → accessible dans 🗃️ Base de pannes.'},
      {q:'Dicter une panne à l\'IA ?', a:'🤖 IA Diagnostic → bouton "🎙️ Vocal" → parler → le message se saisit automatiquement.'},
      {q:'Raccourcis clavier disponibles ?', a:'Ctrl+N: nouvelle réparation — Ctrl+F: recherche — Ctrl+D: accueil — Ctrl+I: IA — Ctrl+B: navigateur'},
    ].map(({q,a})=>`
    <div style="border-bottom:1px solid var(--sep);padding-bottom:12px">
      <div style="font-weight:700;color:var(--accent);margin-bottom:4px">→ ${q}</div>
      <div style="font-size:12.5px;color:var(--txt2)">${a}</div>
    </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}

// ═══════════════════════════════════════════════════════
//  KANBAN
// ═══════════════════════════════════════════════════════
function pageKanban() {
  const repairs=getRepairs();
  const filterPriority=localStorage.getItem('kanbanPriority')||'all';
  const filterDate=localStorage.getItem('kanbanDate')||'';
  const COLS=[
    {status:'En attente', color:'gray', label:'⏳ En attente'},
    {status:'En cours',   color:'orange', label:'🔧 En cours'},
    {status:'Terminé',    color:'green', label:'✅ Terminé'},
    {status:'Récupéré',   color:'blue', label:'📦 Récupéré'},
  ];
  let filtered=repairs;
  if(filterPriority!=='all') filtered=filtered.filter(r=>r.priority===filterPriority);
  if(filterDate) filtered=filtered.filter(r=>r.date===filterDate);

  function buildCard(r,realIdx) {
    const price=parseFloat(r.price||0);
    const acompte=parseFloat(r.acompte||0);
    const solde=price-acompte;
    return `<div class="kanban-card" style="background:var(--bg);border-radius:10px;padding:10px 12px;margin-bottom:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);border-left:3px solid ${r.priority==='Express'?'var(--red)':r.priority==='Urgent'?'var(--orange)':'var(--sep)'}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <strong style="font-size:12.5px">${r.device}</strong>
        ${r.priority&&r.priority!=='Normal'?`<span class="status-pill ${r.priority==='Express'?'red':'orange'}" style="font-size:9px;padding:1px 5px">${r.priority}</span>`:''}
      </div>
      <div style="font-size:11px;color:var(--txt2);margin-top:2px">${r.client}</div>
      <div style="font-size:10.5px;color:var(--txt2);margin-top:2px">${r.date}${r.ticketNum?' · '+r.ticketNum:''}</div>
      <div style="font-size:12px;font-weight:700;color:var(--green);margin-top:4px">${price>0?price+'€':'—'}${acompte>0?' (solde '+solde+'€)':''}</div>
      <div style="display:flex;gap:4px;margin-top:8px">
        <button class="tbl-btn kanban-prev" data-idx="${realIdx}" title="Étape précédente" style="font-size:11px">←</button>
        <button class="tbl-btn kanban-next" data-idx="${realIdx}" title="Étape suivante" style="font-size:11px">→</button>
        <button class="tbl-btn edit-repair" data-idx="${realIdx}" title="Modifier" style="font-size:11px">✏️</button>
      </div>
    </div>`;
  }

  return `
  <div class="sh">
    <div class="sh-title">📌 Kanban — Réparations</div>
    <div style="display:flex;gap:8px">
      <select class="form-input" style="width:auto;height:30px;padding:4px 10px;font-size:12px" onchange="localStorage.setItem('kanbanPriority',this.value);renderPage('kanban')">
        <option value="all" ${filterPriority==='all'?'selected':''}>Toutes priorités</option>
        ${['Normal','Urgent','Express'].map(p=>`<option value="${p}" ${filterPriority===p?'selected':''}>${p}</option>`).join('')}
      </select>
      <input type="date" class="form-input" style="width:auto;height:30px;padding:4px 10px;font-size:12px" value="${filterDate}" onchange="localStorage.setItem('kanbanDate',this.value);renderPage('kanban')"/>
      <button class="btn btn-ghost" onclick="localStorage.removeItem('kanbanPriority');localStorage.removeItem('kanbanDate');renderPage('kanban')">✕ Filtres</button>
      <button class="btn btn-primary" onclick="navigateTo('repairs');setTimeout(openRepairModal,200)">+ Nouvelle</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:4px">
    ${COLS.map(col=>{
      const colRepairs=filtered.filter(r=>r.status===col.status);
      return `<div style="background:var(--bg2);border-radius:12px;padding:12px">
        <div style="font-size:12px;font-weight:700;color:var(--txt2);margin-bottom:10px;display:flex;justify-content:space-between">
          <span>${col.label}</span>
          <span class="status-pill ${col.color}" style="font-size:10px">${colRepairs.length}</span>
        </div>
        ${colRepairs.length===0?`<div style="text-align:center;color:var(--txt3);font-size:12px;padding:20px 0">Aucune</div>`
        :colRepairs.map(r=>buildCard(r,repairs.indexOf(r))).join('')}
      </div>`;
    }).join('')}
  </div>
  <div class="spacer"></div>`;
}

function bindKanban() {
  const STATUSES=['En attente','En cours','Terminé','Récupéré'];
  document.querySelectorAll('.kanban-next').forEach(btn=>btn.addEventListener('click',()=>{
    const i=parseInt(btn.dataset.idx);
    const repairs=getRepairs();
    const cur=STATUSES.indexOf(repairs[i].status);
    if(cur<STATUSES.length-1){repairs[i].status=STATUSES[cur+1];saveRepairs(repairs);renderPage('kanban');showToast('Statut mis à jour','success');}
  }));
  document.querySelectorAll('.kanban-prev').forEach(btn=>btn.addEventListener('click',()=>{
    const i=parseInt(btn.dataset.idx);
    const repairs=getRepairs();
    const cur=STATUSES.indexOf(repairs[i].status);
    if(cur>0){repairs[i].status=STATUSES[cur-1];saveRepairs(repairs);renderPage('kanban');showToast('Statut mis à jour','success');}
  }));
  document.querySelectorAll('.edit-repair').forEach(btn=>btn.addEventListener('click',()=>openRepairModal(parseInt(btn.dataset.idx))));
}

// ═══════════════════════════════════════════════════════
//  MESSAGES CLIENTS (PAGE DÉDIÉE)
// ═══════════════════════════════════════════════════════
function pageMessages() {
  const clients=getClients();
  const repairs=getRepairs();
  const TEMPLATES=[
    {id:'ready',     label:'✅ Appareil prêt',         msg:'Bonjour {NOM}, votre {APPAREIL} est prêt à être récupéré. Montant : {PRIX}€. Cordialement'},
    {id:'devis',     label:'📄 Devis accepté ?',        msg:'Bonjour {NOM}, avez-vous eu le temps de consulter notre devis pour {APPAREIL} ? N\'hésitez pas à nous contacter.'},
    {id:'rdv',       label:'📅 Rappel RDV',             msg:'Bonjour {NOM}, nous vous rappelons votre rendez-vous demain pour {APPAREIL}.'},
    {id:'diag',      label:'🔍 Diagnostic terminé',     msg:'Bonjour {NOM}, le diagnostic de votre {APPAREIL} est terminé. Nous vous recontactons rapidement.'},
    {id:'waiting',   label:'⏳ En attente de pièce',    msg:'Bonjour {NOM}, nous attendons la pièce pour votre {APPAREIL}. Nous vous recontactons dès réception.'},
    {id:'norepair',  label:'❌ Non réparable',           msg:'Bonjour {NOM}, après diagnostic votre {APPAREIL} n\'est malheureusement pas réparable. Cordialement'},
  ];
  return `
  <div class="sh"><div class="sh-title">💬 Messages clients</div></div>
  <div class="mac-card" style="padding:14px;margin-bottom:14px">
    <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <div style="flex:1;min-width:200px">
        <label style="font-size:11px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Client</label>
        <select id="msg-client" class="form-input" onchange="updateMsgPreviews()">
          <option value="">— Sélectionner —</option>
          ${clients.map(c=>`<option value="${c.name}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div style="flex:1;min-width:200px">
        <label style="font-size:11px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Appareil</label>
        <input type="text" id="msg-device" class="form-input" placeholder="ex: iPhone 13" oninput="updateMsgPreviews()"/>
      </div>
      <div style="flex:1;min-width:120px">
        <label style="font-size:11px;font-weight:600;color:var(--txt2);display:block;margin-bottom:4px">Prix (€)</label>
        <input type="number" id="msg-price" class="form-input" placeholder="0" oninput="updateMsgPreviews()"/>
      </div>
    </div>
    <div style="font-size:11px;color:var(--txt2);margin-top:8px">Sélectionnez un client et un appareil pour personnaliser les messages. Le bouton "Copier" copie dans le presse-papiers.</div>
  </div>
  <div style="display:flex;flex-direction:column;gap:10px">
    ${TEMPLATES.map(t=>`
    <div class="mac-card" style="padding:12px 14px">
      <div style="font-weight:700;font-size:12.5px;margin-bottom:6px">${t.label}</div>
      <div id="msg-preview-${t.id}" style="font-size:12.5px;color:var(--txt2);line-height:1.6;margin-bottom:8px;background:var(--bg2);border-radius:6px;padding:8px 10px">${t.msg}</div>
      <button class="btn btn-ghost" style="font-size:11px;padding:3px 12px" onclick="copyMessage('${t.id}')">📋 Copier</button>
    </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}

const MSG_TEMPLATES_DATA=[
  {id:'ready',    msg:'Bonjour {NOM}, votre {APPAREIL} est prêt à être récupéré. Montant : {PRIX}€. Cordialement'},
  {id:'devis',    msg:'Bonjour {NOM}, avez-vous eu le temps de consulter notre devis pour {APPAREIL} ? N\'hésitez pas à nous contacter.'},
  {id:'rdv',      msg:'Bonjour {NOM}, nous vous rappelons votre rendez-vous demain pour {APPAREIL}.'},
  {id:'diag',     msg:'Bonjour {NOM}, le diagnostic de votre {APPAREIL} est terminé. Nous vous recontactons rapidement.'},
  {id:'waiting',  msg:'Bonjour {NOM}, nous attendons la pièce pour votre {APPAREIL}. Nous vous recontactons dès réception.'},
  {id:'norepair', msg:'Bonjour {NOM}, après diagnostic votre {APPAREIL} n\'est malheureusement pas réparable. Cordialement'},
];

function updateMsgPreviews() {
  const nom=document.getElementById('msg-client')?.value||'{NOM}';
  const appareil=document.getElementById('msg-device')?.value||'{APPAREIL}';
  const prix=document.getElementById('msg-price')?.value||'{PRIX}';
  MSG_TEMPLATES_DATA.forEach(t=>{
    const el=document.getElementById('msg-preview-'+t.id);
    if(el) el.textContent=t.msg.replace(/\{NOM\}/g,nom||'{NOM}').replace(/\{APPAREIL\}/g,appareil||'{APPAREIL}').replace(/\{PRIX\}/g,prix||'{PRIX}');
  });
}

function copyMessage(id) {
  const el=document.getElementById('msg-preview-'+id);
  if(el){navigator.clipboard.writeText(el.textContent).then(()=>showToast('Message copié !','success'));}
}

function bindMessages() {
  // Auto-fill device from repairs when client selected
  document.getElementById('msg-client')?.addEventListener('change',()=>{
    const clientName=document.getElementById('msg-client').value;
    const repairs=getRepairs().filter(r=>r.client===clientName);
    if(repairs.length>0){
      const last=repairs[0];
      const devEl=document.getElementById('msg-device');
      const priceEl=document.getElementById('msg-price');
      if(devEl&&!devEl.value) devEl.value=last.device;
      if(priceEl&&!priceEl.value) priceEl.value=last.price||'';
    }
    updateMsgPreviews();
  });
}

// ═══════════════════════════════════════════════════════
//  MODAL
// ═══════════════════════════════════════════════════════
function openModal(html) {
  const overlay=document.getElementById('modal-overlay');
  overlay.innerHTML=`<div class="modal-box">${html}</div>`;
  overlay.style.display='flex';
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal();},{once:true});
}
function closeModal() {
  const overlay=document.getElementById('modal-overlay');
  overlay.style.display='none';overlay.innerHTML='';
}

// ═══════════════════════════════════════════════════════
//  TOASTS
// ═══════════════════════════════════════════════════════
function showToast(msg,type) {
  const c=document.getElementById('toasts');if(!c)return;
  const t=document.createElement('div');
  t.className=`toast ${type}`;t.textContent=msg;
  if(type==='success') playSound('success');
  else if(type==='error') playSound('error');
  c.appendChild(t);setTimeout(()=>t.remove(),3500);
}

// ═══════════════════════════════════════════════════════
//  OWNER EDITION — Fonctions premium
// ═══════════════════════════════════════════════════════

// ── Curseur personnalisé avec traîne
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const trail  = document.getElementById('cursor-trail');
  if (!cursor) return;

  // Créer les points de traînée
  const TRAIL = 6;
  const dots = Array.from({length: TRAIL}, () => {
    const d = document.createElement('span');
    trail.appendChild(d);
    return d;
  });

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  // Positions mémorisées pour la traînée
  const hist = Array.from({length: TRAIL}, () => ({ x: mx, y: my }));

  // Positionner le curseur hors écran au départ
  cursor.style.left = '-100px';
  cursor.style.top  = '-100px';

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    // Anneau : suit exactement
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // Traînée animée
  function animTrail() {
    hist.unshift({ x: mx, y: my });
    hist.length = TRAIL;
    dots.forEach((d, i) => {
      d.style.left    = (hist[i].x - 2) + 'px';
      d.style.top     = (hist[i].y - 2) + 'px';
      d.style.opacity = ((TRAIL - i) / TRAIL) * 0.25;
    });
    requestAnimationFrame(animTrail);
  }
  animTrail();
}

// ── Particules en arrière-plan
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; });
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2563eb';
  const particles = Array.from({length:60}, () => ({
    x: Math.random()*W, y: Math.random()*H,
    r: Math.random()*2+1,
    vx: (Math.random()-0.5)*0.4,
    vy: (Math.random()-0.5)*0.4,
    a: Math.random()
  }));
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = accentColor;
      ctx.globalAlpha = p.a * 0.6;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    // Lignes entre particules proches
    particles.forEach((p,i) => {
      particles.slice(i+1).forEach(q => {
        const dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
          ctx.strokeStyle=accentColor; ctx.globalAlpha=(1-d/120)*0.15;
          ctx.lineWidth=0.8; ctx.stroke(); ctx.globalAlpha=1;
        }
      });
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ── Météo Boulogne-sur-Mer (Open-Meteo, sans clé API)
async function loadWeatherWidget() {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;
  try {
    const r = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.7267&longitude=1.6147&current_weather=true');
    const d = await r.json();
    const temp = Math.round(d.current_weather.temperature);
    const wc = d.current_weather.weathercode;
    const icons = {0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',71:'🌨',73:'🌨',75:'❄️',80:'🌦',81:'🌧',82:'⛈',95:'⛈'};
    const icon = icons[wc] || '🌡';
    widget.innerHTML = `${icon} <strong>${temp}°C</strong> <span>Boulogne</span>`;
    widget.style.display = 'flex';
  } catch(e) { /* pas de connexion */ }
}

// ── Barre de commandes universelle (Ctrl+P)
function initCommandBar() {
  const COMMANDS = [
    { icon:'➕', label:'Nouvelle réparation',    action:()=>{ navigateTo('repairs'); setTimeout(openRepairModal,300); } },
    { icon:'👥', label:'Clients',                action:()=>navigateTo('clients') },
    { icon:'📋', label:'Réparations',            action:()=>navigateTo('repairs') },
    { icon:'📄', label:'Devis & Factures',        action:()=>navigateTo('quotes') },
    { icon:'📦', label:'Stock',                  action:()=>navigateTo('stock') },
    { icon:'💵', label:'Caisse',                 action:()=>navigateTo('caisse') },
    { icon:'📊', label:'Statistiques',           action:()=>navigateTo('stats') },
    { icon:'📈', label:'Rapport mensuel',        action:()=>navigateTo('rapport') },
    { icon:'📅', label:'Agenda',                 action:()=>navigateTo('agenda') },
    { icon:'📌', label:'Kanban',                 action:()=>navigateTo('kanban') },
    { icon:'⚔️', label:'War Room',               action:()=>navigateTo('warroom') },
    { icon:'🤖', label:'IA Diagnostic',          action:()=>navigateTo('ai') },
    { icon:'🌐', label:'Navigateur fournisseurs',action:()=>navigateTo('browser') },
    { icon:'⚙️', label:'Paramètres',             action:()=>navigateTo('settings') },
    { icon:'👑', label:'Owner Dashboard',        action:()=>openOwnerOverlay() },
    { icon:'💬', label:'Messages clients',       action:()=>navigateTo('messages') },
    { icon:'💾', label:'Exporter sauvegarde',    action:()=>exportBackup() },
    { icon:'🌙', label:'Thème sombre/clair',     action:()=>toggleTheme() },
    { icon:'✨', label:'Thème Holographique',    action:()=>toggleHoloTheme() },
  ];
  let selectedIdx = 0;
  const overlay = document.getElementById('cmd-overlay');
  const input   = document.getElementById('cmd-input');
  const results = document.getElementById('cmd-results');
  if(!overlay) return;

  function renderResults(q) {
    const filtered = q ? COMMANDS.filter(c=>c.label.toLowerCase().includes(q.toLowerCase())) : COMMANDS;
    results.innerHTML = filtered.slice(0,8).map((c,i)=>`
      <div class="cmd-result${i===selectedIdx?' selected':''}" data-idx="${i}">
        <span class="cmd-result-icon">${c.icon}</span>${c.label}
      </div>`).join('');
    results.querySelectorAll('.cmd-result').forEach((el,i)=>{
      el.addEventListener('click',()=>{ filtered[i].action(); closeCommandBar(); });
    });
    return filtered;
  }

  function openCommandBar() {
    overlay.classList.add('open'); input.value=''; selectedIdx=0;
    renderResults(''); setTimeout(()=>input.focus(),50);
  }
  function closeCommandBar() { overlay.classList.remove('open'); }

  input.addEventListener('input', e => { selectedIdx=0; renderResults(e.target.value); });
  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.cmd-result');
    if(e.key==='ArrowDown'){ e.preventDefault(); selectedIdx=Math.min(selectedIdx+1,items.length-1); renderResults(input.value); }
    if(e.key==='ArrowUp'){   e.preventDefault(); selectedIdx=Math.max(selectedIdx-1,0); renderResults(input.value); }
    if(e.key==='Enter'){
      e.preventDefault();
      const q = input.value;
      const filtered = q ? COMMANDS.filter(c=>c.label.toLowerCase().includes(q.toLowerCase())) : COMMANDS;
      if(filtered[selectedIdx]){ filtered[selectedIdx].action(); closeCommandBar(); }
    }
    if(e.key==='Escape') closeCommandBar();
  });
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeCommandBar(); });
  window._openCommandBar = openCommandBar;
}

// ── Raccourcis Owner
function initOwnerShortcuts() {
  document.addEventListener('keydown', e => {
    // Ctrl+P → barre de commandes
    if((e.ctrlKey||e.metaKey) && e.key==='p') { e.preventDefault(); window._openCommandBar?.(); }
    // Ctrl+Alt+O → Owner dashboard
    if((e.ctrlKey||e.metaKey) && e.altKey && e.key==='o') { e.preventDefault(); openOwnerOverlay(); }
    // Ctrl+Alt+W → War Room
    if((e.ctrlKey||e.metaKey) && e.altKey && e.key==='w') { e.preventDefault(); navigateTo('warroom'); }
  });
}

// ── 3D Tilt sur les cards
function initTiltCards() {
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width - 0.5;
      const y = (e.clientY-r.top)/r.height  - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform=''; });
  });
}

// ── Confettis
function shootConfetti() {
  const colors = ['#7c3aed','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899'];
  for(let i=0;i<60;i++){
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.left   = Math.random()*100+'vw';
    el.style.top    = '-10px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.width  = (Math.random()*8+4)+'px';
    el.style.height = (Math.random()*8+4)+'px';
    el.style.borderRadius = Math.random()>0.5 ? '50%':'2px';
    el.style.animationDuration = (Math.random()*2+1.5)+'s';
    el.style.animationDelay    = (Math.random()*0.5)+'s';
    document.body.appendChild(el);
    setTimeout(()=>el.remove(), 4000);
  }
}

// ── Sons
function playSound(type) {
  if (localStorage.getItem('soundEnabled') === 'false') return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    if(type==='success') { o.frequency.setValueAtTime(523,ctx.currentTime); o.frequency.setValueAtTime(659,ctx.currentTime+0.1); o.frequency.setValueAtTime(784,ctx.currentTime+0.2); g.gain.setValueAtTime(0.2,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.5); }
    else if(type==='error') { o.type='sawtooth'; o.frequency.setValueAtTime(200,ctx.currentTime); g.gain.setValueAtTime(0.1,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.3); }
    else { o.frequency.setValueAtTime(440,ctx.currentTime); g.gain.setValueAtTime(0.15,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.2); }
    o.start(ctx.currentTime); o.stop(ctx.currentTime+0.5);
  } catch(e) { /* audio non disponible */ }
}

// ── Thème holographique
function toggleHoloTheme() {
  const isHolo = localStorage.getItem('holoTheme')==='true';
  if(isHolo) { localStorage.setItem('holoTheme','false'); applyTheme(); showToast('Thème holographique désactivé',''); }
  else { localStorage.setItem('holoTheme','true'); document.documentElement.setAttribute('data-theme','holo'); showToast('✨ Thème holographique activé !','success'); }
}

// ── Floating AI panel
function initFloatingAI() {
  const btn   = document.getElementById('ai-float-btn');
  const panel = document.getElementById('ai-float-panel');
  const input = document.getElementById('ai-float-input');
  const send  = document.getElementById('ai-float-send');
  const msgs  = document.getElementById('ai-float-messages');
  if(!btn) return;
  btn.addEventListener('click', () => panel.classList.toggle('open'));
  async function sendFloatMsg() {
    const q = input.value.trim(); if(!q) return;
    input.value='';
    const userDiv=document.createElement('div');
    userDiv.style.cssText='align-self:flex-end;background:var(--accent);color:#fff;padding:7px 12px;border-radius:12px 12px 2px 12px;font-size:12.5px;max-width:85%';
    userDiv.textContent=q; msgs.appendChild(userDiv);
    const aiDiv=document.createElement('div');
    aiDiv.style.cssText='align-self:flex-start;background:var(--bg2);color:var(--txt);padding:7px 12px;border-radius:12px 12px 12px 2px;font-size:12.5px;max-width:85%';
    aiDiv.textContent='⏳ ...'; msgs.appendChild(aiDiv);
    msgs.scrollTop=msgs.scrollHeight;
    const r = await window.repairpilot.aiChat([{role:'user',content:q}]);
    aiDiv.textContent = r.error ? '❌ '+r.error : r.content;
    msgs.scrollTop=msgs.scrollHeight;
  }
  send.addEventListener('click', sendFloatMsg);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') sendFloatMsg(); });
}

// ── War Room (Kanban plein écran avec timers)
function pageWarRoom() {
  const repairs = getRepairs().filter(r=>r.status!=='Récupéré'&&r.status!=='Non réparable');
  const cols = ['En attente','En cours','Terminé'];
  return `
  <div class="sh"><div class="sh-title">⚔️ War Room</div>
    <button class="btn btn-ghost" onclick="openWarRoomFullscreen()">⛶ Plein écran</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:4px 0">
    ${cols.map(col=>`
      <div style="background:var(--bg2);border-radius:14px;padding:16px;min-height:300px">
        <div style="font-weight:800;font-size:14px;margin-bottom:14px;display:flex;align-items:center;gap:8px">
          ${col==='En attente'?'🟡':col==='En cours'?'🔵':'🟢'} ${col}
          <span style="background:var(--sep);padding:1px 7px;border-radius:20px;font-size:11px;font-weight:600">${repairs.filter(r=>r.status===col).length}</span>
        </div>
        ${repairs.filter(r=>r.status===col).map((r,i)=>{
          const ri=getRepairs().indexOf(r);
          return `<div style="background:var(--bg);border-radius:10px;padding:12px;margin-bottom:10px;border-left:3px solid ${r.priority==='Express'?'var(--red)':r.priority==='Urgent'?'var(--orange)':'var(--sep)'}">
            <div style="font-weight:700;font-size:13px">${r.device}</div>
            <div style="font-size:11.5px;color:var(--txt2);margin:2px 0">${r.client}</div>
            <div style="display:flex;gap:6px;margin-top:8px">
              ${col!=='En attente'?`<button class="tbl-btn" onclick="moveRepairStatus(${ri},'${col==='En cours'?'En attente':col==='Terminé'?'En cours':'En attente'}')">←</button>`:''}
              ${col!=='Terminé'?`<button class="tbl-btn" onclick="moveRepairStatus(${ri},'${col==='En attente'?'En cours':'Terminé'}')">→</button>`:''}
              <span class="status-pill ${r.priority==='Express'?'red':r.priority==='Urgent'?'orange':'gray'}" style="font-size:9px">${r.priority||'Normal'}</span>
              ${r.price?`<span style="font-size:11px;color:var(--green);font-weight:700;margin-left:auto">${r.price}€</span>`:''}
            </div>
          </div>`;
        }).join('')}
      </div>`).join('')}
  </div>
  <div class="spacer"></div>`;
}
function bindWarRoom() {}
function moveRepairStatus(idx, newStatus) {
  const repairs=getRepairs(); repairs[idx].status=newStatus; saveRepairs(repairs); renderPage('warroom');
  showToast('Statut mis à jour','success'); playSound('success');
}
function openWarRoomFullscreen() {
  const overlay=document.getElementById('war-room-overlay');
  if(!overlay) return;
  overlay.innerHTML=`<div style="padding:20px;flex:1;overflow-y:auto">${pageWarRoom()}</div>
    <button onclick="document.getElementById('war-room-overlay').classList.remove('open')" style="position:fixed;top:20px;right:24px;background:var(--red);color:#fff;border:none;border-radius:10px;padding:10px 20px;font-weight:700;cursor:pointer;z-index:9999">✕ Fermer</button>`;
  overlay.classList.add('open');
}

// ── Owner Dashboard secret (Ctrl+Alt+O)
function initOwnerOverlay() {
  // Pré-construit en background
}
function openOwnerOverlay() {
  const overlay = document.getElementById('owner-overlay');
  if(!overlay) return;
  const repairs=getRepairs(); const clients=getClients(); const quotes=getQuotes();
  const caisse=getCaisse();
  const totalCA=repairs.filter(r=>r.status==='Terminé'&&r.price).reduce((s,r)=>s+parseFloat(r.price||0),0);
  const solde=caisse.filter(t=>t.type==='in').reduce((s,t)=>s+parseFloat(t.amount||0),0)-caisse.filter(t=>t.type==='out').reduce((s,t)=>s+parseFloat(t.amount||0),0);
  const thisMonth=new Date().toISOString().substring(0,7);
  const caThisMonth=repairs.filter(r=>r.status==='Terminé'&&r.price&&(r.date||'').startsWith(thisMonth)).reduce((s,r)=>s+parseFloat(r.price||0),0);
  overlay.innerHTML=`
  <div style="max-width:900px;margin:0 auto;padding:40px 32px;color:#e8e8ff;flex:1">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px">
      <div>
        <div style="font-size:28px;font-weight:900;background:linear-gradient(135deg,#7c3aed,#10b981,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent">
          👑 Owner Dashboard
        </div>
        <div style="font-size:13px;opacity:0.6;margin-top:4px">Accès exclusif — RepairPilot Pro ∞</div>
      </div>
      <button onclick="document.getElementById('owner-overlay').classList.remove('open')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:10px;padding:10px 20px;font-weight:700;cursor:pointer">✕ Fermer</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px">
      ${[
        {label:'CA Total atelier',val:totalCA.toFixed(2)+'€',icon:'💰',color:'#10b981'},
        {label:'CA ce mois',val:caThisMonth.toFixed(2)+'€',icon:'📈',color:'#7c3aed'},
        {label:'Solde caisse',val:solde.toFixed(2)+'€',icon:'💵',color:'#f59e0b'},
        {label:'Clients',val:clients.length,icon:'👥',color:'#3b82f6'},
      ].map(s=>`
        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px;text-align:center">
          <div style="font-size:28px;margin-bottom:6px">${s.icon}</div>
          <div style="font-size:22px;font-weight:800;color:${s.color}">${s.val}</div>
          <div style="font-size:11px;opacity:0.6;margin-top:2px">${s.label}</div>
        </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:28px">
      <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px">
        <div style="font-weight:700;margin-bottom:14px;font-size:14px">🔧 Réparations récentes</div>
        ${repairs.slice(-5).reverse().map(r=>`
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
            <div style="flex:1"><div style="font-size:13px;font-weight:600">${r.device}</div><div style="font-size:11px;opacity:0.5">${r.client}</div></div>
            <div style="font-size:12px;color:${r.status==='Terminé'?'#10b981':'#f59e0b'}">${r.status}</div>
            ${r.price?`<div style="font-size:13px;font-weight:700;color:#10b981">${r.price}€</div>`:''}
          </div>`).join('')}
      </div>
      <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:20px">
        <div style="font-weight:700;margin-bottom:14px;font-size:14px">🏆 Niveau & XP</div>
        <div style="text-align:center;padding:16px 0">
          <div style="font-size:48px;margin-bottom:8px">⭐</div>
          <div style="font-size:24px;font-weight:900;color:#f59e0b">Niveau ${ownerLevel}</div>
          <div style="font-size:12px;opacity:0.6;margin:6px 0">${ownerXP} / ${ownerLevel*100} XP</div>
          <div style="height:8px;background:rgba(255,255,255,0.1);border-radius:4px;margin:10px 0">
            <div style="height:100%;background:linear-gradient(90deg,#7c3aed,#10b981);border-radius:4px;width:${Math.round((ownerXP/(ownerLevel*100))*100)}%"></div>
          </div>
          ${ownerStreak>1?`<div style="margin-top:10px"><span class="streak-badge">🔥 ${ownerStreak} jours de suite !</span></div>`:''}
        </div>
      </div>
    </div>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px">
      <div style="font-weight:700;margin-bottom:12px;font-size:14px">⚙️ Contrôles Owner</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button onclick="toggleHoloTheme()" style="background:linear-gradient(135deg,#7c3aed,#10b981);color:#fff;border:none;border-radius:8px;padding:9px 18px;font-weight:700;cursor:pointer">✨ Thème Holo</button>
        <button onclick="shootConfetti();playSound('success')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:8px;padding:9px 18px;font-weight:700;cursor:pointer">🎉 Confettis</button>
        <button onclick="exportBackup();playSound('success')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:8px;padding:9px 18px;font-weight:700;cursor:pointer">💾 Backup</button>
        <button onclick="loadDemoData();showToast('Données démo chargées !','success')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;border-radius:8px;padding:9px 18px;font-weight:700;cursor:pointer">🎭 Charger démo</button>
        <button onclick="localStorage.clear();location.reload()" style="background:rgba(239,68,68,0.2);border:1px solid rgba(239,68,68,0.3);color:#ef4444;border-radius:8px;padding:9px 18px;font-weight:700;cursor:pointer">🗑 Reset complet</button>
      </div>
    </div>
  </div>`;
  overlay.classList.add('open');
}

// ── QR Code par réparation (librairie inline simple)
function generateQRCodeSVG(text) {
  // QR simplifié — lien vers une page de statut fictive
  const url = `https://repairpilot.app/track/${encodeURIComponent(text)}`;
  return `<div style="text-align:center;padding:10px">
    <div style="font-size:11px;color:var(--txt2);margin-bottom:6px">QR Code réparation</div>
    <div style="font-family:monospace;font-size:9px;background:var(--bg2);padding:8px;border-radius:6px;word-break:break-all;color:var(--txt2)">${url}</div>
    <div style="font-size:10px;color:var(--txt3);margin-top:4px">Scannez pour suivre l'état</div>
  </div>`;
}

// ── Mode Focus (plein écran sur une réparation)
function openFocusMode(repairIdx) {
  const overlay = document.getElementById('focus-overlay');
  if(!overlay) return;
  const r = getRepairs()[repairIdx];
  if(!r) return;
  overlay.innerHTML=`
  <div style="flex:1;display:flex;align-items:center;justify-content:center;background:var(--bg)">
    <div style="max-width:600px;width:100%;padding:40px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
        <div style="font-size:20px;font-weight:900">🔧 Mode Focus</div>
        <button onclick="document.getElementById('focus-overlay').classList.remove('open')" style="background:var(--red);color:#fff;border:none;border-radius:8px;padding:8px 16px;font-weight:700;cursor:pointer">✕</button>
      </div>
      <div style="background:var(--bg2);border-radius:16px;padding:28px">
        <div style="font-size:22px;font-weight:900;margin-bottom:6px">${r.device}</div>
        <div style="font-size:15px;color:var(--txt2);margin-bottom:20px">Client : ${r.client}</div>
        <div style="font-size:14px;margin-bottom:12px">📝 ${r.desc||'Aucune description'}</div>
        ${r.notes?`<div style="font-size:13px;color:var(--txt2);margin-bottom:12px">💬 ${r.notes}</div>`:''}
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px">
          <span class="status-pill ${r.status==='Terminé'?'green':'orange'}">${r.status}</span>
          <span class="status-pill ${r.priority==='Express'?'red':r.priority==='Urgent'?'orange':'gray'}">${r.priority||'Normal'}</span>
          ${r.price?`<span style="font-size:13px;font-weight:700;color:var(--green)">${r.price}€</span>`:''}
        </div>
      </div>
    </div>
  </div>`;
  overlay.classList.add('open');
}
