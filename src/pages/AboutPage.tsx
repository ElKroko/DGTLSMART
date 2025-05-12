import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-terminal text-terminal-green tracking-wider uppercase">
          <span className="terminal-cursor">&gt;</span> ABOUT DIGITALISMO
        </h1>
        <div className="w-24 h-px bg-terminal-green mb-4 opacity-50"></div>
      </div>
      
      <div className="max-w-3xl font-mono">
        <p className="text-lg text-terminal-green mb-8">
          DIGITALISMO IS AN ARTISTIC PROJECT EXPLORING THE INTERSECTION BETWEEN GENERATIVE ART, 
          ALGORITHMIC AESTHETICS, AND INTERACTIVE EXPERIENCE.
        </p>
        
        <div className="border border-terminal-green/30 p-6 mb-8 shadow-terminal-inner">
          <h2 className="text-xl text-terminal-green mb-4 uppercase">{"// MANIFEST"}</h2>
          <div className="space-y-4 text-terminal-dim">
            <p>
              WE BELIEVE IN THE IDEA THAT BEAUTY CAN EMERGE FROM SIMPLE RULES AND MATHEMATICAL LOGIC.
              THAT THE EMERGENT COMPLEXITY FROM SIMPLE ALGORITHMS FORMS PART OF A NEW FORM OF ARTISTIC
              EXPRESSION THAT IS INTRINSICALLY DIGITAL.
            </p>
            
            <p>
              THE COMPLEX SYSTEMS WE OBSERVE IN NATURE FOLLOW PATTERNS AND RULES THAT CAN BE 
              MODELED THROUGH ALGORITHMS. BY CREATING THESE SYSTEMS AND ALLOWING PEOPLE TO
              INTERACT WITH THEM, WE SEEK TO BLUR THE LINE BETWEEN CODE AND ART.
            </p>
          </div>
        </div>
        
        <h2 className="text-xl text-terminal-green mb-4 uppercase">{"// THE ENGINES"}</h2>
        <div className="text-terminal-dim space-y-4">
          <p>
            EACH GENERATIVE ART ENGINE IN DIGITALISMO REPRESENTS A DIFFERENT SYSTEM BASED ON
            MATHEMATICAL RULES AND PRINCIPLES:
          </p>
          
          <div className="border-l-2 border-terminal-green/30 pl-4 py-1 my-4">
            <h3 className="text-terminal-green mb-2">&gt; LANGTON'S ANT</h3>
            <p className="text-sm">
              A CELLULAR AUTOMATON WITH SIMPLE RULES THAT CREATE COMPLEX EMERGENT BEHAVIOR.
              THE ANT FOLLOWS RULES TO NAVIGATE A GRID, CREATING INTRICATE PATTERNS OVER TIME.
            </p>
          </div>
          
          <div className="border-l-2 border-terminal-green/30 pl-4 py-1 my-4">
            <h3 className="text-terminal-green mb-2">&gt; BOIDS</h3>
            <p className="text-sm">
              A SIMULATION OF FLOCKING BEHAVIOR USING SIMPLE RULES: SEPARATION, ALIGNMENT,
              AND COHESION. DEMONSTRATES HOW COMPLEX GROUP BEHAVIORS EMERGE FROM LOCAL INTERACTIONS.
            </p>
          </div>
          
          <div className="border-l-2 border-terminal-green/30 pl-4 py-1 my-4">
            <h3 className="text-terminal-green mb-2">&gt; L-SYSTEMS</h3>
            <p className="text-sm">
              LINDENMAYER SYSTEMS ARE FORMAL GRAMMARS THAT CAN MODEL PLANT GROWTH AND
              FRACTAL GEOMETRY THROUGH RECURSIVE REWRITING RULES.
            </p>
          </div>
          
          <div className="border-l-2 border-terminal-green/30 pl-4 py-1 my-4">
            <h3 className="text-terminal-green mb-2">&gt; LENIA</h3>
            <p className="text-sm">
              A CONTINUOUS CELLULAR AUTOMATON THAT EXTENDS GAME OF LIFE WITH SMOOTH
              STATE TRANSITIONS, CREATING FLUID LIFE-LIKE PATTERNS.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-terminal-green/30 text-terminal-dim">
          <p className="text-sm">
            <span className="text-terminal-green">VERSION:</span> 1.0.0 | <span className="text-terminal-green">LAST UPDATED:</span> {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
