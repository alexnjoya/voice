import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark/terminal mode
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Always use dark/terminal mode
    setDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleDarkMode = () => {
    // Keep terminal mode always on
    setDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'ABOUT', id: 'about' },
    { name: 'SKILLS', id: 'skills' },
    { name: 'PROJECTS', id: 'projects' },
    { name: 'CONTACT', id: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-green-500/30 font-mono">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="font-bold text-xl text-green-400 cursor-pointer flex items-center gap-2" onClick={() => scrollToSection('hero')}>
            <Terminal className="h-6 w-6" />
            <span className="terminal-cursor">alex@njoya:~$</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-green-400 hover:text-green-300 transition-colors duration-200 font-mono text-sm"
              >
                ./{item.name.toLowerCase()}
              </button>
            ))}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 text-green-400 hover:text-green-300"
            >
              <Terminal className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 text-green-400 hover:text-green-300"
            >
              <Terminal className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-green-400 hover:text-green-300"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-green-500/30">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-green-400 hover:text-green-300 transition-colors duration-200 font-mono text-sm"
                >
                  ./{item.name.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;