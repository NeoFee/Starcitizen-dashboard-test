import { NextRequest, NextResponse } from "next/server";
import { fetchStreamerVideos } from "@/lib/fetchers/fetchStreamerVideos";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const channelId = new URL(request.url).searchParams.get("channel") ?? undefined;
  try {
    const items = await fetchStreamerVideos(channelId);
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { items: [], error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
