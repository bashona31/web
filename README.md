# APE ORIGIN: The Lost Jungle

> A cinematic AAA-quality metaverse web experience built for **OthersideMeta** | Vibecode Camp

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Three.js](https://img.shields.io/badge/Three.js-0.158-blue)
![React Three Fiber](https://img.shields.io/badge/R3F-8.15-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10-pink)

---

## Overview

**APE ORIGIN: The Lost Jungle** is an immersive, cinematic metaverse web experience that transports users into a futuristic cyber-jungle world. Featuring a large open environment with floating islands, ancient ape temples, neon rivers, holographic waterfalls, and interactive portal gateways — all rendered in real-time 3D directly in the browser.

## Features

### Core Experience
- Large open cyber-jungle world with procedural terrain
- Floating islands with animated vegetation
- Ancient futuristic temples with glowing hieroglyphs
- Neon rivers with animated particle effects
- Holographic waterfalls with dynamic particles
- Dynamic fog, atmospheric particles, and volumetric lighting
- Day/night lighting cycle
- Interactive portal gateways with animated energy rings
- Cinematic intro with lore narrative

### Player System
- Third-person camera with smooth follow
- WASD movement controls
- Mouse camera rotation (pointer lock)
- Sprint mechanic with energy management
- Jump with gravity physics
- Collision system with world bounds
- Smooth movement interpolation

### Interactive Gameplay
- **Energy Crystal Collection** — 50 crystals scattered throughout the world
- **Interactive Terminals** — Popup UI with lore discovery
- **Portal Gateways** — Activatable portals with visual effects
- **Teleport Stations** — Fast travel between locations
- **Mission Progression** — 5-mission system with rewards
- **Inventory System** — Collect and manage artifacts
- **Lore Discovery** — Uncover the story of the Ape Origins

### UI/UX
- Futuristic cyberpunk-styled UI
- Animated loading screen with progress bar
- Cinematic intro with skip option
- Mission tracker (bottom-left)
- Minimap with POI markers (top-right)
- Health/Energy HUD (top-left)
- Crystal counter (bottom-right)
- Inventory panel (press I)
- Settings menu (press ESC)
- Crosshair overlay
- Controls hint display
- Fully responsive design

### Visual Effects
- Post-processing: Bloom, Chromatic Aberration, Vignette
- Dynamic point lights and spot lights
- Emissive materials with glow effects
- Particle systems (fog, fireflies, spores, dust motes, energy streams)
- Animated portal shaders
- Floating island animations
- Neon river pulsing effects
- Holographic waterfall particles

### Audio
- Web Audio API synthesized soundscape
- Ambient drone and pad (procedural)
- Crystal collection sound
- Portal activation sound
- Teleport sound
- Terminal interaction sound
- Jump sound effect
- Footstep sound

### Architecture
- Clean, modular folder structure
- Reusable component architecture
- Zustand state management
- Dynamic imports for code splitting
- Performance-optimized rendering
- Pointer-lock camera controls
- Mobile-aware design

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework, SSR, routing |
| **React 18** | UI component library |
| **Three.js** | 3D rendering engine |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Useful R3F helpers |
| **@react-three/postprocessing** | Visual effects pipeline |
| **Framer Motion** | UI animations |
| **TailwindCSS** | Utility-first CSS |
| **Zustand** | Lightweight state management |
| **GSAP** | Advanced animations |
| **TypeScript** | Type safety |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main entry point
│   └── globals.css         # Global styles & effects
├── components/
│   ├── canvas/
│   │   ├── GameCanvas.tsx  # R3F Canvas with post-processing
│   │   └── GameWorld.tsx   # World scene composition
│   ├── camera/
│   │   └── CameraSystem.tsx # Third-person camera controller
│   ├── player/
│   │   └── PlayerController.tsx # WASD movement + physics
│   ├── environment/
│   │   ├── LightingSystem.tsx
│   │   ├── AtmosphereSystem.tsx
│   │   ├── JungleFloor.tsx
│   │   ├── FloatingIslands.tsx
│   │   ├── AncientTemple.tsx
│   │   ├── NeonRiver.tsx
│   │   ├── HolographicWaterfall.tsx
│   │   ├── CyberTrees.tsx
│   │   └── ApeRuins.tsx
│   ├── interactive/
│   │   ├── PortalGateway.tsx
│   │   ├── EnergyCrystals.tsx
│   │   ├── InteractiveTerminal.tsx
│   │   └── TeleportStation.tsx
│   ├── effects/
│   │   └── ParticleSystem.tsx
│   └── ui/
│       ├── LoadingScreen.tsx
│       ├── CinematicIntro.tsx
│       ├── GameHUD.tsx
│       └── hud/
│           ├── HealthEnergyBar.tsx
│           ├── MissionTracker.tsx
│           ├── Minimap.tsx
│           ├── CrystalCounter.tsx
│           ├── ControlsHint.tsx
│           ├── Crosshair.tsx
│           ├── InventoryPanel.tsx
│           └── SettingsMenu.tsx
├── systems/
│   └── AudioManager.tsx    # Web Audio API sound system
├── hooks/
│   └── useKeyboardControls.ts
└── store/
    └── gameStore.ts        # Zustand game state
```

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bashona31/web.git
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Controls

| Key | Action |
|-----|--------|
| W/A/S/D | Move |
| Mouse | Look around |
| Shift | Sprint |
| Space | Jump |
| I | Toggle Inventory |
| M | Toggle Minimap |
| ESC | Settings Menu |
| Click | Lock pointer |

---

## Deployment

### Deploy to Vercel

This project is fully configured for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repository to [Vercel](https://vercel.com) for automatic deployments on push.

### Environment Variables

No environment variables required for the base experience.

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

---

## Performance Optimizations

- **Dynamic Imports** — GameCanvas is dynamically imported (no SSR)
- **Frustum Culling** — Only visible objects are rendered
- **LOD-aware design** — Geometry complexity appropriate for web
- **Adaptive DPR** — Device pixel ratio capped at 2
- **Efficient Particles** — Buffer geometry with Float32Arrays
- **State batching** — Zustand for minimal re-renders
- **PostProcessing** — Multisampling disabled for performance
- **Lazy evaluation** — useMemo for expensive computations

---

## Browser Support

- Chrome 90+ (recommended)
- Firefox 88+
- Safari 15+
- Edge 90+

Requires WebGL 2.0 support.

---

## Credits

- **Project**: APE ORIGIN: The Lost Jungle
- **Team**: OthersideMeta
- **Event**: Vibecode Camp
- **Tech**: Built with Next.js, Three.js, React Three Fiber

---

## License

MIT License — © 2024 OthersideMeta
