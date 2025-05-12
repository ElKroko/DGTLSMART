import React from 'react';

const LSystemsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-terminal text-terminal-green tracking-wider uppercase">
          <span className="terminal-cursor">&gt;</span> L-SYSTEMS
        </h1>
        <div className="w-24 h-px bg-terminal-green mb-4 opacity-50"></div>
        <p className="text-terminal-dim font-mono">
          LINDENMAYER SYSTEMS: FORMAL GRAMMAR RULES TO GENERATE FRACTAL 
          AND ORGANIC STRUCTURES THROUGH SYMBOL STRINGS AND TRANSFORMATION RULES.
        </p>
      </div>
      
      <div className="border border-terminal-green/30 p-8 flex items-center justify-center text-center min-h-[50vh] shadow-terminal-inner">
        <div>
          <pre className="text-terminal-green text-xs mb-8">
{`
         /\\
        /  \\
       /\\   \\
      /  \\   \\
     /    \\   \\
    /      \\   \\
   /        \\   \\
  /          \\   \\
 /______________\\
`}
          </pre>
          <h2 className="text-2xl font-terminal text-terminal-highlight mb-4 animate-pulse uppercase">[ COMING SOON ]</h2>
          <div className="font-mono text-terminal-dim max-w-lg mx-auto mt-6">
            <p className="mb-4">
              THIS GENERATIVE ART ENGINE IS UNDER DEVELOPMENT. 
              RETURN SOON TO EXPLORE FRACTAL GROWTH AND ORGANIC STRUCTURES.
            </p>
            <div className="mt-6 text-xs text-terminal-green font-mono">
              <div className="mb-2">AXIOM: F</div>
              <div className="mb-2">RULES: F {'->'} F[+F]F[-F]F</div>
              <div>ANGLE: 25°</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LSystemsPage;
