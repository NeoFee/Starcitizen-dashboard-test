export interface YoutubeChannel {
  id: string;
  channelId: string;
  name: string;
  description: string;
  avatarLetter: string;
  accentColor: string;
}

export interface TwitchStreamer {
  id: string;
  login: string;        // Twitch username (lowercase, exact)
  displayName: string;
  description: string;
  avatarLetter: string;
  accentColor: string;
}

export const YOUTUBE_CHANNELS: YoutubeChannel[] = [
  {
    id: "sc-official",
    channelId: "UCTeLqJq1mXUX5WWoNXLmOIA",
    name: "Star Citizen",
    description: "Offizieller Star Citizen YouTube-Kanal von Cloud Imperium Games.",
    avatarLetter: "SC",
    accentColor: "#00d4ff",
  },
  {
    id: "morphologis",
    channelId: "UCtOcQI0nBTDAEHFLuXHqFEA",
    name: "Morphologis",
    description: "Architektur, Schiffs-Reviews und tiefgehende SC-Analysen.",
    avatarLetter: "M",
    accentColor: "#f59e0b",
  },
  {
    id: "avenger-one",
    channelId: "UCeaOzmjIjUJWFT6CptfAi8g",
    name: "Avenger_One",
    description: "Guides, Tutorials und SC-News für neue und erfahrene Spieler.",
    avatarLetter: "A",
    accentColor: "#10b981",
  },
  {
    id: "citizen-kate",
    channelId: "UCcC0bCGrGx-LpLZJmXBRZqg",
    name: "Citizen Kate",
    description: "Gameplay, Erkundung und Story-Inhalte im Star Citizen Universum.",
    avatarLetter: "CK",
    accentColor: "#ec4899",
  },
];

// Verified active SC Twitch streamers (checked 2025-05)
export const TWITCH_STREAMERS: TwitchStreamer[] = [
  {
    id: "starcitizen-official",
    login: "starcitizen",
    displayName: "Star Citizen",
    description: "Offizieller CIG-Stream: Events & Präsentationen",
    avatarLetter: "SC",
    accentColor: "#00d4ff",
  },
  {
    id: "morphologis-t",
    login: "morphologis",
    displayName: "Morphologis",
    description: "Architektur & tiefgehende SC-Inhalte",
    avatarLetter: "M",
    accentColor: "#f59e0b",
  },
  {
    id: "karolinger",
    login: "karolinger",
    displayName: "Karolinger",
    description: "SciFi, Tech & Star Citizen Community",
    avatarLetter: "K",
    accentColor: "#ef4444",
  },
  {
    id: "citizenspooner",
    login: "citizenspooner",
    displayName: "CitizenSpooner",
    description: "Aktiver SC-Streamer, Contested Zones Champion 2025",
    avatarLetter: "CS",
    accentColor: "#10b981",
  },
  {
    id: "subliminalstv",
    login: "subliminalstv",
    displayName: "SubliminalsTV",
    description: "Twitch Partner & SC-Community-Betreiber",
    avatarLetter: "SL",
    accentColor: "#8b5cf6",
  },
];
