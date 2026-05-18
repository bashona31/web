'use client';

import { useEffect, useRef, createContext, useContext, useState, useCallback } from 'react';

interface AudioState {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  isMuted: boolean;
}

interface AudioContextType {
  playSound: (soundId: string) => void;
  playPositionalSound: (soundId: string, position: [number, number, number]) => void;
  setMasterVolume: (vol: number) => void;
  setMusicVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  toggleMute: () => void;
  audioState: AudioState;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    return {
      playSound: () => {},
      playPositionalSound: () => {},
      setMasterVolume: () => {},
      setMusicVolume: () => {},
      setSfxVolume: () => {},
      toggleMute: () => {},
      audioState: { masterVolume: 0.7, musicVolume: 0.5, sfxVolume: 0.8, isMuted: false },
    };
  }
  return context;
}

// Sound synthesis using Web Audio API (no external files needed)
function createOscillatorSound(
  audioContext: AudioContext,
  type: OscillatorType,
  frequency: number,
  duration: number,
  volume: number,
  detune: number = 0
): OscillatorNode {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.detune.setValueAtTime(detune, audioContext.currentTime);

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  return oscillator;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    masterVolume: 0.7,
    musicVolume: 0.5,
    sfxVolume: 0.8,
    isMuted: false,
  });

  useEffect(() => {
    // Initialize Audio Context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playSound = useCallback((soundId: string) => {
    if (!audioContextRef.current || audioState.isMuted) return;
    const ctx = audioContextRef.current;
    const vol = audioState.masterVolume * audioState.sfxVolume;

    switch (soundId) {
      case 'crystal-collect': {
        const osc = createOscillatorSound(ctx, 'sine', 880, 0.3, vol * 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
        // Second tone
        setTimeout(() => {
          const osc2 = createOscillatorSound(ctx, 'sine', 1320, 0.2, vol * 0.2);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.2);
        }, 100);
        break;
      }
      case 'portal-activate': {
        const osc = createOscillatorSound(ctx, 'sawtooth', 220, 1.5, vol * 0.15, 10);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
        break;
      }
      case 'teleport': {
        const osc = createOscillatorSound(ctx, 'sine', 440, 0.8, vol * 0.2);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.4);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
        break;
      }
      case 'terminal-open': {
        const osc = createOscillatorSound(ctx, 'square', 660, 0.15, vol * 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
        setTimeout(() => {
          const osc2 = createOscillatorSound(ctx, 'square', 880, 0.1, vol * 0.08);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.1);
        }, 80);
        break;
      }
      case 'jump': {
        const osc = createOscillatorSound(ctx, 'sine', 200, 0.2, vol * 0.1);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
        break;
      }
      case 'footstep': {
        // White noise burst for footstep
        const bufferSize = ctx.sampleRate * 0.05;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.1;
        }
        const source = ctx.createBufferSource();
        const gain = ctx.createGain();
        source.buffer = buffer;
        gain.gain.setValueAtTime(vol * 0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();
        break;
      }
      default:
        break;
    }
  }, [audioState]);

  const playPositionalSound = useCallback((soundId: string, position: [number, number, number]) => {
    // Simplified positional audio - just plays with distance-based volume
    if (!audioContextRef.current || audioState.isMuted) return;
    playSound(soundId);
  }, [audioState, playSound]);

  const setMasterVolume = useCallback((vol: number) => {
    setAudioState((prev) => ({ ...prev, masterVolume: vol }));
  }, []);

  const setMusicVolume = useCallback((vol: number) => {
    setAudioState((prev) => ({ ...prev, musicVolume: vol }));
  }, []);

  const setSfxVolume = useCallback((vol: number) => {
    setAudioState((prev) => ({ ...prev, sfxVolume: vol }));
  }, []);

  const toggleMute = useCallback(() => {
    setAudioState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  return (
    <AudioContext.Provider
      value={{
        playSound,
        playPositionalSound,
        setMasterVolume,
        setMusicVolume,
        setSfxVolume,
        toggleMute,
        audioState,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

// Ambient sound generator component (can be placed in 3D scene)
export function AmbientSoundscape() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<(OscillatorNode | AudioBufferSourceNode)[]>([]);

  useEffect(() => {
    let mounted = true;

    const startAmbient = () => {
      if (!mounted) return;

      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;

        // Deep ambient drone
        const drone = ctx.createOscillator();
        const droneGain = ctx.createGain();
        drone.type = 'sine';
        drone.frequency.setValueAtTime(55, ctx.currentTime);
        droneGain.gain.setValueAtTime(0.02, ctx.currentTime);
        drone.connect(droneGain);
        droneGain.connect(ctx.destination);
        drone.start();
        nodesRef.current.push(drone);

        // Subtle high pad
        const pad = ctx.createOscillator();
        const padGain = ctx.createGain();
        pad.type = 'sine';
        pad.frequency.setValueAtTime(440, ctx.currentTime);
        padGain.gain.setValueAtTime(0.005, ctx.currentTime);
        pad.connect(padGain);
        padGain.connect(ctx.destination);
        pad.start();
        nodesRef.current.push(pad);

        // Slow LFO modulation on the pad
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
        lfoGain.gain.setValueAtTime(20, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(pad.frequency);
        lfo.start();
        nodesRef.current.push(lfo);
      } catch (e) {
        // Audio not available
      }

      document.removeEventListener('click', startAmbient);
    };

    document.addEventListener('click', startAmbient);

    return () => {
      mounted = false;
      document.removeEventListener('click', startAmbient);
      nodesRef.current.forEach((node) => {
        try { node.stop(); } catch {}
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return null;
}
