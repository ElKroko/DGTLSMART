import React from 'react';
import Button from '../components/ui/Button';
import Slider from '../components/ui/Slider';
import Toggle from '../components/ui/Toggle';

const DemoPage: React.FC = () => {
  const [sliderValue, setSliderValue] = React.useState(50);
  const [toggleValue, setToggleValue] = React.useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Componentes UI de Digitalismo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Botones</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg mb-2">Primario</h3>
              <Button onClick={() => console.log('Primario')}>Botón Primario</Button>
            </div>
            <div>
              <h3 className="text-lg mb-2">Secundario</h3>
              <Button onClick={() => console.log('Secundario')} variant="secondary">Botón Secundario</Button>
            </div>
            <div>
              <h3 className="text-lg mb-2">Outline</h3>
              <Button onClick={() => console.log('Outline')} variant="outline">Botón Outline</Button>
            </div>
            <div>
              <h3 className="text-lg mb-2">Con Icono</h3>
              <Button 
                onClick={() => console.log('Con Icono')}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                }
              >
                Botón con Icono
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-surface rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Controles</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg mb-2">Slider</h3>
              <Slider 
                label="Control de valor" 
                value={sliderValue} 
                min={0} 
                max={100} 
                onChange={setSliderValue}
              />
            </div>
            <div>
              <h3 className="text-lg mb-2">Toggle</h3>
              <Toggle 
                label="Activar/Desactivar" 
                isChecked={toggleValue} 
                onChange={setToggleValue}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-surface/50 rounded-lg text-center">
        <p>Estos componentes muestran la estética digital de Digitalismo.</p>
        <p className="text-accent mt-2">Explora los motores generativos para ver más.</p>
      </div>
    </div>
  );
};

export default DemoPage;
