import { portfolioData } from '@/data/portfolio';

const About = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text">
            About Me
          </h2>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              {portfolioData.personal.bio}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">🎯 Focus Areas</h3>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• Decentralized Finance (DeFi) Protocols</li>
                  <li>• Smart Contract Development</li>
                  <li>• Full-Stack Web Applications</li>
                  <li>• Blockchain Integration</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">🚀 Current Goals</h3>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• Building innovative DeFi solutions</li>
                  <li>• Contributing to Web3 ecosystem</li>
                  <li>• Mentoring upcoming developers</li>
                  <li>• Exploring AI integration in blockchain</li>
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