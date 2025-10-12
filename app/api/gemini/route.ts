import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 🧩 Step 1 — Get the user pitch from the frontend
    const { pitch } = await request.json();

    // 🧠 Step 2 — Check if API key exists
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API key in .env.local file." },
        { status: 500 }
      );
    }

    // ⚙️ Step 3 — Send request to OpenRouter (Llama 3.2 model)
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "PitchPerfect",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            {
              role: "user",
              content: `You are an expert pitch coach. Give constructive feedback (tone, clarity, confidence) on this pitch:\n\n${pitch}`,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    // 🧩 Step 4 — Parse response and extract feedback
    const data = await response.json();
    const feedback =
      data?.choices?.[0]?.message?.content || "No feedback received.";

    // 🧱 Step 5 — Return it back to the frontend
    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong while contacting OpenRouter." },
      { status: 500 }
    );
  }
}
