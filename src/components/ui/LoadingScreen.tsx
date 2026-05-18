'use client';

import { motion } from 'framer-motion';

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-cyber-dark z-50 flex flex-col items-center justify-center scanline">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="font-cyber text-5xl md:text-7xl font-black text-white neon-text tracking-wider">
          APE ORIGIN
        </h1>
        <motion.p
          className="text-center font-cyber text-lg md:text-xl text-neon-cyan mt-2 tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          THE LOST JUNGLE
        </motion.p>
      </motion.div>

      {/* Loading bar */}
      <div className="w-80 md:w-96 relative">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden glow-border">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-green"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex justify-between mt-3">
          <span className="font-cyber text-xs text-gray-500 tracking-widest">
            INITIALIZING METAVERSE
          </span>
          <span className="font-cyber text-xs text-neon-cyan">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Status messages */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="font-body text-sm text-gray-600">
          {progress < 30 && 'Loading world assets...'}
          {progress >= 30 && progress < 60 && 'Generating terrain...'}
          {progress >= 60 && progress < 85 && 'Activating portals...'}
          {progress >= 85 && 'Preparing jungle environment...'}
        </p>
      </motion.div>

      {/* OthersideMeta branding */}
      <motion.div
        className="absolute bottom-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <p className="font-cyber text-xs text-gray-600 tracking-[0.5em]">
          OTHERSIDEMETA
        </p>
        <p className="font-body text-[10px] text-gray-700 mt-1">
          VIBECODE CAMP 2024
        </p>
      </motion.div>
    </div>
  );
}
