import type { SpectrumCard, GameConfig } from "./types";

export const SPECTRUM_CARDS: SpectrumCard[] = [
  {
    id: 1,
    leftLabel: "COLD",
    rightLabel: "HOT",
  },
  {
    id: 2,
    leftLabel: "LOW",
    rightLabel: "HIGH",
  },
  {
    id: 3,
    leftLabel: "SMALL",
    rightLabel: "BIG",
  },
];

export const GAME_CONFIG: GameConfig = {
  minPlayers: 2,
  maxPlayers: 4,
  defaultTargetScore: 12,
  timerDuration: 60,
  scoringZones: {
    bullseye: { radius: 2, points: 4 },
    close: { radius: 6, points: 3 },
    good: { radius: 10, points: 2 },
  },
};

export const PLAYER_COLORS = [
  "#FF8A8A",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#FFB347",
  "#87CEEB",
];
