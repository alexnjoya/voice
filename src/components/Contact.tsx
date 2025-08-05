import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { portfolioData } from '@/data/portfolio';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding bg-black">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-mono flex items-center justify-center gap-3">
            <Terminal className="h-8 w-8" />
            $ contact --init
          </h2>
                     <p className="text-lg text-green-300 max-w-2xl mx-auto font-mono">
             Ready to collaborate? Let's connect and build something amazing together.
           </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="terminal-bg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-6 font-mono">
                CONTACT_INFO
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-green-300 font-mono text-sm">Email</p>
                    <a 
                      href={`mailto:${portfolioData.personal.email}`}
                      className="text-green-400 hover:text-green-300 transition-colors font-mono"
                    >
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-green-300 font-mono text-sm">Phone</p>
                    <a 
                      href={`tel:+233240027151`}
                      className="text-green-400 hover:text-green-300 transition-colors font-mono"
                    >
                      +233 240 027 151
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-green-300 font-mono text-sm">Location</p>
                    <p className="text-green-400 font-mono">
                      {portfolioData.personal.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="terminal-bg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-6 font-mono">
                AVAILABILITY
              </h3>
                             <div className="space-y-2">
                 <p className="text-green-300 font-mono">
                   <span className="text-green-500">{'>'}</span> Remote work opportunities
                 </p>
                 <p className="text-green-300 font-mono">
                   <span className="text-green-500">{'>'}</span> Frontend development projects
                 </p>
                 <p className="text-green-300 font-mono">
                   <span className="text-green-500">{'>'}</span> Smart contract development
                 </p>
                 <p className="text-green-300 font-mono">
                   <span className="text-green-500">{'>'}</span> AI/ML application development
                 </p>
               </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="terminal-bg rounded-lg p-6">
                         <h3 className="text-xl font-semibold text-white mb-6 font-mono">
               SEND_MESSAGE
             </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-green-300 text-sm font-mono mb-2">
                  NAME
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="terminal-input"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-green-300 text-sm font-mono mb-2">
                  EMAIL
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="terminal-input"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-green-300 text-sm font-mono mb-2">
                  MESSAGE
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="terminal-input min-h-[120px]"
                  placeholder="Enter your message"
                />
              </div>
              
              <Button
                type="submit"
                className="terminal-button w-full flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                SEND_MESSAGE
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;