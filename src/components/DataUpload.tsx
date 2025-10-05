import { useRef } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { DataMethod } from "./MethodSelector";

interface DataUploadProps {
  method: DataMethod;
  trainingFiles: File[];
  onTrainingFilesChange: (files: File[]) => void;
  predictionFile: File | null;
  onPredictionFileChange: (file: File | null) => void;
}

export const DataUpload = ({
  method,
  trainingFiles,
  onTrainingFilesChange,
  predictionFile,
  onPredictionFileChange,
}: DataUploadProps) => {
  const trainingInputRef = useRef<HTMLInputElement>(null);
  const predictionInputRef = useRef<HTMLInputElement>(null);

  const handleTrainingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onTrainingFilesChange(Array.from(e.target.files));
    }
  };

  const handlePredictionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPredictionFileChange(e.target.files[0]);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Upload de Dados</h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Training Data */}
        <Card className="p-6 border-primary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Dados de Treino
          </h3>
          
          <Alert className="mb-4 bg-card-glow border-primary/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {method === "light-curve" ? (
                <>
                  <p className="font-semibold mb-1">Curva de Luz requer 2 arquivos CSV:</p>
                  <p>• <strong>curves.csv:</strong> curve_id, time, flux</p>
                  <p>• <strong>labels.csv:</strong> curve_id, label (0 ou 1)</p>
                </>
              ) : (
                <>
                  <p className="font-semibold mb-1">Catálogo requer 1 arquivo CSV:</p>
                  <p>• Arquivo do NASA Exoplanet Archive</p>
                  <p>• Linhas comentadas (#) são ignoradas</p>
                </>
              )}
            </AlertDescription>
          </Alert>
          
          <input
            ref={trainingInputRef}
            type="file"
            accept=".csv"
            multiple={method === "light-curve"}
            onChange={handleTrainingUpload}
            className="hidden"
          />
          
          <Button
            onClick={() => trainingInputRef.current?.click()}
            className="w-full mb-3 bg-gradient-stellar hover:shadow-glow-primary transition-all"
          >
            <Upload className="w-4 h-4 mr-2" />
            Selecionar Arquivo{method === "light-curve" ? "s" : ""}
          </Button>
          
          {trainingFiles.length > 0 && (
            <div className="text-sm space-y-1">
              {trainingFiles.map((file, idx) => (
                <p key={idx} className="text-muted-foreground truncate">
                  ✓ {file.name}
                </p>
              ))}
            </div>
          )}
        </Card>
        
        {/* Prediction Data */}
        <Card className="p-6 border-secondary/30">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            Dados para Predição
          </h3>
          
          <Alert className="mb-4 bg-card-glow border-secondary/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {method === "light-curve" ? (
                <>
                  <p className="font-semibold mb-1">Arquivo CSV com:</p>
                  <p>• time, flux (sem labels)</p>
                </>
              ) : (
                <>
                  <p className="font-semibold mb-1">Arquivo CSV com:</p>
                  <p>• Mesmas colunas de features do treino</p>
                  <p>• Sem coluna de rótulos</p>
                </>
              )}
            </AlertDescription>
          </Alert>
          
          <input
            ref={predictionInputRef}
            type="file"
            accept=".csv"
            onChange={handlePredictionUpload}
            className="hidden"
          />
          
          <Button
            onClick={() => predictionInputRef.current?.click()}
            variant="outline"
            className="w-full mb-3 border-secondary/50 hover:border-secondary hover:bg-secondary/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            Selecionar Arquivo
          </Button>
          
          {predictionFile && (
            <p className="text-sm text-muted-foreground truncate">
              ✓ {predictionFile.name}
            </p>
          )}
        </Card>
      </div>
    </section>
  );
};