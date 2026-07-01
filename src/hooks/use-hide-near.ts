import { useEffect, useState } from "react";

/**
 * Watch elements matching `selector` (e.g. `[data-wa-hide]`). Returns true
 * whenever any of them intersects the bottom band of the viewport where the
 * floating WhatsApp CTA sits — signal to hide the CTA.
 */
export function useHideNear(selector: string, bottomBandPx = 140) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const state = new WeakMap<Element, boolean>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) state.set(e.target, e.isIntersecting);
        setHide(nodes.some((n) => state.get(n)));
      },
      {
        // Only consider intersections in a band near the bottom of the viewport
        // where the floating button sits. Top margin is negative to shrink the
        // observed area from the top.
        rootMargin: `-${Math.max(0, window.innerHeight - bottomBandPx)}px 0px 0px 0px`,
        threshold: 0,
      },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [selector, bottomBandPx]);

  return hide;
}

/** Animate a numeric counter when the ref enters the viewport. */
export function useCountUp(target: number, durationMs = 1600) {
  const [value, setValue] = useState(0);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / durationMs);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(target * eased);
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    io.observe(ref);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, target, durationMs]);

  return [value, setRef] as const;
}