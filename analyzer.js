async function fromWebhook(payload) {
  try {
    // Shopify envoie souvent un objet produit complet
    const product = payload;

    if (!product || !product.id) {
      console.log('Payload sans produit valide');
      return null;
    }

    return {
      productId: product.id,
      title: product.title || '',
      description: product.body_html || '',
      tags: product.tags || '',
      vendor: product.vendor || ''
    };
  } catch (err) {
    console.error('Erreur dans analyzer.fromWebhook :', err.message);
    return null;
  }
}

module.exports = { fromWebhook };
