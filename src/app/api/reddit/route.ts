import { NextResponse } from "next/server";
import { fetchReddit } from "@/lib/fetchers/fetchReddit";

export const revalidate = 300;

export async function GET() {
  try {
    const items = await fetchReddit();
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { items: [], error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
