import { useState, useRef, useCallback, useEffect } from "react";
import { GAME_CONFIG } from "../constants";

interface DialProps {
  position: number; // 0-100
  targetPosition?: number; // 0-100, only shown during reveal
  showTarget?: boolean;
  showNeedle?: boolean; // Whether to show the needle/position indicator
  showPositionText?: boolean; // Whether to show position text below dial
  leftLabel?: string; // Left spectrum label (0 position)
  rightLabel?: string; // Right spectrum label (100 position)
  onPositionChange: (position: number) => void;
  disabled?: boolean;
}

export const Dial = ({
  position,
  targetPosition,
  showTarget = false,
  showNeedle = true,
  showPositionText = true,
  leftLabel,
  rightLabel,
  onPositionChange,
  disabled = false,
}: DialProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const isDraggingRef = useRef(false);
  const onPositionChangeRef = useRef(onPositionChange);

  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  const radius = 280;
  const centerX = 400;
  const centerY = 300;
  const strokeWidth = 20;

  // Convert position (0-100) to angle (-90 to 90 degrees)
  const positionToAngle = (pos: number) => (pos - 50) * 1.8; // 180 degrees total

  // Convert angle to position (0-100)
  const angleToPosition = (angle: number) => angle / 1.8 + 50;

  // Get current needle angle
  const needleAngle = positionToAngle(position);
  const targetAngle = targetPosition ? positionToAngle(targetPosition) : 0;

  // Calculate needle end position - reaches the arc line
  const needleEndX =
    centerX + radius * Math.cos(((needleAngle - 90) * Math.PI) / 180);
  const needleEndY =
    centerY + radius * Math.sin(((needleAngle - 90) * Math.PI) / 180);

  // Handle pointer events for drag (works better on mobile)
  const handlePointerMoveGlobal = useCallback(
    (event: PointerEvent) => {
      if (!isDraggingRef.current || disabled) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();

      // Get the actual SVG dimensions and viewBox for proper scaling
      const svgWidth = rect.width;
      const svgHeight = rect.height;
      const viewBoxWidth = 800; // From viewBox="0 0 800 400"
      const viewBoxHeight = 400;

      // Calculate scale factors
      const scaleX = viewBoxWidth / svgWidth;
      const scaleY = viewBoxHeight / svgHeight;

      // Convert client coordinates to SVG coordinates with proper scaling
      const clientX = (event.clientX - rect.left) * scaleX;
      const clientY = (event.clientY - rect.top) * scaleY;

      // Calculate angle from center
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      // Constrain to semicircle (-90 to 90 degrees)
      angle = Math.max(-90, Math.min(90, angle));
      const newPosition = angleToPosition(angle);
      onPositionChangeRef.current(Math.max(0, Math.min(100, newPosition)));
      event.preventDefault(); // Prevent scrolling on mobile
    },
    [disabled, centerX, centerY, angleToPosition]
  );

  const handlePointerUpGlobal = useCallback(
    (event: PointerEvent) => {
      isDraggingRef.current = false;
      setIsDragging(false);

      // Release pointer capture
      if (event.target && "releasePointerCapture" in event.target) {
        try {
          (event.target as Element).releasePointerCapture(event.pointerId);
        } catch (e) {
          // Fallback if releasePointerCapture fails
        }
      }

      window.removeEventListener("pointermove", handlePointerMoveGlobal);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    },
    [handlePointerMoveGlobal]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      if (disabled) return;
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
      isDraggingRef.current = true;

      // Set pointer capture for better mobile handling
      if (event.currentTarget && "setPointerCapture" in event.currentTarget) {
        try {
          (event.currentTarget as Element).setPointerCapture(event.pointerId);
        } catch (e) {
          // Fallback if setPointerCapture fails
        }
      }

      window.addEventListener("pointermove", handlePointerMoveGlobal, {
        passive: false,
      });
      window.addEventListener("pointerup", handlePointerUpGlobal);
    },
    [disabled, handlePointerMoveGlobal, handlePointerUpGlobal]
  );

  // Remove global listeners on unmount (cleanup)
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMoveGlobal);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    };
  }, [handlePointerMoveGlobal, handlePointerUpGlobal]);

  // Local pointer move handler for SVG (for immediate response on desktop)
  const handlePointerMoveLocal = useCallback(
    (event: React.PointerEvent) => {
      if (!isDraggingRef.current || disabled) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();

      // Get the actual SVG dimensions and viewBox for proper scaling
      const svgWidth = rect.width;
      const svgHeight = rect.height;
      const viewBoxWidth = 800; // From viewBox="0 0 800 400"
      const viewBoxHeight = 400;

      // Calculate scale factors
      const scaleX = viewBoxWidth / svgWidth;
      const scaleY = viewBoxHeight / svgHeight;

      // Convert client coordinates to SVG coordinates with proper scaling
      const clientX = (event.clientX - rect.left) * scaleX;
      const clientY = (event.clientY - rect.top) * scaleY;

      // Calculate angle from center
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      // Constrain to semicircle (-90 to 90 degrees)
      angle = Math.max(-90, Math.min(90, angle));
      const newPosition = angleToPosition(angle);
      onPositionChangeRef.current(
        Math.round(Math.max(0, Math.min(100, newPosition)))
      );
      event.preventDefault();
    },
    [disabled, centerX, centerY, angleToPosition]
  );

  // Local pointer up handler for SVG (ensures drag ends if mouse released over SVG)
  const handlePointerUpLocal = useCallback(
    (event: React.PointerEvent) => {
      isDraggingRef.current = false;
      setIsDragging(false);

      // Release pointer capture
      if (
        event.currentTarget &&
        "releasePointerCapture" in event.currentTarget
      ) {
        try {
          (event.currentTarget as Element).releasePointerCapture(
            event.pointerId
          );
        } catch (e) {
          // Fallback if releasePointerCapture fails
        }
      }

      window.removeEventListener("pointermove", handlePointerMoveGlobal);
      window.removeEventListener("pointerup", handlePointerUpGlobal);
    },
    [handlePointerMoveGlobal, handlePointerUpGlobal]
  );

  // Create scoring zones paths
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number
  ) => {
    const start1 = {
      x: centerX + innerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180),
      y: centerY + innerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180),
    };
    const end1 = {
      x: centerX + innerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180),
      y: centerY + innerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180),
    };
    const start2 = {
      x: centerX + outerRadius * Math.cos(((startAngle - 90) * Math.PI) / 180),
      y: centerY + outerRadius * Math.sin(((startAngle - 90) * Math.PI) / 180),
    };
    const end2 = {
      x: centerX + outerRadius * Math.cos(((endAngle - 90) * Math.PI) / 180),
      y: centerY + outerRadius * Math.sin(((endAngle - 90) * Math.PI) / 180),
    };

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${start1.x} ${start1.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${end1.x} ${end1.y}
      L ${end2.x} ${end2.y}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${start2.x} ${start2.y}
      Z
    `;
  };

  // Target zones (if showing) - 4 levels of accuracy as sectors
  let bullseyeZone = "";
  let closeZone = "";
  let goodZone = "";

  if (showTarget && targetPosition !== undefined) {
    // Bullseye (4 points) - smallest, most accurate
    const bullseyeWidth = GAME_CONFIG.scoringZones.bullseye.radius * 2; // degrees
    bullseyeZone = createArcPath(
      targetAngle - bullseyeWidth,
      targetAngle + bullseyeWidth,
      0,
      radius - strokeWidth / 2
    );

    // Close (3 points)
    const closeWidth = GAME_CONFIG.scoringZones.close.radius * 2 - 0.5; // degrees
    closeZone = createArcPath(
      targetAngle - closeWidth,
      targetAngle + closeWidth,
      0,
      radius - strokeWidth / 2
    );

    // Good (2 points)
    const goodWidth = GAME_CONFIG.scoringZones.good.radius * 2 - 1; // degrees
    goodZone = createArcPath(
      targetAngle - goodWidth,
      targetAngle + goodWidth,
      0,
      radius - strokeWidth / 2
    );
  }

  return (
    <div className="flex flex-col items-center">
      <svg
        ref={svgRef}
        width="800"
        height="400"
        viewBox="0 0 800 400"
        className="touch-none select-none w-full max-w-4xl h-auto"
        style={{
          maxHeight: "60vh",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMoveLocal}
        onPointerUp={handlePointerUpLocal}
      >
        {/* Background arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${
            centerX + radius
          } ${centerY}`}
          fill="none"
          stroke="#374151"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Target zones (only when showing target) */}
        {showTarget && targetPosition !== undefined && (
          <>
            {/* Good zone (2 points) - yellow */}
            <path
              d={goodZone}
              fill="rgba(255, 255, 0, 1)"
              stroke="rgb(255, 255, 0)"
              strokeWidth={2}
            />

            {/* Close zone (3 points) - orange */}
            <path
              d={closeZone}
              fill="rgba(255, 165, 0, 1)"
              stroke="rgb(255, 165, 0)"
              strokeWidth={2}
            />

            {/* Bullseye (4 points) - light blue */}
            <path
              d={bullseyeZone}
              fill="rgba(135, 206, 235, 1)"
              stroke="rgb(135, 206, 235)"
              strokeWidth={2}
            />
          </>
        )}

        {/* Center point */}
        {showNeedle && (
          <circle cx={centerX} cy={centerY} r={6} fill="#6B7280" />
        )}

        {/* Needle */}
        {showNeedle && (
          <g className="transition-all duration-200">
            <line
              x1={centerX}
              y1={centerY}
              x2={needleEndX}
              y2={needleEndY}
              stroke={"#EF4444"}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle
              cx={needleEndX}
              cy={needleEndY}
              r={8}
              fill={"#EF4444"}
              className={`${disabled ? "" : "cursor-grab"} ${
                isDragging ? "cursor-grabbing" : ""
              }`}
            />
          </g>
        )}

        {/* Position markers */}
        <text
          x={centerX - radius + 20}
          y={centerY + 8}
          textAnchor="middle"
          className="fill-gray-400 text-base font-semibold"
        >
          0
        </text>
        <text
          x={centerX}
          y="50"
          textAnchor="middle"
          className="fill-gray-400 text-base font-semibold"
        >
          50
        </text>
        <text
          x={centerX + radius - 30}
          y={centerY + 8}
          textAnchor="middle"
          className="fill-gray-400 text-base font-semibold"
        >
          100
        </text>

        {/* Spectrum labels */}
        {leftLabel && (
          <text
            x={centerX - radius}
            y={centerY + 35}
            textAnchor="middle"
            className="fill-white text-lg font-bold"
          >
            {leftLabel}
          </text>
        )}
        {rightLabel && (
          <text
            x={centerX + radius}
            y={centerY + 35}
            textAnchor="middle"
            className="fill-white text-lg font-bold"
          >
            {rightLabel}
          </text>
        )}
      </svg>

      {showPositionText && (
        <div className="mt-4 text-center">
          {showNeedle && (
            <div className="text-lg font-bold text-white">
              Position: {Math.round(position)}
            </div>
          )}
          {showTarget && targetPosition !== undefined && (
            <div className="text-sm text-red-400 mt-1">
              Target: {Math.round(targetPosition)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
