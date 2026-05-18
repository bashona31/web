'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CyberTree({
  position,
  scale = 1,
  glowColor = '#39ff14',
}: {
  position: [number, number, number];
  scale?: number;
  glowColor?: string;
}) {
  const treeRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (leavesRef.current) {
      leavesRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2 + position[0]) * 0.05;
    }
  });

  return (
    <group ref={treeRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.4, 6, 8]} />
        <meshStandardMaterial
          color="#1a0a00"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Trunk neon veins */}
      <mesh position={[0.22, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 5, 4]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[-0.15, 0.5, 0.15]}>
        <cylinderGeometry args={[0.015, 0.015, 4, 4]} />
        <meshStandardMaterial
          color={glowColor}
          emissive={glowColor}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Canopy / Leaves */}
      <group ref={leavesRef} position={[0, 4, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[2.5, 8, 6]} />
          <meshStandardMaterial
            color="#0a2a0a"
            roughness={0.8}
            emissive="#002200"
            emissiveIntensity={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Glowing fruits/orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin(i * 1.2) * 1.8,
              Math.cos(i * 0.8) * 1.2,
              Math.sin(i * 2) * 1.5,
            ]}
          >
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial
              color={glowColor}
              emissive={glowColor}
              emissiveIntensity={3}
            />
          </mesh>
        ))}
      </group>

      {/* Branches */}
      <mesh position={[1, 2.5, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.08, 0.15, 3, 6]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.9} />
      </mesh>
      <mesh position={[-0.8, 3, 0.5]} rotation={[0.3, 0, 0.4]}>
        <cylinderGeometry args={[0.06, 0.12, 2.5, 6]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.9} />
      </mesh>

      {/* Tree base glow */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={0.3}
        color={glowColor}
        distance={4}
        decay={2}
      />
    </group>
  );
}

function GiantMushroom({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.children[1].scale.setScalar(
        1 + Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.05
      );
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Stem */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.3, 3, 8]} />
        <meshStandardMaterial
          color="#2a1a3a"
          emissive="#1a0a2a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[1.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#3a0a4a"
          emissive="#b700ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow spots on cap */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1.05) * 1,
            2.3,
            Math.cos(i * 1.05) * 1,
          ]}
        >
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#ff00ff"
            emissive="#ff00ff"
            emissiveIntensity={4}
          />
        </mesh>
      ))}

      <pointLight
        position={[0, 2.5, 0]}
        intensity={0.5}
        color="#b700ff"
        distance={6}
        decay={2}
      />
    </group>
  );
}

export default function CyberTrees() {
  const trees = useMemo(() => {
    const treeData: { position: [number, number, number]; scale: number; glowColor: string }[] = [];
    const colors = ['#39ff14', '#00f5ff', '#b700ff', '#ff6b00'];

    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 10 + Math.random() * 50;
      treeData.push({
        position: [
          Math.cos(angle) * radius,
          0,
          Math.sin(angle) * radius - 10,
        ],
        scale: 0.7 + Math.random() * 0.8,
        glowColor: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return treeData;
  }, []);

  const mushrooms = useMemo(() => {
    const data: { position: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < 15; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 80,
          0,
          (Math.random() - 0.5) * 80,
        ],
        scale: 0.5 + Math.random() * 1.5,
      });
    }
    return data;
  }, []);

  return (
    <group>
      {trees.map((tree, i) => (
        <CyberTree key={i} {...tree} />
      ))}
      {mushrooms.map((mushroom, i) => (
        <GiantMushroom key={`mushroom-${i}`} {...mushroom} />
      ))}
    </group>
  );
}
