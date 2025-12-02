import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userCredits } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check credits
    const credits = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId))
      .limit(1);

    if (
      credits.length === 0 ||
      credits[0].totalCredits - credits[0].usedCredits <= 0
    ) {
      return NextResponse.json(
        { message: "Insufficient credits" },
        { status: 403 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const roomType = formData.get("roomType") as string;
    const theme = formData.get("theme") as string;

    if (!image || !roomType || !theme) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    // Initialize Google Gemini AI
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { message: "Server configuration error: Missing API key" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-image";
    console.log("Initializing image generation with model:", model);

    // Create the prompt
    const prompt = `Transform this ${roomType} into a ${theme} style interior design. Maintain the room's structure and layout while applying the new design theme. Focus on furniture, colors, textures, and decorative elements that match the ${theme} aesthetic.`;

    const config = {
      responseModalities: ["IMAGE", "TEXT"],
    };

    const contents = [
      {
        role: "user" as const,
        parts: [
          {
            inlineData: {
              mimeType: image.type,
              data: imageBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ];

    // Generate image using streaming
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let generatedImageBase64 = "";
    let generatedMimeType = "";

    // Collect the streamed response
    for await (const chunk of response) {
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        generatedImageBase64 = inlineData.data || "";
        generatedMimeType = inlineData.mimeType || "";
      }
    }

    if (!generatedImageBase64) {
      return NextResponse.json(
        { message: "Failed to generate image" },
        { status: 500 }
      );
    }

    // Deduct 1 credit
    await db
      .update(userCredits)
      .set({
        usedCredits: credits[0].usedCredits + 1,
      })
      .where(eq(userCredits.userId, userId));

    // Return the generated image as a data URL
    const imageUrl = `data:${generatedMimeType};base64,${generatedImageBase64}`;

    return NextResponse.json({
      imageUrl,
      message: "Design generated successfully",
    });
  } catch (error) {
    console.error("Error generating design:", error);

    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
