import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { createLangtonsAntEngine, defaultLangtonsAntConfig, LangtonsAntConfig } from '../engines/LangtonsAntEngine';
import Slider from '../components/ui/Slider';
import Toggle from '../components/ui/Toggle';
import RadioGroup from '../components/ui/RadioGroup';
import ColorPicker from '../components/ui/ColorPicker';

// Asegurarse de que el archivo se trata como un módulo ES
export {};

const LangtonsAntPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<LangtonsAntConfig>(defaultLangtonsAntConfig);
  const [p5Instance, setP5Instance] = useState<any>(null);
  const [engine, setEngine] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpiar instancia previa
    if (p5Instance) {
      p5Instance.remove();
    }

    // Crear nueva instancia
    const newP5 = new p5((p: any) => {
      let engine: any;
      let currentStepCount = 0;

      p.setup = () => {
        // Obtener el tamaño del contenedor
        const containerWidth = containerRef.current?.clientWidth || 800;
        const containerHeight = containerRef.current?.clientHeight || 600;
        
        // Crear canvas con el tamaño del contenedor
        const canvas = p.createCanvas(containerWidth, containerHeight, p.P2D);
        // Aplicar estilo al canvas para que ocupe toda la columna izquierda
        const canvasElem = canvas.elt as HTMLCanvasElement;
        if (canvasElem) {
          canvasElem.style.width = '100%';
          canvasElem.style.height = '100%';
        }

        // Inicializar motor
        engine = createLangtonsAntEngine(p, config);
        
        // Asegurarnos de que el engine se creó correctamente
        if (engine && typeof engine.setup === 'function') {
          // Configurar motor
          engine.setup(containerWidth, containerHeight);
          // Actualizar el estado con el engine inicializado
          setEngine(engine);
        } else {
          console.error("Failed to initialize Langton's Ant engine");
        }
      };

      p.draw = () => {
        if (!engine) return;
        
        try {
          engine.draw();
          
          // Actualizar el contador solo cada 10 frames para evitar actualizaciones frecuentes
          if (p.frameCount % 10 === 0 && engine && typeof engine.getStepCount === 'function') {
            currentStepCount = engine.getStepCount();
            setStepCount(currentStepCount);
          }
        } catch (error) {
          console.error("Error in draw function:", error);
        }
      };

      p.windowResized = () => {
        if (!containerRef.current) return;
        
        // Redimensionar canvas cuando cambia el tamaño de la ventana
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        p.resizeCanvas(containerWidth, containerHeight);
        if (engine) {
          engine.reset(containerWidth, containerHeight);
        }
      };
    }, containerRef.current);

    setP5Instance(newP5);

    // Limpieza al desmontar
    return () => {
      if (newP5) {
        newP5.remove();
      }
    };
  }, [config, p5Instance]);

  // Efecto para actualizar config cuando cambia
  useEffect(() => {
    if (engine) {
      engine.setConfig(config);
    }
  }, [config, engine]);

  // Efecto para pausar/reanudar cuando cambia isPaused
  useEffect(() => {
    if (!engine) return;

    if (isPaused) {
      engine.pause();
    } else {
      engine.resume();
    }
  }, [isPaused, engine]);

  const handleReset = () => {
    if (engine && containerRef.current) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      engine.reset(width, height);
      setStepCount(0);
    }
  };

  const handleConfigChange = (key: keyof LangtonsAntConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex h-full">
      <div className="flex-grow relative">
        {/* Canvas container */}
        <div ref={containerRef} className="w-full h-full" />
      </div>
      <div className="w-72 h-full bg-black border-l border-terminal-green/30 p-3 overflow-y-auto">
        {/* Controles */}
        <div className="flex flex-col gap-4">
          <div className="text-terminal-green text-xl font-vt323">Langton's Ant</div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-4 py-1 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-1 bg-terminal-green/20 hover:bg-terminal-green/30 text-terminal-green"
            >
              Reset
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="text-terminal-green text-sm">Steps: {stepCount}</div>
          </div>
          
          <div className="flex flex-col gap-1">
            <Slider
              label="Cell Size"
              min={2}
              max={20}
              step={1}
              value={config.cellSize}
              onChange={(value) => handleConfigChange('cellSize', value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <Slider
              label="Speed"
              min={1}
              max={50}
              step={1}
              value={config.speed}
              onChange={(value) => handleConfigChange('speed', value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-terminal-green text-sm">Rules (e.g. RL, RLR, etc.)</label>
            <input
              type="text"
              value={config.rules}
              onChange={(e) => {
                // Solo permitir 'R' y 'L' como caracteres
                const filtered = e.target.value.toUpperCase().replace(/[^RL]/g, '');
                handleConfigChange('rules', filtered);
              }}
              className="bg-black border border-terminal-green/30 px-2 py-1 text-terminal-green"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <RadioGroup
              label="Color Mode"
              name="colorMode"
              options={[
                { value: 'binary', label: 'Binary' },
                { value: 'gradient', label: 'Gradient' },
                { value: 'rainbow', label: 'Rainbow' }
              ]}
              value={config.colorMode}
              onChange={(value) => handleConfigChange('colorMode', value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <ColorPicker
              label="Ant Color"
              color={config.antColor}
              onChange={(value) => handleConfigChange('antColor', value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <ColorPicker
              label="Background Color"
              color={config.backgroundColor}
              onChange={(value) => handleConfigChange('backgroundColor', value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <ColorPicker
              label="Cell Active Color"
              color={config.cellActiveColor}
              onChange={(value) => handleConfigChange('cellActiveColor', value)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <Toggle
              label="Wrap edges"
              isChecked={config.wrap}
              onChange={(checked) => handleConfigChange('wrap', checked)}
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <Toggle
              label="Multiple ants"
              isChecked={config.multipleAnts}
              onChange={(checked) => handleConfigChange('multipleAnts', checked)}
            />
          </div>
          
          {config.multipleAnts && (
            <div className="flex flex-col gap-1">
              <Slider
                label="Number of ants"
                min={1}
                max={20}
                step={1}
                value={config.numberOfAnts}
                onChange={(value) => handleConfigChange('numberOfAnts', value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Exportación explícita del componente
export default LangtonsAntPage;
