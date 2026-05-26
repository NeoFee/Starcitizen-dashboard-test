import { NextResponse } from "next/server";
import { fetchStatus } from "@/lib/fetchers/fetchStatus";

export const revalidate = 120;

export async function GET() {
  try {
    const data = await fetchStatus();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
