'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

const loreTexts = [
  {
    title: 'THE OTHERSIDE',
    text: 'In the year 3147, the boundaries between dimensions shattered. The Otherside emerged — a convergence of ancient primal energy and advanced technology.',
  },
  {
    title: 'THE LOST JUNGLE',
    text: 'Deep within the Otherside lies the Lost Jungle — a cyber-organic wilderness where ancient ape civilizations left behind technology beyond our comprehension.',
  },
  {
    title: 'YOUR MISSION',
    text: 'As an explorer of OthersideMeta, you must uncover the secrets of the Ape Origins, reactivate dormant portals, and collect the Energy Crystals that power this realm.',
  },
];

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(skipTimer);
  }, []);

  useEffect(() => {
    if (currentScene >= loreTexts.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentScene((prev) => prev + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentScene, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        {/* Star field */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Lore content */}
      <AnimatePresence mode="wait">
        {currentScene < loreTexts.length && (
          <motion.div
            key={currentScene}
            className="relative z-10 max-w-2xl mx-auto px-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.h2
              className="font-cyber text-2xl md:text-4xl text-neon-cyan mb-6 tracking-wider neon-text"
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              {loreTexts[currentScene].title}
            </motion.h2>
            <motion.p
              className="font-body text-lg md:text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {loreTexts[currentScene].text}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-20 flex gap-3">
        {loreTexts.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentScene ? 'bg-neon-cyan' : 'bg-gray-700'
            }`}
            animate={i === currentScene ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            className="absolute bottom-8 right-8 font-cyber text-xs text-gray-500 hover:text-neon-cyan transition-colors tracking-widest border border-gray-800 hover:border-neon-cyan px-4 py-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
          >
            SKIP → ENTER JUNGLE
          </motion.button>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="absolute top-6 left-6">
        <p className="font-cyber text-[10px] text-gray-600 tracking-[0.3em]">OTHERSIDEMETA</p>
      </div>
      <div className="absolute top-6 right-6">
        <p className="font-cyber text-[10px] text-gray-600 tracking-[0.3em]">APE ORIGIN v1.0</p>
      </div>
    </div>
  );
}
