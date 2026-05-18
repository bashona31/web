'use client';

export default function ControlsHint() {
  return (
    <div className="cyber-panel p-2 rounded-lg">
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        <div className="flex items-center gap-1">
          <kbd className="font-cyber text-[8px] text-gray-400 bg-gray-800 px-1 rounded">WASD</kbd>
          <span className="font-body text-[9px] text-gray-500">Move</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="font-cyber text-[8px] text-gray-400 bg-gray-800 px-1 rounded">SHIFT</kbd>
          <span className="font-body text-[9px] text-gray-500">Sprint</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="font-cyber text-[8px] text-gray-400 bg-gray-800 px-1 rounded">SPACE</kbd>
          <span className="font-body text-[9px] text-gray-500">Jump</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="font-cyber text-[8px] text-gray-400 bg-gray-800 px-1 rounded">MOUSE</kbd>
          <span className="font-body text-[9px] text-gray-500">Look</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="font-cyber text-[8px] text-gray-400 bg-gray-800 px-1 rounded">I</kbd>
          <span className="font-body text-[9px] text-gray-500">Inventory</span>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="font-cyber text-[8px] text-gray-400 bg-gray-800 px-1 rounded">ESC</kbd>
          <span className="font-body text-[9px] text-gray-500">Settings</span>
        </div>
      </div>
    </div>
  );
}
