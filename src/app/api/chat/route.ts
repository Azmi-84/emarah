import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

// Initialize the Groq API client
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt = "Generate three open-ended and engaging questions in a single string, each separated by '||'. These questions are intended for an anonymous social messaging platform like Qooh.com and should appeal to a broad audience. The focus should be on universal themes that spark friendly and inclusive conversations, avoiding personal or sensitive topics. For example: 'What's a new skill you've learned recently?|| If you could travel anywhere in the world, where would you go and why?|| What's a movie or TV show that left a lasting impression on you?'. The questions should be thought-provoking, encourage curiosity, and help create a warm and welcoming environment.";

    const result = await generateText({
      model: groq('llama-3.1-70b-versatile'),
      prompt,
      maxTokens: 200
    });

    // Assuming result has a 'text' property with the generated text
    const responseText = result.text;

    return new NextResponse(responseText, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const errorResponse = (err as any).response;
      if (errorResponse) {
        const { status, statusText, data } = errorResponse;
        console.error(`API Error: ${status} ${statusText} - ${data?.message || 'No message provided'}`);
        return new NextResponse(JSON.stringify({ error: data?.message || 'An error occurred' }), { status });
      } else {
        console.error("An unexpected error occurred", err.message);
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
      }
    } else {
      console.error("An unexpected error occurred", err);
      throw err;
    }
  }
}
