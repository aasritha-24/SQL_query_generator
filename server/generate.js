import openai from './api.js';

const generate = async (queryDescription) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a SQL expert. Generate valid SQL queries only." },
      { role: "user", content: `Convert this to SQL: ${queryDescription}` }
    ],
    temperature: 0,
    max_tokens: 100
  });
  return completion.choices[0].message.content.trim();
};

export default generate;
