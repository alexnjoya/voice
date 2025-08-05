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

  // Initialize speech synthesis voices
  useEffect(() => {
    const initializeVoices = () => {
      if ('speechSynthesis' in window) {
        // Load voices if not already loaded
        if (speechSynthesis.getVoices().length === 0) {
          speechSynthesis.onvoiceschanged = () => {
            console.log('🎤 Voices loaded:', speechSynthesis.getVoices().length);
          };
        }
      }
    };

    initializeVoices();
  }, []);

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

      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
        console.error('Microphone access requires a secure context (HTTPS)');
        setHasPermission(false);
        return;
      }

      // Show initialization state
      setIsInitializing(true);
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      
      // Initialize AI system
      setTimeout(() => {
        setIsInitializing(false);
        
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
            const welcomeText = "Hello! I'm your AI assistant for Alex Njoya. I can help you learn about Alex's background, experience, and projects. Try asking me about Alex, his experience, or his skills.";
            console.log('🎤 Speaking welcome message:', welcomeText);
            speakText(welcomeText);
            setHasSpokenIntro(true);
          }, 500); // Shorter delay since initialization is complete
        }
      }, 2000); // Show initialization for 2 seconds
      
    } catch (error: any) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
      setIsInitializing(false);
    }
  }, [hasSpokenIntro]);

  useEffect(() => {
    const initializeVoiceAI = async () => {
      setIsInitializing(true);
      voiceAI.clearHistory();
      
      // Welcome message sequence
      const welcomeSequence = [
        "Initializing AI voice assistant...",
        "Loading speech recognition...",
        "Requesting microphone access...",
        "Setting up conversation engine...",
        "AI assistant ready!"
      ];

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < welcomeSequence.length) {
          setWelcomeMessage(welcomeSequence[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          // Don't set isInitializing to false here, let requestMicrophonePermission handle it
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

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || !speechSynthesis) {
      console.error('🎤 Speech synthesis not supported');
      return;
    }

    try {
      console.log('🎤 Attempting to speak:', text);
      setIsSpeaking(true);
      
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for better clarity
      utterance.pitch = 1.1; // Slightly higher pitch for more natural sound
      utterance.volume = 0.9; // Higher volume
      utterance.lang = 'en-US';
      
      // Get available voices and try to use a good one
      const voices = speechSynthesis.getVoices();
      console.log('🎤 Available voices:', voices.length);
      
      if (voices.length > 0) {
        // Try to find a good voice
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Google') || 
          voice.name.includes('Microsoft') ||
          voice.name.includes('Alex') ||
          voice.name.includes('David') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Tom')
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
          console.log('🎤 Using voice:', preferredVoice.name);
        } else {
          // Use the first available voice
          utterance.voice = voices[0];
          console.log('🎤 Using fallback voice:', voices[0].name);
        }
      } else {
        console.warn('🎤 No voices available');
        setIsSpeaking(false);
        return;
      }
      
      utterance.onstart = () => {
        console.log('🎤 Speech started');
      };
      
      utterance.onend = () => {
        console.log('🎤 Speech ended');
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('🎤 Speech error:', event);
        setIsSpeaking(false);
      };
      
      // Ensure speech synthesis is not paused
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      }
      
      // Add a small delay to ensure everything is ready
      setTimeout(() => {
        try {
          speechSynthesis.speak(utterance);
        } catch (speakError) {
          console.error('🎤 Error starting speech:', speakError);
          setIsSpeaking(false);
        }
      }, 100);
      
    } catch (error) {
      console.error('🎤 Error in speakText:', error);
      setIsSpeaking(false);
    }
  };



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
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
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






    </>
  );
};

export default AutoVoiceAI; 