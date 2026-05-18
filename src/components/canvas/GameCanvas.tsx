'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
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

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          offset={[0.0005, 0.0005]}
        />
        <Vignette
          eskil={false}
          offset={0.1}
          darkness={0.8}
        />
      </EffectComposer>
    </Canvas>
  );
}
