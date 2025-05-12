// Definición del motor Langton's Ant
export interface LangtonsAntConfig {
  cellSize: number;
  speed: number;
  colorMode: 'binary' | 'gradient' | 'rainbow';
  antColor: string;
  backgroundColor: string;
  cellActiveColor: string;
  rules: string;
  wrap: boolean;
  multipleAnts: boolean;
  numberOfAnts: number;
}

export interface Ant {
  x: number;
  y: number;
  direction: number; // 0: up, 1: right, 2: down, 3: left
}

export interface Grid {
  cells: number[][];
  width: number;
  height: number;
}

// Configuración por defecto
export const defaultLangtonsAntConfig: LangtonsAntConfig = {
  cellSize: 10,
  speed: 5,
  colorMode: 'binary',
  antColor: '#FF5733',
  backgroundColor: '#0f0f16',
  cellActiveColor: '#6366f1',
  rules: 'RL', // R = Turn right, L = Turn left
  wrap: true,
  multipleAnts: false,
  numberOfAnts: 1,
};

export const createLangtonsAntEngine = (p5: any, config: LangtonsAntConfig) => {
  let grid: Grid;
  let ants: Ant[] = [];
  let isPaused = false;
  let stepCount = 0;
  
  const initGrid = (width: number, height: number) => {
    const cols = Math.floor(width / config.cellSize);
    const rows = Math.floor(height / config.cellSize);
    
    // Inicializar la cuadrícula con ceros (celdas inactivas)
    const cells = Array(cols).fill(0).map(() => Array(rows).fill(0));
    
    return {
      cells,
      width: cols,
      height: rows
    };
  };
  
  const initAnts = () => {
    ants = [];
    const centerX = Math.floor(grid.width / 2);
    const centerY = Math.floor(grid.height / 2);
    
    // Crear la hormiga principal en el centro
    ants.push({
      x: centerX,
      y: centerY,
      direction: 0
    });
    
    // Si está habilitado el modo múltiples hormigas, crear más
    if (config.multipleAnts && config.numberOfAnts > 1) {
      for (let i = 1; i < config.numberOfAnts; i++) {
        // Distribuir las hormigas aleatoriamente
        const x = Math.floor(Math.random() * grid.width);
        const y = Math.floor(Math.random() * grid.height);
        ants.push({
          x,
          y,
          direction: Math.floor(Math.random() * 4)
        });
      }
    }
  };
  
  const setup = (width: number, height: number) => {
    grid = initGrid(width, height);
    initAnts();
    stepCount = 0;
  };
  
  const getCellColor = (cellState: number) => {
    switch (config.colorMode) {
      case 'binary':
        return cellState > 0 ? config.cellActiveColor : config.backgroundColor;
      case 'gradient':
        const hue = (cellState * 10) % 360;
        return p5.color(`hsl(${hue}, 80%, 60%)`);
      case 'rainbow':
        const rainbowHue = (cellState * 30) % 360;
        return p5.color(`hsl(${rainbowHue}, 100%, 50%)`);
      default:
        return config.cellActiveColor;
    }
  };
  
  const updateAnts = () => {
    if (isPaused) return;
    
    // Actualizar cada hormiga según las reglas configuradas
    for (let a = 0; a < ants.length; a++) {
      const ant = ants[a];
      
      // Obtener el estado de la celda actual
      const cellState = grid.cells[ant.x][ant.y];
      
      // Determinar qué hacer según las reglas (índice de la regla = estado % length)
      const ruleIndex = cellState % config.rules.length;
      const rule = config.rules[ruleIndex];
      
      // Cambiar dirección según la regla
      if (rule === 'R') {
        ant.direction = (ant.direction + 1) % 4;
      } else if (rule === 'L') {
        ant.direction = (ant.direction + 3) % 4; // +3 es lo mismo que -1 en módulo 4
      }
      
      // Incrementar el estado de la celda
      grid.cells[ant.x][ant.y] = (cellState + 1) % (config.rules.length + 1);
      
      // Mover la hormiga
      switch (ant.direction) {
        case 0: // Up
          ant.y--;
          break;
        case 1: // Right
          ant.x++;
          break;
        case 2: // Down
          ant.y++;
          break;
        case 3: // Left
          ant.x--;
          break;
      }
      
      // Aplicar envoltorio si está habilitado
      if (config.wrap) {
        if (ant.x < 0) ant.x = grid.width - 1;
        if (ant.x >= grid.width) ant.x = 0;
        if (ant.y < 0) ant.y = grid.height - 1;
        if (ant.y >= grid.height) ant.y = 0;
      } else {
        // Si no hay envoltorio y la hormiga sale de los límites, reiniciarla
        if (ant.x < 0 || ant.x >= grid.width || ant.y < 0 || ant.y >= grid.height) {
          // Reiniciar esta hormiga al centro
          ant.x = Math.floor(grid.width / 2);
          ant.y = Math.floor(grid.height / 2);
          ant.direction = Math.floor(Math.random() * 4);
        }
      }
    }
    
    stepCount++;
  };
  
  const draw = () => {
    p5.background(config.backgroundColor);
    
    // Dibujar las celdas
    for (let x = 0; x < grid.width; x++) {
      for (let y = 0; y < grid.height; y++) {
        if (grid.cells[x][y] > 0) {
          p5.fill(getCellColor(grid.cells[x][y]));
          p5.stroke(p5.color(0, 0, 0, 30));
          p5.rect(
            x * config.cellSize, 
            y * config.cellSize, 
            config.cellSize, 
            config.cellSize
          );
        }
      }
    }
    
    // Dibujar las hormigas
    p5.fill(config.antColor);
    p5.noStroke();
    
    for (let ant of ants) {
      p5.push();
      p5.translate(
        ant.x * config.cellSize + config.cellSize / 2, 
        ant.y * config.cellSize + config.cellSize / 2
      );
      p5.rotate(p5.radians(ant.direction * 90));
      
      // Dibujar una hormiga con forma de triángulo
      p5.triangle(
        0, -config.cellSize / 2,
        -config.cellSize / 3, config.cellSize / 3,
        config.cellSize / 3, config.cellSize / 3
      );
      p5.pop();
    }
    
    // Ejecutar múltiples pasos según la configuración de velocidad
    for (let i = 0; i < config.speed; i++) {
      updateAnts();
    }
  };
  
  // Métodos para controlar el motor
  const pause = () => {
    isPaused = true;
  };
  
  const resume = () => {
    isPaused = false;
  };
  
  const reset = (width: number, height: number) => {
    setup(width, height);
  };
  
  const getStepCount = () => {
    return stepCount;
  };
  
  const setConfig = (newConfig: Partial<LangtonsAntConfig>) => {
    Object.assign(config, newConfig);
  };
  
  return {
    setup,
    draw,
    pause,
    resume,
    reset,
    getStepCount,
    setConfig
  };
};
