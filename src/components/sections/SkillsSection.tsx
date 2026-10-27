import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-28 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block mb-3">
          // SECTOR 04. ARSENAL
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Technical Reactor Cores</h2>
        <p className="text-slate-400 text-base">
          Core proficiencies categorized by orbital command clusters, equipped with real-time energy gauges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.skillClusters.map((cluster, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-lg">
                ⚡
              </div>
              <h3 className="font-bold text-lg text-white">{cluster.title}</h3>
            </div>

            <div className="space-y-4 flex-grow">
              {cluster.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-cyan-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_8px_#22d3ee]"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

