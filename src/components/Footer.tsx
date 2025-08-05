import { Github, Linkedin, Twitter, Terminal } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-500/30 py-8">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-2 text-green-400 font-mono mb-4 md:mb-0">
            <Terminal className="h-5 w-5" />
            <span>alex@njoya:~$</span>
            <span className="text-green-300">// 2024</span>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {portfolioData.social.map((social, index) => {
              const getIcon = (iconName: string) => {
                switch (iconName) {
                  case 'Github':
                    return Github;
                  case 'Linkedin':
                    return Linkedin;
                  case 'Twitter':
                    return Twitter;
                  default:
                    return Github;
                }
              };
              
              const IconComponent = getIcon(social.icon);
              
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  <IconComponent className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
        
        {/* Terminal-style status */}
        <div className="mt-6 text-center">
          <p className="text-green-300 font-mono text-sm">
            <span className="text-green-500">$</span> echo "Built with React, TypeScript & Tailwind CSS"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;