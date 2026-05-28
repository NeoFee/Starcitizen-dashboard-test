import type { StatusData, StatusLevel, StatusComponent, Incident } from "../types";
import { STATUS_URLS } from "../constants";

function normalizeStatus(raw: string): StatusLevel {
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

const UNKNOWN_STATUS: StatusData = {
  overall: "unknown",
  description: "Status nicht verfügbar",
  components: [],
  activeIncidents: [],
  fetchedAt: new Date().toISOString(),
};

export async function fetchStatus(): Promise<StatusData> {
  let statusRes: Response, componentsRes: Response, incidentsRes: Response;

  try {
    [statusRes, componentsRes, incidentsRes] = await Promise.all([
      fetch(STATUS_URLS.status, { next: { revalidate: 120 } }),
      fetch(STATUS_URLS.components, { next: { revalidate: 120 } }),
      fetch(STATUS_URLS.incidents, { next: { revalidate: 120 } }),
    ]);
  } catch {
    return { ...UNKNOWN_STATUS, fetchedAt: new Date().toISOString() };
  }

  if (!statusRes.ok) return { ...UNKNOWN_STATUS, fetchedAt: new Date().toISOString() };

  const [statusJson, componentsJson, incidentsJson] = await Promise.all([
    statusRes.json(),
    componentsRes.ok ? componentsRes.json() : { components: [] },
    incidentsRes.ok ? incidentsRes.json() : { incidents: [] },
  ]);

  const overall = normalizeStatus(statusJson?.status?.indicator ?? "unknown");
  const description: string = statusJson?.status?.description ?? "Unknown";

  const components: StatusComponent[] = (
    componentsJson?.components ?? []
  ).map(
    (c: {
      id: string;
      name: string;
      status: string;
      group: boolean;
      group_id: string | null;
    }) => ({
      id: c.id,
      name: c.name,
      status: normalizeStatus(c.status),
      group: c.group,
      groupId: c.group_id,
    })
  );

  const activeIncidents: Incident[] = (incidentsJson?.incidents ?? [])
    .slice(0, 5)
    .map(
      (inc: {
        id: string;
        name: string;
        status: string;
        impact: string;
        updated_at: string;
        incident_updates?: Array<{ body: string }>;
      }) => ({
        id: inc.id,
        name: inc.name,
        status: inc.status,
        impact: inc.impact,
        updatedAt: inc.updated_at,
        latestUpdate: inc.incident_updates?.[0]?.body ?? "",
      })
    );

  return {
    overall,
    description,
    components,
    activeIncidents,
    fetchedAt: new Date().toISOString(),
  };
}
