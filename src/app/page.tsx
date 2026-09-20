import { getPortfolio } from '@/lib/content';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { AboutJourney } from '@/components/about-journey';
import { Contact } from '@/components/contact';
import { DatabaseStatus } from '@/components/database-status';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export default async function Home() {
  const data = await getPortfolio();
  if (!data) return <DatabaseStatus />;
  return <>{process.env.USE_SAMPLE_DATA === 'true' && <div className="sample-notice">SAMPLE PREVIEW · This content is for demonstration only.</div>}<a className="skip-link" href="#main">Skip to content</a><Navigation name={data.profile.name} /><main id="main"><Hero profile={data.profile} /><div className="ticker"><div className="shell"><span>ARTIFICIAL INTELLIGENCE</span><b>✳</b><span>HUMAN-CENTERED PRODUCTS</span><b>✳</b><span>ENDLESS CURIOSITY</span><b>✳</b><span>ALWAYS BUILDING</span></div></div><Projects projects={data.projects} /><AboutJourney data={data} /><Contact socials={data.socials} /></main><footer className="shell footer"><a className="wordmark" href="#home">{data.profile.name.toLowerCase()}<span className="accent">.</span></a><p>© {new Date().getFullYear()} · Built with curiosity & caffeine.</p><a href="#home">BACK TO TOP ↑</a></footer></>;
}
