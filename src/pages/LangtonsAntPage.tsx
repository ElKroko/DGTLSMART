import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { createLangtonsAntEngine, LangtonsAntConfig, defaultLangtonsAntConfig } from '../engines/LangtonsAntEngine';
import ControlPanel from '../components/ui/ControlPanel';
import Slider from '../components/ui/Slider';
import Toggle from '../components/ui/Toggle';
import Button from '../components/ui/Button';
import RadioGroup from '../components/ui/RadioGroup';
import ColorPicker from '../components/ui/ColorPicker';
import ExportPanel from '../components/ui/ExportPanel';

const LangtonsAntPage: React.FC = () => {
  const [config, setConfig] = useState<LangtonsAntConfig>({...defaultLangtonsAntConfig});
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepCount, setStepCount] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const p5Instance = useRef<any>(null);
  const engineRef = useRef<any>(null);

  // Actualizar la configuración del motor
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setConfig(config);
    }
  }, [config]);
    // Inicializar p5.js y el motor de Langton's Ant
  useEffect(() => {
    if (!containerRef.current) return;
    
    const sketch = (p: any) => {
      // Referencia al motor de Langton's Ant
      let engine: any;
      
      p.setup = () => {
        // Crear un canvas que se adapte al contenedor
        const width = containerRef.current?.clientWidth || 800;
        const height = Math.min(window.innerHeight * 0.6, width);
        
        const canvas = p.createCanvas(width, height);
        canvas.parent(containerRef.current!);
        
        if (canvasRef.current) {
          canvasRef.current = canvas.elt;
        }
        
        // Inicializar el motor
        engine = createLangtonsAntEngine(p, config);
        engineRef.current = engine;
        
        engine.setup(width, height);
      };
      
      p.draw = () => {
        engine.draw();
        setStepCount(engine.getStepCount());
      };
      
      // Manejar el redimensionamiento
      p.windowResized = () => {
        if (!containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = Math.min(window.innerHeight * 0.6, width);
        
        p.resizeCanvas(width, height);
        engine.reset(width, height);
      };
    };
    
    // Crear la instancia de p5
    p5Instance.current = new p5(sketch);
    
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []); // Remove config dependency to avoid remounting
  
  // Manejar el play/pause
  useEffect(() => {
    if (!engineRef.current) return;
    
    if (isPlaying) {
      engineRef.current.resume();
    } else {
      engineRef.current.pause();
    }
  }, [isPlaying]);
  
  // Manejar cambios en los controles
  const handleConfigChange = <K extends keyof LangtonsAntConfig>(key: K, value: LangtonsAntConfig[K]) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [key]: value
    }));
  };
  
  const handleReset = () => {
    if (!engineRef.current || !p5Instance.current) return;
    
    const width = containerRef.current?.clientWidth || 800;
    const height = Math.min(window.innerHeight * 0.6, width);
    
    engineRef.current.reset(width, height);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-terminal text-terminal-green tracking-wider uppercase">
          <span className="terminal-cursor">&gt;</span> LANGTON'S ANT
        </h1>
        <div className="w-24 h-px bg-terminal-green mb-4 opacity-50"></div>
        <p className="text-terminal-dim font-mono">
          EXPLORE THE EMERGENT BEHAVIOR OF THIS SIMPLE CELLULAR AUTOMATON.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border border-terminal-green/50 shadow-terminal overflow-hidden mb-6 bg-black p-2">
            <div
              ref={containerRef}
              className="w-full aspect-square relative flex items-center justify-center border border-terminal-green/30"
            >
              <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                  <div className="border border-terminal-green p-4 shadow-terminal text-center bg-black">
                    <p className="text-lg text-terminal-highlight font-terminal mb-4 uppercase">
                      <span className="animate-pulse">[ PAUSED ]</span>
                    </p>
                    <Button
                      onClick={() => setIsPlaying(true)}
                      variant="primary"
                    >
                      START PROGRAM
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6 font-mono">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="primary"
              icon={
                isPlaying ? (
                  <span className="mr-1">||</span>
                ) : (
                  <span className="mr-1">▶</span>
                )
              }
            >
              {isPlaying ? 'PAUSE' : 'CONTINUE'}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="secondary"
              icon={
                <span className="mr-1">↻</span>
              }
            >
              RESET
            </Button>
          </div>
          
          <div className="font-mono text-sm text-terminal-green border border-terminal-green/30 p-2 mb-8 inline-block">
            <span className="text-terminal-dim">STEPS:</span> {stepCount.toString().padStart(8, '0')}
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <ControlPanel title="Parameters">
            <Slider
              label="Cell Size"
              value={config.cellSize}
              min={2}
              max={20}
              onChange={(value) => handleConfigChange('cellSize', value)}
            />
            
            <Slider
              label="Speed"
              value={config.speed}
              min={1}
              max={20}
              onChange={(value) => handleConfigChange('speed', value)}
            />
            
            <RadioGroup
              label="Color Mode"
              name="colorMode"
              value={config.colorMode}
              onChange={(value) => handleConfigChange('colorMode', value as LangtonsAntConfig['colorMode'])}
              options={[
                { value: 'binary', label: 'Binary' },
                { value: 'gradient', label: 'Gradient' },
                { value: 'rainbow', label: 'Rainbow' }
              ]}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <ColorPicker
                label="Ant Color"
                color={config.antColor}
                onChange={(value) => handleConfigChange('antColor', value)}
              />
              
              <ColorPicker
                label="Cell Color"
                color={config.cellActiveColor}
                onChange={(value) => handleConfigChange('cellActiveColor', value)}
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm text-terminal-green mb-2 tracking-wide">&gt; Rules</label>
              <input
                type="text"
                value={config.rules}
                onChange={(e) => handleConfigChange('rules', e.target.value.toUpperCase().replace(/[^RL]/g, ''))}
                placeholder="RL"
                className="w-full px-3 py-2 bg-black border border-terminal-green/50 text-terminal-green font-mono text-center tracking-widest focus:outline-none focus:border-terminal-green"
              />
              <p className="text-xs text-terminal-dim">
                USE R TO TURN RIGHT, L TO TURN LEFT.
                EXAMPLE: "RL" IS THE CLASSIC LANGTON PATTERN.
              </p>
            </div>
            
            <Toggle
              label="Wrap Edges"
              isChecked={config.wrap}
              onChange={(value) => handleConfigChange('wrap', value)}
            />
            
            <Toggle
              label="Multiple Ants"
              isChecked={config.multipleAnts}
              onChange={(value) => handleConfigChange('multipleAnts', value)}
            />
            
            {config.multipleAnts && (
              <Slider
                label="Number of Ants"
                value={config.numberOfAnts}
                min={1}
                max={10}
                onChange={(value) => handleConfigChange('numberOfAnts', value)}
              />
            )}
          </ControlPanel>
          
          <ExportPanel sketchRef={canvasRef} title="EXPORT PROGRAM" />
        </div>
      </div>
    </div>
  );
};

export default LangtonsAntPage;
