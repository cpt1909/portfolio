import { ArrowDownToLine, ArrowUpRight, Plus } from 'lucide-react';
import type { Portfolio } from '@/lib/schema';

export function AboutJourney({ data }: { data: Portfolio }) {
  return <>
    <section id="about" className="about-section">
      <div className="section-intro"><span className="small-label">02 / THE HUMAN PART</span><span className="about-spark" aria-hidden="true">✳</span></div>
      <h2>A curious mind.<br />A builder’s <em>instinct.</em></h2>
      <div className="about-body"><div className="about-note"><span className="handwritten">Always asking<br />“what if?”</span><svg viewBox="0 0 90 70" fill="none" aria-hidden="true"><path d="M4 3C65-6 10 65 80 52m-15-9 17 9-14 12" stroke="currentColor" strokeWidth="2" /></svg></div><div className="about-copy"><p>{data.profile.about}</p><div className="skill-pills">{data.profile.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>{data.profile.resumeUrl ? <a className="round-link" href={data.profile.resumeUrl} target="_blank" rel="noopener noreferrer">The longer story / Résumé <span><ArrowDownToLine size={19} /></span></a> : <p className="muted">Résumé coming soon.</p>}</div></div>
    </section>
    <section id="experience" className="journey-section">
      <div className="journey-title"><span className="small-label">03 / THE JOURNEY</span><h2>Never<br /><em>standing still.</em></h2><p>The people, places, and experiences<br />that shape how I build.</p></div>
      <div className="experience-list">{data.experience.map((entry,index) => <details key={entry.id} open={index === 0}><summary><span className="experience-index">0{index + 1}</span><div><span className="small-label">{entry.period}</span><h3>{entry.title}</h3><p>{entry.organization}</p></div><Plus size={20} /></summary><div className="experience-description">{entry.description || `${entry.organization} · ${entry.period}`}</div></details>)}{!data.experience.length && <p>The next chapter is taking shape.</p>}</div>
    </section>
    <section className="credentials-section">
      <div id="education"><span className="small-label">THE FOUNDATIONS</span>{data.education.map((entry) => <article key={entry.id}><span className="credential-period">{entry.period}</span><h3>{entry.title}</h3><p>{entry.organization}</p>{entry.description && entry.description !== entry.organization && <p className="credential-description">{entry.description}</p>}</article>)}{!data.education.length && <p>Updates coming soon.</p>}</div>
      <div id="achievements"><span className="small-label">LITTLE MILESTONES, BIG MEANING</span>{data.achievements.map((entry) => <article key={entry.id}><span className="credential-period">{entry.period}<ArrowUpRight size={18} /></span><h3>{entry.title}</h3><p>{entry.organization}</p>{entry.description && entry.description !== entry.organization && <p className="credential-description">{entry.description}</p>}</article>)}{!data.achievements.length && <p>More milestones to come.</p>}</div>
    </section>
    <section id="stack" className="playground-section"><div className="section-intro"><span className="small-label">04 / THE PLAYGROUND</span><span>GOOD TOOLS. LIMITLESS POSSIBILITIES.</span></div><h2>Serious tools.<br /><em>Playful thinking.</em><span aria-hidden="true">↘</span></h2><div className="tool-cloud">{data.technologies.map((tech,index) => <div className={`tool tool-${index % 3}`} key={tech.id}><span className="tool-symbol">{tech.symbol}</span><div><h3>{tech.name}</h3><p>{tech.category}</p></div><span className="tool-plus" aria-hidden="true">+</span></div>)}</div>{!data.technologies.length && <p>New tools are on the way.</p>}</section>
  </>;
}

