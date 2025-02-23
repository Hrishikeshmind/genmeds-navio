
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function chatWithAI(message: string, apiKey: string) {
  try {
    const systemMessage = `You are a helpful medical assistant AI. You can:
    1. Provide general information about medicines and medical conditions
    2. Suggest over-the-counter remedies for common ailments
    3. Explain medical terms in simple language
    4. Provide general health and wellness advice
    
    Important: Always include a disclaimer that you're not a replacement for professional medical advice, and serious medical concerns should be discussed with a healthcare provider.`;

    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message }
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in chatWithAI:', error);
    throw new Error('Failed to get AI response');
  }
}
