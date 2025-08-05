# Alex Njoya - Portfolio with Voice AI

A modern, professional portfolio website featuring an AI-powered voice assistant that can answer questions about Alex's background, experience, and projects.

## ✨ Features

### 🎤 Voice AI Assistant
- **OpenAI Whisper Integration**: Real-time voice transcription using OpenAI's Whisper model
- **Auto-Initialization**: AI assistant automatically starts when users land on the page
- **MacBook Terminal Effect**: Professional terminal interface with typing animations
- **Smart Conversation**: AI learns from Alex's CV and provides intelligent responses
- **Fallback Support**: Browser speech recognition as backup

### 🎨 Modern Design
- **Professional UI**: Clean, modern interface with gradient effects
- **Responsive Design**: Works perfectly on all devices
- **Smooth Animations**: Engaging user experience with smooth transitions
- **Terminal Aesthetic**: MacBook-style terminal for tech-forward impression

### 🤖 AI Capabilities
The voice AI can answer questions about:
- Alex's background and education
- Work experience and current role at FineTun-ai
- Technical skills and technologies
- Projects and portfolio
- Contact information and availability
- References and recommendations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alex-njoya-folio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend servers
   npm run dev:full
   
   # Or start them separately:
   npm run server  # Backend API (port 3001)
   npm run dev     # Frontend (port 8080)
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🎯 Voice AI Setup

### OpenAI API Configuration
1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Add it to your `.env` file
3. The voice AI will automatically use Whisper for transcription

### Testing Voice Features
1. Click the "Start Voice Chat" button
2. Allow microphone access when prompted
3. Speak naturally - the AI will transcribe and respond
4. Try asking questions like:
   - "Tell me about Alex"
   - "What's his experience?"
   - "What are his skills?"
   - "Tell me about FineTun-ai"

## 🛠️ Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** for components
- **Lucide React** for icons

### Backend
- **Express.js** server
- **OpenAI API** for Whisper transcription
- **CORS** enabled for cross-origin requests

### Voice Recognition
- **MediaRecorder API** for audio capture
- **OpenAI Whisper** for transcription
- **Web Speech API** as fallback

## 📁 Project Structure

```
alex-njoya-folio/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Main hero section with terminal
│   │   ├── VoiceModal.tsx        # Voice AI conversation interface
│   │   └── ui/                   # Shadcn/ui components
│   ├── services/
│   │   ├── voiceAI.ts           # AI conversation logic
│   │   └── voiceRecognition.ts  # Voice recognition service
│   └── data/
│       └── portfolio.js         # Portfolio data
├── server.js                    # Express API server
├── package.json
└── vite.config.ts
```

## 🎤 Voice AI Features

### Auto-Initialization
- Terminal animation starts immediately when page loads
- AI assistant automatically opens after terminal sequence
- Professional initialization sequence

### Smart Responses
The AI is trained on Alex's CV and can answer:
- **Background**: Education, current role, experience
- **Skills**: Technical expertise, languages, frameworks
- **Projects**: Tally (voting DApp), AdwumaPa (blockchain platform)
- **Contact**: Email, phone, availability
- **References**: Professional contacts and recommendations

### Conversation Flow
1. User grants microphone permission
2. Voice recording starts with visual feedback
3. Audio sent to OpenAI Whisper for transcription
4. Transcribed text processed by AI service
5. Intelligent response generated based on Alex's CV
6. Conversation history maintained

## 🔧 Customization

### Adding New AI Responses
Edit `src/services/voiceAI.ts` to add new conversation patterns:

```typescript
// Add new pattern matching
if (this.matchesPattern(lowerInput, ['your-pattern'])) {
  return "Your custom response here";
}
```

### Updating CV Data
Modify the `alexCV` object in `src/services/voiceAI.ts` to update:
- Personal information
- Experience
- Skills
- Projects
- References

### Styling Changes
- Terminal appearance: `src/components/Hero.tsx`
- Voice modal: `src/components/VoiceModal.tsx`
- Global styles: `src/index.css`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the dist/ folder
```

### Backend (Railway/Render)
```bash
# Deploy server.js to your preferred platform
# Set environment variables:
# - OPENAI_API_KEY
# - PORT
```

## 📞 Support

For questions or issues:
- Check the browser console for error messages
- Ensure OpenAI API key is properly configured
- Verify microphone permissions are granted
- Test with fallback speech recognition if Whisper fails

## 🎯 Future Enhancements

- [ ] Real-time voice synthesis (text-to-speech)
- [ ] Multi-language support
- [ ] Advanced conversation memory
- [ ] Integration with external APIs
- [ ] Voice commands for navigation
- [ ] Analytics and conversation insights

---

**Built with ❤️ by Alex Njoya**
*Blockchain & Full-Stack Developer*
