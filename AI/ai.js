const axios = require("axios");
const OpenAI = require("openai");
require("dotenv").config();

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  organization: "org-rB5FZQWJ3NuuCBqFwGSzAEwH",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Hello" }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    console.log(completion.choices[0]);
  } catch (error) {
    console.log(error.message);
  }
}

main();

// const axiosResponse = axios({
//   method: "POST",
//   url: "https://api.openai.com/v1/chat/completions",
//   headers: {
//     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     "Content-Type": "application/json",
//   },
//   data: JSON.stringify({
//     messages: [{ role: "user", content: "Hello, how are you" }],
//     model: "gpt-3.5-turbo",
//   }),
// });

// console.log(axiosResponse.data);
