'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface AncientTempleProps {
  position: [number, number, number];
}

export default function AncientTemple({ position }: AncientTempleProps) {
  const templeRef = useRef<Group>(null);
  const glowRef = useRef<any>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <group ref={templeRef} position={position}>
      {/* Temple Base Platform */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[20, 1, 20]} />
        <meshStandardMaterial
          color="#1a1a2a"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>

      {/* Steps */}
      {[0, 1, 2, 3].map((step) => (
        <mesh key={step} position={[0, step * 0.5 + 1, 8 - step * 1.5]} castShadow>
          <boxGeometry args={[12 - step * 2, 0.5, 2]} />
          <meshStandardMaterial
            color="#1a1a2a"
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Main temple body */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <boxGeometry args={[14, 8, 14]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.5}
          metalness={0.5}
          emissive="#000033"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Temple pillars */}
      {[-5, -2.5, 2.5, 5].map((x) => (
        <group key={x}>
          {/* Front pillars */}
          <mesh position={[x, 5, 7]} castShadow>
            <cylinderGeometry args={[0.4, 0.5, 9, 8]} />
            <meshStandardMaterial
              color="#2a2a3a"
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
          {/* Back pillars */}
          <mesh position={[x, 5, -7]} castShadow>
            <cylinderGeometry args={[0.4, 0.5, 9, 8]} />
            <meshStandardMaterial
              color="#2a2a3a"
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        </group>
      ))}

      {/* Temple roof - pyramid style */}
      <mesh position={[0, 11, 0]} castShadow>
        <coneGeometry args={[10, 5, 4]} />
        <meshStandardMaterial
          color="#1a0a2a"
          roughness={0.3}
          metalness={0.7}
          emissive="#1a003a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Neon edge strips on temple */}
      <mesh position={[0, 9, 7.01]}>
        <planeGeometry args={[14, 0.1]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[0, 1, 7.01]}>
        <planeGeometry args={[14, 0.1]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Glowing hieroglyphs on walls */}
      {[-7.01, 7.01].map((z, i) => (
        <mesh key={i} position={[0, 5, z]} rotation={[0, i === 0 ? Math.PI : 0, 0]}>
          <planeGeometry args={[10, 5]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Central altar / energy source */}
      <mesh position={[0, 2, 0]}>
        <octahedronGeometry args={[1.5]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Floating rings around altar */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[0, 3, 0]} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[3, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#b700ff"
          emissive="#b700ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Interior glow */}
      <pointLight
        ref={glowRef}
        position={[0, 4, 0]}
        intensity={2}
        color="#ffd700"
        distance={15}
        decay={2}
      />
    </group>
  );
}
