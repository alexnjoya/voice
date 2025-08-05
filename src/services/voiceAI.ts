import { portfolioData } from '@/data/portfolio';

export interface ConversationMessage {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Alex's CV Data
const alexCV = {
  personal: {
    name: "Alex Njoya",
    phone: "+233 240 027 151",
    email: "njoyaalexander71@gmail.com",
    linkedin: "LinkedIn",
    github: "GitHub"
  },
  profile: "Final-year Computer Science student at the University of Ghana with strong experience in software development, frontend engineering, and blockchain application development. Skilled in building user-friendly interfaces and writing smart contracts using Solidity. Passionate about leveraging technology to solve real-world problems and contribute meaningfully to innovative development teams.",
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Solidity", "React.js", "Nextjs", "Tailwind CSS"],
    blockchain: ["Smart Contracts", "Solidity", "Remix", "Hardhat", "Ethereum"],
    tools: ["Git", "GitHub", "Agile (Scrum, Kanban)", "Debugging", "Testing"],
    problemSolving: "Strong in algorithm design, data structures, and code optimization"
  },
  experience: [
    {
      role: "Co-Founder",
      company: "FineTun-ai",
      period: "Apr 2025 – Present",
      type: "Hybrid",
      achievements: [
        "Co-founded and led the development of a no-code platform enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets",
        "Spearheaded product vision and strategy in a fast-paced startup environment",
        "Focused on simplifying AI customization workflows for non-technical teams and startups"
      ]
    },
    {
      role: "Frontend Developer",
      company: "Next Code Systems / Intent",
      period: "Jan 2024 – Mar 2024",
      achievements: [
        "Built responsive, user-friendly web interfaces using React.js and Tailwind CSS",
        "Worked collaboratively in an agile team to meet product deadlines"
      ]
    },
    {
      role: "Volunteer Frontend Developer",
      company: "Mowblox",
      period: "Mar 2024 – Jun 2024",
      achievements: [
        "Developed clean, functional web pages using modern JavaScript and UI libraries",
        "Participated in UI/UX design improvements and user testing feedback loops"
      ]
    },
    {
      role: "Blockchain Developer",
      company: "MEST Africa",
      period: "Aug 2023 – Oct 2023",
      achievements: [
        "Wrote, tested, and deployed Ethereum-compatible smart contracts using Solidity",
        "Utilized Remix and Hardhat for smart contract development and simulation",
        "Contributed to blockchain-based app prototypes as part of team projects"
      ]
    }
  ],
  education: [
    {
      institution: "University of Ghana, Legon",
      degree: "BSc. Mathematical Science (Computer Science)",
      period: "2022 – 2025"
    },
    {
      institution: "MEST Africa, Accra",
      program: "Web3 Bootcamp",
      period: "Jul 2023 – Sep 2023",
      achievements: [
        "Built decentralized applications (DApps) using Solidity and Ethereum toolkits",
        "Gained hands-on experience with smart contract lifecycle and security best practices"
      ]
    },
    {
      institution: "Udemy (Online Courses)",
      period: "Jul 2023 – Sep 2023",
      courses: [
        "JavaScript: Basic to Advanced – EdYoda Digital University by Qaifi Khan",
        "React: Beginner to Advanced – EdYoda Digital University by Qaifi Khan",
        "Advanced JavaScript Concepts"
      ]
    }
  ],
  projects: [
    {
      name: "Tally – Blockchain-Based Voting DApp",
      type: "Final Year Project",
      description: "A transparent and decentralized voting system using smart contracts"
    },
    {
      name: "AdwumaPa – Blockchain Freelance Platform",
      type: "Stellar Project",
      description: "A Web3 platform helping remote workers get paid securely through crypto. Tackled cross-border payment issues with smart contracts"
    }
  ],
  references: [
    {
      name: "Dr. Aziz Dwumfour",
      title: "Lecturer, University of Ghana",
      phone: "+233 26 054 1219"
    },
    {
      name: "Mr. Rahaman",
      title: "Founder & CEO, BusyAntsde",
      phone: "+233 24 462 2440"
    },
    {
      name: "Mr. Divine Njoya",
      title: "Teacher, Oti Senior High School",
      phone: "+233 46 973 690"
    }
  ]
};

export class VoiceAIService {
  private conversationHistory: ConversationMessage[] = [];
  private context: string[] = [];

  constructor() {
    this.initializeContext();
  }

  private initializeContext() {
    this.context = [
      'Alex Njoya is a final-year Computer Science student at University of Ghana',
      'Expert in JavaScript, TypeScript, Python, Solidity, React.js, Next.js',
      'Co-founder of FineTun-ai - AI platform for LLM fine-tuning',
      'Experienced in blockchain development and smart contracts',
      'Available for remote work and blockchain opportunities'
    ];
  }

  public async processUserInput(input: string): Promise<string> {
    const userMessage: ConversationMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    this.conversationHistory.push(userMessage);

    // Analyze input and generate response
    const response = this.generateResponse(input);
    
    const aiMessage: ConversationMessage = {
      type: 'ai',
      content: response,
      timestamp: new Date()
    };

    this.conversationHistory.push(aiMessage);
    return response;
  }

  private generateResponse(input: string): string {
    const lowerInput = input.toLowerCase();
    
    // Greeting patterns
    if (this.matchesPattern(lowerInput, ['hello', 'hi', 'hey', 'greetings'])) {
      return "Hello! I'm your AI assistant for Alex Njoya. I can help you learn about his background, experience, and projects. What would you like to know?";
    }

    // About Alex patterns
    if (this.matchesPattern(lowerInput, ['tell me about alex', 'who is alex', 'about alex', 'alex background', 'profile'])) {
      return `Alex Njoya is a ${alexCV.education[0].degree} student at ${alexCV.education[0].institution}. ${alexCV.profile} He's currently a Co-Founder at FineTun-ai, where he's building AI solutions for businesses.`;
    }

    // Experience patterns
    if (this.matchesPattern(lowerInput, ['experience', 'work', 'jobs', 'career', 'employment'])) {
      const experienceList = alexCV.experience.map(exp => 
        `• ${exp.role} at ${exp.company} (${exp.period})`
      ).join('\n');
      return `Alex's professional experience includes:\n\n${experienceList}\n\nHis most recent role is as Co-Founder of FineTun-ai, where he's developing AI solutions for businesses.`;
    }

    // Skills patterns
    if (this.matchesPattern(lowerInput, ['skills', 'technologies', 'expertise', 'languages', 'frameworks'])) {
      const languages = alexCV.skills.languages.join(', ');
      const blockchain = alexCV.skills.blockchain.join(', ');
      return `Alex's technical skills include:\n\nLanguages & Frameworks: ${languages}\n\nBlockchain: ${blockchain}\n\nTools: ${alexCV.skills.tools.join(', ')}\n\nProblem-Solving: ${alexCV.skills.problemSolving}`;
    }

    // Projects patterns
    if (this.matchesPattern(lowerInput, ['projects', 'built', 'portfolio', 'applications', 'work'])) {
      const projectList = alexCV.projects.map(p => 
        `• ${p.name} (${p.type}): ${p.description}`
      ).join('\n');
      return `Alex has worked on several impressive projects:\n\n${projectList}\n\nHis current focus is on AI and blockchain development.`;
    }

    // Education patterns
    if (this.matchesPattern(lowerInput, ['education', 'degree', 'university', 'school', 'studies'])) {
      const educationList = alexCV.education.map(edu => 
        `• ${edu.institution}: ${edu.degree || edu.program} (${edu.period})`
      ).join('\n');
      return `Alex's education includes:\n\n${educationList}`;
    }

    // Contact patterns
    if (this.matchesPattern(lowerInput, ['contact', 'email', 'phone', 'reach', 'get in touch', 'hire'])) {
      return `You can reach Alex at:\n\n📧 Email: ${alexCV.personal.email}\n📱 Phone: ${alexCV.personal.phone}\n\nHe's available for:\n• Remote software development projects\n• Blockchain and smart contract development\n• Frontend engineering roles\n• AI/ML development opportunities`;
    }

    // FineTun-ai patterns
    if (this.matchesPattern(lowerInput, ['finetun', 'finetun-ai', 'ai', 'llm', 'startup'])) {
      return `Alex is currently the Co-Founder of FineTun-ai, a startup focused on enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets. The platform simplifies AI customization workflows for non-technical teams and startups.`;
    }

    // Blockchain patterns
    if (this.matchesPattern(lowerInput, ['blockchain', 'smart contract', 'solidity', 'ethereum', 'web3'])) {
      return `Alex has extensive blockchain experience, including:\n\n• Smart contract development with Solidity\n• Ethereum development using Remix and Hardhat\n• Building DApps and DeFi applications\n• Web3 bootcamp training at MEST Africa\n\nHe's worked on projects like Tally (voting DApp) and AdwumaPa (blockchain freelance platform).`;
    }

    // References patterns
    if (this.matchesPattern(lowerInput, ['references', 'recommendations', 'referees'])) {
      const refList = alexCV.references.map(ref => 
        `• ${ref.name} - ${ref.title} (${ref.phone})`
      ).join('\n');
      return `Alex's references include:\n\n${refList}`;
    }

    // Help patterns
    if (this.matchesPattern(lowerInput, ['help', 'what can you do', 'capabilities', 'assist'])) {
      return `I can help you learn about Alex Njoya! Here's what I can tell you about:\n\n• Alex's background and education\n• His work experience and current role at FineTun-ai\n• Technical skills and technologies\n• Projects and portfolio\n• Contact information and availability\n• References and recommendations\n\nJust ask me anything about Alex!`;
    }

    // Default response
    return "I'm here to help you learn about Alex Njoya! Try asking about his background, experience, skills, projects, or how to contact him. You can also ask me about his current work at FineTun-ai or his blockchain experience.";
  }

  private matchesPattern(input: string, patterns: string[]): boolean {
    return patterns.some(pattern => input.includes(pattern));
  }

  public getConversationHistory(): ConversationMessage[] {
    return [...this.conversationHistory];
  }

  public clearHistory(): void {
    this.conversationHistory = [];
  }

  public getQuickQuestions(): string[] {
    return [
      "Tell me about Alex",
      "What's his experience?",
      "What are his skills?",
      "Tell me about FineTun-ai",
      "What projects has he built?",
      "How can I contact him?"
    ];
  }
}

// Singleton instance
export const voiceAI = new VoiceAIService(); 