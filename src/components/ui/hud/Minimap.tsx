'use client';

import { useGameStore } from '@/store/gameStore';

export default function Minimap() {
  const playerPos = useGameStore((state) => state.player.position);

  // Normalize player position to minimap coordinates
  const mapSize = 140;
  const mapX = ((playerPos[0] + 80) / 160) * mapSize;
  const mapY = ((playerPos[2] + 80) / 160) * mapSize;

  return (
    <div className="cyber-panel rounded-lg overflow-hidden" style={{ width: 150, height: 150 }}>
      {/* Map header */}
      <div className="px-2 py-1 border-b border-cyan-900/30 flex justify-between items-center">
        <span className="font-cyber text-[8px] text-gray-500 tracking-wider">MAP</span>
        <span className="font-cyber text-[8px] text-neon-cyan">
          {Math.round(playerPos[0])}, {Math.round(playerPos[2])}
        </span>
      </div>

      {/* Map area */}
      <div className="relative w-full" style={{ height: mapSize }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 20 + 10}
              x2="150"
              y2={i * 20 + 10}
              stroke="#00f5ff"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 20 + 10}
              y1="0"
              x2={i * 20 + 10}
              y2="140"
              stroke="#00f5ff"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* Points of interest */}
        <div
          className="absolute w-2 h-2 bg-neon-purple rounded-full"
          style={{ left: '50%', top: '25%', transform: 'translate(-50%, -50%)' }}
          title="Temple"
        />
        <div
          className="absolute w-2 h-2 bg-neon-green rounded-full"
          style={{ left: '70%', top: '55%', transform: 'translate(-50%, -50%)' }}
          title="Ruins"
        />
        <div
          className="absolute w-2 h-2 bg-gold-ancient rounded-full"
          style={{ left: '30%', top: '60%', transform: 'translate(-50%, -50%)' }}
          title="Ruins 2"
        />

        {/* Player indicator */}
        <div
          className="absolute w-3 h-3 rounded-full border-2 border-neon-cyan bg-neon-cyan/30"
          style={{
            left: `${(mapX / mapSize) * 100}%`,
            top: `${(mapY / mapSize) * 100}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 6px #00f5ff',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-neon-cyan animate-ping opacity-30" />
        </div>
      </div>
    </div>
  );
}
