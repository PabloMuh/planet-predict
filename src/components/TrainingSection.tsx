import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface TrainingSectionProps {
  canTrain: boolean;
  onTrainComplete: (metrics: any) => void;
}

export const TrainingSection = ({ canTrain, onTrainComplete }: TrainingSectionProps) => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");

  const handleTrain = async () => {
    if (!canTrain) {
      toast.error("Por favor, faça upload dos dados de treino primeiro");
      return;
    }

    setIsTraining(true);
    setProgress(0);
    setStatus("Iniciando treinamento...");

    // Simulate training progress
    const steps = [
      { progress: 20, status: "Carregando dados..." },
      { progress: 40, status: "Extraindo features..." },
      { progress: 60, status: "Treinando modelo..." },
      { progress: 80, status: "Validando resultados..." },
      { progress: 100, status: "Treinamento concluído!" },
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      setStatus(step.status);
    }

    // Mock metrics
    const mockMetrics = {
      rocAuc: 0.94,
      prAuc: 0.91,
      precision: 0.88,
      recall: 0.85,
      f1Score: 0.86,
    };

    onTrainComplete(mockMetrics);
    toast.success("Modelo treinado com sucesso!");
    
    setTimeout(() => {
      setIsTraining(false);
      setProgress(0);
      setStatus("");
    }, 2000);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Treinamento do Modelo</h2>
      
      <Card className="max-w-2xl mx-auto p-8 bg-card-glow border-primary/30">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            {isTraining ? (
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            ) : progress === 100 ? (
              <CheckCircle2 className="w-8 h-8 text-primary" />
            ) : (
              <Brain className="w-8 h-8 text-primary" />
            )}
          </div>
          
          {isTraining && (
            <div className="space-y-3">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground">{status}</p>
            </div>
          )}
          
          <Button
            onClick={handleTrain}
            disabled={!canTrain || isTraining}
            size="lg"
            className="bg-gradient-stellar hover:shadow-glow-primary transition-all text-lg px-8 py-6"
          >
            {isTraining ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Treinando...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5 mr-2" />
                Treinar Modelo
              </>
            )}
          </Button>
          
          {!canTrain && (
            <p className="text-sm text-muted-foreground">
              Faça upload dos dados de treino para começar
            </p>
          )}
        </div>
      </Card>
    </section>
  );
};