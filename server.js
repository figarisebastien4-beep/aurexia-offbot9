import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("🤖 Bot SEO Shopify opérationnel 🚀");
});

// Route du webhook
app.post("/seo-bot", async (req, res) => {
  try {
    const { id, title, descriptionHtml, seoTitle, seoDescription } = req.body;

    const query = `
      mutation BotSeoAutomatisé(
        $id: ID!,
        $title: String!,
        $descriptionHtml: String!,
        $seoTitle: String!,
        $seoDescription: String!
      ) {
        productUpdate(
          input: {
            id: $id,
            title: $title,
            descriptionHtml: $descriptionHtml,
            seo: {
              title: $seoTitle,
              description: $seoDescription
            }
          }
        ) {
          product {
            id
            title
            descriptionHtml
            seo {
              title
              description
            }
            updatedAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const response = await fetch(
      `https://${process.env.BOUTIQUE}/admin/api/2024-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.JETON
        },
        body: JSON.stringify({
          query,
          variables: { id, title, descriptionHtml, seoTitle, seoDescription }
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("Erreur SEO bot :", err);
    res.status(500).json({ error: "Erreur interne" });
  }
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot SEO actif sur Render"));
