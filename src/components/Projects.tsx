import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

const Projects = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
      case 'Beta':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30';
      case 'Development':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects showcasing blockchain development and full-stack solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project) => (
            <div
              key={project.id}
              className="bg-card rounded-2xl p-6 border border-border card-hover group"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              {/* Project Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Project Links */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(project.link, '_blank')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </Button>
                
                {project.demo && (
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary-hover"
                    onClick={() => window.open(project.demo, '_blank')}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* View More Projects */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com/alexnjoya', '_blank')}
            className="px-8 py-4 text-lg font-medium rounded-full border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            <Github className="mr-3 h-5 w-5" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;