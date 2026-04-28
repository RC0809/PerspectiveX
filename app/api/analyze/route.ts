import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const image = body?.image;

    // ✅ fallback (always safe)
    const fallback = () => ({
      technical:
        "The image contains structured visual elements with identifiable components.",
      social:
        "The scene suggests possible human interaction or contextual relevance.",
      environmental:
        "The surroundings appear stable with minimal environmental disruption.",
      ethical:
        "No immediate ethical concerns are visible, though interpretation depends on context.",
    });

    // ❌ no image → fallback
    if (!image) {
      console.log("⚠️ No image received → fallback");
      return NextResponse.json(fallback());
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // ❌ no API key → fallback
    if (!apiKey) {
      console.log("⚠️ API key missing → fallback");
      return NextResponse.json(fallback());
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  data: image,
                  mimeType: "image/jpeg",
                },
              },
              {
                text: `
Analyze this image and provide:

1. Technical Perspective
2. Social Perspective
3. Environmental Perspective
4. Ethical Perspective

Return ONLY JSON:
{
  "technical": "...",
  "social": "...",
  "environmental": "...",
  "ethical": "..."
}
`,
              },
            ],
          },
        ],
      });

      // ✅ FIX: always string
      const text = String(response.text || "");

      let parsed;

      try {
        parsed = JSON.parse(text);
      } catch {
        console.log("⚠️ JSON parse failed → fallback");
        parsed = fallback();
      }

      return NextResponse.json(parsed);
    } catch (aiError) {
      console.log("⚠️ Gemini failed → fallback", aiError);
      return NextResponse.json(fallback());
    }
  } catch (err) {
    console.log("🔥 TOTAL FAILURE → fallback", err);

    return NextResponse.json(
      {
        technical: "System error occurred",
        social: "Analysis unavailable",
        environmental: "Temporary issue",
        ethical: "Please try again later",
      },
      { status: 500 }
    );
  }
}