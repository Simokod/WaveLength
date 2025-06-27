import { useEffect } from "react";
import { Box, Paper, Typography, Button, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Round, Player, GameMode } from "../types";
import { Dial } from "./Dial";
import { useTimer } from "../hooks/useTimer";
import { GAME_CONFIG } from "../constants";

interface GuessingPhaseProps {
  currentPlayer: Player;
  allPlayers: Player[];
  round: Round;
  gameMode: GameMode;
  onPositionChange: (position: number) => void;
  onSubmitGuess: () => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "24px",
  padding: theme.spacing(1, 1.5),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  width: "100%",
  boxSizing: "border-box",
}));

const PlayerCard = styled(Paper)(({ theme }) => ({
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: "2px solid transparent",
  borderRadius: "12px",
  padding: theme.spacing(1),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(1.2),
  },
  textAlign: "center",
  transition: "all 0.3s ease",
}));

const ActivePlayerCard = styled(PlayerCard)(({ color }: { color: string }) => ({
  border: `2px solid ${color}`,
  boxShadow: `0 4px 12px 0 ${color}40`,
}));

export const GuessingPhase = ({
  currentPlayer,
  allPlayers,
  round,
  gameMode,
  onPositionChange,
  onSubmitGuess,
}: GuessingPhaseProps) => {
  const { timeRemaining, isRunning, start, formatTime } = useTimer(
    GAME_CONFIG.timerDuration,
    onSubmitGuess
  );

  useEffect(() => {
    if (!isRunning) {
      start();
    }
  }, [start, isRunning]);

  const getTimerColor = () => {
    if (timeRemaining > 30) return "#4ade80";
    if (timeRemaining > 10) return "#fbbf24";
    return "#ef4444";
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c3aed 100%)",
        p: 0,
        m: 0,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "1200px" },
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
        }}
      >
        <Fade in timeout={800}>
          <Box>
            {/* Spectrum Header */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              {round.spectrumCard.leftLabel} ↔ {round.spectrumCard.rightLabel}
            </Typography>

            {/* Clue Display */}
            <StyledPaper
              elevation={0}
              sx={{ mb: { xs: 1.5, sm: 2 }, py: { xs: 1, sm: 1.5 } }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "white",
                  fontSize: { xs: "0.95rem", sm: "1.1rem" },
                }}
              >
                <Box
                  component="span"
                  sx={{ color: currentPlayer.color, fontWeight: "bold" }}
                >
                  {currentPlayer.name}'s
                </Box>{" "}
                clue: "{round.clue}"
              </Typography>
            </StyledPaper>

            {/* Timer */}
            <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 3 } }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", sm: "4rem", md: "6rem" },
                  fontWeight: "bold",
                  color: getTimerColor(),
                  transition: "color 0.3s ease",
                  lineHeight: 1,
                }}
              >
                {formatTime()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  mt: 1,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Time Remaining
              </Typography>
            </Box>

            {/* Player Scores - Competitive Mode */}
            {gameMode === "competitive" && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(4, 1fr)",
                  },
                  gap: { xs: 0.6, sm: 1 },
                  mb: { xs: 1.5, sm: 2 },
                }}
              >
                {allPlayers.map((player) => {
                  const isActive = player.id === currentPlayer.id;
                  const CardComponent = isActive
                    ? ActivePlayerCard
                    : PlayerCard;

                  return (
                    <CardComponent
                      key={player.id}
                      elevation={0}
                      color={isActive ? player.color : ""}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          color: player.color,
                          fontSize: { xs: "0.75rem", sm: "0.85rem" },
                          mb: 0.1,
                        }}
                      >
                        {player.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                        }}
                      >
                        {player.score} pts
                      </Typography>
                    </CardComponent>
                  );
                })}
              </Box>
            )}

            {/* Dial */}
            <Box
              sx={{
                mb: { xs: 2, sm: 2.5 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Dial
                position={round.guessPosition}
                leftLabel={round.spectrumCard.leftLabel}
                rightLabel={round.spectrumCard.rightLabel}
                onPositionChange={onPositionChange}
                disabled={false}
              />
            </Box>

            {/* Party Mode Player Indicator */}
            {gameMode === "party" && (
              <StyledPaper
                elevation={0}
                sx={{
                  mb: { xs: 1.5, sm: 2 },
                  textAlign: "center",
                  py: { xs: 0.8, sm: 1 },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    mb: 0.25,
                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  }}
                >
                  Currently guessing
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: currentPlayer.color,
                    fontWeight: "bold",
                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  }}
                >
                  Everyone (except {currentPlayer.name})
                </Typography>
              </StyledPaper>
            )}

            {/* Submit Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={onSubmitGuess}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontWeight: "bold",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(145deg, #10b981 0%, #059669 100%)",
                  boxShadow: "0 8px 25px 0 rgba(16, 185, 129, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-2px)" },
                    boxShadow: {
                      xs: "0 8px 25px 0 rgba(16, 185, 129, 0.4)",
                      sm: "0 12px 35px 0 rgba(16, 185, 129, 0.6)",
                    },
                  },
                  width: { xs: "100%", sm: "auto" },
                  minHeight: { xs: "48px", sm: "auto" },
                }}
              >
                LOCK IN GUESS
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};
