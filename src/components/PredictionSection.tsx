import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { DataMethod } from "./MethodSelector";

interface PredictionSectionProps {
  method: DataMethod;
  predictionFile: File | null;
  modelTrained: boolean;
}

interface PredictionResult {
  prediction: string;
  probabilities: { [key: string]: number };
  features?: string[];
}

export const PredictionSection = ({ method, predictionFile, modelTrained }: PredictionSectionProps) => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handlePredict = async () => {
    if (!predictionFile || !modelTrained) {
      toast.error("Carregue um arquivo e treine o modelo primeiro");
      return;
    }

    setIsPredicting(true);
    
    // Simulate prediction
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResult: PredictionResult = method === "light-curve" 
      ? {
          prediction: "Planet Candidate",
          probabilities: {
            "Non-Candidate": 0.15,
            "Candidate": 0.85
          },
          features: ["flux_mean: 1000.2", "flux_std: 45.3", "period: 3.5 days"]
        }
      : {
          prediction: "CONFIRMED",
          probabilities: {
            "FALSE POSITIVE": 0.05,
            "CANDIDATE": 0.25,
            "CONFIRMED": 0.70
          },
          features: ["stellar_magnitude: 12.3", "orbital_period: 5.2", "planet_radius: 1.1 R⊕"]
        };

    setResult(mockResult);
    setIsPredicting(false);
    toast.success("Predição concluída!");
  };

  const handleDownload = () => {
    if (!result) return;
    
    const csvContent = `Prediction,${Object.keys(result.probabilities).join(",")}\n${result.prediction},${Object.values(result.probabilities).join(",")}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prediction_results.csv";
    a.click();
    toast.success("Resultados baixados!");
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Predição</h2>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-card-glow border-secondary/30">
          <div className="text-center space-y-4">
            <Button
              onClick={handlePredict}
              disabled={!predictionFile || !modelTrained || isPredicting}
              size="lg"
              className="bg-gradient-stellar hover:shadow-glow-secondary transition-all"
            >
              {isPredicting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Fazer Predição
                </>
              )}
            </Button>
          </div>
        </Card>

        {result && (
          <Card className="p-6 bg-card-glow border-primary/30 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Resultado da Predição
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Classe Prevista:</p>
                <p className="text-2xl font-bold text-primary">{result.prediction}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-2">Probabilidades:</p>
                <div className="space-y-2">
                  {Object.entries(result.probabilities).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <span className="text-sm w-32">{key}:</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-stellar transition-all"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-16 text-right">
                        {(value * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {result.features && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold mb-2">Features Extraídas:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {result.features.map((feature, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        {feature}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={handleDownload}
                variant="outline"
                className="w-full border-secondary/50 hover:border-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resultados (CSV)
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};