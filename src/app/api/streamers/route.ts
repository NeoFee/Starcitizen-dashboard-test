import { NextRequest, NextResponse } from "next/server";
import { fetchStreamerVideos } from "@/lib/fetchers/fetchStreamerVideos";
import { checkRateLimit, safeErrorMessage } from "@/lib/apiHelpers";
import { YOUTUBE_CHANNELS } from "@/lib/streamers";

export const revalidate = 300;

const VALID_CHANNEL_IDS = new Set(YOUTUBE_CHANNELS.map((c) => c.channelId));

export async function GET(request: NextRequest) {
  const limited = checkRateLimit(request);
  if (limited) return limited;

  const channelParam = new URL(request.url).searchParams.get("channel");

  // Whitelist validation — reject unknown channel IDs
  if (channelParam !== null && !VALID_CHANNEL_IDS.has(channelParam)) {
    return NextResponse.json({ items: [], error: "Unbekannte Channel-ID." }, { status: 400 });
  }

  try {
    const items = await fetchStreamerVideos(channelParam ?? undefined);
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ items: [], error: safeErrorMessage(error) }, { status: 500 });
  }
}
