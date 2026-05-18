'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export default function HealthEnergyBar() {
  const health = useGameStore((state) => state.player.health);
  const energy = useGameStore((state) => state.player.energy);
  const isSprinting = useGameStore((state) => state.player.isSprinting);

  return (
    <div className="cyber-panel p-3 rounded-lg w-56">
      {/* Health Bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="font-cyber text-[10px] text-red-400 tracking-wider">HP</span>
          <span className="font-cyber text-[10px] text-red-400">{Math.round(health)}</span>
        </div>
        <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-red-900/30">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #ff0000 0%, #ff4444 ${health}%)`,
              boxShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
            }}
            animate={{ width: `${health}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Energy Bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-cyber text-[10px] text-neon-cyan tracking-wider">
            ENERGY {isSprinting && '⚡'}
          </span>
          <span className="font-cyber text-[10px] text-neon-cyan">{Math.round(energy)}</span>
        </div>
        <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-cyan-900/30">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, #0066ff 0%, #00f5ff ${energy}%)`,
              boxShadow: '0 0 8px rgba(0, 245, 255, 0.5)',
            }}
            animate={{ width: `${energy}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
