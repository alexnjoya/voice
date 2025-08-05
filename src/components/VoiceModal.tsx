import { useState } from 'react';
import { X, Mic, MicOff, Volume2, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      // Stop the stream immediately as we just wanted to check permission
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      setHasPermission(false);
      console.error('Microphone permission denied:', error);
    }
  };

  const toggleListening = () => {
    if (!hasPermission) {
      requestMicrophonePermission();
      return;
    }
    setIsListening(!isListening);
    // Here you would integrate with actual voice recognition/conversation API
    console.log(isListening ? 'Stopping voice conversation...' : 'Starting voice conversation...');
  };

  const features = [
    { icon: Sparkles, title: 'AI-Powered Conversations', desc: 'Natural language understanding with advanced AI' },
    { icon: Volume2, title: 'High-Quality Audio', desc: 'Crystal clear voice synthesis and recognition' },
    { icon: Settings, title: 'Customizable Experience', desc: 'Adjust voice, speed, and conversation style' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Mic className="h-6 w-6 text-primary" />
            </div>
            Voice Conversation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Section */}
          <div className="text-center py-6">
            <div className="relative inline-block">
              <div 
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 animate-pulse-glow' 
                    : hasPermission 
                      ? 'bg-primary hover:bg-primary-hover animate-pulse-glow' 
                      : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8 text-white" />
                ) : (
                  <Mic className={`h-8 w-8 ${hasPermission ? 'text-white' : 'text-muted-foreground'}`} />
                )}
              </div>
              
              {isListening && (
                <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping"></div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mt-4 text-foreground">
              {isListening ? 'Listening...' : hasPermission ? 'Ready to Talk' : 'Microphone Access Required'}
            </h3>
            
            <p className="text-sm text-muted-foreground mt-2">
              {isListening 
                ? 'Speak naturally, I\'m listening to your questions'
                : hasPermission 
                  ? 'Click the microphone to start our conversation'
                  : 'Please allow microphone access to enable voice chat'
              }
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={toggleListening}
            className={`w-full py-4 text-lg font-medium rounded-xl transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-primary hover:bg-primary-hover text-primary-foreground'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="mr-3 h-5 w-5" />
                Stop Conversation
              </>
            ) : (
              <>
                <Mic className="mr-3 h-5 w-5" />
                {hasPermission ? 'Start Voice Chat' : 'Enable Microphone'}
              </>
            )}
          </Button>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm">Features:</h4>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <feature.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-sm text-foreground">{feature.title}</h5>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Voice conversations are processed securely and are not stored permanently.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceModal;