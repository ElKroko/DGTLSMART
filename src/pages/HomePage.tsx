import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const engines = [
    {
      name: "LANGTON'S ANT",
      path: "/langtons-ant",
      description: "A simple automaton where an 'agent' walks on a grid and changes the state of the cells.",
      asciiArt: `
┌─────┬─────┬─────┐
│  #  │     │  #  │
├─────┼─────┼─────┤
│     │  >  │     │
├─────┼─────┼─────┤
│  #  │     │  #  │
└─────┴─────┴─────┘`,
      color: "border-terminal-green"
    },
    {
      name: "BOIDS",
      path: "/boids",
      description: "Simulation of collective behavior of particles that simulate flocks.",
      asciiArt: `
    ^     ^
 ^    ^     ^
   ^      ^
  >====>
 ^    ^     ^
   ^     ^
    ^  ^   ^`,
      color: "border-terminal-green"
    },
    {
      name: "L-SYSTEMS",
      path: "/l-systems",
      description: "System of rules to generate fractal growth like plants or organic structures.",
      asciiArt: `
      /\\
     /  \\
    /\\  /\\
   /  \\/  \\
  /\\      /\\
 /  \\    /  \\`,
      color: "border-terminal-green"
    },
    {
      name: "LENIA",
      path: "/lenia",
      description: "Smooth and continuous generalization of the Game of Life, which simulates fluid artificial life.",
      asciiArt: `
 ░░░▒▒▒░░░
░▒▒▓▓▓▓▓▒▒░
▒▓▓▓▓▓▓▓▓▓▒
▒▓▓▓▓▓▓▓▓▓▒
░▒▒▓▓▓▓▓▒▒░
 ░░░▒▒▒░░░`,
      color: "border-terminal-green"
    }
  ];
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center text-center mb-16 mt-8">
        <pre className="text-terminal-green text-sm md:text-base font-mono mb-4">
{`
 ██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗     ██╗███████╗███╗   ███╗ ██████╗ 
 ██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║     ██║██╔════╝████╗ ████║██╔═══██╗
 ██║  ██║██║██║  ███╗██║   ██║   ███████║██║     ██║███████╗██╔████╔██║██║   ██║
 ██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║     ██║╚════██║██║╚██╔╝██║██║   ██║
 ██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗██║███████║██║ ╚═╝ ██║╚██████╔╝
 ╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝     ╚═╝ ╚═════╝ 
`}
        </pre>
        <div className="w-48 h-px bg-terminal-green opacity-70 my-4"></div>
        <p className="font-terminal text-lg tracking-wider mb-4 text-terminal-green">
          <span className="terminal-cursor">$</span> A VISUAL EXPLORATION OF ALGORITHMIC AESTHETICS AND GENERATIVE ART
        </p>
        <p className="text-terminal-dim text-sm mb-8">
          VERSION 1.0 | LAST UPDATE: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {engines.map(engine => (
          <Link
            key={engine.path}
            to={engine.path}
            className={`group relative overflow-hidden shadow-terminal border ${engine.color} hover:border-terminal-highlight hover:shadow-lg transition-all duration-300 font-terminal bg-black`}
          >
            <div className="p-4 relative">
              <div className="border border-terminal-green/40 p-2 mb-4">
                <pre className="text-terminal-green text-xs overflow-hidden">
                  {engine.asciiArt}
                </pre>
              </div>
              <h2 className="text-xl font-bold text-terminal-green mb-2 tracking-wider">&gt; {engine.name}</h2>
              <p className="text-terminal-dim text-sm">{engine.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-terminal-green font-mono">RUN PROGRAM</span>
                <span className="text-terminal-green animate-pulse">&gt;&gt;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="border border-terminal-green/30 p-8 mb-16 shadow-terminal-inner">
        <h2 className="text-2xl font-mono text-terminal-green mb-4">&gt; ABOUT THE PROJECT</h2>
        <div className="font-mono space-y-4 text-terminal-dim">
          <p>
            DIGITALISMO is an artistic idea that fuses algorithmic aesthetics with interactive experience.
            It is a "visual manifesto" about how beauty can emerge from simple rules and mathematical logic.
          </p>
          <p>
            Each generative engine represents a different exploration of emergent patterns and complex behaviors
            that arise from simple rules. We invite you to explore, experiment with the parameters, and discover
            new forms of digital expression.
          </p>
        </div>
        <div className="mt-6">
          <Link to="/about" className="text-terminal-green hover:text-terminal-highlight group inline-flex items-center">
            <span className="mr-1 group-hover:mr-2 transition-all">&gt;</span> READ MORE ABOUT THE PROJECT PHILOSOPHY
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
