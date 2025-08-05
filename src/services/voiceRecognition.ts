// Type declarations for speech recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
  onaudioend: (() => void) | null;
  onsoundstart: (() => void) | null;
  onsoundend: (() => void) | null;
  onspeechstart: (() => void) | null;
  onspeechend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

export interface VoiceRecognitionResult {
  text: string;
  confidence: number;
  isFinal: boolean;
}

export type RecognitionStatus = 'idle' | 'starting' | 'listening' | 'processing' | 'error' | 'permission-denied';

export class VoiceRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isRecording = false;
  private onTranscriptionComplete: ((text: string) => void) | null = null;
  private status: RecognitionStatus = 'idle';
  private onStatusChange: ((status: RecognitionStatus) => void) | null = null;

  constructor() {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    } else {
      console.warn('Speech recognition not supported in this browser');
      this.status = 'error';
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      console.log('🎤 Speech recognition started');
      this.status = 'listening';
      this.updateStatus();
    };

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      const confidence = event.results[0][0].confidence;
      console.log('🎤 Transcribed text:', transcript, 'Confidence:', confidence);
      
      this.status = 'processing';
      this.updateStatus();
      
      if (this.onTranscriptionComplete) {
        this.onTranscriptionComplete(transcript);
      }
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error, event.message);
      this.isRecording = false;
      
      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          this.status = 'permission-denied';
          break;
        case 'no-speech':
          console.log('No speech detected');
          this.status = 'idle';
          break;
        case 'audio-capture':
          this.status = 'error';
          break;
        default:
          this.status = 'error';
      }
      
      this.updateStatus();
      
      if (this.onTranscriptionComplete) {
        this.onTranscriptionComplete('');
      }
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      this.status = 'idle';
      this.updateStatus();
      console.log('🎤 Speech recognition ended');
    };

    this.recognition.onaudiostart = () => {
      console.log('🎤 Audio capture started');
    };

    this.recognition.onaudioend = () => {
      console.log('🎤 Audio capture ended');
    };

    this.recognition.onsoundstart = () => {
      console.log('🎤 Sound detected');
    };

    this.recognition.onsoundend = () => {
      console.log('🎤 Sound ended');
    };

    this.recognition.onspeechstart = () => {
      console.log('🎤 Speech detected');
    };

    this.recognition.onspeechend = () => {
      console.log('🎤 Speech ended');
    };
  }

  private updateStatus(): void {
    if (this.onStatusChange) {
      this.onStatusChange(this.status);
    }
  }

  public async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      console.log('🎤 Microphone permission granted');
      return true;
    } catch (error) {
      console.error('🎤 Microphone permission denied:', error);
      this.status = 'permission-denied';
      this.updateStatus();
      return false;
    }
  }

  public async startRecording(onComplete?: (text: string) => void, onStatusChange?: (status: RecognitionStatus) => void): Promise<void> {
    try {
      if (!this.recognition) {
        throw new Error('Speech recognition not supported');
      }

      // Request microphone permission first
      const hasPermission = await this.requestMicrophonePermission();
      if (!hasPermission) {
        throw new Error('Microphone permission denied');
      }

      this.onTranscriptionComplete = onComplete || null;
      this.onStatusChange = onStatusChange || null;
      this.isRecording = true;
      this.status = 'starting';
      this.updateStatus();
      
      this.recognition.start();
      console.log('🎤 Voice recording started');
    } catch (error) {
      console.error('Error starting voice recording:', error);
      this.isRecording = false;
      this.status = 'error';
      this.updateStatus();
      throw error;
    }
  }

  public stopRecording(): void {
    if (this.recognition && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      this.status = 'idle';
      this.updateStatus();
      console.log('🎤 Voice recording stopped');
    }
  }

  public isSupported(): boolean {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    return !!SpeechRecognition;
  }

  public getRecordingState(): boolean {
    return this.isRecording;
  }

  public getStatus(): RecognitionStatus {
    return this.status;
  }

  public resetStatus(): void {
    this.status = 'idle';
    this.updateStatus();
  }
}

// Singleton instance
export const voiceRecognition = new VoiceRecognitionService(); 