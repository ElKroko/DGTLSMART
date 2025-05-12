import React from 'react';
import Button from './Button';
import { saveAs } from 'file-saver';

interface ExportPanelProps {
  sketchRef: React.RefObject<HTMLCanvasElement | null>;
  title?: string;
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  sketchRef,
  title = "Exportar",
}) => {
  const handleExportPNG = () => {
    if (!sketchRef.current) return;
    
    try {
      sketchRef.current.toBlob((blob) => {
        if (blob) {
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          saveAs(blob, `digitalismo-export-${timestamp}.png`);
        }
      });
    } catch (error) {
      console.error("Error exporting canvas:", error);
    }
  };
  return (
    <div className="border border-terminal-green/50 bg-black p-4 shadow-terminal font-mono">
      <div className="border-b border-terminal-green/30 pb-2 mb-4">
        <h3 className="text-lg uppercase tracking-wider text-terminal-green font-terminal">&gt; {title}</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleExportPNG}
          variant="outline"
          icon={
            <span className="mr-2 font-mono">[↓]</span>
          }
        >
          EXPORT.PNG
        </Button>
        <p className="text-xs text-terminal-dim mt-2">
          <span className="text-terminal-green">INFO:</span> Generated image will be saved in your downloads folder
        </p>
      </div>
    </div>
  );
};

export default ExportPanel;
