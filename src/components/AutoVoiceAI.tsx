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
  const [showConversation, setShowConversation] = useState(false);
  const [hasSpokenIntro, setHasSpokenIntro] = useState(false);

  // Reset intro speech state on component mount (page refresh)
  useEffect(() => {
    setHasSpokenIntro(false);
  }, []);

  // Auto-initialize when component mounts
  const requestMicrophonePermission = useCallback(async () => {
    try {
      // Check if speech recognition is supported
      if (!voiceRecognition.isSupported()) {
        console.error('Speech recognition not supported in this browser');
        setHasPermission(false);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      
             // Start initial conversation
       const initialMessages: ConversationMessage[] = [
         { type: 'ai', content: "Hello! I'm your AI assistant for Alex Njoya.", timestamp: new Date() },
         { type: 'ai', content: "I can help you learn about Alex's background, experience, and projects.", timestamp: new Date() },
         { type: 'ai', content: "Try asking: 'Tell me about Alex', 'What's his experience?', or 'What are his skills?'", timestamp: new Date() }
       ];
      setConversationHistory(initialMessages);
      setShowConversation(true);
      
             // Speak the welcome message only once
       if (!hasSpokenIntro) {
         setTimeout(() => {
           speakText("Hello! I'm your AI assistant for Alex Njoya. I can help you learn about Alex's background, experience, and projects. Try asking me about Alex, his experience, or his skills.");
           setHasSpokenIntro(true);
         }, 1000);
       }
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
    }
  }, [hasSpokenIntro]);

  useEffect(() => {
    const initializeVoiceAI = async () => {
      setIsInitializing(true);
      voiceAI.clearHistory();
      
             // Welcome message sequence
       const welcomeSequence = [
         "Initializing voice assistant...",
         "Requesting microphone permission...",
         "Permission granted!",
         "Hello! I'm your AI assistant for Alex Njoya.",
         "I can help you learn about Alex's background, experience, and projects.",
         "Try asking: 'Tell me about Alex', 'What's his experience?', or 'What are his skills?'",
         "Ready to assist you!"
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
    };

    // Start initialization after a short delay
    const timer = setTimeout(() => {
      initializeVoiceAI();
    }, 2000); // 2 second delay to let page load

    return () => clearTimeout(timer);
  }, [requestMicrophonePermission]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for more natural speech
      utterance.pitch = 0.9; // Lower pitch for male voice
      utterance.volume = 1;
      utterance.lang = 'en-US';
      
      // Get available voices and prioritize male voices
      const voices = speechSynthesis.getVoices();
      const maleVoice = voices.find(voice => 
        voice.name.includes('David') ||
        voice.name.includes('Alex') ||
        voice.name.includes('James') ||
        voice.name.includes('Mark') ||
        voice.name.includes('John') ||
        voice.name.includes('Michael') ||
        voice.name.includes('Google') ||
        voice.name.includes('Microsoft')
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
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
    console.log('🎤 Transcription received:', transcribedText);
    setTranscribedText(transcribedText);
    if (transcribedText.trim()) {
      await processUserInput(transcribedText);
    } else {
      console.log('🎤 Empty transcription, skipping processing');
    }
  };

  const toggleListening = async () => {
    if (!hasPermission) {
      await requestMicrophonePermission();
      return;
    }

    if (!isListening) {
      try {
        console.log('🎤 Starting voice recording...');
        setIsListening(true);
        setTranscribedText('');
        await voiceRecognition.startRecording(handleTranscriptionComplete);
        setTimeout(() => {
          if (isListening) {
            console.log('🎤 Auto-stopping recording after 10 seconds');
            stopVoiceRecording();
          }
        }, 10000);
      } catch (error) {
        console.error('Error starting voice recording:', error);
        setIsListening(false);
      }
    } else {
      console.log('🎤 Stopping voice recording...');
      stopVoiceRecording();
    }
  };

  const stopVoiceRecording = () => {
    if (isListening) {
      setIsListening(false);
      voiceRecognition.stopRecording();
    }
  };

  return (
    <>
      {/* Modern Floating Voice AI Button */}
      <div className="fixed bottom-6 right-6 z-50">
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
      </div>

      {/* Enhanced Status Indicators */}
      {hasPermission === false && (
        <AudioStatusIndicator
          status="permission-denied"
          message="Microphone permission denied. Please allow microphone access to use voice features."
        />
      )}

      {hasPermission && !isListening && !isProcessing && !isSpeaking && !isInitializing && (
        <AudioStatusIndicator
          status="ready"
          message="Click to start voice conversation"
        />
      )}

      {isSpeaking && (
        <AudioStatusIndicator
          status="speaking"
          message="AI is speaking..."
        />
      )}

      {isProcessing && (
        <AudioStatusIndicator
          status="processing"
          message="Processing your request..."
        />
      )}

      {isInitializing && (
        <AudioStatusIndicator
          status="initializing"
          message="Initializing voice assistant..."
        />
      )}

      {isListening && (
        <AudioStatusIndicator
          status="listening"
          message="Listening... Click to stop"
        />
      )}
    </>
  );
};

export default AutoVoiceAI; 