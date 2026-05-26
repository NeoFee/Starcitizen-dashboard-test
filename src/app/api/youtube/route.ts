import { NextResponse } from "next/server";
import { fetchYouTube } from "@/lib/fetchers/fetchYouTube";

export const revalidate = 300;

export async function GET() {
  try {
    const items = await fetchYouTube();
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { items: [], error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
