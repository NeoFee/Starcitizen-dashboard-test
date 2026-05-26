import { EXCERPT_MAX_LENGTH } from "../constants";

export function extractExcerpt(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const plain = raw
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return null;
  return plain.length > EXCERPT_MAX_LENGTH
    ? plain.slice(0, EXCERPT_MAX_LENGTH) + "…"
    : plain;
}

export function extractFirstImage(
  html: string | null | undefined
): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}
