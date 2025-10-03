import { useState, useEffect, useMemo } from 'react';
import { Mic, ArrowDown, Terminal, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';
import AutoVoiceAI from './AutoVoiceAI';

const Hero = () => {
  const [terminalText, setTerminalText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Terminal options for clicking
  const terminalOptions = [
    "Tell me about Alex",
    "What's his AI experience?",
    "What are his ML skills?",
    "Tell me about FineTun-ai",
    "What AI projects has he built?",
    "How can I contact him?"
  ];

  // Terminal animation sequence - moved to useMemo to fix dependency warning
  const terminalLines = useMemo(() => [
    'Initializing AI Assistant...',
    'Voice recognition system loaded',
    'Personal data synchronized',
    'Connecting to conversation engine...',
    'AI Assistant ready!',
    '',
    `Hello! I'm your AI assistant for Alex Njoya`,
    `I can help you learn about Alex's AI & machine learning expertise`,
    `Click any option below or use the voice button to start:`,
    `Ready to assist you!`
  ], []);

  useEffect(() => {
    // Start terminal animation after a short delay
    const timer = setTimeout(() => {
      setShowTerminal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showTerminal) return;

    const interval = setInterval(() => {
      if (currentLine < terminalLines.length) {
        setTerminalText(prev => prev + terminalLines[currentLine] + '\n');
        setCurrentLine(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [currentLine, showTerminal, terminalLines]);

  const handleTerminalOptionClick = (option: string) => {
    setSelectedOption(option);
         // Simulate typing the option
     setTerminalText(prev => prev + `\nUser: ${option}\n`);
     
     // Simulate AI response
     setTimeout(() => {
       let response = '';
       switch (option) {
        case "Tell me about Alex":
          response = "Alex Njoya is a Computer Science graduate from the University of Ghana with strong experience in software development, frontend engineering, and AI application development. He's the Co-Founder of FineTun-ai, a platform enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets.";
           break;
         case "What's his AI experience?":
           response = "Alex co-founded FineTun-ai in April 2025, leading the development of a no-code platform for LLM fine-tuning. He has experience as Frontend Developer at Next Code Systems, Volunteer Frontend Developer at Mowblox, and Blockchain Developer at MEST Africa.";
           break;
         case "What are his ML skills?":
           response = "Alex's skills include JavaScript, TypeScript, Python, React.js, Next.js, Tailwind CSS, Solidity, Smart Contracts, Git, Agile methodologies, and AI/ML development with focus on Large Language Models.";
           break;
         case "Tell me about FineTun-ai":
           response = "FineTun-ai is a startup co-founded by Alex in April 2025, focused on enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets. He spearheaded product vision and strategy in this fast-paced startup environment.";
           break;
         case "What AI projects has he built?":
           response = "Alex has built FineTun-ai Platform (AI company), Crop Disease Prediction Platform (AI/ML), Remifi (Cross-platform Remittance), Tally (Blockchain Voting DApp), AdwumaPa (Blockchain Freelance Platform), and is developing an AI-Powered Voice Assistant - all innovative applications combining blockchain and AI technologies.";
           break;
         case "How can I contact him?":
           response = "You can reach Alex at njoyaalexander71@gmail.com or +233 240 027 151. He's available for remote work and AI/ML development opportunities.";
           break;
         default:
           response = "I'm here to help you learn about Alex Njoya!";
       }
       setTerminalText(prev => prev + `AI: ${response}\n`);
       setSelectedOption(null);
     }, 1000);
  };

  return (
    <>
      <section id="hero" className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden bg-black">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto container-padding text-center relative z-10">
                                        {/* MacBook Terminal Effect */}
              <div className="mt-20 mb-12 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="bg-black rounded-lg shadow-2xl overflow-hidden border border-green-500/30">
                 {/* Terminal Header */}
                 <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-green-500/30">
                   <div className="flex items-center space-x-2">
                     <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                     <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                   </div>
                   <div className="flex items-center space-x-2 text-green-400 text-sm font-mono">
                     <Terminal className="w-4 h-4" />
                     <span>AI Assistant Terminal</span>
                   </div>
                   <div className="w-20"></div>
                 </div>
                 
                 {/* Terminal Content */}
                 <div className="bg-black p-4 sm:p-6 h-64 sm:h-80 overflow-hidden">
                   <div className="font-mono text-xs sm:text-sm text-green-400 leading-relaxed text-left">
                     <pre className="whitespace-pre-wrap text-left">{terminalText}</pre>
                     {showTerminal && currentLine < terminalLines.length && (
                       <span className="animate-pulse">█</span>
                     )}
                   </div>
                 </div>

                                 {/* Terminal Options */}
                 {showTerminal && currentLine >= terminalLines.length && (
                   <div className="bg-gray-800 p-3 sm:p-4 border-t border-green-500/30">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                       {terminalOptions.map((option, index) => (
                         <Button
                           key={index}
                           variant="outline"
                           size="sm"
                           onClick={() => handleTerminalOptionClick(option)}
                           disabled={selectedOption !== null}
                           className="text-xs h-8 bg-gray-700 border-green-500/30 text-green-400 hover:bg-gray-600 hover:text-green-300 font-mono"
                         >
                           {option}
                         </Button>
                       ))}
                     </div>
                   </div>
                 )}
              </div>
            </div>

            {/* Enhanced Voice CTA */}
            <div className="mb-8">
              <div className="relative inline-block">
              
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-green-400 font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 font-mono">
                  <Mic className="w-4 h-4" />
                  <span>Voice Recognition</span>
                </div>
                <div className="flex items-center gap-2 text-green-400 font-mono">
                  <Terminal className="w-4 h-4" />
                  <span>Real-time Processing</span>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>
      
                    {/* Auto Voice AI */}
       <AutoVoiceAI />
    </>
  );
};

export default Hero;