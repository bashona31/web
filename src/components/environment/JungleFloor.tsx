'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function JungleFloor() {
  const meshRef = useRef<THREE.Mesh>(null);

  const groundMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#0a1a0a',
      roughness: 0.9,
      metalness: 0.1,
      emissive: '#001a00',
      emissiveIntensity: 0.05,
    });
  }, []);

  // Generate terrain heights
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(200, 200, 128, 128);
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      // Create gentle hills with procedural noise
      positions[i + 2] =
        Math.sin(x * 0.05) * 1.5 +
        Math.cos(y * 0.08) * 1 +
        Math.sin(x * 0.15 + y * 0.1) * 0.5;
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      {/* Main ground */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
        geometry={geometry}
        material={groundMaterial}
      />

      {/* Glowing ground patches */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 80,
            -0.4,
            (Math.random() - 0.5) * 80,
          ]}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        >
          <circleGeometry args={[Math.random() * 2 + 1, 32]} />
          <meshStandardMaterial
            color="#003300"
            emissive="#00ff44"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Moss patches */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`moss-${i}`}
          position={[
            (Math.random() - 0.5) * 100,
            -0.3,
            (Math.random() - 0.5) * 100,
          ]}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        >
          <circleGeometry args={[Math.random() * 3 + 0.5, 16]} />
          <meshStandardMaterial
            color="#0a2a0a"
            roughness={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
