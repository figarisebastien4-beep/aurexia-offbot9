function cleanText(text) {
  if (!text) return '';
  return text.replace(/<\/?[^>]+(>|$)/g, '').trim(); // enlever le HTML
}

async function generate(decision) {
  const baseTitle = cleanText(decision.title);
  const baseDesc = cleanText(decision.description);

  // Titre SEO optimisé
  const seoTitle = `${baseTitle} | Aurexia™ Boutique Officielle`;

  // Meta description optimisée
  const seoDescription = `Découvrez ${baseTitle} sur Aurexia™. Qualité, style et confort. Livraison rapide et service premium.`;

  // Description longue enrichie
  const longDescription = `
    <p>${baseDesc}</p>
    <h3>Pourquoi choisir Aurexia™ ?</h3>
    <ul>
      <li>Qualité supérieure</li>
      <li>Style unique</li>
      <li>Confort garanti</li>
      <li>Livraison rapide</li>
    </ul>
    <p>Profitez d'une expérience d'achat sécurisée et d'un service client réactif.</p>
  `;

  return {
    seoTitle,
    seoDescription,
    longDescription
  };
}
