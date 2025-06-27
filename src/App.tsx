import { Box, Typography } from '@mui/material';
import { useGameState } from './hooks/useGameState';
import { SetupScreen } from './components/SetupScreen';
import { ClueGivingPhase } from './components/ClueGivingPhase';
import { GuessingPhase } from './components/GuessingPhase';
import { RevealPhase } from './components/RevealPhase';
import { GameOverScreen } from './components/GameOverScreen';

function App() {
  const { 
    gameState, 
    initializeGame, 
    setClue, 
    setGuessPosition, 
    revealAndScore, 
    nextPlayer, 
    resetGame 
  } = useGameState();

  if (!gameState) {
    return <SetupScreen onStartGame={initializeGame} />;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  switch (gameState.phase) {
    case 'clue-giving':
      return (
        <ClueGivingPhase
          currentPlayer={currentPlayer}
          round={gameState.currentRound}
          onClueSubmit={setClue}
        />
      );

    case 'guessing':
      return (
        <GuessingPhase
          currentPlayer={currentPlayer}
          allPlayers={gameState.players}
          round={gameState.currentRound}
          gameMode={gameState.mode}
          onPositionChange={setGuessPosition}
          onSubmitGuess={revealAndScore}
        />
      );

    case 'reveal':
      return (
        <RevealPhase
          currentPlayer={currentPlayer}
          allPlayers={gameState.players}
          round={gameState.currentRound}
          gameMode={gameState.mode}
          onNextPlayer={nextPlayer}
        />
      );

    case 'game-over':
      return (
        <GameOverScreen
          players={gameState.players}
          targetScore={gameState.targetScore}
          onNewGame={resetGame}
        />
      );

    default:
      return (
        <Box
          sx={{
            minHeight: "100dvh",
            width: "100vw",
            background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2
          }}
        >
          <Typography variant="h5" sx={{ color: "white", textAlign: "center" }}>
            Unknown game phase: {gameState.phase}
          </Typography>
        </Box>
      );
  }
}

export default App;