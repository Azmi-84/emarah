import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY_HELP_CHAT,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body?.message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: body.message,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        const responseMessage = chatCompletion?.choices?.[0]?.message?.content || "No response available";

        return NextResponse.json({
            message: responseMessage,
            metadata: {
                model: "llama-3.3-70b-versatile",
                timestamp: new Date().toISOString(),
            },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "An internal error occurred. Please try again later." }, { status: 500 });
    }
}
