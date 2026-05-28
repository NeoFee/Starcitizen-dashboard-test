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
  login: string;        // Twitch username (lowercase)
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
  {
    id: "sub-surge",
    channelId: "UCOjEBlHCEHlIJBFvG-2LVNQ",
    name: "Sub_Surge",
    description: "Mining, Trading und detaillierte Gameplay-Guides für Star Citizen.",
    avatarLetter: "SS",
    accentColor: "#8b5cf6",
  },
];

export const TWITCH_STREAMERS: TwitchStreamer[] = [
  {
    id: "morphologis-t",
    login: "morphologis",
    displayName: "Morphologis",
    description: "Architektur & tiefgehende SC-Inhalte",
    avatarLetter: "M",
    accentColor: "#f59e0b",
  },
  {
    id: "sub-surge-t",
    login: "sub_surge",
    displayName: "Sub_Surge",
    description: "Mining, Trading & Gameplay-Guides",
    avatarLetter: "SS",
    accentColor: "#8b5cf6",
  },
  {
    id: "avenger-one-t",
    login: "avenger_one",
    displayName: "Avenger_One",
    description: "SC-News, Guides & Community",
    avatarLetter: "A",
    accentColor: "#10b981",
  },
  {
    id: "citizen-kate-t",
    login: "citizenkate",
    displayName: "Citizen Kate",
    description: "Exploration & Story-Inhalte",
    avatarLetter: "CK",
    accentColor: "#ec4899",
  },
  {
    id: "karolinger",
    login: "karolinger",
    displayName: "Karolinger",
    description: "Star Citizen Community & Events",
    avatarLetter: "K",
    accentColor: "#ef4444",
  },
  {
    id: "starcitizen-official",
    login: "starcitizen",
    displayName: "Star Citizen",
    description: "Offizieller CIG-Stream: Events & Präsentationen",
    avatarLetter: "SC",
    accentColor: "#00d4ff",
  },
];
