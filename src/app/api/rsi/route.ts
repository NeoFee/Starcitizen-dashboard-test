import { NextResponse } from "next/server";
import { fetchRSI } from "@/lib/fetchers/fetchRSI";

export const revalidate = 300;

export async function GET() {
  try {
    const items = await fetchRSI();
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { items: [], error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
