
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || (import.meta as any).env?.VITE_DEEPSEEK_API_KEY || '';

export const chatWithDeepSeek = async (messages: Message[]) => {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is missing');
  }

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are the TradeX AI Trading Assistant. Your goal is to provide cinematic, professional, and data-driven trading strategy advice. Keep responses relatively concise but insightful. Format with markdown if needed but keep it brief.' },
        ...messages
      ],
      stream: false
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `DeepSeek API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
