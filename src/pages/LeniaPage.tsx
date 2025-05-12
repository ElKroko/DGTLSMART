import React from 'react';

const LeniaPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-terminal text-terminal-green tracking-wider uppercase">
          <span className="terminal-cursor">&gt;</span> LENIA
        </h1>
        <div className="w-24 h-px bg-terminal-green mb-4 opacity-50"></div>
        <p className="text-terminal-dim font-mono">
          SMOOTH AND CONTINUOUS GENERALIZATION OF CONWAY'S GAME OF LIFE,
          CREATING FLUID ORGANIC FORMS THAT SIMULATE ARTIFICIAL ORGANISM BEHAVIORS.
        </p>
      </div>
      
      <div className="border border-terminal-green/30 p-8 flex items-center justify-center text-center min-h-[50vh] shadow-terminal-inner">
        <div>
          <pre className="text-terminal-green text-xs mb-8">
{`
 ░░░▒▒▒░░░
░▒▒▓▓▓▓▓▒▒░
▒▓▓▓▓▓▓▓▓▓▒
▒▓▓▓▓▓▓▓▓▓▒
░▒▒▓▓▓▓▓▒▒░
 ░░░▒▒▒░░░
`}
          </pre>
          <h2 className="text-2xl font-terminal text-terminal-highlight mb-4 animate-pulse uppercase">[ COMING SOON ]</h2>
          <div className="font-mono text-terminal-dim max-w-lg mx-auto mt-6">
            <p className="mb-4">
              THIS GENERATIVE ART ENGINE IS UNDER DEVELOPMENT. 
              RETURN SOON TO EXPLORE FLUID ARTIFICIAL LIFE AND CONTINUOUS EMERGENT PATTERNS.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 max-w-md mx-auto text-xs">
              <div className="border border-terminal-green/30 p-2">
                <div className="text-terminal-green mb-1">KERNEL RADIUS</div>
                <div>13</div>
              </div>
              <div className="border border-terminal-green/30 p-2">
                <div className="text-terminal-green mb-1">GROWTH MAPPING</div>
                <div>EXPONENTIAL</div>
              </div>
              <div className="border border-terminal-green/30 p-2">
                <div className="text-terminal-green mb-1">TIME SCALE</div>
                <div>0.1</div>
              </div>
              <div className="border border-terminal-green/30 p-2">
                <div className="text-terminal-green mb-1">SPACE SCALE</div>
                <div>0.15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeniaPage;
