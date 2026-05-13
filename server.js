import express from "express";
import fetch from "node-fetch";

const app = express();

app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("🤖 Bot SEO Shopify opérationnel 🚀");
});

// Webhook SEO
app.post("/seo-bot", async (req, res) => {
  try {
    const {
      id,
      title,
      descriptionHtml,
      seoTitle,
      seoDescription
    } = req.body;

    const query = `
      mutation productUpdate(
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
          variables: {
            id,
            title,
            descriptionHtml,
            seoTitle,
            seoDescription
          }
        })
      }
    );

    const data = await response.json();

    console.log("Réponse Shopify :", data);

    res.json(data);

  } catch (error) {
    console.error("Erreur SEO bot :", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Port Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
