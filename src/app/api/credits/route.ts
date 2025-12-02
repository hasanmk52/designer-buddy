import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userCredits } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Check if user has credits record
    let credits = await db
      .select()
      .from(userCredits)
      .where(eq(userCredits.userId, userId))
      .limit(1);

    // If no credits record exists, create one with 30 free credits
    if (credits.length === 0) {
      await db.insert(userCredits).values({
        userId,
        totalCredits: 30,
        usedCredits: 0,
      });

      // Fetch the newly created record
      credits = await db
        .select()
        .from(userCredits)
        .where(eq(userCredits.userId, userId))
        .limit(1);
    }

    const creditData = credits[0];

    return NextResponse.json({
      totalCredits: creditData.totalCredits,
      usedCredits: creditData.usedCredits,
      remainingCredits: creditData.totalCredits - creditData.usedCredits,
    });
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
