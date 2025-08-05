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
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            Voice Conversation
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Status Section */}
          <div className="text-center py-4">
            <div className="relative inline-block">
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500' 
                    : hasPermission 
                      ? 'bg-primary hover:bg-primary-hover' 
                      : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6 text-white" />
                ) : (
                  <Mic className={`h-6 w-6 ${hasPermission ? 'text-white' : 'text-muted-foreground'}`} />
                )}
              </div>
              
              {isListening && (
                <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping"></div>
              )}
            </div>
            
            <h3 className="text-base font-semibold mt-3 text-foreground">
              {isListening ? 'Listening...' : hasPermission ? 'Ready to Talk' : 'Microphone Access Required'}
            </h3>
            
            <p className="text-sm text-muted-foreground mt-2">
              {isListening 
                ? 'Speak naturally, I\'m listening'
                : hasPermission 
                  ? 'Click to start conversation'
                  : 'Allow microphone access to begin'
              }
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={toggleListening}
            className={`w-full py-3 text-base font-medium rounded-xl transition-all duration-300 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-primary hover:bg-primary-hover text-primary-foreground'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                Stop
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                {hasPermission ? 'Start Voice Chat' : 'Enable Microphone'}
              </>
            )}
          </Button>

          {/* Compact Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              AI-powered voice conversations • Secure & private
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceModal;