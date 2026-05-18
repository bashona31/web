import { create } from 'zustand';

export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  reward: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'crystal' | 'artifact' | 'key' | 'lore';
  quantity: number;
  icon: string;
}

export interface PlayerState {
  position: [number, number, number];
  rotation: [number, number, number];
  health: number;
  energy: number;
  speed: number;
  isSprinting: boolean;
  isJumping: boolean;
}

interface GameState {
  // Game Status
  gameStarted: boolean;
  isPaused: boolean;
  isLoading: boolean;
  dayNightCycle: number; // 0-1, 0 = midnight, 0.5 = noon

  // Player
  player: PlayerState;

  // Inventory & Collection
  crystalsCollected: number;
  totalCrystals: number;
  inventory: InventoryItem[];

  // Missions
  missions: Mission[];
  activeMission: string | null;

  // World State
  unlockedAreas: string[];
  discoveredLore: string[];
  portalsActivated: string[];

  // UI State
  showInventory: boolean;
  showSettings: boolean;
  showMinimap: boolean;
  showTerminal: string | null;

  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  updatePlayerPosition: (pos: [number, number, number]) => void;
  updatePlayerRotation: (rot: [number, number, number]) => void;
  setPlayerSprinting: (sprinting: boolean) => void;
  setPlayerJumping: (jumping: boolean) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  useEnergy: (amount: number) => void;
  restoreEnergy: (amount: number) => void;
  collectCrystal: () => void;
  addToInventory: (item: InventoryItem) => void;
  removeFromInventory: (itemId: string) => void;
  completeMission: (missionId: string) => void;
  setActiveMission: (missionId: string | null) => void;
  unlockArea: (areaId: string) => void;
  discoverLore: (loreId: string) => void;
  activatePortal: (portalId: string) => void;
  toggleInventory: () => void;
  toggleSettings: () => void;
  toggleMinimap: () => void;
  setShowTerminal: (terminalId: string | null) => void;
  updateDayNightCycle: (time: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // Initial State
  gameStarted: false,
  isPaused: false,
  isLoading: true,
  dayNightCycle: 0.3,

  player: {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    health: 100,
    energy: 100,
    speed: 5,
    isSprinting: false,
    isJumping: false,
  },

  crystalsCollected: 0,
  totalCrystals: 50,
  inventory: [],

  missions: [
    {
      id: 'mission-1',
      title: 'Awakening',
      description: 'Explore the Lost Jungle and find the first Energy Crystal.',
      completed: false,
      reward: 'Portal Key Fragment',
    },
    {
      id: 'mission-2',
      title: 'Ancient Echoes',
      description: 'Discover 3 Lore Fragments hidden in the Ape Ruins.',
      completed: false,
      reward: 'Temple Access Card',
    },
    {
      id: 'mission-3',
      title: 'Portal Reactivation',
      description: 'Activate the dormant portal in the Central Temple.',
      completed: false,
      reward: 'Neon Blade Artifact',
    },
    {
      id: 'mission-4',
      title: 'The Floating Islands',
      description: 'Reach the Floating Islands above the canopy.',
      completed: false,
      reward: 'Gravity Boots',
    },
    {
      id: 'mission-5',
      title: 'Vault of Origins',
      description: 'Collect 20 Crystals and unlock the Reward Vault.',
      completed: false,
      reward: 'Legendary Ape Armor',
    },
  ],
  activeMission: 'mission-1',

  unlockedAreas: ['spawn', 'jungle-path'],
  discoveredLore: [],
  portalsActivated: [],

  showInventory: false,
  showSettings: false,
  showMinimap: true,
  showTerminal: null,

  // Actions
  startGame: () => set({ gameStarted: true, isLoading: false }),
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),

  updatePlayerPosition: (pos) =>
    set((state) => ({ player: { ...state.player, position: pos } })),
  updatePlayerRotation: (rot) =>
    set((state) => ({ player: { ...state.player, rotation: rot } })),
  setPlayerSprinting: (sprinting) =>
    set((state) => ({ player: { ...state.player, isSprinting: sprinting } })),
  setPlayerJumping: (jumping) =>
    set((state) => ({ player: { ...state.player, isJumping: jumping } })),

  takeDamage: (amount) =>
    set((state) => ({
      player: { ...state.player, health: Math.max(0, state.player.health - amount) },
    })),
  heal: (amount) =>
    set((state) => ({
      player: { ...state.player, health: Math.min(100, state.player.health + amount) },
    })),
  useEnergy: (amount) =>
    set((state) => ({
      player: { ...state.player, energy: Math.max(0, state.player.energy - amount) },
    })),
  restoreEnergy: (amount) =>
    set((state) => ({
      player: { ...state.player, energy: Math.min(100, state.player.energy + amount) },
    })),

  collectCrystal: () =>
    set((state) => ({ crystalsCollected: state.crystalsCollected + 1 })),
  addToInventory: (item) =>
    set((state) => {
      const existing = state.inventory.find((i) => i.id === item.id);
      if (existing) {
        return {
          inventory: state.inventory.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { inventory: [...state.inventory, item] };
    }),
  removeFromInventory: (itemId) =>
    set((state) => ({
      inventory: state.inventory.filter((i) => i.id !== itemId),
    })),

  completeMission: (missionId) =>
    set((state) => ({
      missions: state.missions.map((m) =>
        m.id === missionId ? { ...m, completed: true } : m
      ),
    })),
  setActiveMission: (missionId) => set({ activeMission: missionId }),

  unlockArea: (areaId) =>
    set((state) => ({
      unlockedAreas: [...state.unlockedAreas, areaId],
    })),
  discoverLore: (loreId) =>
    set((state) => ({
      discoveredLore: [...state.discoveredLore, loreId],
    })),
  activatePortal: (portalId) =>
    set((state) => ({
      portalsActivated: [...state.portalsActivated, portalId],
    })),

  toggleInventory: () => set((state) => ({ showInventory: !state.showInventory })),
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
  toggleMinimap: () => set((state) => ({ showMinimap: !state.showMinimap })),
  setShowTerminal: (terminalId) => set({ showTerminal: terminalId }),
  updateDayNightCycle: (time) => set({ dayNightCycle: time }),
}));
