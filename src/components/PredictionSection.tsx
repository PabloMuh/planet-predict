import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import type { DataMethod } from "./MethodSelector";

interface PredictionSectionProps {
  method: DataMethod;
  predictionFile: File | null;
  modelTrained: boolean;
}

interface PlanetPrediction {
  name: string;
  prediction: string;
  habitable: boolean;
}

export const PredictionSection = ({ method, predictionFile, modelTrained }: PredictionSectionProps) => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [results, setResults] = useState<PlanetPrediction[] | null>(null);

  const handlePredict = async () => {
    if (!predictionFile || !modelTrained) {
      toast.error("Carregue um arquivo e treine o modelo primeiro");
      return;
    }

    setIsPredicting(true);
    
    // Simulate prediction
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: PlanetPrediction[] = [
      { name: "Kepler-186f", prediction: "CONFIRMED", habitable: true },
      { name: "Proxima Centauri b", prediction: "CONFIRMED", habitable: true },
      { name: "TRAPPIST-1h", prediction: "CANDIDATE", habitable: false },
      { name: "Gliese 581g", prediction: "CANDIDATE", habitable: false },
      { name: "HD 209458 b", prediction: "FALSE POSITIVE", habitable: false },
    ];

    setResults(mockResults);
    setIsPredicting(false);
    toast.success("Predição concluída!");
  };

  const handleDownload = () => {
    if (!results) return;
    
    const headers = "Planet Name,Prediction,Habitable\n";
    const csvRows = results.map(r => `${r.name},${r.prediction},${r.habitable}`).join("\n");
    const csvContent = headers + csvRows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prediction_list_results.csv";
    a.click();
    toast.success("Resultados baixados!");
  };

  const getPredictionClass = (prediction: string, habitable: boolean) => {
    if (habitable) {
      return "text-green-400 border-green-500/30 bg-green-500/10";
    }
    switch (prediction) {
      case "CONFIRMED":
        return "text-primary border-primary/30 bg-primary/10";
      case "CANDIDATE":
        return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "FALSE POSITIVE":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      default:
        return "text-muted-foreground border-border bg-muted/30";
    }
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

        {results && (
          <Card className="p-6 bg-card-glow border-primary/30 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Resultados da Predição
              </h3>

              <Button
                onClick={handleDownload}
                variant="outline"
                size="sm"
                className="border-secondary/50 hover:border-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download (CSV)
              </Button>
            </div>
            
            <div className="space-y-3">
              <TooltipProvider>
                {results.map((planet, idx) => (
                  <Card key={idx} className="p-4 flex justify-between items-center bg-muted/20">
                    <p className="font-semibold">{planet.name}</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPredictionClass(planet.prediction, planet.habitable)}`}>
                          {planet.habitable ? "VIDA POSSÍVEL" : planet.prediction}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{planet.habitable ? "Este exoplaneta orbita dentro da zona habitável de sua estrela." : "Este exoplaneta orbita fora da zona habitável de sua estrela."}</p>
                      </TooltipContent>
                    </Tooltip>
                  </Card>
                ))}
              </TooltipProvider>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};