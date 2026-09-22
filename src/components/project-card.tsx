"use client";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectView } from "@/lib/project-view";
gsap.registerPlugin(ScrollTrigger);
export function ProjectCard({
  project,
  index,
}: {
  project: ProjectView;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => {
    const tiltElement = tilt.current;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (media.matches || document.documentElement.dataset.motion === "paused")
        return;
      const ctx = gsap.context(() => {
        gsap.from(ref.current, {
          y: 60,
          scale: 0.96,
          opacity: 0,
          duration: 0.7,
          clearProps: "all",
          scrollTrigger: { trigger: ref.current, start: "top 96%", once: true },
        });
      });
      cleanup = () => ctx.revert();
    };
    setup();
    media.addEventListener("change", setup);
    window.addEventListener("motionchange", setup);
    return () => {
      cleanup();
      gsap.killTweensOf(tiltElement);
      media.removeEventListener("change", setup);
      window.removeEventListener("motionchange", setup);
    };
  }, []);
  function move(e: PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused"
    )
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width,
      y = (e.clientY - rect.top) / rect.height;
    gsap.to(tilt.current, {
      rotateX: (0.5 - y) * 10,
      rotateY: (x - 0.5) * 12,
      duration: 0.35,
      overwrite: true,
    });
    e.currentTarget.style.setProperty("--shine-x", x * 100 + "%");
    e.currentTarget.style.setProperty("--shine-y", y * 100 + "%");
  }
  function reset() {
    gsap.to(tilt.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      overwrite: true,
    });
  }
  return (
    <article ref={ref} className="project">
      <div
        ref={tilt}
        className="trading-card"
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <div className="card-meta">
          <span>PROJECT_{String(index + 1).padStart(2, "0")}</span>
          <span>{project.category.toUpperCase()} ↗</span>
        </div>
        <div className={"project-art art-" + (index % 3)}>
          {project.imageURL && !imageFailed ? (
            // Remote MongoDB image hosts are unknown at build time.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageURL}
              alt={project.title + " preview"}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="generated-art" aria-hidden="true">
              <div className="art-orbit" />
              <div className="art-orbit orbit-two" />
              <div className="art-core">
                {index % 3 === 0 ? "✳" : index % 3 === 1 ? "⌘" : "↗"}
              </div>
              <span className="art-code">
                SYS.{String(index + 1).padStart(3, "0")}
                <br />
                IDEA → REALITY
              </span>
              <span className="art-caption">{project.title}</span>
            </div>
          )}
          <span className="holo-label">
            INTERACTIVE OBJECT / {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="card-body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tech-tags">
            {project.stack.map((tech, i) => (
              <span key={tech + i}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={"Open " + project.title + " live"}
              >
                LIVE EXPERIENCE <ArrowUpRight size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={"View " + project.title + " source"}
              >
                <Github size={15} /> SOURCE ↗
              </a>
            )}
            {!project.live && !project.github && (
              <span>TRANSMISSION IN PROGRESS</span>
            )}
          </div>
        </div>
        <div className="card-glare" aria-hidden="true" />
      </div>
    </article>
  );
}
