import type { SpectrumCard, GameConfig } from "./types";

export const SPECTRUM_CARDS: SpectrumCard[] = [
  { id: 1, leftLabel: "Formal", rightLabel: "Casual" },
  { id: 2, leftLabel: "Worst subject", rightLabel: "Best subject" },
  { id: 3, leftLabel: "Mandatory", rightLabel: "Optional" },
  { id: 4, leftLabel: "Hot", rightLabel: "Cold" },
  { id: 5, leftLabel: "Big animal", rightLabel: "Small animal" },
  { id: 6, leftLabel: "Sad song", rightLabel: "Happy song" },
  { id: 7, leftLabel: "Forbidden", rightLabel: "Encouraged" },
  { id: 8, leftLabel: "Known", rightLabel: "Unknown" },
  { id: 9, leftLabel: "Rare", rightLabel: "Common" },
  { id: 10, leftLabel: "Dangerous job", rightLabel: "Safe job" },
  { id: 11, leftLabel: "Flavorless", rightLabel: "Flavorful" },
  { id: 12, leftLabel: "Priceless", rightLabel: "Worthless" },
  {
    id: 13,
    leftLabel: "Low brain activity",
    rightLabel: "High brain activity",
  },
  { id: 14, leftLabel: "Easy to run", rightLabel: "Nightmare to run" },
  {
    id: 15,
    leftLabel: "Low participant fuss",
    rightLabel: "High participant fuss",
  },
  { id: 16, leftLabel: "Data you want", rightLabel: "Data you get" },
  { id: 17, leftLabel: "Ideal test subject", rightLabel: "Chaos agent" },
];

export const GAME_CONFIG: GameConfig = {
  minPlayers: 2,
  maxPlayers: 4,
  scoreOptions: [20, 50, 100],
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
