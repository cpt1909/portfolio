import { getPortfolio } from "@/lib/content";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { AboutJourney } from "@/components/about-journey";
import { Contact } from "@/components/contact";
import { DatabaseStatus } from "@/components/database-status";
import { Motion } from "@/components/motion";
import { BootScreen } from "@/components/boot-screen";
import { GlitchCursor } from "@/components/glitch-cursor";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export default async function Home() {
  const data = await getPortfolio();
  if (!data) return <DatabaseStatus />;
  return (
    <>
      {process.env.USE_SAMPLE_DATA === "true" && (
        <div className="sample-notice">
          SAMPLE PREVIEW · Demonstration content
        </div>
      )}
      <BootScreen name={data.profile.name} />
      <GlitchCursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation name={data.profile.name} />
      <main id="main">
        <Hero profile={data.profile} />
        <div className="signal-strip" aria-hidden="true">
          <span>CREATIVE CODE</span>✳<span>HUMAN IDEAS</span>✳
          <span>DIGITAL POSSIBILITIES</span>✳<span>CONTROLLED CHAOS</span>✳
        </div>
        <Projects projects={data.projects} />
        <AboutJourney data={data} />
        <Contact socials={data.socials} />
      </main>
      <footer className="footer shell">
        <a href="#home">
          {data.profile.name.toLowerCase()}
          <span>✳</span>
        </a>
        <p>© {new Date().getFullYear()} / MADE OF CURIOSITY & CODE.</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
      <Motion />
    </>
  );
}
