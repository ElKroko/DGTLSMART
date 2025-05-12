import React from 'react';

const GalleryPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-terminal text-terminal-green tracking-wider uppercase">
          <span className="terminal-cursor">&gt;</span> GALLERY
        </h1>
        <div className="w-24 h-px bg-terminal-green mb-4 opacity-50"></div>
        <p className="text-terminal-dim font-mono">
          EXPLORE SAVED CREATIONS AND SHARED WORKS FROM THE DIGITALISMO COMMUNITY.
        </p>
      </div>
      
      <div className="border border-terminal-green/30 p-8 flex items-center justify-center text-center min-h-[50vh] shadow-terminal-inner">
        <div>
          <pre className="text-terminal-green text-xs mb-8">
{`
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│     .....     │ │   ........    │ │   ..    ..    │
│   .........   │ │  ..........   │ │  ....  ....   │
│  ...........  │ │ ............  │ │ ............  │
│ ............. │ │.............. │ │.............. │
│...............│ │...............│ │...............│
│...............│ │...............│ │...............│
│ ............. │ │ ............. │ │ ............. │
│  ...........  │ │  ...........  │ │  ...........  │
│   .........   │ │   .........   │ │   .........   │
│     .....     │ │     .....     │ │     .....     │
└───────────────┘ └───────────────┘ └───────────────┘
`}
          </pre>
          <h2 className="text-2xl font-terminal text-terminal-highlight mb-4 animate-pulse uppercase">[ COMING SOON ]</h2>
          <div className="font-mono text-terminal-dim max-w-lg mx-auto mt-6">
            <p className="mb-4">
              THE COMMUNITY GALLERY IS UNDER DEVELOPMENT.
              RETURN SOON TO EXPLORE AND SHARE CREATIONS.
            </p>
            <div className="mt-8 text-xs">
              <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
                <div className="text-terminal-green">STATUS:</div>
                <div className="col-span-3 text-left text-terminal-green">INITIALIZING DATABASE...</div>
                
                <div className="text-terminal-green">STORAGE:</div>
                <div className="col-span-3 text-left">PREPARING CLOUD STORAGE</div>
                
                <div className="text-terminal-green">FEATURES:</div>
                <div className="col-span-3 text-left">UPLOAD, BROWSE, SHARE, LIKE</div>
                
                <div className="text-terminal-green">ETA:</div>
                <div className="col-span-3 text-left">APPROXIMATELY 30 DAYS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
