import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, CheckCircle, AlertCircle, Info } from "lucide-react";

interface LogEntry {
  type: "success" | "error" | "info";
  message: string;
  timestamp: Date;
}

interface ProcessLogProps {
  logs: LogEntry[];
}

export const ProcessLog = ({ logs }: ProcessLogProps) => {
  if (!logs || logs.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-card-glow border-border max-w-5xl mx-auto">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Log de Processos
        </h3>
        
        <ScrollArea className="h-64 w-full rounded-md border border-border p-4">
          <div className="space-y-2">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                {getIcon(log.type)}
                <div className="flex-1">
                  <p className="font-mono text-xs text-muted-foreground">
                    {log.timestamp.toLocaleTimeString()}
                  </p>
                  <p className={`
                    ${log.type === 'error' ? 'text-destructive' : ''}
                    ${log.type === 'success' ? 'text-green-500' : ''}
                    ${log.type === 'info' ? 'text-foreground' : ''}
                  `}>
                    {log.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </section>
  );
};
