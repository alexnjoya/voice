import { portfolioData } from '@/data/portfolio';
import { Code, Terminal, Zap } from 'lucide-react';

const Skills = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-400 border-green-500/50 bg-green-500/10';
      case 'Advanced':
        return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
      case 'Intermediate':
        return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
      default:
        return 'text-gray-400 border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <section id="skills" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-mono flex items-center justify-center gap-3">
            <Code className="h-8 w-8" />
            $ skills --list
          </h2>
          <p className="text-lg text-green-300 max-w-2xl mx-auto font-mono">
            Here are the technologies and tools I work with to build exceptional digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {portfolioData.skills.map((skill, index) => (
            <div
              key={index}
              className="terminal-bg rounded-lg p-4 group text-center font-mono hover:border-green-400 transition-colors"
            >
                              <h3 className="font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                {skill.name}
              </h3>
              <span className={`inline-block px-3 py-1 rounded border text-xs font-medium ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
        
        {/* Skills Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-300 font-mono">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-300 font-mono">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-yellow-300 font-mono">Intermediate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;