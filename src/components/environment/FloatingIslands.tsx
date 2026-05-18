'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

function FloatingIsland({
  position,
  size = 1,
  color = '#1a3a2a',
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  const ref = useRef<Group>(null);
  const offset = Math.random() * Math.PI * 2;

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * 0.3 + offset) * 1.5;
      ref.current.rotation.y = clock.getElapsedTime() * 0.02 + offset;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Main island body */}
      <mesh castShadow receiveShadow>
        <dodecahedronGeometry args={[3 * size, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          metalness={0.2}
          emissive="#003311"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Top surface */}
      <mesh position={[0, 2 * size, 0]} castShadow>
        <cylinderGeometry args={[2.5 * size, 3 * size, 1 * size, 8]} />
        <meshStandardMaterial
          color="#0a2a0a"
          roughness={0.9}
        />
      </mesh>

      {/* Glowing crystals on island */}
      <mesh position={[1 * size, 3 * size, 0.5 * size]}>
        <octahedronGeometry args={[0.3 * size]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={2}
        />
      </mesh>

      <mesh position={[-0.5 * size, 3.5 * size, -0.3 * size]}>
        <octahedronGeometry args={[0.2 * size]} />
        <meshStandardMaterial
          color="#b700ff"
          emissive="#b700ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Neon vine trails */}
      <mesh position={[0, -1 * size, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4 * size, 6]} />
        <meshStandardMaterial
          color="#39ff14"
          emissive="#39ff14"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Mini tree on island */}
      <mesh position={[0, 3.5 * size, 0]} castShadow>
        <coneGeometry args={[1 * size, 3 * size, 6]} />
        <meshStandardMaterial
          color="#0a3a1a"
          roughness={0.8}
          emissive="#002200"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 2.5 * size, 0]}>
        <cylinderGeometry args={[0.15 * size, 0.2 * size, 2 * size, 6]} />
        <meshStandardMaterial color="#2a1a0a" roughness={1} />
      </mesh>

      {/* Point light for glow */}
      <pointLight
        position={[0, 2 * size, 0]}
        intensity={0.5}
        color="#39ff14"
        distance={8 * size}
        decay={2}
      />
    </group>
  );
}

export default function FloatingIslands() {
  const islands = [
    { position: [-20, 20, -30] as [number, number, number], size: 1.2, color: '#1a3a2a' },
    { position: [25, 25, -45] as [number, number, number], size: 1.5, color: '#1a2a3a' },
    { position: [-35, 18, -50] as [number, number, number], size: 0.8, color: '#2a1a3a' },
    { position: [40, 30, -20] as [number, number, number], size: 1, color: '#1a3a3a' },
    { position: [10, 22, -60] as [number, number, number], size: 1.3, color: '#1a2a2a' },
    { position: [-10, 28, -40] as [number, number, number], size: 0.9, color: '#2a2a1a' },
    { position: [35, 35, -55] as [number, number, number], size: 0.7, color: '#1a3a2a' },
    { position: [-40, 24, -25] as [number, number, number], size: 1.1, color: '#1a2a3a' },
  ];

  return (
    <group>
      {islands.map((island, i) => (
        <FloatingIsland key={i} {...island} />
      ))}
    </group>
  );
}
