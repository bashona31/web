'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useGameStore } from '@/store/gameStore';

interface InteractiveTerminalProps {
  position: [number, number, number];
  id: string;
}

export default function InteractiveTerminal({ position, id }: InteractiveTerminalProps) {
  const terminalRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [isNearby, setIsNearby] = useState(false);

  const playerPos = useGameStore((state) => state.player.position);
  const showTerminal = useGameStore((state) => state.showTerminal);
  const setShowTerminal = useGameStore((state) => state.setShowTerminal);

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.5 + Math.sin(clock.getElapsedTime() * 3) * 0.3;
    }

    // Check player proximity
    const dist = Math.sqrt(
      (playerPos[0] - position[0]) ** 2 +
      (playerPos[2] - position[2]) ** 2
    );
    setIsNearby(dist < 3);
  });

  return (
    <group ref={terminalRef} position={position}>
      {/* Terminal stand */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.3, 1, 8]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Terminal screen */}
      <mesh ref={screenRef} position={[0, 1.3, 0]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1, 0.7, 0.05]} />
        <meshStandardMaterial
          color="#001122"
          emissive="#00f5ff"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Screen border glow */}
      <mesh position={[0, 1.3, 0.03]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.05, 0.75]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={2}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Interaction prompt */}
      {isNearby && showTerminal !== id && (
        <Html position={[0, 2.2, 0]} center>
          <div className="bg-black/80 border border-cyan-400 px-3 py-1 rounded text-cyan-400 font-cyber text-xs whitespace-nowrap">
            Press [E] to interact
          </div>
        </Html>
      )}

      <pointLight position={[0, 1.5, 0.5]} intensity={0.5} color="#00f5ff" distance={4} decay={2} />
    </group>
  );
}
