import { portfolioData } from '@/data/portfolio';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center">
          {/* Logo */}
          <div className="font-bold text-2xl gradient-text mb-4">
            {portfolioData.personal.name}
          </div>
          
          {/* Tagline */}
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {portfolioData.personal.tagline}
          </p>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {portfolioData.personal.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;