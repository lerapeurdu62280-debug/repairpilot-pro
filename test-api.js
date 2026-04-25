// Test rapide de la clé API Anthropic
// Lance avec : node test-api.js TA_CLE_ICI

const key = process.argv[2];

if (!key) {
  console.log('Usage : node test-api.js sk-ant-...');
  process.exit(1);
}

console.log('Test de la clé :', key.substring(0, 14) + '...');
console.log('Connexion à Anthropic...\n');

const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: key });

client.messages.create({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 20,
  messages: [{ role: 'user', content: 'Dis juste OK' }]
}).then(r => {
  console.log('✅ CLÉ VALIDE ! Réponse IA :', r.content[0].text);
}).catch(e => {
  console.log('❌ ERREUR :', e.status, '-', e.message);
});
