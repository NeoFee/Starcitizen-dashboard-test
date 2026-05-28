import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, safeErrorMessage } from "@/lib/apiHelpers";

export const revalidate = 60;

interface TokenCache {
  token: string;
  expiresAt: number;
}

// Module-level caches: reused across requests within the same server instance
let tokenCache: TokenCache | null = null;
let gameIdCache: string | null = null;

async function getAppToken(clientId: string, clientSecret: string): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) {
    return tokenCache.token;
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
  });

  const res = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, {
    method: "POST",
    signal: AbortSignal.timeout(8_000),
  });

  if (!res.ok) {
    throw new Error(`Twitch OAuth failed: ${res.status}`);
  }

  const data = await res.json() as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return tokenCache.token;
}

async function getStarCitizenGameId(clientId: string, token: string): Promise<string> {
  if (gameIdCache) return gameIdCache;

  const res = await fetch(
    "https://api.twitch.tv/helix/games?name=Star+Citizen",
    {
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(8_000),
    }
  );

  if (!res.ok) {
    if (res.status === 401) tokenCache = null;
    throw new Error(`Twitch Games API returned ${res.status}`);
  }

  const json = await res.json() as { data: Array<{ id: string; name: string }> };
  const game = json.data?.[0];

  if (!game) {
    throw new Error("Star Citizen not found in Twitch game directory");
  }

  gameIdCache = game.id;
  return gameIdCache;
}

export interface LiveStream {
  login: string;
  displayName: string;
  title: string;
  viewerCount: number;
  thumbnailUrl: string;
  startedAt: string;
}

export interface TwitchLiveResponse {
  configured: boolean;
  streams: LiveStream[];
  error?: string;
}

export async function GET(request: NextRequest): Promise<NextResponse<TwitchLiveResponse>> {
  const limited = checkRateLimit(request);
  if (limited) return limited as NextResponse<TwitchLiveResponse>;

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ configured: false, streams: [] });
  }

  try {
    const token = await getAppToken(clientId, clientSecret);
    const gameId = await getStarCitizenGameId(clientId, token);

    const res = await fetch(
      `https://api.twitch.tv/helix/streams?game_id=${gameId}&first=10`,
      {
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10_000),
      }
    );

    if (!res.ok) {
      if (res.status === 401) tokenCache = null;
      throw new Error(`Twitch Helix API returned ${res.status}`);
    }

    const json = await res.json() as {
      data: Array<{
        user_login: string;
        user_name: string;
        title: string;
        viewer_count: number;
        thumbnail_url: string;
        started_at: string;
      }>;
    };

    const streams: LiveStream[] = (json.data ?? []).map((s) => ({
      login: s.user_login,
      displayName: s.user_name,
      title: s.title,
      viewerCount: s.viewer_count,
      thumbnailUrl: s.thumbnail_url
        .replace("{width}", "440")
        .replace("{height}", "248"),
      startedAt: s.started_at,
    }));

    return NextResponse.json({ configured: true, streams });
  } catch (error) {
    return NextResponse.json(
      { configured: true, streams: [], error: safeErrorMessage(error) },
      { status: 500 }
    );
  }
}
