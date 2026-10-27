import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-28 pb-16 relative">
      {/* Telemetry Status Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-cyan-500/30 backdrop-blur-md font-mono text-xs text-cyan-300 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.15)] animate-bounce">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
        <span>SYSTEM ONLINE // ALL ENGINES OPERATIONAL</span>
      </div>

      {/* Holographic Headline */}
      <h1 className="font-bold text-4xl sm:text-6xl md:text-7xl max-w-5xl leading-tight tracking-tight mb-6">
        <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
          CRAFTING DIGITAL EXPERIENCES
        </span><br />
        ACROSS THE WEB MULTIVERSE
      </h1>

      {/* Mission Summary */}
      <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
        I am <strong className="text-cyan-300 font-semibold">Om</strong>, an elite Frontend Architect &amp; UI/UX Designer engineering butter-smooth interactive interfaces, cinematic WebGL/Canvas micro-interactions, and high-performance resilient systems.
      </p>

      {/* Dual CTA Actions */}
      <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:-translate-y-0.5 transition-all"
        >
          <span>✨</span>
          <span>EXPLORE EXPEDITIONS</span>
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-sm bg-slate-900/60 backdrop-blur-md border border-cyan-500/20 text-white hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:-translate-y-0.5 transition-all"
        >
          <span>✉️</span>
          <span>INITIATE TRANSMISSION</span>
        </a>
      </div>

      {/* Warp Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 flex flex-col items-center gap-2 font-mono text-[11px] text-slate-500 hover:text-cyan-400 tracking-widest transition-colors"
      >
        <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
        </div>
        <span>SCROLL TO ENGAGE HYPERDRIVE</span>
      </a>
    </section>
  );
};

