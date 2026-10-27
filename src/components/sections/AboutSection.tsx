import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block mb-3">
          // SECTOR 02. FLIGHT LOGS
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Commander Dossier</h2>
        <p className="text-slate-400 text-base">Decrypted telemetry records detailing core engineering principles and flight milestones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Wing: Commander Badge */}
        <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.5)] text-center relative overflow-hidden group hover:border-cyan-500/50 transition-all">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute -inset-2 rounded-full border border-dashed border-cyan-400/40 animate-spin" style={{ animationDuration: '25s' }}></div>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-5xl shadow-[0_0_25px_rgba(34,211,238,0.4)]">
              🚀
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-1">{PORTFOLIO_DATA.profile.name}</h3>
          <p className="font-mono text-xs text-cyan-400 tracking-wider mb-6">{PORTFOLIO_DATA.profile.rank}</p>

          <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-xs text-left">
            <div className="flex justify-between">
              <span className="text-slate-400">COORDINATES</span>
              <span className="text-white font-medium">{PORTFOLIO_DATA.profile.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">FLIGHT STATUS</span>
              <span className="text-emerald-400 font-medium">Active Deployment Ready</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">PRIMARY CORE</span>
              <span className="text-white font-medium">React • Canvas • TypeScript</span>
            </div>
          </div>
        </div>

        {/* Right Wing: Narrative & Orbital Metrics HUD */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            Pioneering the Frontiers of Interactive Web Architecture
          </h3>
          <p className="text-slate-300 text-base leading-relaxed">
            {PORTFOLIO_DATA.profile.originStory}
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            {PORTFOLIO_DATA.profile.philosophy}
          </p>

          {/* Metrics HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {PORTFOLIO_DATA.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/40 border border-cyan-500/20 backdrop-blur-md flex items-center gap-4 hover:border-cyan-400 hover:bg-slate-900/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-xl border border-cyan-500/20">
                  {idx === 0 ? '⏱️' : idx === 1 ? '🛰️' : idx === 2 ? '🛡️' : '⚡'}
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-heading">
                    {metric.prefix}{metric.value}{metric.suffix}
                  </div>
                  <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

