import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Eye } from "lucide-react";

interface DataPreviewProps {
  data: any[] | null;
  title: string;
}

export const DataPreview = ({ data, title }: DataPreviewProps) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-card-glow border-primary/30">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6 text-primary" />
          {title}
        </h3>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
              stroke="hsl(var(--foreground))"
            />
            <YAxis 
              dataKey="flux"
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
              dataKey="flux" 
              stroke="hsl(var(--primary))" 
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Pontos de dados: {data.length}</p>
          <p>Intervalo de tempo: {data[0]?.time?.toFixed(2)} - {data[data.length - 1]?.time?.toFixed(2)}</p>
        </div>
      </Card>
    </section>
  );
};
