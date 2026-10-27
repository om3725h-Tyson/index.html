import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ORIGIN', href: '#hero', index: '01.' },
    { label: 'DOSSIER', href: '#about', index: '02.' },
    { label: 'EXPEDITIONS', href: '#projects', index: '03.' },
    { label: 'ARSENAL', href: '#skills', index: '04.' },
    { label: 'TRANSMISSION', href: '#contact', index: '05.' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'h-16 bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
          : 'h-20 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Top-Left Primary Brand Element */}
        <a href="#hero" className="flex items-center gap-3 group text-decoration-none">
          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
            <span className="absolute -inset-1 rounded-full border border-cyan-400 animate-ping opacity-60"></span>
          </div>
          <span className="font-bold text-xl tracking-wider bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
            OM
          </span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 tracking-widest uppercase">
            CODE.NAV
          </span>
        </a>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-xs tracking-wider transition-colors relative py-1 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-cyan-400 opacity-70 mr-1">{link.index}</span>
              {link.label}
              {activeSection === link.href.replace('#', '') && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_#22d3ee]"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAudioActive(!audioActive)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
              audioActive
                ? 'border-cyan-400 text-cyan-400 bg-cyan-500/10 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                : 'border-white/10 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-300'
            }`}
          >
            <span>📡</span>
            <span>{audioActive ? 'AUDIO: ON' : 'AUDIO: OFF'}</span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:scale-105 transition-all"
          >
            <span>INITIALIZE</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
};

