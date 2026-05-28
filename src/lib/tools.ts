export type ToolCategory =
  | "trading"
  | "combat"
  | "ships"
  | "mining"
  | "database"
  | "community"
  | "reference"
  | "missions"
  | "org";

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: ToolCategory;
  badge?: string;
}

export const TOOL_CATEGORIES: Record<ToolCategory, { label: string; color: string; bg: string }> = {
  trading:   { label: "Handel",     color: "text-emerald-400", bg: "bg-emerald-900/30 border-emerald-700/40" },
  combat:    { label: "Kampf",      color: "text-red-400",     bg: "bg-red-900/30 border-red-700/40" },
  ships:     { label: "Schiffe",    color: "text-cyan-400",    bg: "bg-cyan-900/30 border-cyan-700/40" },
  mining:    { label: "Mining",     color: "text-amber-400",   bg: "bg-amber-900/30 border-amber-700/40" },
  database:  { label: "Datenbank",  color: "text-violet-400",  bg: "bg-violet-900/30 border-violet-700/40" },
  community: { label: "Community",  color: "text-orange-400",  bg: "bg-orange-900/30 border-orange-700/40" },
  reference: { label: "Referenz",   color: "text-blue-400",    bg: "bg-blue-900/30 border-blue-700/40" },
  missions:  { label: "Missionen",  color: "text-pink-400",    bg: "bg-pink-900/30 border-pink-700/40" },
  org:       { label: "Org",        color: "text-teal-400",    bg: "bg-teal-900/30 border-teal-700/40" },
};

export const TOOLS: Tool[] = [
  // ── Trading ──
  {
    id: "uexcorp",
    name: "UEX Corp",
    url: "https://uexcorp.space/",
    description: "Live Rohstoffpreise, optimale Handelsrouten & Cargo-Kalkulator. Community-gepflegt mit DataRunner-Integration.",
    category: "trading",
    badge: "Beliebt",
  },
  {
    id: "ueetrading",
    name: "UEE.Trading",
    url: "https://uee.trading/",
    description: "Profit-Kalkulator, Raffinerierechner und nach ROI sortierte Handelsrouten – basierend auf UEX-Live-Daten.",
    category: "trading",
  },
  {
    id: "sc-trade-tools",
    name: "SC Trade Tools",
    url: "https://www.sc-trade.tools/",
    description: "Handels-Optimierer mit Preisvergleich, Fracht-Kalkulation und Route-Planer für alle Handelszonen.",
    category: "trading",
  },
  {
    id: "shareboard",
    name: "SC Shareboard",
    url: "https://shareboard.space/",
    description: "Community-Handelsbord für Preismeldungen, Angebote und Nachfragen direkt zwischen Spielern.",
    category: "trading",
  },

  // ── Combat ──
  {
    id: "erkul",
    name: "Erkul DPS Calculator",
    url: "https://www.erkul.games/",
    description: "Präziser DPS-Rechner für alle Schiffe und Waffen. Loadout-Optimierung, Vergleiche und Komponentenanalyse.",
    category: "combat",
    badge: "Beliebt",
  },
  {
    id: "sc-builds",
    name: "SC Builds",
    url: "https://www.erkul.games/live/calculator",
    description: "Loadout-Builder auf Erkul-Basis: Schiffe konfigurieren, Waffen und Komponenten tauschen und teilen.",
    category: "combat",
  },

  // ── Ships ──
  {
    id: "fleetyards",
    name: "FleetYards.net",
    url: "https://fleetyards.net/",
    description: "Vollständige Schiffsdatenbank mit Spezifikationen, Vergleichen, Flottenmanagement und offener API.",
    category: "ships",
    badge: "Beliebt",
  },
  {
    id: "myfleet",
    name: "myfleet.gg",
    url: "https://myfleet.gg/",
    description: "Browser-basierter 3D-Flotten-Viewer mit 240+ interaktiven Schiffsmodellen. Flotten einfach teilen.",
    category: "ships",
  },
  {
    id: "starship42",
    name: "StarShip42 InVerse",
    url: "https://www.starship42.com/",
    description: "3D-Innenraum-Viewer für Schiffe – Cockpits, Frachträume und Crew-Bereiche detailliert inspizieren.",
    category: "ships",
  },
  {
    id: "spviewer",
    name: "SP Viewer",
    url: "https://www.spviewer.eu/",
    description: "Schiffs-Performance-Datenbank: H₂-Verbrauch, Tankreichweite, Kondensatoren und Komponentenstatistiken.",
    category: "ships",
  },
  {
    id: "hangar-link",
    name: "HangarXPLOR",
    url: "https://hangarxplor.space/",
    description: "Visueller Hangar-Explorer: eigene Flotte in 3D darstellen und mit anderen teilen.",
    category: "ships",
  },

  // ── Mining ──
  {
    id: "regolith",
    name: "Regolith",
    url: "https://regolith.rocks/",
    description: "Mining-Tool-Suite mit Gesteinsanalyse, Abbaurechner, Schiffsladungen und Marktpreisen.",
    category: "mining",
    badge: "Beliebt",
  },
  {
    id: "scorgtools",
    name: "SC Org Tools – Mining",
    url: "https://scorg.tools/mining",
    description: "Quantanium-Mining-Rechner: Erzmenge, Profit, Raffineriezeiten und Crew-Auszahlung splitten.",
    category: "mining",
  },
  {
    id: "mining-lasers",
    name: "SC Mining Lasers",
    url: "https://sc-mining-lasers.com/",
    description: "Vergleich aller Mining-Laser, Module und Gadgets mit Effizienz-Ratings und Empfehlungen.",
    category: "mining",
  },

  // ── Database ──
  {
    id: "scdb",
    name: "SCDB",
    url: "https://scdb.space/",
    description: "Interaktive Datenbank für Schiffe, Komponenten, Waffen, FPS-Items, Kleidung und Hangar-Inventar.",
    category: "database",
  },
  {
    id: "sc-api",
    name: "Star Citizen API",
    url: "https://starcitizen-api.com/",
    description: "Öffentliche Community-API für Spielerdaten, Schiffe, Organisationen und Spielstatistiken.",
    category: "database",
  },
  {
    id: "rsi-hangar",
    name: "RSI My Hangar",
    url: "https://robertsspaceindustries.com/account/pledges",
    description: "Offizieller RSI-Hangar: gekaufte Schiffe, Pledges, Versicherungen und CCU-Upgrades verwalten.",
    category: "database",
  },
  {
    id: "sc-unpacked",
    name: "SC Unpacked",
    url: "https://scunpacked.com/",
    description: "Extrahierte Spielsdaten als durchsuchbare Datenbank – Schiffe, Waffen, Komponenten und Items.",
    category: "database",
  },

  // ── Reference ──
  {
    id: "sc-wiki",
    name: "Star Citizen Wiki",
    url: "https://starcitizen.tools/",
    description: "Umfassendes Community-Wiki für Spielmechaniken, Schiffe, Waffen, Orte, Handel und Guides.",
    category: "reference",
    badge: "Umfassend",
  },
  {
    id: "galactapedia",
    name: "Galactapedia",
    url: "https://robertsspaceindustries.com/galactapedia",
    description: "Offizielles In-Fiction-Lexikon von CIG mit Lore-Einträgen, Geschichte und Weltenbau-Infos.",
    category: "reference",
  },
  {
    id: "rsi-ship-matrix",
    name: "RSI Ship Matrix",
    url: "https://robertsspaceindustries.com/ship-matrix",
    description: "Offizielle Schiffsübersicht von CIG mit Spezifikationen, Status und Kaufoptionen.",
    category: "reference",
  },
  {
    id: "roadmap",
    name: "RSI Roadmap",
    url: "https://robertsspaceindustries.com/roadmap/board-view",
    description: "Offizielle Entwicklungs-Roadmap: Was kommt wann – Features, Schiffe und Release-Planung.",
    category: "reference",
  },
  {
    id: "issue-council",
    name: "Issue Council",
    url: "https://issue-council.robertsspaceindustries.com/",
    description: "Offizielle Bug-Meldeplattform: Bugs melden, bestehende Tickets upvoten und Status verfolgen.",
    category: "reference",
  },

  // ── Community ──
  {
    id: "spectrum",
    name: "Spectrum",
    url: "https://robertsspaceindustries.com/spectrum",
    description: "Offizielle Community-Plattform von CIG: Foren, Live-Chat, Org-Tools und Entwickler-Posts.",
    category: "community",
  },
  {
    id: "trackersc",
    name: "Tracker SC",
    url: "https://www.trackersc.com/",
    description: "Verfolgt Änderungen auf der RSI-Website und sendet E-Mail-/Webhook-Benachrichtigungen bei neuen Comm-Links.",
    category: "community",
  },
  {
    id: "sc-ghosts",
    name: "SC Ghosts",
    url: "https://scghosts.org/",
    description: "Kuratierter Star Citizen News-Aggregator mit RSS-Feed für offizielle Updates.",
    category: "community",
  },

  // ── Missions ──
  {
    id: "sc-career",
    name: "SC Career Guide",
    url: "https://starcitizen.tools/Career",
    description: "Übersicht aller Karrierepfade: Handel, Mining, Bounty Hunting, Salvage, Medic und mehr.",
    category: "missions",
  },
  {
    id: "bounty-db",
    name: "Bounty Hunter's Guide",
    url: "https://starcitizen.tools/Bounty_hunting",
    description: "Vollständiger Guide zu Kopfgeldjagd-Mechaniken, Missionstypen und empfohlenen Loadouts.",
    category: "missions",
  },

  // ── Org ──
  {
    id: "rsi-orgs",
    name: "RSI Org Suche",
    url: "https://robertsspaceindustries.com/orgs",
    description: "Offizielle Organisations-Suche: Finde eine Org nach Größe, Fokus, Sprache und Spielstil.",
    category: "org",
  },
  {
    id: "rsi-player",
    name: "RSI Spieler-Suche",
    url: "https://robertsspaceindustries.com/citizens",
    description: "Suche nach Citizen-Profilen, Org-Mitgliedschaften, Rang und Beitritt-Datum.",
    category: "org",
  },
];
