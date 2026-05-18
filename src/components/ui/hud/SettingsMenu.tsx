'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export default function SettingsMenu() {
  const toggleSettings = useGameStore((state) => state.toggleSettings);
  const toggleMinimap = useGameStore((state) => state.toggleMinimap);
  const showMinimap = useGameStore((state) => state.showMinimap);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={toggleSettings}
      />

      {/* Panel */}
      <motion.div
        className="relative cyber-panel rounded-xl p-8 w-[400px] scanline"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <h2 className="font-cyber text-xl text-neon-cyan tracking-wider mb-6 text-center">
          SETTINGS
        </h2>

        <div className="space-y-4">
          {/* Minimap toggle */}
          <div className="flex justify-between items-center">
            <span className="font-body text-sm text-gray-300">Show Minimap</span>
            <button
              onClick={toggleMinimap}
              className={`w-10 h-5 rounded-full transition-colors ${
                showMinimap ? 'bg-neon-cyan' : 'bg-gray-700'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform mx-0.5 ${
                  showMinimap ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Audio section */}
          <div className="pt-2 border-t border-gray-800">
            <p className="font-cyber text-xs text-gray-500 mb-3 tracking-wider">AUDIO</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-gray-400">Music</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-gray-400">SFX</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="80"
                  className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Graphics */}
          <div className="pt-2 border-t border-gray-800">
            <p className="font-cyber text-xs text-gray-500 mb-3 tracking-wider">GRAPHICS</p>
            <div className="flex gap-2">
              {['LOW', 'MED', 'HIGH', 'ULTRA'].map((quality) => (
                <button
                  key={quality}
                  className="flex-1 font-cyber text-[10px] py-1 rounded border border-cyan-900/30 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-colors"
                >
                  {quality}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={toggleSettings}
          className="mt-6 w-full font-cyber text-sm py-2 rounded border border-cyan-900/30 text-neon-cyan hover:bg-neon-cyan/10 transition-colors tracking-wider"
        >
          CLOSE
        </button>
      </motion.div>
    </motion.div>
  );
}
