// Portfolio data - easily replaceable with API calls later
export const portfolioData = {
  personal: {
    name: "Alex Njoya",
    title: "AI & Machine Learning Engineer",
    tagline: "Building intelligent solutions with cutting-edge AI technologies.",
    email: "njoyaalexander71@gmail.com",
    location: "Remote",
    bio: "Final-year Computer Science student at the University of Ghana with strong experience in software development, frontend engineering, and AI application development. Co-founder of FineTun-ai, a platform enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets. Passionate about leveraging AI technology to solve real-world problems and contribute meaningfully to innovative development teams."
  },
  
  skills: [
    { name: "JavaScript/TypeScript", level: "Expert" },
    { name: "React.js", level: "Expert" },
    { name: "Next.js", level: "Advanced" },
    { name: "Python", level: "Advanced" },
    { name: "Solidity", level: "Advanced" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "Smart Contracts", level: "Advanced" },
    { name: "Large Language Models", level: "Advanced" },
    { name: "AI/ML Development", level: "Advanced" },
    { name: "Git & GitHub", level: "Expert" },
    { name: "Agile (Scrum, Kanban)", level: "Advanced" },
    { name: "Problem-Solving", level: "Expert" },
    { name: "Algorithm Design", level: "Advanced" },
    { name: "Data Structures", level: "Advanced" },
    { name: "Code Optimization", level: "Advanced" },
    { name: "Testing & Debugging", level: "Advanced" }
  ],
  
  projects: [
    {
      id: 1,
      title: "FineTun-ai Platform",
      description: "Co-founded and led the development of a no-code platform enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets. Spearheaded product vision and strategy in a fast-paced startup environment.",
      tech: ["React.js", "Python", "LLMs", "AI/ML", "No-code Platform"],
      link: "https://github.com/alexnjoya/finetun-ai",
      demo: "https://finetun-ai.com",
      status: "Live"
    },
    {
      id: 2,
      title: "Crop Disease Prediction Platform",
      description: "AI-powered platform for predicting crop diseases using machine learning and computer vision. Built with modern web technologies and deployed on Vercel for real-time disease detection and agricultural insights.",
      tech: ["React.js", "Python", "Machine Learning", "Computer Vision", "Vercel"],
      link: "https://github.com/alexnjoya/crop-disease-prediction",
      demo: "https://client-blockdevrel.vercel.app/",
      status: "Live"
    },
    {
      id: 3,
      title: "Remifi - Cross-Platform Remittance",
      description: "Cross-platform remittance solution for stable coins, enabling secure and fast international money transfers using blockchain technology. Built with modern web technologies and deployed on Vercel.",
      tech: ["React.js", "Blockchain", "Stable Coins", "Web3", "Vercel"],
      link: "https://github.com/alexnjoya/remifi-remittance",
      demo: "https://remifi.xyz/",
      status: "Live"
    },
    {
      id: 4,
      title: "Tally - Blockchain Voting DApp",
      description: "A transparent and decentralized voting system using smart contracts. Built as a final year project demonstrating blockchain technology for democratic processes.",
      tech: ["Solidity", "React.js", "Ethereum", "Smart Contracts", "Web3"],
      link: "https://github.com/alexnjoya/tally-voting-dapp",
      demo: "https://tally-client-phi.vercel.app/",
      status: "Live"
    },
    {
      id: 5,
      title: "AdwumaPa - Blockchain Freelance Platform",
      description: "A Web3 platform helping remote workers get paid securely through crypto. Tackled cross-border payment issues with smart contracts and blockchain technology.",
      tech: ["Solidity", "React.js", "Ethereum", "Crypto Payments", "Web3"],
      link: "https://github.com/alexnjoya/adwumapa-platform",
      demo: "https://adwumapa-platform.vercel.app",
      status: "Live"
    },
    {
      id: 6,
      title: "AI-Powered Voice Assistant",
      description: "Advanced voice recognition and natural language processing system with real-time speech-to-text and intelligent response generation using modern AI technologies.",
      tech: ["Python", "React.js", "Speech Recognition", "NLP", "AI/ML"],
      link: "https://github.com/alexnjoya/ai-voice-assistant",
      demo: "https://ai-voice-assistant.vercel.app",
      status: "Development"
    }
  ],
  
  social: [
    {
      name: "GitHub",
      url: "https://github.com/alexnjoya",
      icon: "Github"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/alexnjoya",
      icon: "Linkedin"
    },
    {
      name: "Phone",
      url: "tel:+233240027151",
      icon: "Phone"
    }
  ]
};

// Placeholder function for voice conversation feature
export const startVoiceConversation = () => {
  console.log("🎤 Voice conversation feature will be implemented here!");
  alert("Voice conversation feature coming soon! This will enable AI-powered voice interactions.");
};