import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MethodSelector, DataMethod } from "@/components/MethodSelector";
import { DataUpload } from "@/components/DataUpload";
import { ModelConfig, Algorithm } from "@/components/ModelConfig";
import { TrainingSection } from "@/components/TrainingSection";
import { MetricsDisplay } from "@/components/MetricsDisplay";
import { PredictionSection } from "@/components/PredictionSection";
import { ModelPersistence } from "@/components/ModelPersistence";
import { DataPreview } from "@/components/DataPreview";
import { MetricsAnalysis } from "@/components/MetricsAnalysis";
import { ColumnAnalysis } from "@/components/ColumnAnalysis";
import { ComparisonView } from "@/components/ComparisonView";
import { ProcessLog } from "@/components/ProcessLog";

const Index = () => {
  const [method, setMethod] = useState<DataMethod>("light-curve");
  const [algorithm, setAlgorithm] = useState<Algorithm>("lightgbm");
  const [trainingFiles, setTrainingFiles] = useState<File[]>([]);
  const [predictionFile, setPredictionFile] = useState<File | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [logs, setLogs] = useState<any[]>([]);

  const canTrain = trainingFiles.length > 0;
  const modelTrained = metrics !== null;

  const handleFilesChange = async (files: File[]) => {
    setTrainingFiles(files);
    setLogs(prev => [...prev, { type: "info", message: `${files.length} arquivo(s) carregado(s)`, timestamp: new Date() }]);
    
    // Simular processamento e extração de dados
    if (files.length > 0) {
      const mockData = Array.from({ length: 100 }, (_, i) => ({
        time: i * 0.1,
        flux: 1 + Math.sin(i / 10) * 0.1 + (Math.random() - 0.5) * 0.02
      }));
      setPreviewData(mockData);
      setColumns(["time", "flux", "flux_normalized", "Flux_Corrected", "error"]);
      setLogs(prev => [...prev, { type: "success", message: "Dados pré-processados com sucesso", timestamp: new Date() }]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MethodSelector selectedMethod={method} onMethodChange={setMethod} />
      <DataUpload
        method={method}
        trainingFiles={trainingFiles}
        onTrainingFilesChange={handleFilesChange}
        predictionFile={predictionFile}
        onPredictionFileChange={setPredictionFile}
      />
      
      <DataPreview data={previewData} title="Pré-visualização da Curva de Luz" />
      <MetricsAnalysis data={previewData} />
      <ColumnAnalysis 
        columns={columns}
        onRename={(old, newName) => {
          setLogs(prev => [...prev, { type: "info", message: `Coluna "${old}" renomeada para "${newName}"`, timestamp: new Date() }]);
        }}
        onMerge={(cols, newName) => {
          setLogs(prev => [...prev, { type: "success", message: `Colunas [${cols.join(", ")}] mescladas em "${newName}"`, timestamp: new Date() }]);
        }}
      />
      <ComparisonView data1={previewData} data2={previewData} />
      <ProcessLog logs={logs} />
      
      <ModelConfig algorithm={algorithm} onAlgorithmChange={setAlgorithm} />
      <TrainingSection canTrain={canTrain} onTrainComplete={setMetrics} />
      <MetricsDisplay metrics={metrics} />
      <PredictionSection 
        method={method} 
        predictionFile={predictionFile} 
        modelTrained={modelTrained}
      />
      <ModelPersistence modelTrained={modelTrained} />
      
      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ExoPlanet Finder © 2025 - Plataforma de Detecção de Exoplanetas com IA</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;