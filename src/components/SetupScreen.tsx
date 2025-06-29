import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Fade,
  Chip,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { GAME_CONFIG } from "../constants";
import type { GameMode } from "../types";

interface SetupScreenProps {
  onStartGame: (
    playerCount: number,
    targetScore: number,
    gameMode: GameMode
  ) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: "24px",
  padding: theme.spacing(1, 1.5),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  width: "100%",
  boxSizing: "border-box",
}));

const ModeCard = styled(Card)<{ selected: boolean }>(({ theme, selected }) => ({
  background: selected
    ? "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)"
    : "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: selected ? "2px solid #6366f1" : "2px solid transparent",
  borderRadius: "16px",
  cursor: "pointer",
  // Separate transitions for mobile vs desktop
  [theme.breakpoints.down("sm")]: {
    transition: "background 0.3s ease, border 0.3s ease",
    "&:hover": {
      // No layout-affecting changes on mobile
    },
  },
  [theme.breakpoints.up("sm")]: {
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.5)",
    },
  },
}));

export const SetupScreen = ({ onStartGame }: SetupScreenProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<number>(4); // Default to 4 players
  const [selectedScore, setSelectedScore] = useState(
    GAME_CONFIG.defaultTargetScore
  );
  const [selectedMode, setSelectedMode] = useState<GameMode>("competitive");

  const handleStartGame = () => {
    if (selectedMode === "party") {
      // For party mode, default to 4 players and any score (not used)
      onStartGame(4, 12, selectedMode);
    } else {
      onStartGame(selectedPlayers, selectedScore, selectedMode);
    }
  };

  const scoreOptions = [20, 50, 100];

  const canStart = true; // Always can start now since we have defaults

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "center",
        p: 0,
        m: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "500px" },
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 3 },
        }}
      >
        <Fade in timeout={800}>
          <StyledPaper elevation={0}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                textAlign: "center",
                mb: { xs: 3, sm: 6 },
                fontWeight: "bold",
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              🌊 WAVELENGTH
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 1.5, sm: 4 },
                minHeight: "auto",
              }}
            >
              {/* Game Mode Selection */}
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    mb: { xs: 2, sm: 3 },
                    fontWeight: 600,
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  }}
                >
                  Choose Game Mode
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1, sm: 2 },
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <ModeCard
                    selected={selectedMode === "competitive"}
                    sx={{
                      flex: { sm: 1 },
                      height: { xs: "70px", sm: "100px" },
                      width: "100%",
                    }}
                  >
                    <CardActionArea
                      onClick={() => setSelectedMode("competitive")}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CardContent sx={{ p: 0, width: "100%" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                          }}
                        >
                          🏆 Competitive
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            opacity: 0.8,
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          }}
                        >
                          Play to reach target score - track points!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ModeCard>

                  <ModeCard
                    selected={selectedMode === "party"}
                    sx={{
                      flex: { sm: 1 },
                      height: { xs: "70px", sm: "100px" },
                      width: "100%",
                    }}
                  >
                    <CardActionArea
                      onClick={() => setSelectedMode("party")}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CardContent sx={{ p: 0, width: "100%" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: 1,
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                          }}
                        >
                          🎉 Party Mode
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            opacity: 0.8,
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          }}
                        >
                          Just for fun - no scoring!
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </ModeCard>
                </Box>
              </Box>

              {/* Competitive Mode Settings */}
              <Box
                sx={{
                  height: { xs: "280px", sm: "320px" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {selectedMode === "competitive" ? (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: { xs: 1, sm: 4 },
                    }}
                  >
                    {/* Player Count */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          textAlign: "center",
                          mb: { xs: 1, sm: 3 },
                          fontWeight: 600,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        How many players?
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={{ xs: 1, sm: 2 }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {[2, 3, 4].map((playerCount) => (
                          <Chip
                            key={playerCount}
                            label={playerCount}
                            onClick={() => setSelectedPlayers(playerCount)}
                            sx={{
                              px: { xs: 1.5, sm: 2 },
                              py: 1,
                              fontSize: { xs: "14px", sm: "16px" },
                              fontWeight: "bold",
                              height: { xs: "40px", sm: "48px" },
                              width: { xs: "80px", sm: "auto" },
                              background:
                                selectedPlayers === playerCount
                                  ? "linear-gradient(145deg, #6366f1 0%, #8b5cf6 100%)"
                                  : "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                              color: "white",
                              border:
                                selectedPlayers === playerCount
                                  ? "2px solid #ffffff"
                                  : "1px solid rgba(255,255,255,0.3)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                                background:
                                  selectedPlayers === playerCount
                                    ? "linear-gradient(145deg, #5855eb 0%, #7c3aed 100%)"
                                    : "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
                              },
                              "& .MuiChip-label": {
                                color: "inherit",
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Target Score */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          textAlign: "center",
                          mb: { xs: 1, sm: 3 },
                          fontWeight: 600,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        Target Score
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={{ xs: 1, sm: 2 }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {scoreOptions.map((score) => (
                          <Chip
                            key={score}
                            label={score}
                            onClick={() => setSelectedScore(score)}
                            sx={{
                              px: { xs: 1.5, sm: 2 },
                              py: 1,
                              fontSize: { xs: "14px", sm: "16px" },
                              fontWeight: "bold",
                              height: { xs: "40px", sm: "48px" },
                              width: { xs: "80px", sm: "auto" },
                              background:
                                selectedScore === score
                                  ? "linear-gradient(145deg, #6366f1 0%, #8b5cf6 100%)"
                                  : "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                              color: "white",
                              border:
                                selectedScore === score
                                  ? "2px solid #ffffff"
                                  : "1px solid rgba(255,255,255,0.3)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                                background:
                                  selectedScore === score
                                    ? "linear-gradient(145deg, #5855eb 0%, #7c3aed 100%)"
                                    : "linear-gradient(145deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)",
                              },
                              "& .MuiChip-label": {
                                color: "inherit",
                              },
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: "white",
                        mb: 2,
                        fontSize: "3rem",
                      }}
                    >
                      🎊
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        mb: 1,
                        fontWeight: 600,
                      }}
                    >
                      Ready to Party!
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        maxWidth: "300px",
                        mx: "auto",
                      }}
                    >
                      No setup needed - just pass the device around and have fun
                      guessing!
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Start Button */}
              <Button
                variant="contained"
                size="large"
                onClick={handleStartGame}
                disabled={!canStart}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  px: { xs: 3, sm: 4 },
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontWeight: "bold",
                  borderRadius: "16px",
                  background: canStart
                    ? "linear-gradient(145deg, #f59e0b 0%, #ef4444 100%)"
                    : "linear-gradient(145deg, #6b7280 0%, #4b5563 100%)",
                  boxShadow: canStart
                    ? "0 8px 25px 0 rgba(245, 158, 11, 0.4)"
                    : "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: canStart ? "translateY(-2px)" : "none",
                    boxShadow: canStart
                      ? "0 12px 35px 0 rgba(245, 158, 11, 0.6)"
                      : "none",
                  },
                  width: { xs: "100%", sm: "auto" },
                  minHeight: { xs: "48px", sm: "auto" },
                }}
              >
                START GAME
              </Button>
            </Box>
          </StyledPaper>
        </Fade>
      </Box>
    </Box>
  );
};
