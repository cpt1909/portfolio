'use client';

import { useState } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '@/lib/schema';
import { SectionHeading } from './section-heading';
// const filters = ['All projects', 'AI / ML', 'Full stack', 'Open source'] as const;
const filters = ['All projects'] as const;

export function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('All projects');
  const visible = projects.filter((project) => filter === 'All projects' || project.category === filter);
  return <section id="projects" className="section shell"><SectionHeading number="01" label="SELECTED WORK" title="Ideas into existence" description="Experiments, systems, and products. A look at what I build and how I think." />
    <div className="filters" aria-label="Filter projects">{filters.map((item) => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All projects' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div>
    <div className="project-grid" aria-live="polite">{visible.map((project) => <article className="project-card" key={project.id}>
      <div className={`project-visual visual-${project.visual}`} aria-hidden="true"><span className="visual-index">EXPERIMENT_{String(project.order).padStart(2, '0')}</span>{project.visual === 'orbit' ? <div className="mini-orbits"><i /><i /><i /><b>✳</b></div> : project.visual === 'wave' ? <div className="waveform">{Array.from({ length: 31 }, (_, i) => <i key={i} style={{ height: `${18 + Math.abs(Math.sin(i * .7)) * 65 + Math.sin(i * .3) * 12}%` }} />)}</div> : project.visual === 'terminal' ? <div className="code-art"><span>~/agent-kit</span><p><b>const</b> possibilities = <b>await</b></p><p>agent.<em>build</em>({'{'}</p><p>&nbsp; idea: <strong>“what’s next?”</strong></p><p>{'}'});<span className="cursor-block">▌</span></p></div> : <div className="grid-art">[ build something good ]</div>}<span className="visual-corner">↗</span></div>
      <div className="project-body"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={15} /> Code <ArrowUpRight size={14} /></a>}{project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live project <ArrowUpRight size={14} /></a>}{!project.github && !project.live && <span>Project links coming soon <ArrowUpRight size={14} /></span>}</div></div>
    </article>)}</div>{visible.length === 0 && <p className="empty-state">No projects in this category yet. Explore another category.</p>}
  </section>;
}
