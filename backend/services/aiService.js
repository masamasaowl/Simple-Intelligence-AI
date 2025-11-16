// The gpt-4.0-mini logic is written here

import OpenAI from 'openai';

// use the service
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API call
export const aiService = {

    // function as object
  getChatCompletion: async (messages) => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 2048,
        temperature: 0.7,
      });

      return {
        success: true,
        content: response.choices[0].message.content,
        usage: response.usage
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to get AI response');
    }
  }
};