'use client';

import { useGameStore } from '@/store/gameStore';

export default function MissionTracker() {
  const missions = useGameStore((state) => state.missions);
  const activeMission = useGameStore((state) => state.activeMission);

  const current = missions.find((m) => m.id === activeMission);

  if (!current) return null;

  return (
    <div className="cyber-panel p-3 rounded-lg w-64">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        <span className="font-cyber text-[10px] text-neon-green tracking-wider">
          ACTIVE MISSION
        </span>
      </div>

      <h3 className="font-cyber text-sm text-white mb-1">{current.title}</h3>
      <p className="font-body text-xs text-gray-400 leading-relaxed">{current.description}</p>

      <div className="mt-2 pt-2 border-t border-cyan-900/30">
        <div className="flex items-center gap-1">
          <span className="font-body text-[10px] text-gray-500">REWARD:</span>
          <span className="font-body text-[10px] text-gold-ancient">{current.reward}</span>
        </div>
      </div>

      {/* Mission progress */}
      <div className="mt-2">
        <div className="flex gap-1">
          {missions.map((m, i) => (
            <div
              key={m.id}
              className={`h-1 flex-1 rounded-full ${
                m.completed
                  ? 'bg-neon-green'
                  : m.id === activeMission
                  ? 'bg-neon-cyan'
                  : 'bg-gray-800'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
