const analyzer = require('./analyzer');
const optimizer = require('./optimizer');
const shopify = require('./shopifyClient');

async function handleWebhook(payload) {
  try {
    console.log('Webhook reçu de Shopify');

    // 1. Analyse des données reçues
    const analysis = await analyzer.fromWebhook(payload);

    if (!analysis || !analysis.productId) {
      console.log('Aucun produit détecté dans le webhook, arrêt.');
      return;
    }

    console.log('Analyse :', analysis);

    // 2. Décision simple V1 : on optimise toujours le produit
    const decision = {
      action: 'OPTIMIZE_PRODUCT',
      productId: analysis.productId,
      title: analysis.title,
      description: analysis.description
    };

    // 3. Génération du SEO
    const seo = await optimizer.generate(decision);

    console.log('SEO généré :', seo);

    // 4. Mise à jour du produit dans Shopify
    await shopify.updateProductSeo(decision.productId, seo);

    console.log('Produit mis à jour dans Shopify ✅');

  } catch (err) {
    console.error('Erreur dans brain.handleWebhook :', err.message);
  }
}

module.exports = { handleWebhook };
