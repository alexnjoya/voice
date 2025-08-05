import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { voiceAI, ConversationMessage } from '@/services/voiceAI';
import { voiceRecognition } from '@/services/voiceRecognition';
import ModernAudioIcon from './ModernAudioIcon';
import AudioStatusIndicator from './AudioStatusIndicator';

interface VoiceInteractionProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceInteraction = ({ isOpen, onClose }: VoiceInteractionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      
             // Start initial conversation
       const initialMessages: ConversationMessage[] = [
         { type: 'ai', content: "👋 Hello! I'm your AI assistant for Alex Njoya.", timestamp: new Date() },
         { type: 'ai', content: "I can help you learn about Alex's background, experience, and projects.", timestamp: new Date() },
         { type: 'ai', content: "Try asking: 'Tell me about Alex', 'What's his experience?', or 'What are his skills?'", timestamp: new Date() }
       ];
       setConversationHistory(initialMessages);
       
       // Speak the welcome message
       setTimeout(() => {
         speakText("Hello! I'm your AI assistant for Alex Njoya. I can help you learn about Alex's background, experience, and projects. Try asking me about Alex, his experience, or his skills.");
       }, 1000);
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
    }
  }, []);

  // Initialize when component opens
  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      voiceAI.clearHistory();
      
      // Welcome message sequence
      const welcomeSequence = [
        "🎤 Initializing voice assistant...",
        "🔊 Requesting microphone permission...",
        "✅ Permission granted!",
        "👋 Hello! I'm your AI assistant for Alex Njoya.",
        "I can help you learn about Alex's background, experience, and projects.",
        "Try asking: 'Tell me about Alex', 'What's his experience?', or 'What are his skills?'",
        "Ready to assist you! 🎤"
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < welcomeSequence.length) {
          setWelcomeMessage(welcomeSequence[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsInitializing(false);
          requestMicrophonePermission();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isOpen, requestMicrophonePermission]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for more natural speech
      utterance.pitch = 0.95; // Slightly lower pitch for more human-like sound
      utterance.volume = 1;
      utterance.lang = 'en-US';
      
      // Get available voices and set a more human-like one
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft') || 
        voice.name.includes('Alex') ||
        voice.name.includes('David') ||
        voice.name.includes('Sarah') ||
        voice.name.includes('Emma')
      );
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const processUserInput = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: ConversationMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setConversationHistory(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const response = await voiceAI.processUserInput(input);
      const aiMessage: ConversationMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      setConversationHistory(prev => [...prev, aiMessage]);
      
      // Speak the AI response
      speakText(response);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsProcessing(false);
      setTranscribedText('');
    }
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
        await voiceRecognition.startRecording(handleTranscriptionComplete);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold">Voice AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {isInitializing ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Volume2 className="h-8 w-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground animate-pulse">
                {welcomeMessage}
              </p>
            </div>
          ) : (
            <>
              {/* Conversation History */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {conversationHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Transcribed Text */}
              {transcribedText && (
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">You said:</span> {transcribedText}
                  </p>
                </div>
              )}

                             {/* Processing Indicator */}
               {isProcessing && (
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                   <span>AI is thinking...</span>
                 </div>
               )}

               {/* Speaking Indicator */}
               {isSpeaking && (
                 <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span>AI is speaking...</span>
                 </div>
               )}

              {/* Permission Status */}
              {hasPermission === false && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Microphone permission denied. Please allow microphone access to use voice features.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="p-6 border-t border-border">
          <div className="flex justify-center">
            <ModernAudioIcon
              isListening={isListening}
              isSpeaking={isSpeaking}
              isProcessing={isProcessing}
              isInitializing={isInitializing}
              hasPermission={hasPermission}
              onClick={toggleListening}
              size="md"
              variant="inline"
            />
          </div>
          
          {/* Status indicator */}
          <div className="mt-4">
            {hasPermission === false && (
              <AudioStatusIndicator
                status="permission-denied"
                variant="inline"
              />
            )}
            {isProcessing && (
              <AudioStatusIndicator
                status="processing"
                variant="inline"
              />
            )}
            {isSpeaking && (
              <AudioStatusIndicator
                status="speaking"
                variant="inline"
              />
            )}
            {isListening && (
              <AudioStatusIndicator
                status="listening"
                variant="inline"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInteraction; 