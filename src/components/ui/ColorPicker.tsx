import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 font-mono">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-terminal-green tracking-wide">&gt; {label}</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-8 h-8 border border-terminal-green shadow-terminal"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-20">
              {Array.from({length: 9}).map((_, i) => (
                <div key={i} className={i % 2 === 0 ? 'bg-black' : ''}></div>
              ))}
            </div>
          </button>
          {isOpen && (
            <div className="absolute right-0 top-10 z-10 p-2 bg-black border border-terminal-green shadow-terminal">
              <HexColorPicker color={color} onChange={onChange} />
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="flex-1 px-2 py-1 text-xs bg-black border border-terminal-green text-terminal-green font-mono"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 text-xs border border-terminal-dim hover:border-terminal-green text-terminal-dim hover:text-terminal-green font-mono"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
