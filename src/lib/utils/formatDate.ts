import { formatDistanceToNow, format, parseISO, isValid } from "date-fns";

export function relativeDate(isoString: string): string {
  try {
    const date = parseISO(isoString);
    if (!isValid(date)) return isoString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return isoString;
  }
}

export function absoluteDate(isoString: string): string {
  try {
    const date = parseISO(isoString);
    if (!isValid(date)) return isoString;
    return format(date, "MMM d, yyyy");
  } catch {
    return isoString;
  }
}
