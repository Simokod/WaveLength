import { Box, Paper, Typography, Button, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Player } from "../types";

interface GameOverScreenProps {
  players: Player[];
  targetScore: number;
  onNewGame: () => void;
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

const PlayerScoreCard = styled(Paper)(({ theme }) => ({
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: "2px solid transparent",
  borderRadius: "16px",
  padding: theme.spacing(1.5),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(2),
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.3s ease",
}));

const WinnerCard = styled(PlayerScoreCard)(() => ({
  border: "2px solid #fbbf24",
  background:
    "linear-gradient(145deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)",
  boxShadow: "0 8px 25px 0 rgba(251, 191, 36, 0.4)",
}));

export const GameOverScreen = ({
  players,
  targetScore,
  onNewGame,
}: GameOverScreenProps) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const hasWinner = winner.score >= targetScore;

  const getMedalEmoji = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "🏅";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #b45309 0%, #ea580c 50%, #dc2626 100%)",
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
          maxWidth: { xs: "100%", sm: "600px" },
          px: { xs: 2, sm: 3 },
          py: { xs: 1, sm: 3 },
        }}
      >
        <Fade in timeout={800}>
          <StyledPaper elevation={0}>
            {/* Trophy/Target Emoji */}
            <Typography
              variant="h1"
              sx={{
                textAlign: "center",
                fontSize: { xs: "5rem", sm: "8rem" },
                mb: { xs: 3, sm: 4 },
                lineHeight: 1,
              }}
            >
              {hasWinner ? "🏆" : "🎯"}
            </Typography>

            {/* Title */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              }}
            >
              {hasWinner ? "WINNER!" : "GAME OVER"}
            </Typography>

            {/* Winner Details */}
            {hasWinner && (
              <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: winner.color,
                    mb: 1,
                    fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                  }}
                >
                  {winner.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Reached {targetScore} points first!
                </Typography>
              </Box>
            )}

            {/* Final Scores */}
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white",
                  mb: { xs: 2, sm: 3 },
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                Final Scores
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                {sortedPlayers.map((player, index) => {
                  const isWinner = index === 0;
                  const CardComponent = isWinner ? WinnerCard : PlayerScoreCard;

                  return (
                    <CardComponent key={player.id} elevation={0}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            mr: { xs: 1.5, sm: 2 },
                            fontSize: { xs: "1.5rem", sm: "2rem" },
                          }}
                        >
                          {getMedalEmoji(index)}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: player.color,
                            fontSize: { xs: "1rem", sm: "1.25rem" },
                          }}
                        >
                          {player.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "white",
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        }}
                      >
                        {player.score}
                      </Typography>
                    </CardComponent>
                  );
                })}
              </Box>
            </Box>

            {/* New Game Button */}
            <Button
              variant="contained"
              size="large"
              onClick={onNewGame}
              sx={{
                width: "100%",
                py: { xs: 1.5, sm: 2 },
                px: { xs: 3, sm: 4 },
                fontSize: { xs: "1rem", sm: "1.25rem" },
                fontWeight: "bold",
                borderRadius: "16px",
                background: "linear-gradient(145deg, #9333ea 0%, #ec4899 100%)",
                boxShadow: "0 8px 25px 0 rgba(147, 51, 234, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", sm: "scale(1.05)" },
                  boxShadow: {
                    xs: "0 8px 25px 0 rgba(147, 51, 234, 0.4)",
                    sm: "0 12px 35px 0 rgba(147, 51, 234, 0.6)",
                  },
                },
                minHeight: { xs: "48px", sm: "auto" },
              }}
            >
              NEW GAME
            </Button>
          </StyledPaper>
        </Fade>
      </Box>
    </Box>
  );
};
