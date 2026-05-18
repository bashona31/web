'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GameWorld from './GameWorld';
import PlayerController from '../player/PlayerController';
import CameraSystem from '../camera/CameraSystem';
import LightingSystem from '../environment/LightingSystem';
import AtmosphereSystem from '../environment/AtmosphereSystem';
import ParticleSystem from '../effects/ParticleSystem';

export default function GameCanvas() {
  return (
    <Canvas
      shadows
      camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 5, 10] }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        toneMapping: 3, // ACESFilmicToneMapping
        toneMappingExposure: 1.2,
      }}
      dpr={[1, 2]}
      style={{ width: '100vw', height: '100vh' }}
    >
      <color attach="background" args={['#050a0e']} />
      <fog attach="fog" args={['#050a0e', 30, 120]} />

      <Suspense fallback={null}>
        <LightingSystem />
        <AtmosphereSystem />
        <GameWorld />
        <PlayerController />
        <CameraSystem />
        <ParticleSystem />
      </Suspense>
    </Canvas>
  );
}
