import { GAME_CONFIG } from "../constants";

export const calculateScore = (
  targetPosition: number,
  guessPosition: number
): number => {
  const distance = Math.abs(targetPosition - guessPosition);
  console.log("guessPosition", guessPosition);
  console.log("targetPosition", targetPosition);
  console.log("distance", distance);

  if (distance <= GAME_CONFIG.scoringZones.bullseye.radius)
    return GAME_CONFIG.scoringZones.bullseye.points;
  if (distance <= GAME_CONFIG.scoringZones.close.radius)
    return GAME_CONFIG.scoringZones.close.points;
  if (distance <= GAME_CONFIG.scoringZones.good.radius)
    return GAME_CONFIG.scoringZones.good.points;
  return 0;
};

export const getScoreLabel = (points: number): string => {
  switch (points) {
    case 4:
      return "BULLSEYE!";
    case 3:
      return "CLOSE!";
    case 2:
      return "GOOD!";
    default:
      return "MISS!";
  }
};

export const getScoreColor = (points: number): string => {
  switch (points) {
    case 4:
      return "#FFD700"; // Gold
    case 3:
      return "#32CD32"; // Lime green
    case 2:
      return "#FFA500"; // Orange
    default:
      return "#FF6B6B"; // Red
  }
};
