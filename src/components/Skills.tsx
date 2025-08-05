import { portfolioData } from '@/data/portfolio';

const Skills = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
      case 'Advanced':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30';
      case 'Intermediate':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to build exceptional digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {portfolioData.skills.map((skill, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-4 border border-border card-hover group text-center"
            >
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {skill.name}
              </h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </div>
          ))}
        </div>
        
        {/* Skills Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Expert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Intermediate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;