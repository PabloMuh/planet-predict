import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Activity } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MetricsAnalysisProps {
  data: any[] | null;
  onSampleChange?: (sampleSize: number) => void;
}

export const MetricsAnalysis = ({ data, onSampleChange }: MetricsAnalysisProps) => {
  const [sampleSize, setSampleSize] = useState([100]);

  if (!data || data.length === 0) return null;

  const fluxValues = data.map(d => d.flux).filter(f => f !== undefined && f !== null);
  
  const mean = fluxValues.reduce((a, b) => a + b, 0) / fluxValues.length;
  const variance = fluxValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / fluxValues.length;
  const stdDev = Math.sqrt(variance);
  const amplitude = Math.max(...fluxValues) - Math.min(...fluxValues);
  const snr = mean / stdDev;

  const metrics = [
    { name: "Média", value: mean.toFixed(4), color: "hsl(var(--primary))" },
    { name: "Desvio Padrão", value: stdDev.toFixed(4), color: "hsl(var(--secondary))" },
    { name: "Amplitude", value: amplitude.toFixed(4), color: "hsl(var(--accent))" },
    { name: "SNR", value: snr.toFixed(2), color: "hsl(var(--primary))" },
  ];

  const handleSampleChange = (value: number[]) => {
    setSampleSize(value);
    if (onSampleChange) {
      onSampleChange(value[0]);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Metrics Cards */}
        <Card className="p-6 bg-card-glow border-primary/30">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Métricas Estatísticas
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-sm text-muted-foreground mb-1">{metric.name}</p>
                <p className="text-2xl font-bold" style={{ color: metric.color }}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Bar Chart */}
        <Card className="p-6 bg-card-glow border-secondary/30">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Visualização de Métricas
          </h3>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))' 
                }}
              />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Sampling Control */}
        <Card className="p-6 bg-card-glow border-accent/30 md:col-span-2">
          <h3 className="text-xl font-bold mb-4">Amostragem de Dados</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Tamanho da amostra: {sampleSize[0]}% dos dados
              </p>
              <Slider
                value={sampleSize}
                onValueChange={handleSampleChange}
                min={10}
                max={100}
                step={10}
                className="w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Total de pontos: {Math.floor((data.length * sampleSize[0]) / 100)} de {data.length}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
