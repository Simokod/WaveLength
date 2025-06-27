import type { Round, Player } from '../types';
import { SPECTRUM_CARDS, GAME_CONFIG, PLAYER_COLORS } from '../constants';

export const generateNewRound = (usedCards: number[]): Round => {
  const availableCards = SPECTRUM_CARDS.filter(card => !usedCards.includes(card.id));
  const spectrumCard = availableCards.length > 0 
    ? availableCards[Math.floor(Math.random() * availableCards.length)]
    : SPECTRUM_CARDS[Math.floor(Math.random() * SPECTRUM_CARDS.length)];

  return {
    spectrumCard,
    targetPosition: Math.floor(Math.random() * 61) + 20, // 20-80 to avoid edges
    clue: '',
    guessPosition: 50,
    pointsScored: 0,
    timerRemaining: GAME_CONFIG.timerDuration
  };
};

export const createPlayers = (playerCount: number): Player[] => {
  return Array.from({ length: playerCount }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    score: 0,
    color: PLAYER_COLORS[i]
  }));
};

export const getNextPlayerIndex = (currentIndex: number, totalPlayers: number): number => {
  return (currentIndex + 1) % totalPlayers;
};

export const checkWinCondition = (players: Player[], targetScore: number): Player | null => {
  return players.find(p => p.score >= targetScore) || null;
};