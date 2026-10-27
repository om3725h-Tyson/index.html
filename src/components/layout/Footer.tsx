import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-slate-950/90 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">
            STARDATE: 2026.1027 // SECTOR-001 // SOL-3
          </div>
          <div className="text-xs text-slate-500">
            &copy; 2026 OM. Engineered with React, Vite, Tailwind CSS, Framer Motion, and HTML5 Canvas.
          </div>
        </div>

        <a
          href="#hero"
          className="px-4 py-2 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-2"
        >
          <span>↑ PROPULSION JUMP TO TOP</span>
        </a>
      </div>
    </footer>
  );
};

