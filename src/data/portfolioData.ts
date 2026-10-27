export interface Project {
  id: string;
  title: string;
  category: 'web' | 'creative' | 'ai';
  categoryLabel: string;
  description: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  metrics?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; proficiency: number }[];
}

export interface Metric {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Om",
    callsign: "CODE.NAV",
    rank: "Lead Frontend Architect & UI/UX Designer",
    location: "Sol-3 (Earth) / Remote Worldwide",
    email: "om.cosmic.dev@galaxy.orbit",
    status: "Active Flight Ready // Accepting Contracts",
    originStory: "For over half a decade, I have navigated the outer boundaries of frontend engineering. I bridge the gap between rigorous technical precision and mesmerizing artistic expression, treating every web application as a voyage of discovery.",
    philosophy: "Whether architecting hardware-accelerated HTML5 Canvas simulations, designing intuitive glassmorphic design systems, or tuning millisecond render cycles, my mission is singular: to build digital environments that captivate users and perform with unflinching reliability."
  },

  metrics: [
    { label: "Lightyears of Experience", value: 5, prefix: "+", suffix: " YRS", icon: "Clock" },
    { label: "Successful Deployments", value: 35, prefix: "+", suffix: " MISSIONS", icon: "Rocket" },
    { label: "Quantum System Uptime", value: 99.9, suffix: "%", icon: "ShieldCheck" },
    { label: "Synthesized Clean Code", value: 150, prefix: "+", suffix: "k LOC", icon: "Code2" }
  ],

  projects: [
    {
      id: "hyperion",
      title: "Hyperion Nebula Analytics",
      category: "web",
      categoryLabel: "SECTOR: ANALYTICS",
      description: "Next-generation telemetry dashboard visualizing petabyte-scale event streams with real-time WebGL particle graphs, sub-millisecond render updates, and glassmorphic telemetry cards.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "WebGL"],
      demoUrl: "#projects",
      githubUrl: "https://github.com"
    },
    {
      id: "stellaris",
      title: "Stellaris AI Copilot",
      category: "ai",
      categoryLabel: "SECTOR: ARTIFICIAL INTELLIGENCE",
      description: "Cosmic autonomous assistant powered by LLM streaming, dynamic interactive neural audio waveforms, voice synthesis, and real-time contextual code generation.",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Web Audio API"],
      demoUrl: "#projects",
      githubUrl: "https://github.com"
    },
    {
      id: "orbitron",
      title: "Orbitron 3D Solar Sandbox",
      category: "creative",
      categoryLabel: "SECTOR: 3D SIMULATION",
      description: "Interactive celestial mechanics simulator calculating gravitational N-body interactions, custom GLSL atmospheric scattering shaders, and real-time orbital trajectory paths.",
      tags: ["Three.js", "GLSL Shaders", "Canvas API", "React"],
      demoUrl: "#projects",
      githubUrl: "https://github.com"
    },
    {
      id: "quantum-relay",
      title: "Quantum Relay Protocol",
      category: "web",
      categoryLabel: "SECTOR: DISTRIBUTED SYSTEMS",
      description: "Ultra-fast peer-to-peer decentralized file transmitter utilizing WebRTC data channels, end-to-end cryptographic encryption, and zero-server transmission pipelines.",
      tags: ["WebRTC", "React.js", "Node.js", "Cryptography"],
      demoUrl: "#projects",
      githubUrl: "https://github.com"
    }
  ],

  skillClusters: [
    {
      title: "Frontend Flight Deck",
      iconName: "Layout",
      skills: [
        { name: "React.js & Next.js", proficiency: 96 },
        { name: "TypeScript", proficiency: 92 },
        { name: "Tailwind CSS & Modern CSS", proficiency: 98 },
        { name: "HTML5 Semantic Architecture", proficiency: 99 }
      ]
    },
    {
      title: "Motion & Canvas Propulsion",
      iconName: "Sparkles",
      skills: [
        { name: "HTML5 Canvas API", proficiency: 94 },
        { name: "Framer Motion", proficiency: 95 },
        { name: "Three.js / WebGL", proficiency: 85 },
        { name: "Micro-Interactions & Spring Physics", proficiency: 95 }
      ]
    },
    {
      title: "Systems & Architecture",
      iconName: "Cpu",
      skills: [
        { name: "Node.js & Serverless APIs", proficiency: 88 },
        { name: "Vite, Webpack & Tooling", proficiency: 92 },
        { name: "Git & Deployment Pipelines", proficiency: 93 },
        { name: "Lighthouse & FPS Optimization", proficiency: 97 }
      ]
    },
    {
      title: "Holographic UI/UX",
      iconName: "Compass",
      skills: [
        { name: "Figma Prototyping", proficiency: 92 },
        { name: "Glassmorphism & Neumorphism", proficiency: 98 },
        { name: "Design Systems Architecture", proficiency: 94 },
        { name: "Accessibility (WCAG AAA)", proficiency: 96 }
      ]
    }
  ],

  socialLinks: [
    { name: "GitHub", url: "https://github.com", icon: "Github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { name: "Twitter", url: "https://twitter.com", icon: "Twitter" }
  ]
};

