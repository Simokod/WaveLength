import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Round, Player } from "../types";
import { Dial } from "./Dial";

interface ClueGivingPhaseProps {
  currentPlayer: Player;
  round: Round;
  onClueSubmit: (clue: string) => void;
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

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: "16px",
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255,255,255,0.7)",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "white",
    fontSize: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.7)",
    "&.Mui-focused": {
      color: "white",
    },
  },
}));

export const ClueGivingPhase = ({
  currentPlayer,
  round,
  onClueSubmit,
}: ClueGivingPhaseProps) => {
  const [clue, setClue] = useState("");
  const [showPrivateView, setShowPrivateView] = useState(false);

  const handleReveal = () => {
    setShowPrivateView(true);
  };

  const handleSubmitClue = () => {
    if (clue.trim()) {
      onClueSubmit(clue.trim());
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmitClue();
    }
  };

  if (!showPrivateView) {
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
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    color: "white",
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                >
                  {currentPlayer.name}'s Turn
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255,255,255,0.8)",
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  You are the clue-giver!
                </Typography>

                <Alert
                  severity="warning"
                  icon={false}
                  sx={{
                    mb: { xs: 3, sm: 4 },
                    backgroundColor: "rgba(255, 152, 0, 0.2)",
                    color: "white",
                    border: "1px solid rgba(255, 152, 0, 0.5)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    "& .MuiAlert-icon": {
                      color: "rgba(255, 193, 7, 0.9)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      <span
                        role="img"
                        aria-label="warning"
                        style={{ marginRight: 8 }}
                      >
                        ⚠️
                      </span>
                      PRIVATE SCREEN
                    </Typography>
                    <Typography variant="body2">
                      Make sure nobody else can see your screen, then click
                      reveal to see the target.
                    </Typography>
                  </Box>
                </Alert>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleReveal}
                  sx={{
                    py: { xs: 1.5, sm: 2 },
                    px: { xs: 3, sm: 4 },
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    fontWeight: "bold",
                    borderRadius: "16px",
                    background:
                      "linear-gradient(145deg, #9c27b0 0%, #e91e63 100%)",
                    boxShadow: "0 8px 25px 0 rgba(156, 39, 176, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: { xs: "none", sm: "translateY(-2px)" },
                      boxShadow: {
                        xs: "0 8px 25px 0 rgba(156, 39, 176, 0.4)",
                        sm: "0 12px 35px 0 rgba(156, 39, 176, 0.6)",
                      },
                    },
                    width: { xs: "100%", sm: "auto" },
                    minHeight: { xs: "48px", sm: "auto" },
                  }}
                >
                  REVEAL TARGET
                </Button>
              </Box>
            </StyledPaper>
          </Fade>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100vw",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 0,
        m: 0,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "900px" },
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
        }}
      >
        <Fade in timeout={800}>
          <Box>
            {/* Private Warning */}
            <Alert
              severity="error"
              icon="🔒"
              sx={{
                mb: { xs: 2, sm: 3 },
                backgroundColor: "rgba(244, 67, 54, 0.2)",
                color: "white",
                border: "1px solid rgba(244, 67, 54, 0.5)",
                borderRadius: "16px",
                textAlign: "center",
                "& .MuiAlert-icon": {
                  color: "rgba(244, 67, 54, 0.9)",
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                PRIVATE - {currentPlayer.name} ONLY
              </Typography>
            </Alert>

            {/* Spectrum Display */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                mb: { xs: 3, sm: 4 },
                fontSize: { xs: "1.8rem", sm: "2.5rem" },
              }}
            >
              {round.spectrumCard.leftLabel} ↔ {round.spectrumCard.rightLabel}
            </Typography>

            {/* Dial - Show target zone but no needle */}
            <Box
              sx={{
                mb: { xs: 3, sm: 4 },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Dial
                position={round.targetPosition}
                targetPosition={round.targetPosition}
                showTarget={true}
                showNeedle={false}
                leftLabel={round.spectrumCard.leftLabel}
                rightLabel={round.spectrumCard.rightLabel}
                onPositionChange={() => {}}
                disabled={true}
              />
            </Box>

            {/* Clue Input */}
            <StyledPaper
              elevation={0}
              sx={{ mb: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}
            >
              <Typography
                variant="body1"
                component="label"
                sx={{
                  display: "block",
                  color: "white",
                  fontWeight: "bold",
                  mb: { xs: 1, sm: 1.5 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                Enter your clue:
              </Typography>

              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Think of something that fits..."
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  sx: {
                    height: { xs: "44px", sm: "48px" },
                  },
                }}
              />
            </StyledPaper>

            {/* Submit Button */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmitClue}
                disabled={!clue.trim()}
                sx={{
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 2.5, sm: 3 },
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: "bold",
                  borderRadius: "12px",
                  background: clue.trim()
                    ? "linear-gradient(145deg, #4caf50 0%, #2e7d32 100%)"
                    : "linear-gradient(145deg, #6b7280 0%, #4b5563 100%)",
                  boxShadow: clue.trim()
                    ? "0 6px 20px 0 rgba(76, 175, 80, 0.4)"
                    : "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: clue.trim() && {
                      xs: "none",
                      sm: "translateY(-2px)",
                    },
                    boxShadow: clue.trim() && {
                      xs: "0 6px 20px 0 rgba(76, 175, 80, 0.4)",
                      sm: "0 8px 25px 0 rgba(76, 175, 80, 0.6)",
                    },
                  },
                  width: { xs: "100%", sm: "auto" },
                  minHeight: { xs: "40px", sm: "auto" },
                }}
              >
                HIDE & PASS PHONE
              </Button>
            </Box>
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};
