"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
export function Motion() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};
    let firstEntrance = true;
    const setup = () => {
      cleanup();
      if (media.matches || document.documentElement.dataset.motion === "paused")
        return;
      const lenis = new Lenis({
        duration: 1.15,
        // Lenis reads the root scroll-padding, including the sticky header offset.
        anchors: true,
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const ctx = gsap.context(() => {
        if (firstEntrance)
          gsap.from(".hero-copy, .signal-panel", {
            y: 35,
            opacity: 0,
            duration: 1,
            delay: 1.35,
            stagger: 0.13,
            clearProps: "all",
          });
        gsap.utils
          .toArray<HTMLElement>(
            ".work-heading, .about-section h2, .about-body, .journey-title, .experience-list, .credentials-section article, .playground-section h2, .tool, .contact-title, .contact-bottom",
          )
          .forEach((el, i) =>
            gsap.from(el, {
              x: i % 2 ? 35 : -35,
              y: 22,
              opacity: 0,
              duration: 0.8,
              clearProps: "all",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }),
          );
        gsap.to(".background-word", {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".signal-note", {
          y: -14,
          ease: "none",
          scrollTrigger: {
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
      firstEntrance = false;
      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };
    // Reading progress remains useful with animation paused or reduced.
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--reading-progress",
        String(max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0),
      );
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    setup();
    media.addEventListener("change", setup);
    window.addEventListener("motionchange", setup);
    return () => {
      cleanup();
      media.removeEventListener("change", setup);
      window.removeEventListener("motionchange", setup);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);
  return null;
}
