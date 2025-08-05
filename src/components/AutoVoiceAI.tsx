import { useState, useEffect, useCallback } from 'react';
import { voiceAI, ConversationMessage } from '@/services/voiceAI';
import { voiceRecognition } from '@/services/voiceRecognition';
import ModernAudioIcon from './ModernAudioIcon';
import AudioStatusIndicator from './AudioStatusIndicator';

const AutoVoiceAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);
  const [initializationStep, setInitializationStep] = useState(0);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Speech synthesis setup
  const speakText = useCallback((text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 0.95;
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
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsSpeaking(false);
    }
  }, [speechEnabled]);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      setWelcomeMessage("🎤 Requesting microphone permission...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop());
      
      // Start initial conversation
      const initialMessages: ConversationMessage[] = [
        { type: 'ai', content: "👋 Hello! I'm your AI assistant for Alex Njoya.", timestamp: new Date() },
        { type: 'ai', content: "I can help you learn about Alex's background, experience, and projects.", timestamp: new Date() },
        { type: 'ai', content: "Try asking: 'Tell me about Alex', 'What's his experience?', or 'What are his skills?'", timestamp: new Date() }
      ];
      setConversationHistory(initialMessages);
      
      // Speak the welcome message only once
      if (!hasSpokenIntro) {
        setTimeout(() => {
          const welcomeText = "Hello! I'm your AI assistant for Alex Njoya. I can help you learn about Alex's background, experience, and projects. Try asking me about Alex, his experience, or his skills.";
          console.log('🎤 Speaking welcome message:', welcomeText);
          speakText(welcomeText);
          setHasSpokenIntro(true);
        }, 1000);
      }
    } catch (error: any) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
      setWelcomeMessage("❌ Microphone access denied. Please allow microphone access to use voice features.");
    }
  }, [hasSpokenIntro, speakText]);

  // Initialize when component mounts
  useEffect(() => {
    const initializeVoiceAI = async () => {
      setIsInitializing(true);
      voiceAI.clearHistory();
      
      // Enhanced initialization sequence
      const initSequence = [
        "🎤 Initializing AI voice assistant...",
        "🔊 Loading speech recognition engine...",
        "🎯 Setting up conversation AI...",
        "📡 Requesting microphone access...",
        "✅ AI assistant ready!"
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < initSequence.length) {
          setWelcomeMessage(initSequence[currentStep]);
          setInitializationStep(currentStep);
          currentStep++;
        } else {
          clearInterval(interval);
          setIsInitializing(false);
          requestMicrophonePermission();
        }
      }, 800);

      return () => clearInterval(interval);
    };

    // Start initialization after a short delay
    const timer = setTimeout(() => {
      initializeVoiceAI();
    }, 1500); // 1.5 second delay to let page load

    return () => clearTimeout(timer);
  }, [requestMicrophonePermission]);

  const processUserInput = async (input: string) => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    try {
      const userMessage: ConversationMessage = {
        type: 'user',
        content: input,
        timestamp: new Date()
      };
      
      setConversationHistory(prev => [...prev, userMessage]);
      
      // Add a small delay to show processing state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await voiceAI.processUserInput(input);
      
      const aiMessage: ConversationMessage = {
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
    
      setConversationHistory(prev => [...prev, aiMessage]);
      
      // Speak the response after a short delay
      setTimeout(() => {
        speakText(response);
      }, 300);
      
    } catch (error) {
      console.error('Error processing user input:', error);
      const errorMessage: ConversationMessage = {
        type: 'ai',
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      };
      setConversationHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranscriptionComplete = async (transcribedText: string) => {
    if (transcribedText.trim()) {
      setTranscribedText(transcribedText);
      await processUserInput(transcribedText);
      setTranscribedText('');
    }
  };

  const toggleListening = async () => {
    if (!hasPermission) {
      // Show initialization state when requesting permission
      setIsInitializing(true);
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

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (speechEnabled) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Voice AI Button */}
      <div className="relative">
        <ModernAudioIcon
          isListening={isListening}
          isSpeaking={isSpeaking}
          isProcessing={isProcessing}
          isInitializing={isInitializing}
          hasPermission={hasPermission}
          onClick={toggleListening}
          size="lg"
          variant="floating"
        />
        
        {/* Speech Toggle Button */}
        <button
          onClick={toggleSpeech}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs hover:bg-gray-700 transition-colors"
          title={speechEnabled ? "Disable speech" : "Enable speech"}
        >
          {speechEnabled ? "🔊" : "🔇"}
        </button>
      </div>

      {/* Status Indicator */}
      <div className="mt-4">
        {isSpeaking && (
          <AudioStatusIndicator
            status="speaking"
            variant="floating"
          />
        )}
        {isListening && !isSpeaking && (
          <AudioStatusIndicator
            status="listening"
            variant="floating"
          />
        )}
        {isProcessing && !isSpeaking && !isListening && (
          <AudioStatusIndicator
            status="processing"
            variant="floating"
          />
        )}
        {isInitializing && !isSpeaking && !isListening && !isProcessing && (
          <AudioStatusIndicator
            status="initializing"
            message={welcomeMessage}
            variant="floating"
          />
        )}
        {hasPermission === false && !isSpeaking && !isListening && !isProcessing && !isInitializing && (
          <AudioStatusIndicator
            status="permission-denied"
            variant="floating"
          />
        )}
      </div>
    </div>
  );
};

export default AutoVoiceAI; 