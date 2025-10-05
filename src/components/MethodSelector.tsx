import { useState } from "react";
import { Activity, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

export type DataMethod = "light-curve" | "catalog";

interface MethodSelectorProps {
  selectedMethod: DataMethod;
  onMethodChange: (method: DataMethod) => void;
}

export const MethodSelector = ({ selectedMethod, onMethodChange }: MethodSelectorProps) => {
  return (
    <section id="method-selector" className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-stellar bg-clip-text text-transparent">
          Selecione o Método de Análise
        </h2>
        <p className="text-muted-foreground text-lg">
          Escolha entre análise de curvas de luz ou dados de catálogo
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card
          className={`p-6 cursor-pointer transition-all hover:scale-105 ${
            selectedMethod === "light-curve"
              ? "border-primary shadow-glow-primary bg-card-glow"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onMethodChange("light-curve")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`p-4 rounded-full ${
              selectedMethod === "light-curve" ? "bg-primary/20" : "bg-muted"
            }`}>
              <Activity className={`w-8 h-8 ${
                selectedMethod === "light-curve" ? "text-primary" : "text-muted-foreground"
              }`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Curva de Luz</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Classificação binária de candidatos a planetas
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Dados: time, flux (séries temporais)</p>
                <p>• Classes: Candidato / Não-candidato</p>
                <p>• Ideal para detecção de trânsitos</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card
          className={`p-6 cursor-pointer transition-all hover:scale-105 ${
            selectedMethod === "catalog"
              ? "border-secondary shadow-glow-secondary bg-card-glow"
              : "border-border hover:border-secondary/50"
          }`}
          onClick={() => onMethodChange("catalog")}
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`p-4 rounded-full ${
              selectedMethod === "catalog" ? "bg-secondary/20" : "bg-muted"
            }`}>
              <Database className={`w-8 h-8 ${
                selectedMethod === "catalog" ? "text-secondary" : "text-muted-foreground"
              }`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Catálogo NASA</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Classificação multiclasse de objetos
              </p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Dados: features tabulares do arquivo</p>
                <p>• Classes: Falso Positivo / Candidato / Confirmado</p>
                <p>• Ideal para validação de descobertas</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};