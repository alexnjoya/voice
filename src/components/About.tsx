import { portfolioData } from '@/data/portfolio';
import { Terminal, Code, Rocket, Target } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-mono flex items-center justify-center gap-3">
            <Terminal className="h-8 w-8" />
            $ about_alex
          </h2>
          
          <div className="prose prose-lg mx-auto">
            <div className="terminal-bg rounded-lg p-6 mb-8">
              <p className="text-lg md:text-xl text-green-400 leading-relaxed font-mono">
                {portfolioData.personal.bio}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="terminal-bg rounded-lg p-6">
                                 <h3 className="text-xl font-semibold mb-4 text-white font-mono flex items-center gap-2">
                   <Target className="h-5 w-5" />
                   FOCUS_AREAS
                 </h3>
                                   <ul className="text-green-300 space-y-2 text-left font-mono">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Large Language Models (LLMs)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Frontend Engineering & UI/UX
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Smart Contract Development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      AI/ML Application Development
                    </li>
                  </ul>
              </div>
              
              <div className="terminal-bg rounded-lg p-6">
                                 <h3 className="text-xl font-semibold mb-4 text-white font-mono flex items-center gap-2">
                   <Rocket className="h-5 w-5" />
                   CURRENT_GOALS
                 </h3>
                                   <ul className="text-green-300 space-y-2 text-left font-mono">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Growing FineTun-ai as a leading AI platform
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Building innovative blockchain applications
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Contributing to the AI/ML ecosystem
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">{'>'}</span>
                      Mentoring upcoming developers
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;