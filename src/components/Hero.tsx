import { Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData, startVoiceConversation } from '@/data/portfolio';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center section-padding">
      <div className="max-w-7xl mx-auto container-padding text-center">
        <div className="max-w-4xl mx-auto">
          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            {portfolioData.personal.name}
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-8">
            {portfolioData.personal.title}
          </h2>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {portfolioData.personal.tagline}
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={startVoiceConversation}
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Mic className="mr-3 h-5 w-5" />
              🎤 Talk to Me
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-lg font-medium rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              View My Work
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;