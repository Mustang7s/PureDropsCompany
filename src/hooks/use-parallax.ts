import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// ---------------------------------------------------------------------------
// Global parallax-enabled store
// ---------------------------------------------------------------------------
// Source of truth lives outside React so the hooks below and the UI toggle
// stay in sync. Defaults to OFF when the user has `prefers-reduced-motion`,
// otherwise ON. The user's explicit choice (via the toggle) is persisted to
// localStorage and overrides the OS preference.

const STORAGE_KEY = "pure-drops:parallax-enabled";
const listeners = new Set<() => void>();
let enabled = true;
let initialized = false;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "true" || stored === "false") {
    enabled = stored === "true";
  } else {
    enabled = !prefersReducedMotion();
  }

  // Track OS-level changes while the user has no explicit override.
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener?.("change", (e) => {
    if (window.localStorage.getItem(STORAGE_KEY) !== null) return;
    enabled = !e.matches;
    listeners.forEach((l) => l());
  });
}

function subscribe(l: () => void) {
  init();
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  init();
  return enabled;
}

function getServerSnapshot() {
  return true;
}

export function setParallaxEnabled(next: boolean, remember = true) {
  init();
  enabled = next;
  if (remember && typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, String(next));
  }
  listeners.forEach((l) => l());
}

export function useParallaxEnabled(): [boolean, (next: boolean) => void] {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return [value, (next: boolean) => setParallaxEnabled(next)];
}

/**
 * Apply a translateY parallax transform to the returned ref based on the
 * element's position in the viewport. `speed` is the fraction of scroll
 * distance to translate; positive values move the element up as the user
 * scrolls down (foreground feel), negative values move it down (background).
 */
export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T | null>(null);
  const isEnabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    if (!isEnabled) {
      el.style.transform = "";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // distance from the viewport center, normalized roughly to [-1, 1]
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const offset = -progress * speed * 100;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, isEnabled]);

  return ref;
}

/**
 * Fade + slide-in when the element scrolls into view. Adds the
 * `is-revealed` class once intersecting.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const isEnabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    if (!isEnabled) {
      el.classList.add("is-revealed");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isEnabled]);

  return ref;
}