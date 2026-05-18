'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/gameStore';

export default function CameraSystem() {
  const { camera } = useThree();
  const player = useGameStore((state) => state.player);

  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ theta: 0, phi: Math.PI / 4 });
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  const cameraDistance = 8;
  const cameraHeight = 3;
  const smoothness = 0.08;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        rotationRef.current.theta -= e.movementX * 0.003;
        rotationRef.current.phi = THREE.MathUtils.clamp(
          rotationRef.current.phi - e.movementY * 0.003,
          0.1,
          Math.PI / 2.2
        );
      }
    };

    const handleClick = () => {
      if (!document.pointerLockElement) {
        document.body.requestPointerLock();
      }
    };

    const handlePointerLockChange = () => {
      setIsPointerLocked(!!document.pointerLockElement);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, []);

  useFrame(() => {
    const { theta, phi } = rotationRef.current;
    const [px, py, pz] = player.position;

    // Calculate camera position based on spherical coordinates
    const targetX = px + cameraDistance * Math.sin(phi) * Math.sin(theta);
    const targetY = py + cameraDistance * Math.cos(phi) + cameraHeight;
    const targetZ = pz + cameraDistance * Math.sin(phi) * Math.cos(theta);

    // Smooth camera follow
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, smoothness);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, smoothness);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, smoothness);

    // Look at player
    const lookTarget = new THREE.Vector3(px, py + 1, pz);
    camera.lookAt(lookTarget);
  });

  return null;
}
