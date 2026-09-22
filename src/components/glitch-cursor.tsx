"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export function GlitchCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (
        !media.matches ||
        document.documentElement.dataset.motion === "paused"
      )
        return;
      const cursor = ref.current!;
      let target: HTMLElement | null = null;
      const clear = () => {
        if (target) {
          target.classList.remove("glitch-hover");
          target = null;
        }
      };
      const x = gsap.quickTo(cursor, "x", { duration: 0.16 }),
        y = gsap.quickTo(cursor, "y", { duration: 0.16 });
      const move = (event: PointerEvent) => {
        document.documentElement.dataset.cursor = "on";
        let px = event.clientX,
          py = event.clientY;
        const next = (event.target as HTMLElement).closest<HTMLElement>(
          "a,button,summary",
        );
        if (next !== target) {
          clear();
          target = next;
          target?.classList.add("glitch-hover");
          cursor.dataset.interactive = String(Boolean(target));
        }
        if (target) {
          const r = target.getBoundingClientRect();
          px += (r.left + r.width / 2 - px) * 0.2;
          py += (r.top + r.height / 2 - py) * 0.2;
        }
        x(px);
        y(py);
        gsap.to(cursor, {
          opacity: 1,
          scale: target ? 2.6 : 1,
          duration: 0.2,
          overwrite: "auto",
        });
      };
      const leave = () => {
        clear();
        gsap.set(cursor, { opacity: 0 });
        delete document.documentElement.dataset.cursor;
      };
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerleave", leave);
      window.addEventListener("blur", leave);
      cleanup = () => {
        clear();
        x.tween.kill();
        y.tween.kill();
        gsap.killTweensOf(cursor);
        gsap.set(cursor, { opacity: 0 });
        delete document.documentElement.dataset.cursor;
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerleave", leave);
        window.removeEventListener("blur", leave);
      };
    };
    setup();
    media.addEventListener("change", setup);
    window.addEventListener("motionchange", setup);
    return () => {
      cleanup();
      media.removeEventListener("change", setup);
      window.removeEventListener("motionchange", setup);
    };
  }, []);
  return <div className="custom-cursor" ref={ref} aria-hidden="true" />;
}
