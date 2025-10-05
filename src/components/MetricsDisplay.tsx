import { Card } from "@/components/ui/card";
import { BarChart, TrendingUp } from "lucide-react";

interface Metrics {
  rocAuc: number;
  prAuc: number;
  precision: number;
  recall: number;
  f1Score: number;
}

interface MetricsDisplayProps {
  metrics: Metrics | null;
}

export const MetricsDisplay = ({ metrics }: MetricsDisplayProps) => {
  if (!metrics) return null;

  const metricsData = [
    { label: "ROC-AUC", value: metrics.rocAuc, color: "text-primary" },
    { label: "PR-AUC", value: metrics.prAuc, color: "text-secondary" },
    { label: "Precisão", value: metrics.precision, color: "text-primary" },
    { label: "Revocação", value: metrics.recall, color: "text-secondary" },
    { label: "F1-Score", value: metrics.f1Score, color: "text-primary" },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <BarChart className="w-8 h-8 text-primary" />
          Métricas de Performance
        </h2>
        <p className="text-muted-foreground">Resultados da avaliação do modelo</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {metricsData.map((metric, idx) => (
          <Card key={idx} className="p-6 text-center bg-card-glow border-primary/30 hover:border-primary/50 transition-all">
            <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
              {(metric.value * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">{metric.label}</div>
          </Card>
        ))}
      </div>
      
      <Card className="mt-8 p-6 max-w-5xl mx-auto bg-muted/30 border-border">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-secondary mt-1" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Interpretação:</p>
            <p>• <strong>ROC-AUC:</strong> Área sob a curva ROC - quanto maior, melhor a capacidade de distinguir classes</p>
            <p>• <strong>PR-AUC:</strong> Área sob a curva Precision-Recall - importante para dados desbalanceados</p>
            <p>• <strong>F1-Score:</strong> Média harmônica entre precisão e revocação</p>
          </div>
        </div>
      </Card>
    </section>
  );
};