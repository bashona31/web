'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

function EnergyCrystal({
  position,
  color = '#00f5ff',
  id,
}: {
  position: [number, number, number];
  color?: string;
  id: number;
}) {
  const crystalRef = useRef<THREE.Group>(null);
  const collected = useRef(false);
  const collectCrystal = useGameStore((state) => state.collectCrystal);
  const playerPos = useGameStore((state) => state.player.position);

  useFrame(({ clock }) => {
    if (!crystalRef.current || collected.current) return;

    const t = clock.getElapsedTime();
    crystalRef.current.rotation.y = t * 1.5 + id;
    crystalRef.current.position.y = position[1] + Math.sin(t * 2 + id) * 0.3;

    // Check player proximity for collection
    const dist = Math.sqrt(
      (playerPos[0] - position[0]) ** 2 +
      (playerPos[1] - position[1]) ** 2 +
      (playerPos[2] - position[2]) ** 2
    );

    if (dist < 2 && !collected.current) {
      collected.current = true;
      collectCrystal();
      // Hide crystal
      crystalRef.current.visible = false;
    }
  });

  return (
    <group ref={crystalRef} position={position}>
      {/* Main crystal */}
      <mesh>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <octahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Crystal light */}
      <pointLight intensity={1} color={color} distance={5} decay={2} />
    </group>
  );
}

export default function EnergyCrystals() {
  const crystals = useMemo(() => {
    const data: { position: [number, number, number]; color: string }[] = [];
    const colors = ['#00f5ff', '#39ff14', '#b700ff', '#ffd700', '#ff6b00'];

    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 60;
      data.push({
        position: [
          Math.cos(angle) * radius,
          1.5 + Math.random() * 2,
          Math.sin(angle) * radius - 10,
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return data;
  }, []);

  return (
    <group>
      {crystals.map((crystal, i) => (
        <EnergyCrystal key={i} {...crystal} id={i} />
      ))}
    </group>
  );
}
