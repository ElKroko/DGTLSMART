import React from 'react';

const BoidsPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-terminal text-terminal-green tracking-wider uppercase">
          <span className="terminal-cursor">&gt;</span> BOIDS
        </h1>
        <div className="w-24 h-px bg-terminal-green mb-4 opacity-50"></div>
        <p className="text-terminal-dim font-mono">
          SIMULATION OF COLLECTIVE BEHAVIOR OF PARTICLES THAT MIMIC BIRD FLOCKS,
          FISH SCHOOLS OR HERDS FOLLOWING SIMPLE RULES.
        </p>
      </div>
      
      <div className="border border-terminal-green/30 p-8 flex items-center justify-center text-center min-h-[50vh] shadow-terminal-inner">
        <div>
          <pre className="text-terminal-green text-xs mb-8">
{`
      ^     ^
   ^    ^     ^
     ^      ^
    >====>
   ^    ^     ^
     ^     ^
      ^  ^   ^
`}
          </pre>
          <h2 className="text-2xl font-terminal text-terminal-highlight mb-4 animate-pulse uppercase">[ COMING SOON ]</h2>
          <div className="font-mono text-terminal-dim max-w-lg mx-auto mt-6">
            <p className="mb-4">
              THIS GENERATIVE ART ENGINE IS UNDER DEVELOPMENT. 
              RETURN SOON TO EXPLORE THE SIMULATION OF EMERGENT FLOCKING BEHAVIORS.
            </p>
            <p>
              <span className="text-terminal-green">STATUS:</span> INITIALIZING... {Math.floor(Math.random() * 100)}% COMPLETE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoidsPage;
