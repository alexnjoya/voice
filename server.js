const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Voice AI API is running' });
});

// Transcribe audio endpoint
app.post('/api/transcribe', async (req, res) => {
  try {
    const { audio, model = 'whisper-1' } = req.body;

    if (!audio) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        message: 'Please set OPENAI_API_KEY environment variable'
      });
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audio, 'base64');

    // Create a file object for OpenAI
    const file = new File([audioBuffer], 'audio.wav', { type: 'audio/wav' });

    // Transcribe with OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: model,
      response_format: 'text'
    });

    res.json({ 
      text: transcription,
      model: model,
      success: true 
    });

  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ 
      error: 'Failed to transcribe audio',
      message: error.message 
    });
  }
});

// Fallback endpoint for testing
app.post('/api/transcribe-fallback', (req, res) => {
  // Simulate transcription for testing
  const { audio } = req.body;
  
  if (!audio) {
    return res.status(400).json({ error: 'Audio data is required' });
  }

  // Simulate processing delay
  setTimeout(() => {
    res.json({ 
      text: "Tell me about Alex",
      model: 'whisper-1',
      success: true,
      fallback: true
    });
  }, 1000);
});

app.listen(port, () => {
  console.log(`🎤 Voice AI API server running on port ${port}`);
  console.log(`📝 Health check: http://localhost:${port}/api/health`);
  console.log(`🎯 Transcribe: http://localhost:${port}/api/transcribe`);
}); 