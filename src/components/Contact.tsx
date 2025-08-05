import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/data/portfolio';

const Contact = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return Github;
      case 'Linkedin':
        return Linkedin;
      case 'Twitter':
        return Twitter;
      default:
        return Mail;
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your blockchain project to life? Let's discuss how we can build something amazing together.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a 
                      href={`mailto:${portfolioData.personal.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p className="text-muted-foreground">{portfolioData.personal.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="font-medium text-foreground mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {portfolioData.social.map((social, index) => {
                    const IconComponent = getIcon(social.icon);
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(social.url, '_blank')}
                        className="p-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                      >
                        <IconComponent className="h-5 w-5" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* CTA Section */}
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Whether you need a DeFi protocol, NFT marketplace, or full-stack web application, 
                I'm here to help bring your vision to reality.
              </p>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl"
                  onClick={() => window.open(`mailto:${portfolioData.personal.email}?subject=Project Inquiry`, '_blank')}
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Send me an Email
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://calendly.com/alexnjoya', '_blank')}
                    className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    📅 Schedule Call
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://github.com/alexnjoya', '_blank')}
                    className="rounded-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  >
                    💼 View Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;