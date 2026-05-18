'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

export default function PlayerController() {
  const playerRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
  });

  const updatePlayerPosition = useGameStore((state) => state.updatePlayerPosition);
  const setPlayerSprinting = useGameStore((state) => state.setPlayerSprinting);
  const setPlayerJumping = useGameStore((state) => state.setPlayerJumping);
  const useEnergy = useGameStore((state) => state.useEnergy);
  const restoreEnergy = useGameStore((state) => state.restoreEnergy);
  const player = useGameStore((state) => state.player);

  const isGrounded = useRef(true);
  const jumpVelocity = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': setKeys((k) => ({ ...k, forward: true })); break;
        case 'KeyS': setKeys((k) => ({ ...k, backward: true })); break;
        case 'KeyA': setKeys((k) => ({ ...k, left: true })); break;
        case 'KeyD': setKeys((k) => ({ ...k, right: true })); break;
        case 'ShiftLeft': setKeys((k) => ({ ...k, sprint: true })); break;
        case 'Space':
          e.preventDefault();
          setKeys((k) => ({ ...k, jump: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': setKeys((k) => ({ ...k, forward: false })); break;
        case 'KeyS': setKeys((k) => ({ ...k, backward: false })); break;
        case 'KeyA': setKeys((k) => ({ ...k, left: false })); break;
        case 'KeyD': setKeys((k) => ({ ...k, right: false })); break;
        case 'ShiftLeft': setKeys((k) => ({ ...k, sprint: false })); break;
        case 'Space': setKeys((k) => ({ ...k, jump: false })); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(({ camera, clock }, delta) => {
    if (!playerRef.current) return;

    const speed = keys.sprint && player.energy > 0 ? 12 : 6;
    const direction = directionRef.current;
    direction.set(0, 0, 0);

    // Get camera's forward direction (on xz plane)
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

    if (keys.forward) direction.add(cameraDirection);
    if (keys.backward) direction.sub(cameraDirection);
    if (keys.left) direction.sub(cameraRight);
    if (keys.right) direction.add(cameraRight);

    if (direction.length() > 0) {
      direction.normalize();
      // Smooth rotation towards movement direction
      const targetRotation = Math.atan2(direction.x, direction.z);
      playerRef.current.rotation.y = THREE.MathUtils.lerp(
        playerRef.current.rotation.y,
        targetRotation,
        0.1
      );
    }

    // Apply movement
    const velocity = velocityRef.current;
    velocity.x = THREE.MathUtils.lerp(velocity.x, direction.x * speed, 0.1);
    velocity.z = THREE.MathUtils.lerp(velocity.z, direction.z * speed, 0.1);

    // Jump mechanics
    if (keys.jump && isGrounded.current) {
      jumpVelocity.current = 8;
      isGrounded.current = false;
      setPlayerJumping(true);
    }

    // Gravity
    jumpVelocity.current -= 20 * delta;
    playerRef.current.position.y += jumpVelocity.current * delta;

    // Ground collision
    if (playerRef.current.position.y <= 1) {
      playerRef.current.position.y = 1;
      jumpVelocity.current = 0;
      isGrounded.current = true;
      setPlayerJumping(false);
    }

    // Apply horizontal movement
    playerRef.current.position.x += velocity.x * delta;
    playerRef.current.position.z += velocity.z * delta;

    // World bounds
    playerRef.current.position.x = THREE.MathUtils.clamp(
      playerRef.current.position.x, -80, 80
    );
    playerRef.current.position.z = THREE.MathUtils.clamp(
      playerRef.current.position.z, -80, 80
    );

    // Sprint energy management
    if (keys.sprint && (keys.forward || keys.backward || keys.left || keys.right)) {
      useEnergy(15 * delta);
      setPlayerSprinting(true);
    } else {
      restoreEnergy(5 * delta);
      setPlayerSprinting(false);
    }

    // Update store
    const pos = playerRef.current.position;
    updatePlayerPosition([pos.x, pos.y, pos.z]);
  });

  return (
    <group ref={playerRef} position={[0, 1, 0]}>
      {/* Player body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <meshStandardMaterial
          color="#1a1a2a"
          roughness={0.3}
          metalness={0.7}
          emissive="#003366"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Helmet/Head */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#0a0a1a"
          roughness={0.1}
          metalness={0.9}
          emissive="#00f5ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Visor glow */}
      <mesh position={[0, 0.8, 0.2]}>
        <planeGeometry args={[0.3, 0.1]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Neon trim lines */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.32, 0.02, 8, 16]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <torusGeometry args={[0.32, 0.02, 8, 16]} />
        <meshStandardMaterial
          color="#b700ff"
          emissive="#b700ff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Player light */}
      <pointLight position={[0, 0, 1]} intensity={0.5} color="#00f5ff" distance={5} decay={2} />
    </group>
  );
}
