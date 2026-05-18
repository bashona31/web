'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DirectionalLight, Color } from 'three';
import { useGameStore } from '@/store/gameStore';

export default function LightingSystem() {
  const sunRef = useRef<DirectionalLight>(null);
  const dayNightCycle = useGameStore((state) => state.dayNightCycle);

  useFrame(({ clock }) => {
    if (sunRef.current) {
      const time = clock.getElapsedTime() * 0.02;
      const sunAngle = time % (Math.PI * 2);
      sunRef.current.position.set(
        Math.cos(sunAngle) * 50,
        Math.sin(sunAngle) * 30 + 20,
        -20
      );

      // Shift color based on day/night
      const dayColor = new Color('#ffe4b5');
      const nightColor = new Color('#1a0a3e');
      const currentColor = dayColor.lerp(nightColor, Math.sin(time) * 0.5 + 0.5);
      sunRef.current.color = currentColor;
    }
  });

  return (
    <>
      {/* Ambient light - slightly blue for cyber atmosphere */}
      <ambientLight intensity={0.15} color="#1a2a4a" />

      {/* Main directional (sun/moon) */}
      <directionalLight
        ref={sunRef}
        intensity={0.6}
        position={[30, 40, -20]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0001}
      />

      {/* Neon accent lights */}
      <pointLight position={[0, 3, -35]} intensity={2} color="#00f5ff" distance={20} decay={2} />
      <pointLight position={[30, 5, 10]} intensity={1.5} color="#b700ff" distance={15} decay={2} />
      <pointLight position={[-25, 4, -15]} intensity={1.5} color="#39ff14" distance={15} decay={2} />
      <pointLight position={[15, 2, 0]} intensity={1} color="#ff6b00" distance={10} decay={2} />

      {/* Temple interior glow */}
      <spotLight
        position={[0, 15, -40]}
        angle={0.4}
        penumbra={0.8}
        intensity={3}
        color="#ffd700"
        castShadow
        target-position={[0, 0, -40]}
      />

      {/* River glow lights */}
      <pointLight position={[10, 0.5, 5]} intensity={0.8} color="#00f5ff" distance={8} decay={2} />
      <pointLight position={[-5, 0.5, -5]} intensity={0.8} color="#00f5ff" distance={8} decay={2} />
      <pointLight position={[20, 0.5, -10]} intensity={0.8} color="#b700ff" distance={8} decay={2} />

      {/* Hemisphere for overall atmosphere */}
      <hemisphereLight
        intensity={0.3}
        color="#0a1628"
        groundColor="#0d0a00"
      />
    </>
  );
}
