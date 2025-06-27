import { Box, Paper, Typography, Button, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Round, Player, GameMode } from "../types";
import { Dial } from "./Dial";
import { getScoreLabel, getScoreColor } from "../utils/scoring";

interface RevealPhaseProps {
  currentPlayer: Player;
  allPlayers: Player[];
  round: Round;
  gameMode: GameMode;
  onNextPlayer: () => void;
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

export const RevealPhase = ({
  currentPlayer,
  allPlayers,
  round,
  gameMode,
  onNextPlayer,
}: RevealPhaseProps) => {
  const scoreLabel = getScoreLabel(round.pointsScored);
  const scoreColor = getScoreColor(round.pointsScored);

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #065f46 0%, #059669 50%, #0d9488 100%)",
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
            {/* Compact Header */}
            <Box sx={{ textAlign: "center", mb: { xs: 1.5, sm: 2 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "3rem" },
                    lineHeight: 1,
                  }}
                >
                  {round.pointsScored > 0 ? "🎉" : "😅"}
                </Typography>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "4rem" },
                      fontWeight: "bold",
                      color: scoreColor,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                      lineHeight: 1,
                    }}
                  >
                    {gameMode === "competitive" ? round.pointsScored : "🎯"}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: scoreColor,
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                    {scoreLabel}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  mb: 0.5,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                }}
              >
                {round.spectrumCard.leftLabel} ↔ {round.spectrumCard.rightLabel}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Clue: "{round.clue}"
              </Typography>
            </Box>

            {/* Dial */}
            <Box
              sx={{
                mb: { xs: 0.3, sm: 0.5 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Dial
                position={round.guessPosition}
                targetPosition={round.targetPosition}
                showTarget={true}
                showPositionText={false}
                leftLabel={round.spectrumCard.leftLabel}
                rightLabel={round.spectrumCard.rightLabel}
                onPositionChange={() => {}}
                disabled={true}
              />
            </Box>

            {/* Result Statistics */}
            <StyledPaper
              elevation={0}
              sx={{ mb: { xs: 1.5, sm: 2 }, py: { xs: 0.8, sm: 1.5 } }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: { xs: 1, sm: 2 },
                  textAlign: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      mb: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    }}
                  >
                    Target
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                    {Math.round(round.targetPosition)}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      mb: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    }}
                  >
                    Guess
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                    {Math.round(round.guessPosition)}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      mb: 0.5,
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    }}
                  >
                    Distance
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                    {Math.round(
                      Math.abs(round.targetPosition - round.guessPosition)
                    )}
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>

            {/* Player Rankings - Competitive Mode */}
            {gameMode === "competitive" && (
              <StyledPaper
                elevation={0}
                sx={{ mb: { xs: 1.5, sm: 2 }, py: { xs: 0.8, sm: 1 } }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: { xs: 0.6, sm: 1 },
                  }}
                >
                  {/* Sort players by score descending and show rankings */}
                  {[...allPlayers]
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => {
                      const isCurrentPlayer = player.id === currentPlayer.id;

                      return (
                        <Box
                          key={player.id}
                          sx={{
                            background: isCurrentPlayer
                              ? `linear-gradient(145deg, ${player.color}20, ${player.color}10)`
                              : "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                            border: isCurrentPlayer
                              ? `2px solid ${player.color}`
                              : "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "6px",
                            padding: { xs: "3px", sm: "4px" },
                            textAlign: "center",
                            position: "relative",
                          }}
                        >
                          {/* Rank badge */}
                          <Typography
                            variant="caption"
                            sx={{
                              position: "absolute",
                              top: -8,
                              left: 8,
                              background:
                                index === 0
                                  ? "#ffd700"
                                  : index === 1
                                  ? "#c0c0c0"
                                  : index === 2
                                  ? "#cd7f32"
                                  : "#6b7280",
                              color: index < 3 ? "#000" : "#fff",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                            }}
                          >
                            {index + 1}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              color: player.color,
                              fontSize: { xs: "0.75rem", sm: "0.85rem" },
                              mb: 0.25,
                            }}
                          >
                            {player.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: "rgba(255,255,255,0.8)",
                              fontSize: { xs: "0.7rem", sm: "0.75rem" },
                            }}
                          >
                            {player.score} points
                            {isCurrentPlayer && round.pointsScored > 0 && (
                              <span
                                style={{ color: "#4ade80", fontWeight: "bold" }}
                              >
                                {" "}
                                (+{round.pointsScored})
                              </span>
                            )}
                          </Typography>
                        </Box>
                      );
                    })}
                </Box>
              </StyledPaper>
            )}

            {/* Party Mode Message */}
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
                    color: "rgba(255,255,255,0.8)",
                    mb: 0.25,
                    fontSize: { xs: "0.75rem", sm: "0.8rem" },
                  }}
                >
                  Clue by:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: currentPlayer.color,
                    mb: 0.25,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  {currentPlayer.name}
                </Typography>
              </StyledPaper>
            )}

            {/* Next Player Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={onNextPlayer}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontWeight: "bold",
                  borderRadius: "16px",
                  background:
                    "linear-gradient(145deg, #9333ea 0%, #ec4899 100%)",
                  boxShadow: "0 8px 25px 0 rgba(147, 51, 234, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-2px)" },
                    boxShadow: {
                      xs: "0 8px 25px 0 rgba(147, 51, 234, 0.4)",
                      sm: "0 12px 35px 0 rgba(147, 51, 234, 0.6)",
                    },
                  },
                  width: { xs: "100%", sm: "auto" },
                  minHeight: { xs: "48px", sm: "auto" },
                }}
              >
                NEXT PLAYER
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};
