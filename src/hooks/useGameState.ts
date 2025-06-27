import { useState } from "react";
import type { GameState, GameMode } from "../types";
import {
  generateNewRound,
  createPlayers,
  getNextPlayerIndex,
  checkWinCondition,
} from "../utils/gameLogic";
import { calculateScore } from "../utils/scoring";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const initializeGame = (
    playerCount: number,
    targetScore: number,
    gameMode: GameMode
  ) => {
    const players = createPlayers(playerCount);
    const initialRound = generateNewRound([]);

    setGameState({
      phase: "clue-giving",
      mode: gameMode,
      players,
      currentPlayerIndex: 0,
      targetScore,
      currentRound: initialRound,
      usedCards: [initialRound.spectrumCard.id],
    });
  };

  const setClue = (clue: string) => {
    if (!gameState) return;

    setGameState((prev) => ({
      ...prev!,
      currentRound: {
        ...prev!.currentRound,
        clue,
      },
      phase: "guessing",
    }));
  };

  const setGuessPosition = (position: number) => {
    if (!gameState) return;

    setGameState((prev) => ({
      ...prev!,
      currentRound: {
        ...prev!.currentRound,
        guessPosition: position,
      },
    }));
  };

  const revealAndScore = () => {
    if (!gameState) return;

    const points = calculateScore(
      gameState.currentRound.targetPosition,
      gameState.currentRound.guessPosition
    );

    setGameState((prev) => {
      if (!prev) return prev;

      const updatedPlayers = [...prev!.players];

      // Only add points in competitive mode
      if (prev!.mode === "competitive") {
        const updatedPlayer = {
          ...updatedPlayers[prev!.currentPlayerIndex],
          score: updatedPlayers[prev!.currentPlayerIndex].score + points,
        };

        updatedPlayers[prev!.currentPlayerIndex] = updatedPlayer;
      }

      return {
        ...prev!,
        players: updatedPlayers,
        currentRound: {
          ...prev!.currentRound,
          pointsScored: points,
        },
        phase: "reveal",
      };
    });
  };

  const nextPlayer = () => {
    if (!gameState) return;

    const nextPlayerIndex = getNextPlayerIndex(
      gameState.currentPlayerIndex,
      gameState.players.length
    );

    // Check win condition only in competitive mode
    if (gameState.mode === "competitive") {
      const winner = checkWinCondition(
        gameState.players,
        gameState.targetScore
      );
      if (winner) {
        setGameState((prev) => ({
          ...prev!,
          phase: "game-over",
        }));
        return;
      }
    }

    const newRound = generateNewRound(gameState.usedCards);

    setGameState((prev) => ({
      ...prev!,
      currentPlayerIndex: nextPlayerIndex,
      currentRound: newRound,
      usedCards: [...prev!.usedCards, newRound.spectrumCard.id],
      phase: "clue-giving",
    }));
  };

  const resetGame = () => {
    setGameState(null);
  };

  return {
    gameState,
    initializeGame,
    setClue,
    setGuessPosition,
    revealAndScore,
    nextPlayer,
    resetGame,
  };
};
