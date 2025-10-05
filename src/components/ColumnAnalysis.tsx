import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Columns, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ColumnMatch {
  original: string;
  similar: string[];
  similarity: number;
}

interface ColumnAnalysisProps {
  columns: string[];
  onRename?: (oldName: string, newName: string) => void;
  onMerge?: (columns: string[], newName: string) => void;
}

export const ColumnAnalysis = ({ columns, onRename, onMerge }: ColumnAnalysisProps) => {
  const [newNames, setNewNames] = useState<Record<string, string>>({});

  if (!columns || columns.length === 0) return null;

  // Função para calcular similaridade de Levenshtein
  const levenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[b.length][a.length];
  };

  const findSimilarColumns = (): ColumnMatch[] => {
    const matches: ColumnMatch[] = [];
    const processed = new Set<string>();

    columns.forEach((col, idx) => {
      if (processed.has(col)) return;
      
      const similar: string[] = [];
      columns.forEach((other, otherIdx) => {
        if (idx !== otherIdx && !processed.has(other)) {
          const distance = levenshteinDistance(col.toLowerCase(), other.toLowerCase());
          const maxLen = Math.max(col.length, other.length);
          const similarity = 1 - distance / maxLen;
          
          if (similarity > 0.6) {
            similar.push(other);
          }
        }
      });

      if (similar.length > 0) {
        matches.push({ 
          original: col, 
          similar, 
          similarity: 0.8 
        });
        processed.add(col);
        similar.forEach(s => processed.add(s));
      }
    });

    return matches;
  };

  const similarColumns = findSimilarColumns();

  return (
    <section className="container mx-auto px-4 py-8">
      <Card className="p-6 bg-card-glow border-accent/30 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Columns className="w-6 h-6 text-accent" />
          Análise de Colunas
        </h3>

        {similarColumns.length === 0 ? (
          <Alert className="bg-muted/30 border-border">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Nenhuma coluna similar detectada. Todas as colunas parecem ter nomes distintos.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-6">
            <Alert className="bg-primary/10 border-primary/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Detectadas {similarColumns.length} grupos de colunas com nomes similares.
                Revise e renomeie conforme necessário para padronização.
              </AlertDescription>
            </Alert>

            {similarColumns.map((match, idx) => (
              <Card key={idx} className="p-4 bg-muted/20 border-border">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Coluna Principal:</p>
                    <p className="font-mono text-sm">{match.original}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold text-secondary mb-1">Colunas Similares:</p>
                    <div className="flex flex-wrap gap-2">
                      {match.similar.map((col, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full text-xs font-mono"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground mb-1 block">
                        Novo nome padrão:
                      </label>
                      <Input
                        placeholder={match.original}
                        value={newNames[match.original] || ""}
                        onChange={(e) => setNewNames({ ...newNames, [match.original]: e.target.value })}
                        className="font-mono text-sm"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        const newName = newNames[match.original] || match.original;
                        if (onMerge) {
                          onMerge([match.original, ...match.similar], newName);
                        }
                      }}
                      className="bg-gradient-stellar"
                    >
                      Mesclar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6">
          <p className="text-xs text-muted-foreground">
            Total de colunas: {columns.length} | 
            Grupos similares: {similarColumns.length}
          </p>
        </div>
      </Card>
    </section>
  );
};
