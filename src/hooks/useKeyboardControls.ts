'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export function useKeyboardShortcuts() {
  const toggleInventory = useGameStore((state) => state.toggleInventory);
  const toggleSettings = useGameStore((state) => state.toggleSettings);
  const toggleMinimap = useGameStore((state) => state.toggleMinimap);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyI':
          toggleInventory();
          break;
        case 'Escape':
          toggleSettings();
          break;
        case 'KeyM':
          toggleMinimap();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleInventory, toggleSettings, toggleMinimap]);
}
