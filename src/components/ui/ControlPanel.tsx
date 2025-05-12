import React from 'react';

interface ControlPanelProps {
  title?: string;
  children: React.ReactNode;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  title = "Controles",
  children,
  isCollapsible = true,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  return (
    <div className="border border-terminal-green/50 bg-black p-4 shadow-terminal mb-6 font-mono relative">
      <div className="absolute top-0 left-0 right-0 h-6 border-b border-terminal-green/50 bg-black flex items-center px-2">
        <div className="h-2 w-2 rounded-full bg-terminal-green mr-1"></div>
        <div className="h-2 w-2 rounded-full bg-terminal-dim mr-1"></div>
      </div>
      <div className="flex justify-between items-center mb-6 mt-4 pt-2">
        <h2 className="text-lg uppercase tracking-wider text-terminal-green font-terminal">// {title}</h2>
        {isCollapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-dim hover:text-terminal-green transition-colors px-2 border border-terminal-dim hover:border-terminal-green"
          >
            {isExpanded ? (
              <span className="text-xs">[ - ]</span>            ) : (
              <span className="text-xs">[ + ]</span>
            )}
          </button>
        )}
      </div>
      {(!isCollapsible || isExpanded) && (
        <div className="space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
