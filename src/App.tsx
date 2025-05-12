import React, { useState, useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate boot-up sequence
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="App crt">
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-black text-terminal-green font-mono">
          <div className="max-w-lg text-center">
            <pre className="text-terminal-green text-xs md:text-sm mb-6">
{`
 ██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗     ██╗███████╗███╗   ███╗ ██████╗ 
 ██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║     ██║██╔════╝████╗ ████║██╔═══██╗
 ██║  ██║██║██║  ███╗██║   ██║   ███████║██║     ██║███████╗██╔████╔██║██║   ██║
 ██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║     ██║╚════██║██║╚██╔╝██║██║   ██║
 ██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗██║███████║██║ ╚═╝ ██║╚██████╔╝
 ╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ 
`}
            </pre>
            <div className="text-sm mb-8 glitch-text">SYSTEM BOOTING...</div>
            <div className="w-64 h-2 mx-auto bg-black border border-terminal-green relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-terminal-green animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <div className="mt-4 text-xs text-terminal-dim">INITIALIZING GENERATIVE ART SYSTEMS</div>
          </div>
        </div>
      ) : (
        <div className="power-on crt-flicker">
          <AppRouter />
          <div className="scanlines"></div>
        </div>
      )}
    </div>
  );
}

export default App;
