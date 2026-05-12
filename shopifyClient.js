const axios = require('axios');

const SHOPIFY_DOMAIN = process.env.BOUTIQUE; // ex : aurexia-off.myshopify.com
const SHOPIFY_TOKEN = process.env.JETON;     // ton token privé Admin API

async function updateProductSeo(productId, seo) {
  try {
    const url = `https://${SHOPIFY_DOMAIN}/admin/api/2024-04/products/${productId}.json`;

    const payload = {
      product: {
        id: productId,
        title: seo.seoTitle,
        body_html: seo.longDescription,
        metafields_global_title_tag: seo.seoTitle,
        metafields_global_description_tag: seo.seoDescription
      }
    };

    const response = await axios.put(url, payload, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    console.log('Réponse Shopify OK pour updateProductSeo');
    return response.data;

  } catch (err) {
    console.error('Erreur updateProductSeo :', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { updateProductSeo };
