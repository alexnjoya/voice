import { portfolioData } from '@/data/portfolio';
import { ExternalLink, Github, FolderOpen, Code } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-mono flex items-center justify-center gap-3">
            <FolderOpen className="h-8 w-8" />
            $ ls projects/
          </h2>
          <p className="text-lg text-green-300 max-w-2xl mx-auto font-mono">
            Here are some of the projects I've built to showcase my skills and passion for development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="terminal-bg rounded-lg p-6 font-mono hover:border-green-400 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-green-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
                              <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Code className="h-4 w-4" />
                <span>Status: {project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;