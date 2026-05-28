import { NextRequest, NextResponse } from "next/server";
import { fetchRSI } from "@/lib/fetchers/fetchRSI";
import { checkRateLimit, safeErrorMessage } from "@/lib/apiHelpers";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  const limited = checkRateLimit(request);
  if (limited) return limited;

  try {
    const items = await fetchRSI();
    return NextResponse.json({ items, fetchedAt: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ items: [], error: safeErrorMessage(error) }, { status: 500 });
  }
}
