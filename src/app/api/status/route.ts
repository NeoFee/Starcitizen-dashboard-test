import { NextRequest, NextResponse } from "next/server";
import { fetchStatus } from "@/lib/fetchers/fetchStatus";
import { checkRateLimit, safeErrorMessage } from "@/lib/apiHelpers";

export const revalidate = 120;

export async function GET(request: NextRequest) {
  const limited = checkRateLimit(request);
  if (limited) return limited;

  try {
    const data = await fetchStatus();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: safeErrorMessage(error) }, { status: 500 });
  }
}
