// Type declarations for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface VoiceRecognitionResult {
  text: string;
  confidence: number;
  isFinal: boolean;
}

export class VoiceRecognitionService {
  private recognition: any = null;
  private isRecording = false;
  private onTranscriptionComplete: ((text: string) => void) | null = null;

  constructor() {
    // Check if browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('🎤 Transcribed text:', transcript);
      
      if (this.onTranscriptionComplete) {
        this.onTranscriptionComplete(transcript);
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      this.isRecording = false;
      
      if (this.onTranscriptionComplete) {
        this.onTranscriptionComplete('');
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      console.log('🎤 Speech recognition ended');
    };
  }

  public async startRecording(onComplete?: (text: string) => void): Promise<void> {
    try {
      if (!this.recognition) {
        throw new Error('Speech recognition not supported');
      }

      this.onTranscriptionComplete = onComplete || null;
      this.isRecording = true;
      
      this.recognition.start();
      console.log('🎤 Voice recording started');
    } catch (error) {
      console.error('Error starting voice recording:', error);
      this.isRecording = false;
      throw error;
    }
  }

  public stopRecording(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      console.log('🎤 Voice recording stopped');
    }
  }

  public isSupported(): boolean {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    return !!SpeechRecognition;
  }

  public getRecordingState(): boolean {
    return this.isRecording;
  }
}

// Singleton instance
export const voiceRecognition = new VoiceRecognitionService(); 