import { useEffect, useRef, useSyncExternalStore } from "react";

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

/**
 * Detect low-capability environments where smooth parallax is unlikely to
 * perform well. Conservative: only returns true when we have a strong signal.
 * - Save-Data hint enabled by user
 * - Slow effective network (2g / slow-2g)
 * - Very low device memory (<= 1 GB)
 * - Very low CPU core count (<= 2) on a coarse pointer (typical low-end mobile)
 * - Missing IntersectionObserver / requestAnimationFrame (older browsers)
 */
function isLowCapabilityDevice() {
  if (typeof window === "undefined") return false;
  // Older browsers: no rAF or no IntersectionObserver → fall back to static.
  if (
    typeof window.requestAnimationFrame !== "function" ||
    typeof window.IntersectionObserver === "undefined"
  ) {
    return true;
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };
  const conn = nav.connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && /^(slow-2g|2g)$/.test(conn.effectiveType)) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory > 0 && nav.deviceMemory <= 1) return true;
  const cores = typeof nav.hardwareConcurrency === "number" ? nav.hardwareConcurrency : 0;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
  if (cores && cores <= 2 && coarse) return true;
  return false;
}

export function parallaxSupported() {
  if (typeof window === "undefined") return false;
  return !isLowCapabilityDevice();
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const lowCap = isLowCapabilityDevice();
  if (stored === "true" || stored === "false") {
    // Respect explicit user choice, but never enable on browsers that
    // physically can't run the effect (no rAF / no IntersectionObserver).
    const userWants = stored === "true";
    enabled =
      userWants &&
      typeof window.requestAnimationFrame === "function" &&
      typeof window.IntersectionObserver !== "undefined";
  } else {
    enabled = !prefersReducedMotion() && !lowCap;
  }

  // Track OS-level changes while the user has no explicit override.
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener?.("change", (e) => {
    if (window.localStorage.getItem(STORAGE_KEY) !== null) return;
    enabled = !e.matches && !isLowCapabilityDevice();
    listeners.forEach((l) => l());
  });

  // React to network/save-data changes (if available) while no override is set.
  const nav = navigator as Navigator & {
    connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
  };
  nav.connection?.addEventListener?.("change", () => {
    if (window.localStorage.getItem(STORAGE_KEY) !== null) return;
    enabled = !prefersReducedMotion() && !isLowCapabilityDevice();
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

// ---------------------------------------------------------------------------
// Per-section parallax store
// ---------------------------------------------------------------------------
// Each section that uses parallax registers itself with a stable key + label.
// Users can toggle individual sections from the UI, and useParallax/useReveal
// will only run when BOTH the global toggle AND the section toggle are on.

const SECTION_STORAGE_KEY = "pure-drops:parallax-sections";
const sectionListeners = new Set<() => void>();
const sectionMeta = new Map<string, string>(); // key -> label
const sectionState = new Map<string, boolean>(); // key -> enabled
let sectionInitialized = false;
let sectionsSnapshot: ReadonlyArray<{ key: string; label: string; enabled: boolean }> = [];

function rebuildSectionsSnapshot() {
  sectionsSnapshot = Array.from(sectionMeta.entries()).map(([key, label]) => ({
    key,
    label,
    enabled: sectionState.get(key) ?? true,
  }));
}

function loadSectionState() {
  if (sectionInitialized || typeof window === "undefined") return;
  sectionInitialized = true;
  try {
    const raw = window.localStorage.getItem(SECTION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      for (const [k, v] of Object.entries(parsed)) sectionState.set(k, !!v);
    }
  } catch {
    /* ignore corrupt storage */
  }
}

function persistSectionState() {
  if (typeof window === "undefined") return;
  const obj: Record<string, boolean> = {};
  for (const [k, v] of sectionState.entries()) obj[k] = v;
  try {
    window.localStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(obj));
  } catch {
    /* ignore quota errors */
  }
}

function notifySections() {
  rebuildSectionsSnapshot();
  sectionListeners.forEach((l) => l());
}

function registerSection(key: string, label: string) {
  loadSectionState();
  const hadKey = sectionMeta.has(key);
  sectionMeta.set(key, label);
  if (!sectionState.has(key)) sectionState.set(key, true);
  if (!hadKey) notifySections();
}

export function setSectionParallaxEnabled(key: string, next: boolean) {
  loadSectionState();
  if (sectionState.get(key) === next) return;
  sectionState.set(key, next);
  persistSectionState();
  notifySections();
}

function subscribeSections(l: () => void) {
  loadSectionState();
  sectionListeners.add(l);
  return () => sectionListeners.delete(l);
}
function getSectionsSnapshot() {
  return sectionsSnapshot;
}
function getSectionsServerSnapshot() {
  return sectionsSnapshot;
}

/** List of all sections that have registered themselves, with current enabled state. */
export function useParallaxSections() {
  return useSyncExternalStore(subscribeSections, getSectionsSnapshot, getSectionsServerSnapshot);
}

/** Returns whether a given section's parallax is currently on (does NOT register). */
function getSectionEnabled(key: string) {
  loadSectionState();
  return sectionState.get(key) ?? true;
}

function subscribeSectionKey(key: string) {
  return (l: () => void) => {
    loadSectionState();
    const wrapped = () => l();
    sectionListeners.add(wrapped);
    return () => sectionListeners.delete(wrapped);
  };
}

/**
 * Register a section and subscribe to its enabled state. Use this if you want
 * to read or toggle a single section from a component.
 */
export function useSectionParallax(key: string, label: string): [boolean, (next: boolean) => void] {
  useEffect(() => {
    registerSection(key, label);
  }, [key, label]);
  const enabledForSection = useSyncExternalStore(
    subscribeSectionKey(key),
    () => getSectionEnabled(key),
    () => true,
  );
  return [enabledForSection, (next: boolean) => setSectionParallaxEnabled(key, next)];
}

/**
 * Apply a translateY parallax transform to the returned ref based on the
 * element's position in the viewport. `speed` is the fraction of scroll
 * distance to translate; positive values move the element up as the user
 * scrolls down (foreground feel), negative values move it down (background).
 *
 * Optionally pass `{ section: { key, label } }` to bind this element to a
 * named section so users can toggle it independently from the UI.
 */
export function useParallax<T extends HTMLElement>(
  speed = 0.15,
  options?: { section?: { key: string; label: string } },
) {
  const ref = useRef<T | null>(null);
  const globalEnabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const section = options?.section;
  useEffect(() => {
    if (section) registerSection(section.key, section.label);
  }, [section?.key, section?.label]);
  const sectionEnabled = useSyncExternalStore(
    section ? subscribeSectionKey(section.key) : () => () => {},
    () => (section ? getSectionEnabled(section.key) : true),
    () => true,
  );
  const isEnabled = globalEnabled && sectionEnabled;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    if (!isEnabled) {
      el.style.transform = "";
      return;
    }

    // Guard for legacy browsers — degrade to a static element.
    if (
      typeof window.requestAnimationFrame !== "function" ||
      typeof window.IntersectionObserver === "undefined"
    ) {
      el.style.transform = "";
      return;
    }

    // Only run the rAF loop while the element is actually in the viewport.
    // This avoids burning CPU on off-screen sections — a meaningful win on
    // low-end devices with many parallax targets.
    let inView = false;
    let frame = 0;
    let lastFrameAt = 0;
    let slowFrames = 0;
    let disabledForPerf = false;
    // Cap updates to ~30fps on devices that show signs of jank.
    const MIN_FRAME_MS = 1000 / 30;

    const update = () => {
      frame = 0;
      const now = performance.now();
      // If a frame took >50ms, count it as slow. 5 slow frames in a row →
      // give up and leave the element static for the rest of the session.
      if (lastFrameAt && now - lastFrameAt > 50) {
        slowFrames += 1;
        if (slowFrames >= 5) {
          disabledForPerf = true;
          el.style.transform = "";
          return;
        }
      } else {
        slowFrames = 0;
      }
      lastFrameAt = now;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // distance from the viewport center, normalized roughly to [-1, 1]
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const offset = -progress * speed * 100;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    let throttleAt = 0;
    const onScroll = () => {
      if (frame || !inView || disabledForPerf) return;
      const now = performance.now();
      if (now - throttleAt < MIN_FRAME_MS) return;
      throttleAt = now;
      frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
        }
        if (inView && !disabledForPerf) update();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
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

    // No IntersectionObserver (very old browsers) → just reveal immediately.
    if (!isEnabled || typeof window.IntersectionObserver === "undefined") {
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