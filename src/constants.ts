import type { SpectrumCard, GameConfig } from "./types";

export const SPECTRUM_CARDS: SpectrumCard[] = [
  { id: 1, leftLabel: "Formal", rightLabel: "Casual" },
  { id: 2, leftLabel: "Worst subject", rightLabel: "Best subject" },
  { id: 3, leftLabel: "Optional", rightLabel: "Mandatory" },
  { id: 4, leftLabel: "Cold", rightLabel: "Hot" },
  { id: 5, leftLabel: "Small animal", rightLabel: "Big animal" },
  { id: 6, leftLabel: "Sad song", rightLabel: "Happy song" },
  { id: 7, leftLabel: "Forbidden", rightLabel: "Encouraged" },
  { id: 8, leftLabel: "Unknown", rightLabel: "Known" },
  { id: 9, leftLabel: "Common", rightLabel: "Rare" },
  { id: 10, leftLabel: "Safe job", rightLabel: "Dangerous job" },
  { id: 11, leftLabel: "Flavorless", rightLabel: "Flavorful" },
  { id: 12, leftLabel: "Worthless", rightLabel: "Priceless" },
  {
    id: 13,
    leftLabel: "Low brain activity",
    rightLabel: "High brain activity",
  },
  { id: 14, leftLabel: "Easy to run", rightLabel: "Nightmare to run" },
  { id: 15, leftLabel: "Easy to learn", rightLabel: "Difficult to learn" },
  { id: 16, leftLabel: "Vegetable", rightLabel: "Fruit" },
  { id: 17, leftLabel: "Cat", rightLabel: "Dog" },
  {
    id: 18,
    leftLabel: "Boring lab chore",
    rightLabel: "Weirdly satisfying lab chore",
  },
  { id: 19, leftLabel: "Colorless", rightLabel: "Colorful" },
  { id: 20, leftLabel: "Underpaid", rightLabel: "Overpaid" },
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
