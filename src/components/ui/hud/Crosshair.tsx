'use client';

export default function Crosshair() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div className="relative w-8 h-8">
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-neon-cyan rounded-full shadow-[0_0_4px_#00f5ff]" />

        {/* Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-neon-cyan/60" />
        {/* Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-neon-cyan/60" />
        {/* Left */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-[1px] bg-neon-cyan/60" />
        {/* Right */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-[1px] bg-neon-cyan/60" />
      </div>
    </div>
  );
}
