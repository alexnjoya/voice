import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { voiceAI, ConversationMessage } from '@/services/voiceAI';
import { voiceRecognition } from '@/services/voiceRecognition';

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
  }, []);

  const requestMicrophonePermission = async () => {
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
  };

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
             {/* Floating Voice AI Button */}
       <div className="fixed bottom-6 right-6 z-50">
         <Button
           onClick={toggleListening}
           disabled={isProcessing || isInitializing || isSpeaking}
           className={`w-20 h-20 rounded-full ${
             isListening
               ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-red-500/50'
               : isSpeaking
               ? 'bg-blue-500 shadow-blue-500/50 animate-pulse'
               : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 shadow-blue-500/30'
           } text-white shadow-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-110 border-2 border-white/20`}
         >
           {isListening ? (
             <div className="flex items-center justify-center">
               <MicOff className="h-10 w-10" />
               <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
             </div>
           ) : isSpeaking ? (
             <div className="flex items-center justify-center">
               <Volume2 className="h-10 w-10 animate-pulse" />
               <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping"></div>
               <div className="absolute inset-2 rounded-full border-2 border-blue-200 animate-ping" style={{ animationDelay: '0.2s' }}></div>
               <div className="absolute inset-4 rounded-full border-2 border-blue-100 animate-ping" style={{ animationDelay: '0.4s' }}></div>
             </div>
           ) : (
             <div className="flex items-center justify-center">
               <Mic className="h-10 w-10" />
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
             </div>
           )}
         </Button>
       </div>





             {/* Permission Status */}
       {hasPermission === false && (
         <div className="fixed bottom-24 right-6 z-50">
           <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-xs">
             <p className="text-sm text-red-600 dark:text-red-400">
               Microphone permission denied. Please allow microphone access to use voice features.
             </p>
           </div>
         </div>
       )}

       {/* Ready to Listen Indicator */}
       {hasPermission && !isListening && !isProcessing && !isSpeaking && (
         <div className="fixed bottom-28 right-6 z-50">
           <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 max-w-xs">
             <p className="text-sm text-green-600 dark:text-green-400">
               Click to start voice conversation
             </p>
           </div>
         </div>
       )}

       {/* AI Speaking Indicator */}
       {isSpeaking && (
         <div className="fixed bottom-28 right-6 z-50">
           <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 max-w-xs">
             <div className="flex items-center gap-2">
               <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
               <p className="text-sm text-blue-600 dark:text-blue-400">
                 AI is speaking...
               </p>
             </div>
           </div>
         </div>
       )}
    </>
  );
};

export default AutoVoiceAI; 