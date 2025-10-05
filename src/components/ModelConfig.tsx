import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

export type Algorithm = "lightgbm" | "stacking";

interface ModelConfigProps {
  algorithm: Algorithm;
  onAlgorithmChange: (algorithm: Algorithm) => void;
}

export const ModelConfig = ({ algorithm, onAlgorithmChange }: ModelConfigProps) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Configuração do Modelo</h2>
      
      <Card className="max-w-2xl mx-auto p-6 bg-card-glow border-primary/30">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Algoritmo de Machine Learning</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="algorithm" className="text-base mb-2 block">
              Selecione o Algoritmo
            </Label>
            <Select value={algorithm} onValueChange={(value) => onAlgorithmChange(value as Algorithm)}>
              <SelectTrigger id="algorithm" className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lightgbm">
                  <div className="py-1">
                    <p className="font-semibold">LightGBM</p>
                    <p className="text-xs text-muted-foreground">Rápido e eficiente (padrão)</p>
                  </div>
                </SelectItem>
                <SelectItem value="stacking">
                  <div className="py-1">
                    <p className="font-semibold">Stacking Ensemble</p>
                    <p className="text-xs text-muted-foreground">Múltiplos modelos para maior precisão</p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-sm text-muted-foreground">
              {algorithm === "lightgbm" ? (
                <>
                  <strong className="text-foreground">LightGBM:</strong> Gradient boosting otimizado para velocidade e eficiência. 
                  Ideal para datasets grandes e treino rápido.
                </>
              ) : (
                <>
                  <strong className="text-foreground">Stacking:</strong> Combina múltiplos modelos LightGBM com 
                  diferentes configurações para maximizar a precisão. Mais lento mas potencialmente mais preciso.
                </>
              )}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};