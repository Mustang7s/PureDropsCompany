import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling (same feel as the reference site):
 * inertia-based wheel/touch scrolling with easing.
 * Disabled automatically when the user prefers reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      anchors: { offset: -80 },
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.documentElement.classList.add("lenis-active");

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-active");
    };
  }, []);
}
