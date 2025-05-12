import React from 'react';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  label: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, min, max, step = 1, label, onChange }) => {
  // Calculate the percentage for styling the slider
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="mb-5 font-mono">
      <div className="flex justify-between mb-2">
        <label className="text-sm text-terminal-green tracking-wide">&gt; {label}</label>
        <span className="text-sm text-terminal-highlight">[{value}]</span>
      </div>
      <div className="relative h-6 border border-terminal-green/50 bg-black mb-1">
        <div 
          className="h-full bg-terminal-green/20 absolute top-0 left-0"
          style={{ width: `${percentage}%` }}
        ></div>
        <div className="absolute -top-px h-1 bg-terminal-green" style={{ width: `${percentage}%`, left: 0 }}></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-full opacity-0 cursor-pointer absolute top-0 left-0 z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center px-2">
          <div className="flex space-x-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <span 
                key={i} 
                className={`inline-block h-3 w-px ${i * 10 < percentage ? 'bg-terminal-green' : 'bg-terminal-dim/30'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-terminal-dim">
        <span>&lt;{min}&gt;</span>
        <span>&lt;{max}&gt;</span>
      </div>
    </div>
  );
};

export default Slider;
