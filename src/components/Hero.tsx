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
        
        <div className="max-w-7xl mx-auto container-padding text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Enhanced Voice CTA - Clean and Prominent */}
            <div className="mb-8">
              <div className="relative inline-block">
                {/* Simple glow effect */}
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse"></div>
                
                <Button 
                  size="lg" 
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="relative bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground px-12 py-6 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary/30"
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
              <p className="text-sm text-primary font-medium mt-4">
                ✨ AI-Powered Voice Conversations Available
              </p>
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