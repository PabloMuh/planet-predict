import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { GitCompare } from "lucide-react";

interface ComparisonViewProps {
  data1: any[] | null;
  data2: any[] | null;
  label1?: string;
  label2?: string;
}

export const ComparisonView = ({ data1, data2, label1 = "Curva 1", label2 = "Curva 2" }: ComparisonViewProps) => {
  if (!data1 || !data2) return null;

  // Combinar dados para comparação
  const combinedData = data1.map((point, idx) => ({
    time: point.time,
    flux1: point.flux,
    flux2: data2[idx]?.flux || null,
  }));

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-card-glow border-accent/30">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-accent" />
          Comparação de Curvas de Luz
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
              stroke="hsl(var(--foreground))"
            />
            <YAxis 
              label={{ value: 'Flux', angle: -90, position: 'insideLeft' }}
              stroke="hsl(var(--foreground))"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="flux1" 
              stroke="hsl(var(--primary))" 
              dot={false}
              strokeWidth={2}
              name={label1}
            />
            <Line 
              type="monotone" 
              dataKey="flux2" 
              stroke="hsl(var(--secondary))" 
              dot={false}
              strokeWidth={2}
              name={label2}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-primary">{label1}</p>
            <p className="text-muted-foreground">Pontos: {data1.length}</p>
          </div>
          <div>
            <p className="font-semibold text-secondary">{label2}</p>
            <p className="text-muted-foreground">Pontos: {data2.length}</p>
          </div>
        </div>
      </Card>
    </section>
  );
};
