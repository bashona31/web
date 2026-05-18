'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export default function InventoryPanel() {
  const inventory = useGameStore((state) => state.inventory);
  const toggleInventory = useGameStore((state) => state.toggleInventory);
  const crystalsCollected = useGameStore((state) => state.crystalsCollected);
  const discoveredLore = useGameStore((state) => state.discoveredLore);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={toggleInventory}
      />

      {/* Panel */}
      <motion.div
        className="relative cyber-panel rounded-xl p-6 w-[500px] max-h-[70vh] overflow-y-auto scanline"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-cyan-900/30">
          <h2 className="font-cyber text-lg text-neon-cyan tracking-wider">INVENTORY</h2>
          <button
            onClick={toggleInventory}
            className="font-cyber text-xs text-gray-500 hover:text-neon-cyan transition-colors"
          >
            [ESC]
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-900/50 rounded p-2 text-center border border-cyan-900/20">
            <p className="font-cyber text-lg text-neon-cyan">{crystalsCollected}</p>
            <p className="font-body text-[9px] text-gray-500">CRYSTALS</p>
          </div>
          <div className="bg-gray-900/50 rounded p-2 text-center border border-purple-900/20">
            <p className="font-cyber text-lg text-neon-purple">{discoveredLore.length}</p>
            <p className="font-body text-[9px] text-gray-500">LORE</p>
          </div>
          <div className="bg-gray-900/50 rounded p-2 text-center border border-green-900/20">
            <p className="font-cyber text-lg text-neon-green">{inventory.length}</p>
            <p className="font-body text-[9px] text-gray-500">ITEMS</p>
          </div>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-5 gap-2">
          {inventory.length > 0 ? (
            inventory.map((item) => (
              <div
                key={item.id}
                className="aspect-square bg-gray-900/50 rounded border border-cyan-900/20 flex flex-col items-center justify-center p-1 hover:border-neon-cyan/50 transition-colors cursor-pointer"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-body text-[8px] text-gray-400 text-center mt-0.5">
                  {item.name}
                </span>
                {item.quantity > 1 && (
                  <span className="font-cyber text-[8px] text-neon-cyan">x{item.quantity}</span>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-5 text-center py-8">
              <p className="font-body text-sm text-gray-600">
                No items yet. Explore the jungle to find artifacts!
              </p>
            </div>
          )}

          {/* Empty slots */}
          {Array.from({ length: Math.max(0, 15 - inventory.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square bg-gray-900/30 rounded border border-gray-800/30"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
