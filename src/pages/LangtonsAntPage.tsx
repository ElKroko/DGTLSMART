import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { Link } from 'react-router-dom';
import { createLangtonsAntEngine, LangtonsAntConfig, defaultLangtonsAntConfig } from '../engines/LangtonsAntEngine';
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
  const [showControls, setShowControls] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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
    // Evitar inicialización múltiple
    if (isInitialized || !containerRef.current) return;
    
    const sketch = (p: any) => {
      let engine: any;

      p.setup = () => {
        // Usar el tamaño del contenedor
        const width = containerRef.current?.clientWidth || window.innerWidth - 32;
        const height = containerRef.current?.clientHeight || window.innerHeight - 32;
        
        // Usar P2D renderer explícitamente para evitar problemas con WebGL
        const canvas = p.createCanvas(width, height, p.P2D);
        canvas.parent(containerRef.current!);
        canvasRef.current = canvas.elt;
        
        // Inicializar el motor
        engine = createLangtonsAntEngine(p, config);
        engineRef.current = engine;
        
        engine.setup(width, height);
      };
      
      p.draw = () => {
        engine.draw();
        // Optimización: actualizar el contador de pasos solo cuando cambia
        // para evitar actualizaciones de estado innecesarias
        const currentStepCount = engine.getStepCount();
        if (currentStepCount !== stepCount) {
          setStepCount(currentStepCount);
        }
      };
      
      // Manejar el redimensionamiento
      p.windowResized = () => {
        if (!containerRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        p.resizeCanvas(width, height);
        engine.reset(width, height);
      };
    };
    
    // Crear la instancia de p5
    p5Instance.current = new p5(sketch);
    setIsInitialized(true);
    
    // Cleanup al desmontar
    return () => {
      if (p5Instance.current) {
        try {
          p5Instance.current.remove();
        } catch (e) {
          console.warn("Error removing p5 instance:", e);
        }
        p5Instance.current = null;
      }
      engineRef.current = null;
      canvasRef.current = null;
      setIsInitialized(false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);
  
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
    if (!engineRef.current || !containerRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    engineRef.current.reset(width, height);
  };

  const toggleControlsPanel = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden z-[40]">
      {/* Botón de regreso a la navegación principal */}
      <div className="absolute top-4 left-4 z-[60]">
        <Link 
          to="/" 
          className="bg-black border border-terminal-green p-2 text-terminal-green hover:bg-terminal-green/20 transition-colors flex items-center space-x-2 text-xs"
        >
          <span>&lt;&lt;</span>
          <span>VOLVER</span>
        </Link>
      </div>
      
      {/* Contenedor para el canvas de p5.js */}
      <div 
        ref={containerRef} 
        className="absolute inset-0"
        style={{ padding: '8px' }}
      />
      
      {/* Panel de control flotante - esquina superior derecha */}
      <div 
        className="fixed top-16 right-4 z-[50] transition-all duration-300 ease-in-out"
        style={{ 
          maxWidth: '300px', 
          transform: showControls ? 'translateX(0)' : 'translateX(calc(100% - 36px))'
        }}
      >
        <div 
          className="absolute -left-6 top-2 bg-black border border-terminal-green px-0.5 py-1 cursor-pointer text-terminal-green hover:bg-terminal-green/20 transition-colors text-xs"
          onClick={toggleControlsPanel}
        >
          {showControls ? '>' : '<'}
        </div>
        
        <div className="bg-black bg-opacity-80 border border-terminal-green/70 shadow-terminal p-3 backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-terminal-green text-sm font-terminal uppercase">{"// PARAMETERS"}</h2>
            <span className="text-xs text-terminal-dim">v1.0</span>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3 text-xs">
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
            
            <div className="grid grid-cols-2 gap-2">
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
            
            <div className="space-y-2">
              <label className="block text-xs text-terminal-green tracking-wide">&gt; Rules</label>
              <input
                type="text"
                value={config.rules}
                onChange={(e) => handleConfigChange('rules', e.target.value.toUpperCase().replace(/[^RL]/g, ''))}
                placeholder="RL"
                className="w-full px-2 py-1 bg-black border border-terminal-green/50 text-terminal-green font-mono text-center tracking-widest focus:outline-none focus:border-terminal-green text-sm"
              />
              <p className="text-xs text-terminal-dim">
                R=RIGHT, L=LEFT. DEFAULT: "RL"
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
            
            <ExportPanel sketchRef={canvasRef} title="EXPORT" />
          </div>
        </div>
      </div>
      
      {/* Panel de control inferior */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-80 border border-terminal-green/70 p-2 shadow-terminal backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant="primary"
            icon={isPlaying ? <span className="font-mono">||</span> : <span className="font-mono">▶</span>}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </Button>
          
          <Button
            onClick={handleReset}
            variant="secondary"
            icon={<span className="font-mono">↻</span>}
          >
            RESET
          </Button>
          
          <div className="font-mono text-terminal-green border-l border-terminal-green/30 pl-6 ml-2">
            <span className="text-terminal-dim mr-2">STEPS:</span> 
            <span className="text-terminal-highlight">{stepCount.toString().padStart(8, '0')}</span>
          </div>
        </div>
      </div>
      
      {/* Scanlines para mantener el efecto CRT */}
      <div className="scanlines fixed inset-0 z-[70] pointer-events-none"></div>
    </div>
  );
};

export default LangtonsAntPage;
