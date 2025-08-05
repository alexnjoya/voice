import { useState } from 'react';
import { Mic, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';
import VoiceModal from './VoiceModal';

const Hero = () => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto container-padding text-center relative z-10">
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
            
            {/* Enhanced Voice CTA - Now the Star of the Show */}
            <div className="mb-8">
              <div className="relative inline-block">
                {/* Animated background rings */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-glow"></div>
                
                <Button 
                  size="lg" 
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="relative bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-primary/30 animate-mic-bounce border-2 border-primary/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-full">
                      <Mic className="h-6 w-6" />
                    </div>
                    <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent font-extrabold">
                      🎤 Talk to Me
                    </span>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </Button>
              </div>
              
              {/* Voice feature highlight text */}
              <p className="text-sm text-primary font-medium mt-4 animate-pulse">
                ✨ AI-Powered Voice Conversations Available
              </p>
            </div>
            
            {/* Secondary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg font-medium rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                View My Work
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg font-medium rounded-full hover:bg-primary/10 transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>
            
            {/* Enhanced scroll indicator */}
            <div className="mt-16 animate-bounce cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto flex justify-center">
                  <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
                </div>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Voice Modal */}
      <VoiceModal 
        isOpen={isVoiceModalOpen} 
        onClose={() => setIsVoiceModalOpen(false)} 
      />
    </>
  );
};

export default Hero;