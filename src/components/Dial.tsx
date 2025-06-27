import { useState, useRef, useCallback } from 'react';
import { GAME_CONFIG } from '../constants';

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

export const Dial = ({ position, targetPosition, showTarget = false, showNeedle = true, showPositionText = true, leftLabel, rightLabel, onPositionChange, disabled = false }: DialProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const radius = 280;
  const centerX = 400;
  const centerY = 300;
  const strokeWidth = 20;

  // Convert position (0-100) to angle (-90 to 90 degrees)
  const positionToAngle = (pos: number) => (pos - 50) * 1.8; // 180 degrees total
  
  // Convert angle to position (0-100)
  const angleToPosition = (angle: number) => (angle / 1.8) + 50;

  // Get current needle angle
  const needleAngle = positionToAngle(position);
  const targetAngle = targetPosition ? positionToAngle(targetPosition) : 0;

  // Calculate needle end position - reaches the arc line
  const needleEndX = centerX + radius * Math.cos((needleAngle - 90) * Math.PI / 180);
  const needleEndY = centerY + radius * Math.sin((needleAngle - 90) * Math.PI / 180);

  // Handle mouse/touch events
  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    if (disabled) return;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }, [disabled]);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!isDragging || disabled) return;

    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;

    // Calculate angle from center
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;

    // Constrain to semicircle (-90 to 90 degrees)
    angle = Math.max(-90, Math.min(90, angle));
    
    const newPosition = angleToPosition(angle);
    onPositionChange(Math.max(0, Math.min(100, newPosition)));
  }, [isDragging, disabled, onPositionChange]);

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  // Create scoring zones paths
  const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start1 = {
      x: centerX + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180),
      y: centerY + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180)
    };
    const end1 = {
      x: centerX + innerRadius * Math.cos((endAngle - 90) * Math.PI / 180),
      y: centerY + innerRadius * Math.sin((endAngle - 90) * Math.PI / 180)
    };
    const start2 = {
      x: centerX + outerRadius * Math.cos((startAngle - 90) * Math.PI / 180),
      y: centerY + outerRadius * Math.sin((startAngle - 90) * Math.PI / 180)
    };
    const end2 = {
      x: centerX + outerRadius * Math.cos((endAngle - 90) * Math.PI / 180),
      y: centerY + outerRadius * Math.sin((endAngle - 90) * Math.PI / 180)
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
  let bullseyeZone = '';
  let closeZone = '';
  let goodZone = '';
  
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
    const closeWidth = GAME_CONFIG.scoringZones.close.radius * 2; // degrees
    closeZone = createArcPath(
      targetAngle - closeWidth, 
      targetAngle + closeWidth, 
      0, 
      radius - strokeWidth / 2
    );
    
    // Good (2 points)
    const goodWidth = GAME_CONFIG.scoringZones.good.radius * 2; // degrees
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
        style={{ maxHeight: '60vh' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Background arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
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
          <circle
            cx={centerX}
            cy={centerY}
            r={6}
            fill="#6B7280"
          />
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
              className={`${disabled ? '' : 'cursor-grab'} ${isDragging ? 'cursor-grabbing' : ''}`}
            />
          </g>
        )}

        {/* Position markers */}
        <text x={centerX - radius + 20} y={centerY + 8} textAnchor="middle" className="fill-gray-400 text-base font-semibold">0</text>
        <text x={centerX} y="50" textAnchor="middle" className="fill-gray-400 text-base font-semibold">50</text>
        <text x={centerX + radius - 30} y={centerY + 8} textAnchor="middle" className="fill-gray-400 text-base font-semibold">100</text>
        
        {/* Spectrum labels */}
        {leftLabel && (
          <text x={centerX - radius} y={centerY + 35} textAnchor="middle" className="fill-white text-lg font-bold">
            {leftLabel}
          </text>
        )}
        {rightLabel && (
          <text x={centerX + radius} y={centerY + 35} textAnchor="middle" className="fill-white text-lg font-bold">
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