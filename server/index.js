import express from "express";
import cors from 'cors';
import generate from "./generate.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello World from our API");
});

app.post("/generate", async (req, res) => {
  const queryDescription = req.body.queryDescription;
  if (!queryDescription) {
    return res.status(400).json({ response: "Query description is required." });
  }
  try {
    const sqlQuery = await generate(queryDescription);
    res.json({ response: sqlQuery });
  } catch (error) {
    if (error.status === 429) {
      return res.status(429).json({ response: "You have exceeded your OpenAI quota. Please check your billing and usage at https://platform.openai.com/account/usage" });
    }
    res.status(500).json({ response: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
