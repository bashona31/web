'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useGameStore } from '@/store/gameStore';

interface TeleportStationProps {
  position: [number, number, number];
  id: string;
  label: string;
}

export default function TeleportStation({ position, id, label }: TeleportStationProps) {
  const stationRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const playerPos = useGameStore((state) => state.player.position);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.7;
      ring2Ref.current.position.y = 0.5 + Math.sin(t * 2) * 0.1;
    }
  });

  const dist = Math.sqrt(
    (playerPos[0] - position[0]) ** 2 +
    (playerPos[2] - position[2]) ** 2
  );
  const isNearby = dist < 4;

  return (
    <group ref={stationRef} position={position}>
      {/* Platform base */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2, 2.2, 0.3, 6]} />
        <meshStandardMaterial
          color="#1a1a2a"
          roughness={0.4}
          metalness={0.6}
          emissive="#00f5ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Inner platform */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 6]} />
        <meshStandardMaterial
          color="#001122"
          emissive="#00f5ff"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Rotating ring */}
      <mesh ref={ringRef} position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.03, 8, 32]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.02, 8, 32]} />
        <meshStandardMaterial
          color="#b700ff"
          emissive="#b700ff"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Hexagonal pattern on platform */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.2, 0.4, Math.sin(angle) * 1.2]}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.05, 6]} />
            <meshStandardMaterial
              color="#00f5ff"
              emissive="#00f5ff"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}

      {/* Label */}
      <Html position={[0, 2.5, 0]} center>
        <div className="text-cyan-400 font-cyber text-xs tracking-widest bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
          {label}
        </div>
      </Html>

      {/* Interaction hint */}
      {isNearby && (
        <Html position={[0, 1.5, 0]} center>
          <div className="text-white font-cyber text-[10px] bg-purple-900/80 px-2 py-0.5 rounded border border-purple-400/50 animate-pulse">
            [F] TELEPORT
          </div>
        </Html>
      )}

      <pointLight position={[0, 1, 0]} intensity={1} color="#00f5ff" distance={6} decay={2} />
    </group>
  );
}
