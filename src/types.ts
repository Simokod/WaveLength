export type GamePhase =
  | "setup"
  | "clue-giving"
  | "guessing"
  | "reveal"
  | "game-over";
export type GameMode = "competitive" | "party";

export interface Player {
  id: number;
  name: string;
  score: number;
  color: string;
}

export interface SpectrumCard {
  id: number;
  leftLabel: string;
  rightLabel: string;
}

export interface Round {
  spectrumCard: SpectrumCard;
  targetPosition: number;
  clue: string;
  guessPosition: number;
  pointsScored: number;
  timerRemaining: number;
}

export interface GameState {
  phase: GamePhase;
  mode: GameMode;
  players: Player[];
  currentPlayerIndex: number;
  targetScore: number;
  currentRound: Round;
  usedCards: number[];
}

export interface GameConfig {
  minPlayers: number;
  maxPlayers: number;
  timerDuration: number;
  scoreOptions: number[];
  scoringZones: {
    bullseye: { radius: number; points: number };
    close: { radius: number; points: number };
    good: { radius: number; points: number };
  };
}
