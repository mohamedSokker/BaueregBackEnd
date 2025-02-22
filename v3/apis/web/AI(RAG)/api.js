require("dotenv").config();
const {
  HfInference,
  textGeneration,
  chatCompletion,
} = require("@huggingface/inference");
// const OpenAI = require("openai");

const AIEndPoints = (app) => {
  // const hf = new HfInference({
  //   // model: "mistralai/Mistral-7B-Instruct",
  //   accessToken: process.env.HUGGINGFACE_API_KEY,
  //   // temperature: 0.3,
  // });
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  // const openai = new OpenAI();
  app.post("/api/v3/ai", async (req, res) => {
    const { query } = req.body;
    console.log(query);
    try {
      const completion = await hf.featureExtraction({
        model: "Xenova/all-MiniLM-L6-v2",
        inputs: query,
      });
      // const completion = llm.call(query);
      // const completion = await hf.chatCompletion({
      //   // model: "mistralai/Mistral-7B-Instruct-v0.3",
      //   model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
      //   messages: [{ role: "user", content: query }],
      //   max_tokens: 512,
      //   temperature: 0.1,
      //   // inputs: query,
      // });
      // const completion = await openai.chat.completions.create({
      //   model: "gpt-4o",
      //   store: true,
      //   messages: [{ role: "user", content: query }],
      // });
      console.log(completion);
      return res.status(200).json({ message: completion });
      // .json({ message: completion?.choices?.[0]?.message });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = { AIEndPoints };
