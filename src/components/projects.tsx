"use client";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/lib/schema";
import { toProjectView, type ProjectInput } from "@/lib/project-view";
import { ProjectCard } from "./project-card";
export function Projects({
  projects,
}: {
  projects: (Project | ProjectInput)[];
}) {
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [filter]);
  const data = projects.map(toProjectView);
  const categories = ["All", ...new Set(data.map((p) => p.category))];
  const visible =
    filter === "All" ? data : data.filter((p) => p.category === filter);
  return (
    <section id="work" className="work-section">
      <span className="background-word" aria-hidden="true">
        SELECTED WORK
      </span>
      <div className="shell">
        <div className="section-intro">
          <span className="small-label">
            01 / EXPERIMENTS THAT ESCAPED THE LAB
          </span>
          <span>IDEAS → EXECUTION → IMPACT</span>
        </div>
        <div className="work-heading">
          <h2>
            SELECTED{" "}
            <em>
              WORK<span className="accent">_</span>
            </em>
          </h2>
          <span className="work-count">
            [{String(data.length).padStart(2, "0")}]
          </span>
        </div>
        <div className="filters" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category.toUpperCase()}{" "}
              <small>
                {category === "All"
                  ? data.length
                  : data.filter((p) => p.category === category).length}
              </small>
            </button>
          ))}
        </div>
        <div className="project-grid">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        {!visible.length && (
          <p className="empty-state" role="status">
            No transmissions yet. Projects will appear here when published.
          </p>
        )}
        <p className="work-note" aria-live="polite">
          {visible.length} PROJECT{visible.length === 1 ? "" : "S"} IN THE
          SIGNAL / BUILT WITH INTENT, FINISHED WITH A LITTLE CHAOS.
        </p>
      </div>
    </section>
  );
}
