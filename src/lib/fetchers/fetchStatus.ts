import Parser from "rss-parser";
import type { StatusData, StatusLevel, StatusComponent, Incident } from "../types";
import { STATUS_URLS } from "../constants";

type RSSItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  id?: string;
};

const parser = new Parser<Record<string, unknown>, RSSItem>();

const FALLBACK: StatusData = {
  overall: "unknown",
  description: "Status nicht verfügbar",
  components: [],
  incidents: [],
  fetchedAt: new Date().toISOString(),
};

// Statuspage prefixes incident titles with the current status keyword
function statusFromTitle(title: string): "resolved" | "investigating" | "monitoring" | "identified" | "scheduled" | "unknown" {
  const lower = title.toLowerCase();
  if (lower.startsWith("resolved")) return "resolved";
  if (lower.startsWith("investigating")) return "investigating";
  if (lower.startsWith("monitoring")) return "monitoring";
  if (lower.startsWith("identified")) return "identified";
  if (lower.startsWith("scheduled")) return "scheduled";
  return "unknown";
}

function deriveOverall(incidents: Incident[]): StatusLevel {
  const active = incidents.filter((i) => !i.resolved);
  if (active.length === 0) return "operational";
  const statuses = active.map((i) => i.status);
  if (statuses.includes("investigating")) return "major_outage";
  if (statuses.includes("identified")) return "partial_outage";
  if (statuses.includes("monitoring")) return "degraded_performance";
  if (statuses.includes("scheduled")) return "under_maintenance";
  return "operational";
}

function normalizeLevel(raw: string): StatusLevel {
  const map: Record<string, StatusLevel> = {
    operational: "operational",
    degraded_performance: "degraded_performance",
    partial_outage: "partial_outage",
    major_outage: "major_outage",
    under_maintenance: "under_maintenance",
    maintenance: "under_maintenance",
  };
  return map[raw] ?? "unknown";
}

async function fetchFromRSS(): Promise<Incident[]> {
  const feed = await parser.parseURL(STATUS_URLS.rss);
  const incidents: Incident[] = [];

  for (const item of feed.items.slice(0, 15)) {
    const title = item.title ?? "";
    const status = statusFromTitle(title);
    const resolved = status === "resolved";

    const incidentTitle = title.includes(" - ")
      ? title.split(" - ").slice(1).join(" - ").trim()
      : title;

    incidents.push({
      id: item.id ?? item.link ?? title,
      name: incidentTitle || title,
      status,
      impact: status === "investigating" ? "critical" : resolved ? "none" : "minor",
      updatedAt: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
      latestUpdate: item.contentSnippet ?? "",
      resolved,
    });
  }

  return incidents;
}

async function fetchComponents(): Promise<StatusComponent[]> {
  const res = await fetch(STATUS_URLS.components, { next: { revalidate: 120 } });
  if (!res.ok) return [];
  const json = await res.json();
  return (json?.components ?? []).map(
    (c: { id: string; name: string; status: string; group: boolean; group_id: string | null }) => ({
      id: c.id,
      name: c.name,
      status: normalizeLevel(c.status),
      group: c.group,
      groupId: c.group_id,
    })
  );
}

async function fetchOverallJSON(): Promise<{ overall: StatusLevel; description: string } | null> {
  const res = await fetch(STATUS_URLS.status, { next: { revalidate: 120 } });
  if (!res.ok) return null;
  const json = await res.json();
  return {
    overall: normalizeLevel(json?.status?.indicator ?? "unknown"),
    description: json?.status?.description ?? "Unknown",
  };
}

export async function fetchStatus(): Promise<StatusData> {
  const [rssResult, jsonResult, componentsResult] = await Promise.allSettled([
    fetchFromRSS(),
    fetchOverallJSON(),
    fetchComponents(),
  ]);

  // If RSS failed and JSON failed, return fallback
  if (rssResult.status === "rejected" && jsonResult.status === "rejected") {
    return { ...FALLBACK, fetchedAt: new Date().toISOString() };
  }

  const incidents = rssResult.status === "fulfilled" ? rssResult.value : [];
  const components = componentsResult.status === "fulfilled" ? componentsResult.value : [];

  let overall: StatusLevel;
  let description: string;

  if (jsonResult.status === "fulfilled" && jsonResult.value) {
    overall = jsonResult.value.overall;
    description = jsonResult.value.description;
  } else {
    // Derive from RSS incidents when JSON API is unavailable
    overall = deriveOverall(incidents);
    description =
      overall === "operational"
        ? "Alle Systeme betriebsbereit"
        : "Störungen erkannt – Details unten";
  }

  return {
    overall,
    description,
    components,
    incidents,
    fetchedAt: new Date().toISOString(),
  };
}
