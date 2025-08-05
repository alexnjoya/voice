import { useState, useEffect } from 'react';
import { X, Mic, MicOff, Volume2, Settings, Sparkles, Bot, MessageCircle, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { voiceAI, ConversationMessage } from '@/services/voiceAI';
import { voiceRecognition } from '@/services/voiceRecognition';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceModal = ({ isOpen, onClose }: VoiceModalProps) => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      voiceAI.clearHistory();
      
      // Quick initialization
      setTimeout(() => {
        setIsInitializing(false);
        // Add initial greeting
        const initialMessages: ConversationMessage[] = [
          {
            type: 'ai',
            content: "🤖 Hello! I'm your AI assistant for Alex Njoya.",
            timestamp: new Date()
          },
          {
            type: 'ai',
            content: "I can help you learn about Alex's background, experience, and projects.",
            timestamp: new Date()
          },
          {
            type: 'ai',
            content: "Try asking: 'Tell me about Alex', 'What's his experience?', or 'What are his skills?'",
            timestamp: new Date()
          }
        ];
        setConversationHistory(initialMessages);
      }, 500);
    }
  }, [isOpen]);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      setHasPermission(false);
      console.error('Microphone permission denied:', error);
    }
  };

  const processUserInput = async (input: string) => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Add user message to conversation
    const userMessage: ConversationMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setConversationHistory(prev => [...prev, userMessage]);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get AI response
    const response = await voiceAI.processUserInput(input);
    
    // Add AI response to conversation
    const aiMessage: ConversationMessage = {
      type: 'ai',
      content: response,
      timestamp: new Date()
    };
    
    setConversationHistory(prev => [...prev, aiMessage]);
    setIsProcessing(false);
  };

  const handleTranscriptionComplete = async (transcribedText: string) => {
    setTranscribedText(transcribedText);
    await processUserInput(transcribedText);
  };

  const toggleListening = async () => {
    if (!hasPermission) {
      await requestMicrophonePermission();
      return;
    }
    
    if (!isListening) {
      try {
        setIsListening(true);
        setTranscribedText('');
        
        // Start real voice recording with callback
        await voiceRecognition.startRecording(handleTranscriptionComplete);
        
        // Set up a timeout to stop recording after 10 seconds
        setTimeout(() => {
          if (isListening) {
            stopVoiceRecording();
          }
        }, 10000);
        
      } catch (error) {
        console.error('Error starting voice recording:', error);
        setIsListening(false);
      }
    } else {
      stopVoiceRecording();
    }
  };

  const stopVoiceRecording = () => {
    if (isListening) {
      setIsListening(false);
      voiceRecognition.stopRecording();
    }
  };

  const handleQuickQuestion = async (question: string) => {
    await processUserInput(question);
  };

  const formatMessage = (message: ConversationMessage) => {
    const prefix = message.type === 'user' ? '👤 You: ' : '🤖 AI: ';
    return prefix + message.content;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-xl">
              <Bot className="h-6 w-6 text-white" />
            </div>
            AI Assistant for Alex Njoya
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {/* Conversation Area */}
          <div className="flex-1 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
            {isInitializing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-green-400 font-mono">Initializing AI Assistant...</p>
                <p className="text-gray-400 text-sm mt-2">Loading conversation engine</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversationHistory.map((message, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-green-400 font-mono whitespace-pre-wrap">
                      {formatMessage(message)}
                    </span>
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-sm">
                    <span className="text-green-400 font-mono">🤖 AI: Processing...</span>
                  </div>
                )}
                {transcribedText && (
                  <div className="text-sm">
                    <span className="text-blue-400 font-mono">🎤 Transcribed: {transcribedText}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {voiceAI.getQuickQuestions().map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs"
                  disabled={isProcessing}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Control Section */}
          <div className="border-t pt-4">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div 
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 animate-pulse' 
                      : hasPermission 
                        ? 'bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary' 
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
              
              <h3 className="text-lg font-semibold mb-2">
                {isListening ? 'Listening...' : hasPermission ? 'Ready for Voice Input' : 'Microphone Access Required'}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">
                {isListening 
                  ? 'Speak naturally, I\'m processing your request'
                  : hasPermission 
                    ? 'Click to start voice conversation'
                    : 'Allow microphone access to begin'
                }
              </p>

              <Button
                onClick={toggleListening}
                disabled={isProcessing}
                className={`px-8 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="mr-2 h-5 w-5" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-5 w-5" />
                    {hasPermission ? 'Start Voice Chat' : 'Enable Microphone'}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Features Footer */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Brain className="w-3 h-3" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Real-time</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                <span>Conversational</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceModal;