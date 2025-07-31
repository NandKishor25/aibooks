const OpenAI = require('openai');
require('dotenv').config(); // Assumes .env is at root level. Adjust path if needed.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate questions and answers for a chapter using OpenAI
 * @param {string} chapterContent
 * @param {string} chapterTitle
 * @returns {Promise<Array<{question: string, answer: string}>>}
 */
async function getOpenAIQuestions(chapterContent, chapterTitle) {
  const prompt = `Generate 30 quiz questions and answers based ONLY on the chaptercontent below.
Title: ${chapterTitle}
Content: ${chapterContent}

Respond ONLY as a JSON array like:
[
  { "question": "What is...", "answer": "..." },
  ...
]`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates quiz questions from chapter content in JSON format.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 1,
      max_tokens: 4000,
    });

    const raw = response.choices[0].message.content;
   

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      throw new Error('Parsed output is not an array.');
    } catch {
      // Attempt to extract JSON array from within response text
      const match = raw.match(/\[\s*{[\s\S]*?}\s*]/);
      if (match) {
        const fallbackParsed = JSON.parse(match[0]);
        if (Array.isArray(fallbackParsed)) return fallbackParsed;
      }
      throw new Error('Failed to extract valid JSON array from response.');
    }

  } catch (err) {
    console.error('❌ Error generating questions from OpenAI:', err.message);
    throw err;
  }
}

module.exports = { getOpenAIQuestions };
