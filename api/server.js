import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  const { text } = req.body;
  const { kind } = req.body;
  const endpoint = process.env.AZURE_ENDPOINT_SENTIMENT;
  const apiKey = process.env.AZURE_API_KEY;

  try {
    const azureRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // types of kind "SentimentAnalysis", "KeyPhraseExtraction", "EntityRecognition", "AbstractiveSummarization", "ExtractiveSummarization"
        kind: kind,
        parameters: { modelVersion: "latest" },
        analysisInput: {
          documents: [{ id: "1", language: "en", text: text }],
        }
      })
    });

    const data = await azureRes.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error calling Azure" });
  }
});

app.listen(4000, () => console.log("Server running on port 4000"));
