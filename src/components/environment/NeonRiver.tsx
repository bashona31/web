'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function NeonRiver() {
  const riverRef = useRef<THREE.Mesh>(null);
  const river2Ref = useRef<THREE.Mesh>(null);

  const riverGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-50, 0, 20),
      new THREE.Vector3(-30, 0, 15),
      new THREE.Vector3(-10, 0, 8),
      new THREE.Vector3(5, 0, 5),
      new THREE.Vector3(15, 0, 0),
      new THREE.Vector3(25, 0, -5),
      new THREE.Vector3(40, 0, -15),
      new THREE.Vector3(50, 0, -25),
    ]);

    const points = curve.getPoints(100);
    const shape = new THREE.Shape();
    shape.moveTo(-2, 0);
    shape.lineTo(2, 0);
    shape.lineTo(1.5, -0.3);
    shape.lineTo(-1.5, -0.3);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      steps: 100,
      extrudePath: curve,
    });
    return geometry;
  }, []);

  const riverGeometry2 = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(50, 0, 10),
      new THREE.Vector3(35, 0, 5),
      new THREE.Vector3(20, 0, -8),
      new THREE.Vector3(5, 0, -20),
      new THREE.Vector3(-10, 0, -30),
      new THREE.Vector3(-30, 0, -40),
      new THREE.Vector3(-50, 0, -50),
    ]);

    const shape = new THREE.Shape();
    shape.moveTo(-1.5, 0);
    shape.lineTo(1.5, 0);
    shape.lineTo(1, -0.2);
    shape.lineTo(-1, -0.2);
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      steps: 80,
      extrudePath: curve,
    });
  }, []);

  useFrame(({ clock }) => {
    if (riverRef.current) {
      const material = riverRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.5;
    }
    if (river2Ref.current) {
      const material = river2Ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.2 + Math.cos(clock.getElapsedTime() * 1.5) * 0.4;
    }
  });

  return (
    <group>
      {/* Main neon river */}
      <mesh ref={riverRef} geometry={riverGeometry} position={[0, -0.2, 0]}>
        <meshStandardMaterial
          color="#003344"
          emissive="#00f5ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary river */}
      <mesh ref={river2Ref} geometry={riverGeometry2} position={[0, -0.15, 0]}>
        <meshStandardMaterial
          color="#220044"
          emissive="#b700ff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* River glow lights along the path */}
      {Array.from({ length: 15 }).map((_, i) => (
        <pointLight
          key={i}
          position={[
            -40 + i * 6 + Math.sin(i) * 3,
            0.5,
            15 - i * 3 + Math.cos(i) * 2,
          ]}
          intensity={0.3}
          color="#00f5ff"
          distance={5}
          decay={2}
        />
      ))}

      {/* Floating lily pads with glow */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={`lily-${i}`}
          position={[
            -30 + i * 8 + Math.sin(i * 2) * 3,
            0.05,
            12 - i * 2.5 + Math.cos(i * 2) * 2,
          ]}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        >
          <circleGeometry args={[0.5 + Math.random() * 0.3, 8]} />
          <meshStandardMaterial
            color="#003322"
            emissive="#00ff88"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}
