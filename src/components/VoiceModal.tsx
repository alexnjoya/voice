import { useState, useEffect } from 'react';
import { X, Settings, Sparkles, Bot, MessageCircle, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { voiceAI, ConversationMessage } from '@/services/voiceAI';
import { voiceRecognition } from '@/services/voiceRecognition';
import ModernAudioIcon from './ModernAudioIcon';
import AudioStatusIndicator from './AudioStatusIndicator';

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
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
            <div className="p-1.5 sm:p-2 bg-gradient-to-r from-primary to-accent rounded-xl">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-sm sm:text-base">AI Assistant for Alex Njoya</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {/* Conversation Area */}
          <div className="flex-1 bg-gray-900 rounded-lg p-3 sm:p-4 mb-4 overflow-y-auto max-h-64 sm:max-h-96">
            {isInitializing ? (
              <div className="text-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
                <p className="text-green-400 font-mono text-sm sm:text-base">Initializing AI Assistant...</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Loading conversation engine</p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {conversationHistory.map((message, index) => (
                  <div key={index} className="text-xs sm:text-sm">
                    <span className="text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
                      {formatMessage(message)}
                    </span>
                  </div>
                ))}
                {isProcessing && (
                  <div className="text-xs sm:text-sm">
                    <span className="text-green-400 font-mono">🤖 AI: Processing...</span>
                  </div>
                )}
                {transcribedText && (
                  <div className="text-xs sm:text-sm">
                    <span className="text-blue-400 font-mono">🎤 Transcribed: {transcribedText}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {voiceAI.getQuickQuestions().map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-2 py-1 h-auto"
                  disabled={isProcessing}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Control Section */}
          <div className="border-t pt-3 sm:pt-4">
            <div className="text-center">
              <div className="mb-3 sm:mb-4">
                <ModernAudioIcon
                  isListening={isListening}
                  isSpeaking={false}
                  isProcessing={isProcessing}
                  isInitializing={false}
                  hasPermission={hasPermission}
                  onClick={toggleListening}
                  size="lg"
                  variant="inline"
                />
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {isListening ? 'Listening...' : hasPermission ? 'Ready for Voice Input' : 'Microphone Access Required'}
              </h3>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                {isListening 
                  ? 'Speak naturally, I\'m processing your request'
                  : hasPermission 
                    ? 'Click to start voice conversation'
                    : 'Allow microphone access to begin'
                }
              </p>

              {/* Status indicator */}
              <div className="mb-4">
                {hasPermission === false && (
                  <AudioStatusIndicator
                    status="permission-denied"
                    variant="minimal"
                  />
                )}
                {isProcessing && (
                  <AudioStatusIndicator
                    status="processing"
                    variant="minimal"
                  />
                )}
                {isListening && (
                  <AudioStatusIndicator
                    status="listening"
                    variant="minimal"
                  />
                )}
              </div>
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