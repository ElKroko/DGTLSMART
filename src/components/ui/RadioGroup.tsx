import React from 'react';

interface RadioOptionProps {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOptionProps[];
  value: string;
  name: string;
  label: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  name,
  label,
  onChange,
}) => {  return (
    <div className="mb-4 font-mono">
      <label className="block text-sm text-terminal-green mb-2 tracking-wide">&gt; {label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center px-3 py-1 cursor-pointer transition-colors border
                     ${value === option.value
                        ? 'border-terminal-green text-terminal-highlight bg-terminal-green/10 shadow-terminal'
                        : 'border-terminal-dim text-terminal-dim hover:border-terminal-green/50 hover:text-terminal-green'}`}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="uppercase text-sm tracking-wider">[{option.label}]</span>
            {value === option.value && <span className="ml-1 text-terminal-green">✓</span>}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
