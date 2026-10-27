import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'web' | 'creative' | 'ai'>('all');

  const filteredProjects = PORTFOLIO_DATA.projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  return (
    <section id="projects" className="py-28 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 inline-block mb-3">
          // SECTOR 03. EXPEDITIONS
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Orbital Expeditions</h2>
        <p className="text-slate-400 text-base">
          Interactive space capsule modules showcasing flagship missions, 3D simulations, and deep space web applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        {[
          { key: 'all', label: 'All Systems' },
          { key: 'web', label: 'Web Applications' },
          { key: 'creative', label: 'Creative & 3D' },
          { key: 'ai', label: 'AI Systems' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-5 py-2 rounded-full font-mono text-xs transition-all ${
              filter === tab.key
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30'
            } border`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Capsule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="p-7 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:-translate-y-2 transition-all flex flex-col group"
          >
            {/* Visual Header */}
            <div className="relative w-full h-52 rounded-xl bg-slate-950 border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/20 via-slate-900/40 to-purple-900/20"></div>
              <span className="text-5xl group-hover:scale-110 transition-transform">🛰️</span>
              <div className="absolute top-3 right-3 font-mono text-[10px] text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
                {project.categoryLabel}
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-5 pt-4 border-t border-white/10 font-mono text-xs">
              <a
                href={project.demoUrl}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>Flight Demo</span>
                <span>↗</span>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Data Vault</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

