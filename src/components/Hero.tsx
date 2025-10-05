import { Rocket, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/50 border border-primary/30 backdrop-blur-sm animate-fade-in">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-muted-foreground">Plataforma de Detecção de Exoplanetas</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-stellar bg-clip-text text-transparent animate-fade-in">
          ExoPlanet Finder
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
          Detecte exoplanetas usando inteligência artificial avançada. 
          Faça upload de dados, treine modelos e descubra novos mundos além do nosso sistema solar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
          <a 
            href="#method-selector" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-stellar text-foreground rounded-lg font-semibold shadow-glow-primary hover:shadow-glow-secondary transition-all hover:scale-105"
          >
            <Rocket className="w-5 h-5" />
            Começar Análise
          </a>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};