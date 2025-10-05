import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MethodSelector, DataMethod } from "@/components/MethodSelector";
import { DataUpload } from "@/components/DataUpload";
import { ModelConfig, Algorithm } from "@/components/ModelConfig";
import { TrainingSection } from "@/components/TrainingSection";
import { MetricsDisplay } from "@/components/MetricsDisplay";
import { PredictionSection } from "@/components/PredictionSection";
import { ModelPersistence } from "@/components/ModelPersistence";

const Index = () => {
  const [method, setMethod] = useState<DataMethod>("light-curve");
  const [algorithm, setAlgorithm] = useState<Algorithm>("lightgbm");
  const [trainingFiles, setTrainingFiles] = useState<File[]>([]);
  const [predictionFile, setPredictionFile] = useState<File | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  const canTrain = trainingFiles.length > 0;
  const modelTrained = metrics !== null;

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MethodSelector selectedMethod={method} onMethodChange={setMethod} />
      <DataUpload
        method={method}
        trainingFiles={trainingFiles}
        onTrainingFilesChange={setTrainingFiles}
        predictionFile={predictionFile}
        onPredictionFileChange={setPredictionFile}
      />
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