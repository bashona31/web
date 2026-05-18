'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

interface PortalGatewayProps {
  position: [number, number, number];
  id: string;
}

export default function PortalGateway({ position, id }: PortalGatewayProps) {
  const portalRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const portalsActivated = useGameStore((state) => state.portalsActivated);
  const isActive = portalsActivated.includes(id);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.7;
      ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.3;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  const portalColor = isActive ? '#00f5ff' : '#b700ff';
  const coreColor = isActive ? '#ffffff' : '#4400aa';

  return (
    <group ref={portalRef} position={position}>
      {/* Portal frame - stone archway */}
      <mesh position={[-2.5, 3, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 6, 8]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[2.5, 3, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 6, 8]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[0, 6.5, 0]} castShadow>
        <boxGeometry args={[6, 1, 1]} />
        <meshStandardMaterial color="#2a2a3a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Neon frame accents */}
      <mesh position={[-2.5, 3, 0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
        <meshStandardMaterial color={portalColor} emissive={portalColor} emissiveIntensity={3} />
      </mesh>
      <mesh position={[2.5, 3, 0.5]}>
        <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
        <meshStandardMaterial color={portalColor} emissive={portalColor} emissiveIntensity={3} />
      </mesh>

      {/* Portal energy rings */}
      <mesh ref={ringRef} position={[0, 3.5, 0]}>
        <torusGeometry args={[2.2, 0.05, 16, 64]} />
        <meshStandardMaterial
          color={portalColor}
          emissive={portalColor}
          emissiveIntensity={4}
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 3.5, 0]}>
        <torusGeometry args={[1.8, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Portal core */}
      <mesh ref={coreRef} position={[0, 3.5, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={portalColor}
          emissiveIntensity={2}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 4, 0.3, 8]} />
        <meshStandardMaterial
          color="#1a1a2a"
          roughness={0.5}
          metalness={0.5}
          emissive={portalColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rune circle on ground */}
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 3.2, 32]} />
        <meshStandardMaterial
          color={portalColor}
          emissive={portalColor}
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Portal light */}
      <pointLight
        position={[0, 3.5, 1]}
        intensity={3}
        color={portalColor}
        distance={15}
        decay={2}
      />
    </group>
  );
}
