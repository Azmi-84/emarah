import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

// Initialize the Groq API client
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Generate three distinct, open-ended, and engaging questions in a single string, separated by '||'. These questions are designed for an anonymous social messaging platform similar to Qooh.com, aiming to resonate with a broad and diverse audience. Focus on universal themes that spark curiosity, foster friendly and inclusive discussions, and encourage thoughtful sharing. Avoid personal, sensitive, or controversial topics. The questions should be fresh, inviting, and adaptable to anyone’s experience, helping to create a warm and welcoming environment. Examples include: 'What’s the most interesting thing you’ve learned this week?||If you could have a conversation with any historical figure, who would it be and why?||What’s a small act of kindness that someone has done for you that you’ll never forget?'. Ensure that each set of questions is unique, thought-provoking, and promotes a sense of connection and discovery.";

    const result = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      maxTokens: 200,
    });

    // Assuming result has a 'text' property with the generated text
    const responseText = result.text;

    return new NextResponse(responseText, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      const errorResponse = (err as any).response;
      if (errorResponse) {
        const { status, statusText, data } = errorResponse;
        console.error(
          `API Error: ${status} ${statusText} - ${
            data?.message || "No message provided"
          }`
        );
        return new NextResponse(
          JSON.stringify({ error: data?.message || "An error occurred" }),
          { status }
        );
      } else {
        console.error("An unexpected error occurred", err.message);
        return new NextResponse(JSON.stringify({ error: err.message }), {
          status: 500,
        });
      }
    } else {
      console.error("An unexpected error occurred", err);
      throw err;
    }
  }
}
