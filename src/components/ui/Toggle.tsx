import React from 'react';

interface ToggleProps {
  isChecked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ isChecked, label, onChange }) => {  return (
    <div className="flex items-center justify-between mb-4 font-mono">
      <label className="text-sm text-terminal-green tracking-wide">&gt; {label}</label>
      <button
        type="button"
        className={`relative inline-flex h-7 w-14 items-center border font-mono text-xs
                  transition-colors focus:outline-none
                  ${isChecked ? 'border-terminal-green bg-terminal-green/20 text-terminal-green' : 'border-terminal-dim bg-black text-terminal-dim'}`}
        onClick={() => onChange(!isChecked)}
      >
        {isChecked ? (
          <span className="flex w-full justify-center">[ ON ]</span>
        ) : (
          <span className="flex w-full justify-center">[ OFF ]</span>
        )}
      </button>
    </div>
  );
};

export default Toggle;
