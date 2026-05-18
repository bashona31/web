import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f5ff',
        'neon-purple': '#b700ff',
        'neon-green': '#39ff14',
        'neon-orange': '#ff6b00',
        'neon-pink': '#ff00ff',
        'dark-jungle': '#0a0f0d',
        'cyber-dark': '#0d1117',
        'cyber-panel': '#161b22',
        'gold-ancient': '#ffd700',
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff' },
          '50%': { opacity: '0.8', textShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00f5ff, 0 0 10px #00f5ff' },
          '100%': { boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #0d1117 0%, #1a0a2e 50%, #0d1117 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
