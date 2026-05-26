export type NewsSource = "rsi" | "reddit" | "wiki" | "youtube";

export interface NewsItem {
  id: string;
  source: NewsSource;
  title: string;
  url: string;
  excerpt: string | null;
  thumbnail: string | null;
  publishedAt: string;
  author: string | null;
  meta?: {
    score?: number;
    numComments?: number;
    flair?: string;
    videoId?: string;
    wikiCategory?: string;
  };
}

export interface SourceError {
  source: NewsSource;
  message: string;
}

export interface NewsResponse {
  items: NewsItem[];
  fetchedAt: string;
  errors: SourceError[];
}

export type FilterState = NewsSource | "all";

// Platform Status
export type StatusLevel =
  | "operational"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage"
  | "under_maintenance"
  | "unknown";

export interface StatusComponent {
  id: string;
  name: string;
  status: StatusLevel;
  group: boolean;
  groupId: string | null;
}

export interface Incident {
  id: string;
  name: string;
  status: string;
  impact: string;
  updatedAt: string;
  latestUpdate: string;
}

export interface StatusData {
  overall: StatusLevel;
  description: string;
  components: StatusComponent[];
  activeIncidents: Incident[];
  fetchedAt: string;
}
