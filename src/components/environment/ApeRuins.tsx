'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface ApeRuinsProps {
  position: [number, number, number];
}

export default function ApeRuins({ position }: ApeRuinsProps) {
  const ruinsRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    // Subtle ambient animation
  });

  return (
    <group ref={ruinsRef} position={position}>
      {/* Broken pillars */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 5;
        const height = 2 + Math.random() * 4;
        return (
          <group key={i}>
            <mesh
              position={[Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius]}
              rotation={[
                (Math.random() - 0.5) * 0.2,
                0,
                (Math.random() - 0.5) * 0.2,
              ]}
              castShadow
            >
              <cylinderGeometry args={[0.4, 0.6, height, 6]} />
              <meshStandardMaterial
                color="#2a2a1a"
                roughness={0.9}
                metalness={0.1}
              />
            </mesh>
            {/* Neon moss on pillars */}
            <mesh
              position={[
                Math.cos(angle) * radius,
                height * 0.3,
                Math.sin(angle) * radius + 0.4,
              ]}
            >
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial
                color="#003300"
                emissive="#39ff14"
                emissiveIntensity={1}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}

      {/* Broken wall sections */}
      <mesh position={[-3, 2, 0]} rotation={[0, 0.3, 0.1]} castShadow>
        <boxGeometry args={[4, 4, 0.5]} />
        <meshStandardMaterial color="#1a1a0a" roughness={0.9} />
      </mesh>
      <mesh position={[3, 1.5, -2]} rotation={[0.1, -0.2, 0]} castShadow>
        <boxGeometry args={[3, 3, 0.5]} />
        <meshStandardMaterial color="#1a1a0a" roughness={0.9} />
      </mesh>

      {/* Ape statue (broken) */}
      <group position={[0, 0, 0]}>
        {/* Base */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 1, 2]} />
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Body */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <capsuleGeometry args={[0.8, 2, 8, 16]} />
          <meshStandardMaterial
            color="#3a3a3a"
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>
        {/* Head */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshStandardMaterial
            color="#3a3a3a"
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>
        {/* Glowing eyes */}
        <mesh position={[-0.2, 4.6, 0.6]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={5}
          />
        </mesh>
        <mesh position={[0.2, 4.6, 0.6]}>
          <sphereGeometry args={[0.1]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={5}
          />
        </mesh>
      </group>

      {/* Ancient glowing inscriptions on ground */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 5.5, 32]} />
        <meshStandardMaterial
          color="#1a1a00"
          emissive="#ffd700"
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Scattered rubble */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={`rubble-${i}`}
          position={[
            (Math.random() - 0.5) * 12,
            Math.random() * 0.5,
            (Math.random() - 0.5) * 12,
          ]}
          rotation={[Math.random(), Math.random(), Math.random()]}
        >
          <dodecahedronGeometry args={[0.2 + Math.random() * 0.3, 0]} />
          <meshStandardMaterial color="#2a2a1a" roughness={1} />
        </mesh>
      ))}

      {/* Ambient light */}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" distance={10} decay={2} />
    </group>
  );
}
