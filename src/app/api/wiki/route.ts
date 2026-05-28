import { NextRequest, NextResponse } from "next/server";
import { fetchWiki } from "@/lib/fetchers/fetchWiki";
import { checkRateLimit, safeErrorMessage } from "@/lib/apiHelpers";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const limited = checkRateLimit(request);
  if (limited) return limited;

  try {
    const items = await fetchWiki();
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ items: [], error: safeErrorMessage(error) }, { status: 500 });
  }
}
