'use client';

import { useGameStore } from '@/store/gameStore';

export default function CrystalCounter() {
  const crystalsCollected = useGameStore((state) => state.crystalsCollected);
  const totalCrystals = useGameStore((state) => state.totalCrystals);

  return (
    <div className="cyber-panel p-2 rounded-lg mb-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 relative">
          <div className="absolute inset-0 bg-neon-cyan rotate-45 rounded-sm" />
          <div className="absolute inset-1 bg-white/30 rotate-45 rounded-sm" />
        </div>
        <div>
          <span className="font-cyber text-sm text-neon-cyan">{crystalsCollected}</span>
          <span className="font-cyber text-[10px] text-gray-500">/{totalCrystals}</span>
        </div>
        <span className="font-cyber text-[8px] text-gray-600 tracking-wider">CRYSTALS</span>
      </div>
    </div>
  );
}
