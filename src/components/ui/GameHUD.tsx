'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import HealthEnergyBar from './hud/HealthEnergyBar';
import MissionTracker from './hud/MissionTracker';
import Minimap from './hud/Minimap';
import CrystalCounter from './hud/CrystalCounter';
import InventoryPanel from './hud/InventoryPanel';
import SettingsMenu from './hud/SettingsMenu';
import Crosshair from './hud/Crosshair';
import ControlsHint from './hud/ControlsHint';

export default function GameHUD() {
  const showInventory = useGameStore((state) => state.showInventory);
  const showSettings = useGameStore((state) => state.showSettings);
  const showMinimap = useGameStore((state) => state.showMinimap);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-overlay pointer-events-none" />

      {/* Top Left - Health & Energy */}
      <motion.div
        className="absolute top-4 left-4 pointer-events-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HealthEnergyBar />
      </motion.div>

      {/* Top Right - Minimap */}
      {showMinimap && (
        <motion.div
          className="absolute top-4 right-4 pointer-events-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Minimap />
        </motion.div>
      )}

      {/* Center - Crosshair */}
      <Crosshair />

      {/* Bottom Left - Mission Tracker */}
      <motion.div
        className="absolute bottom-4 left-4 pointer-events-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <MissionTracker />
      </motion.div>

      {/* Bottom Right - Crystal Counter & Controls */}
      <motion.div
        className="absolute bottom-4 right-4 pointer-events-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <CrystalCounter />
        <ControlsHint />
      </motion.div>

      {/* Inventory Panel */}
      {showInventory && <InventoryPanel />}

      {/* Settings Menu */}
      {showSettings && <SettingsMenu />}

      {/* Top center - Location */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="font-cyber text-[10px] text-gray-500 tracking-[0.5em] text-center">
          THE LOST JUNGLE
        </div>
      </motion.div>
    </div>
  );
}
