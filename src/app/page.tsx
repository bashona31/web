'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CinematicIntro from '@/components/ui/CinematicIntro';
import GameHUD from '@/components/ui/GameHUD';
import { useGameStore } from '@/store/gameStore';
import { AudioProvider } from '@/systems/AudioManager';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardControls';

const GameCanvas = dynamic(() => import('@/components/canvas/GameCanvas'), {
  ssr: false,
  loading: () => <LoadingScreen progress={0} />,
});

function GameContent() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const gameStarted = useGameStore((state) => state.gameStarted);
  const startGame = useGameStore((state) => state.startGame);

  useKeyboardShortcuts();

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    startGame();
  };

  if (!isLoaded) {
    return <LoadingScreen progress={Math.min(loadingProgress, 100)} />;
  }

  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <GameCanvas />
      {gameStarted && <GameHUD />}
    </main>
  );
}

export default function Home() {
  return (
    <AudioProvider>
      <GameContent />
    </AudioProvider>
  );
}
