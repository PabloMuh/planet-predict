import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, Upload } from "lucide-react";
import { toast } from "sonner";

interface ModelPersistenceProps {
  modelTrained: boolean;
}

export const ModelPersistence = ({ modelTrained }: ModelPersistenceProps) => {
  const handleSaveModel = () => {
    if (!modelTrained) {
      toast.error("Treine um modelo primeiro");
      return;
    }
    // Simulate saving
    toast.success("Modelo salvo localmente!");
  };

  const handleLoadModel = () => {
    // Simulate loading
    toast.success("Modelo carregado!");
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Persistência do Modelo</h2>
      
      <Card className="max-w-2xl mx-auto p-6 bg-card-glow border-primary/30">
        <p className="text-center text-muted-foreground mb-6">
          Salve seu modelo treinado para reutilização futura ou carregue um modelo existente
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={handleSaveModel}
            disabled={!modelTrained}
            className="bg-gradient-stellar hover:shadow-glow-primary transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Modelo
          </Button>
          
          <Button
            onClick={handleLoadModel}
            variant="outline"
            className="border-secondary/50 hover:border-secondary hover:bg-secondary/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            Carregar Modelo
          </Button>
        </div>
      </Card>
    </section>
  );
};