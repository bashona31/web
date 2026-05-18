'use client';

import { useRef } from 'react';
import { Group } from 'three';
import JungleFloor from '../environment/JungleFloor';
import FloatingIslands from '../environment/FloatingIslands';
import AncientTemple from '../environment/AncientTemple';
import NeonRiver from '../environment/NeonRiver';
import CyberTrees from '../environment/CyberTrees';
import PortalGateway from '../interactive/PortalGateway';
import EnergyCrystals from '../interactive/EnergyCrystals';
import InteractiveTerminal from '../interactive/InteractiveTerminal';
import TeleportStation from '../interactive/TeleportStation';
import ApeRuins from '../environment/ApeRuins';
import HolographicWaterfall from '../environment/HolographicWaterfall';

export default function GameWorld() {
  const worldRef = useRef<Group>(null);

  return (
    <group ref={worldRef}>
      {/* Ground & Terrain */}
      <JungleFloor />

      {/* Vegetation & Trees */}
      <CyberTrees />

      {/* Water Features */}
      <NeonRiver />
      <HolographicWaterfall position={[25, 8, -20]} />
      <HolographicWaterfall position={[-30, 12, -35]} />

      {/* Structures */}
      <AncientTemple position={[0, 0, -40]} />
      <ApeRuins position={[30, 0, 10]} />
      <ApeRuins position={[-25, 0, -15]} />

      {/* Floating Islands */}
      <FloatingIslands />

      {/* Interactive Elements */}
      <PortalGateway position={[0, 0, -35]} id="portal-central" />
      <PortalGateway position={[40, 5, -40]} id="portal-sky" />
      <PortalGateway position={[-35, 0, 25]} id="portal-ruins" />

      {/* Energy Crystals scattered throughout */}
      <EnergyCrystals />

      {/* Terminals */}
      <InteractiveTerminal position={[5, 1, -10]} id="terminal-lore-1" />
      <InteractiveTerminal position={[-15, 1, -25]} id="terminal-lore-2" />
      <InteractiveTerminal position={[20, 1, -30]} id="terminal-mission" />

      {/* Teleport Stations */}
      <TeleportStation position={[0, 0, 5]} id="teleport-spawn" label="SPAWN" />
      <TeleportStation position={[35, 0, -30]} id="teleport-temple" label="TEMPLE" />
      <TeleportStation position={[-30, 8, -40]} id="teleport-islands" label="ISLANDS" />
    </group>
  );
}
