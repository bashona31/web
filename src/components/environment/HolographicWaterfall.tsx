'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicWaterfallProps {
  position: [number, number, number];
}

export default function HolographicWaterfall({ position }: HolographicWaterfallProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] -= 0.08;
        if (posArray[i * 3 + 1] < 0) {
          posArray[i * 3 + 1] = 12;
          posArray[i * 3] = (Math.random() - 0.5) * 3;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      {/* Cliff/Rock face */}
      <mesh position={[0, 6, -0.5]} castShadow>
        <boxGeometry args={[5, 14, 2]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Waterfall particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f5ff"
          size={0.15}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Base splash pool */}
      <mesh position={[0, -0.1, 1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshStandardMaterial
          color="#001133"
          emissive="#00f5ff"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Glow light */}
      <pointLight position={[0, 6, 1]} intensity={2} color="#00f5ff" distance={15} decay={2} />
      <pointLight position={[0, 0, 2]} intensity={1} color="#00f5ff" distance={8} decay={2} />
    </group>
  );
}
