const express = require('express');
const bodyParser = require('body-parser');
const brain = require('./brain');

const app = express();

// Pour recevoir le JSON envoyé par Shopify
app.use(bodyParser.json());

// Route simple pour vérifier que le bot tourne
app.get('/', (req, res) => {
  res.send('Cerveau SEO Aurexia actif 🧠');
});

// Webhook Shopify
app.post('/seo-bot', async (req, res) => {
  try {
    console.log('Webhook reçu');
    await brain.handleWebhook(req.body);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Erreur dans /seo-bot :', err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Render impose son propre port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Bot SEO Aurexia en écoute sur le port ${PORT}`);
});
