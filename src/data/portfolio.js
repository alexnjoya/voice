// Portfolio data - easily replaceable with API calls later
export const portfolioData = {
  personal: {
    name: "Alex Njoya",
    title: "Blockchain & Full-Stack Developer",
    tagline: "Building decentralized solutions with code and creativity.",
    email: "alex.njoya@example.com",
    location: "Remote",
    bio: "Passionate blockchain and full-stack developer with expertise in building decentralized applications and modern web solutions. I combine technical excellence with creative problem-solving to deliver innovative digital experiences."
  },
  
  skills: [
    { name: "JavaScript/TypeScript", level: "Expert" },
    { name: "React.js", level: "Expert" },
    { name: "Node.js", level: "Advanced" },
    { name: "Solidity", level: "Advanced" },
    { name: "Web3.js/Ethers.js", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "Smart Contracts", level: "Advanced" },
    { name: "DeFi Development", level: "Advanced" },
    { name: "Next.js", level: "Advanced" },
    { name: "MongoDB", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "AWS/Cloud", level: "Intermediate" }
  ],
  
  projects: [
    {
      id: 1,
      title: "DeFi Yield Farm",
      description: "A decentralized yield farming platform built with Solidity and React. Features staking, rewards distribution, and LP token management.",
      tech: ["Solidity", "React", "Web3.js", "Hardhat"],
      link: "https://github.com/alexnjoya/defi-yield-farm",
      demo: "https://defi-yield-farm.vercel.app",
      status: "Live"
    },
    {
      id: 2,
      title: "NFT Marketplace",
      description: "Full-stack NFT marketplace with minting, trading, and auction features. Built with modern web technologies and IPFS storage.",
      tech: ["Next.js", "Solidity", "IPFS", "Ethers.js"],
      link: "https://github.com/alexnjoya/nft-marketplace",
      demo: "https://nft-marketplace-demo.vercel.app",
      status: "Live"
    },
    {
      id: 3,
      title: "Crypto Portfolio Tracker",
      description: "Real-time cryptocurrency portfolio tracking application with advanced analytics and DeFi protocol integration.",
      tech: ["React", "Node.js", "MongoDB", "CoinGecko API"],
      link: "https://github.com/alexnjoya/crypto-tracker",
      demo: "https://crypto-tracker-demo.netlify.app",
      status: "Beta"
    },
    {
      id: 4,
      title: "DAO Governance Platform",
      description: "Decentralized governance platform for DAOs with proposal creation, voting mechanisms, and treasury management.",
      tech: ["Solidity", "TypeScript", "Graph Protocol", "React"],
      link: "https://github.com/alexnjoya/dao-governance",
      demo: null,
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
      name: "Twitter",
      url: "https://twitter.com/alexnjoya",
      icon: "Twitter"
    }
  ]
};

// Placeholder function for voice conversation feature
export const startVoiceConversation = () => {
  console.log("🎤 Voice conversation feature will be implemented here!");
  alert("Voice conversation feature coming soon! This will enable AI-powered voice interactions.");
};