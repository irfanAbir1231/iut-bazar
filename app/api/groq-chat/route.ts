import { NextResponse } from 'next/server';

// You need to set your Groq API key here
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: Request) {
  try {
    const { messages, model = 'llama3-8b-8192', temperature = 0.7 } = await req.json();
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY is not set in environment variables.');
    }
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required.');
    }
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
      }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Groq API error');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Failed to get chat response.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
