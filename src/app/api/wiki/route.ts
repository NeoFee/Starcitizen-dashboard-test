import { NextResponse } from "next/server";
import { fetchWiki } from "@/lib/fetchers/fetchWiki";

export const revalidate = 300;

export async function GET() {
  try {
    const items = await fetchWiki();
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { items: [], error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
