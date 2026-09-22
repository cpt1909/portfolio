"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
export function BootScreen({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const title = ref.current!.querySelector("strong")!;
      const progress = { value: 0 };
      gsap.set(ref.current, { display: "flex" });
      gsap
        .timeline()
        .to(progress, {
          value: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            title.textContent = name
              .toUpperCase()
              .split("")
              .map((c, i) =>
                i < progress.value * name.length
                  ? c
                  : "01#$%/+"[Math.floor(Math.random() * 7)],
              )
              .join("");
          },
        })
        .to(".boot-bar span", { scaleX: 1, duration: 1 }, 0)
        .to(
          ref.current,
          { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.in" },
          1,
        )
        .set(ref.current, { display: "none" });
    }, ref);
    return () => ctx.revert();
  }, [name]);
  return (
    <div ref={ref} className="boot-screen" aria-hidden="true">
      <span>INITIALIZING HUMAN INTERFACE_</span>
      <strong>{name}</strong>
      <div className="boot-bar">
        <span />
      </div>
      <span>LOADING IDEAS / BREAKING CONVENTIONS</span>
    </div>
  );
}
