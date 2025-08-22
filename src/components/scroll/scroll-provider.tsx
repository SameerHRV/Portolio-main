"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive enhancement ScrollProvider for Locomotive Scroll (v4+)
 * - Enables smooth inertia scroll on desktop only (mobile/tablet native by default)
 * - Respects prefers-reduced-motion (disables smoothing/parallax)
 * - Preserves accessibility: hash links, focus management, tab order, skip links
 * - Exposes direction, utilities (update/scrollTo/stop/destroy)
 * - Optional GSAP ScrollTrigger scrollerProxy integration (auto-detected)
 * - Fallback IntersectionObserver reveal for no-JS/reduced-motion
 */

type LocoInstance = any;

type ScrollToOptionsEx = {
  duration?: number;
  offset?: number;
  disableLerp?: boolean;
};

type ScrollContextValue = {
  containerRef: React.RefObject<HTMLDivElement>;
  instance: LocoInstance | null;
  direction: "up" | "down";
  isSmooth: boolean;
  isReducedMotion: boolean;
  isCoarsePointer: boolean;
  update: () => void;
  scrollTo: (target: number | string | Element, opts?: ScrollToOptionsEx) => void;
  stop: () => void;
  start: () => void;
  destroy: () => void;
};

const ScrollContext = React.createContext<ScrollContextValue | null>(null);

export function useScroll() {
  const ctx = React.useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useScroll must be used within <ScrollProvider>");
  }
  return ctx;
}

type ProviderProps = {
  children: React.ReactNode;
  /** Enable smooth on coarse pointers too (defaults to false for mobile/tablet) */
  enableCoarseSmooth?: boolean;
  /** Lerp factor when smooth (default 0.08) */
  lerp?: number;
  /** Duration for programmatic scrollTo (ms) */
  defaultDuration?: number;
  /** Offset for hash/anchor scroll (e.g., fixed header height) */
  defaultOffset?: number;
};

export function ScrollProvider({
  children,
  enableCoarseSmooth = false,
  lerp = 0.08,
  defaultDuration = 800,
  defaultOffset = 0,
}: ProviderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const instanceRef = React.useRef<LocoInstance | null>(null);
  const rafTokenRef = React.useRef<number | null>(null);
  const resizeObsRef = React.useRef<ResizeObserver | null>(null);
  const intersectionRef = React.useRef<IntersectionObserver | null>(null);
  const isInitRef = React.useRef(false);

  const [direction, setDirection] = React.useState<"up" | "down">("down");
  const [isSmooth, setIsSmooth] = React.useState(false);
  const pathname = usePathname();

  const isReducedMotion = usePrefersReducedMotion();
  const isCoarsePointer = useCoarsePointer();

  const updateHtmlFlags = React.useCallback(
    (smooth: boolean) => {
      const html = document.documentElement;
      html.classList.toggle("has-scroll-smooth", smooth);
      html.classList.toggle("has-locomotive", !!instanceRef.current);
      html.setAttribute("data-scroll-direction", direction);
      html.classList.toggle("prefers-reduced-motion", isReducedMotion);
    },
    [direction, isReducedMotion]
  );

  // Throttled update via rAF
  const update = React.useCallback(() => {
    if (rafTokenRef.current != null) return;
    rafTokenRef.current = window.requestAnimationFrame(() => {
      rafTokenRef.current = null;
      if (instanceRef.current) {
        try {
          instanceRef.current.update();
        } catch {
          // no-op
        }
      }
    });
  }, []);

  const nativeFocusIntoView = React.useCallback((el: Element) => {
    if (!(el instanceof HTMLElement)) return;
    // Ensure element can be focused for accessibility/skip links
    const prevTabIndex = el.getAttribute("tabindex");
    if (!el.hasAttribute("tabindex")) {
      el.setAttribute("tabindex", "-1");
    }
    el.focus({ preventScroll: true });
    // Keep it focusable for subsequent tab order if it already had tabindex, otherwise remove
    if (prevTabIndex === null) {
      const onBlur = () => {
        el.removeEventListener("blur", onBlur);
        el.removeAttribute("tabindex");
      };
      el.addEventListener("blur", onBlur);
    }
  }, []);
  const scrollTo = React.useCallback(
    (target: number | string | Element, opts?: ScrollToOptionsEx) => {
      const t = target;
      const duration = opts?.duration ?? defaultDuration;
      const offset = opts?.offset ?? defaultOffset;
      const disableLerp = opts?.disableLerp ?? false;

      // Auto account for sticky header height if present
      const sticky = document.querySelector("[data-sticky-header]") as HTMLElement | null;
      const headerOffset = sticky ? sticky.offsetHeight : 0;
      const effectiveOffset = offset + headerOffset;

      // With locomotive
      if (instanceRef.current) {
        try {
          instanceRef.current.scrollTo(t, {
            duration,
            // Locomotive's offset is applied directly; use negative to account for header height
            offset: -effectiveOffset,
            disableLerp,
          });
          // If target is element/hash, ensure focus after scroll completes (approx)
          if (typeof t !== "number") {
            const el =
              typeof t === "string" ? (document.querySelector(t) as HTMLElement | null) : (t as HTMLElement | null);
            if (el) {
              window.setTimeout(() => {
                nativeFocusIntoView(el);
              }, Math.max(0, Math.min(1200, duration + 50)));
            }
          }
        } catch {
          // fallback to native
          nativeScrollTo(t, { behavior: "smooth", offset: effectiveOffset, focus: nativeFocusIntoView });
        }
        return;
      }
      // Native fallback (no JS init / reduced motion)
      nativeScrollTo(t, { behavior: "smooth", offset: effectiveOffset, focus: nativeFocusIntoView });
    },
    [defaultDuration, defaultOffset, nativeFocusIntoView]
  );
  const stop = React.useCallback(() => {
    try {
      instanceRef.current?.stop();
    } catch {
      // no-op
    }
  }, []);
  const start = React.useCallback(() => {
    try {
      instanceRef.current?.start();
    } catch {
      // no-op
    }
  }, []);
  const destroy = React.useCallback(() => {
    try {
      instanceRef.current?.destroy();
    } catch {
      // no-op
    } finally {
      instanceRef.current = null;
      setIsSmooth(false);
      updateHtmlFlags(false);
      teardownIntersectionFallback();
      try {
        (window as any).__loco_scroll = undefined;
      } catch {
        // no-op
      }
    }
  }, [updateHtmlFlags]);

  // Click interception for same-page hash links within container
  React.useEffect(() => {
    const root = (containerRef.current as HTMLElement | Document) ?? document;
    const onClick = (e: Event) => {
      // Only intercept if locomotive is active
      if (!instanceRef.current) return;
      const targetEl = e.target as HTMLElement | null;
      const anchor = targetEl?.closest && (targetEl.closest("a[href^='#']") as HTMLAnchorElement | null);
      if (!anchor) return;
      const href = anchor.getAttribute("href")!;
      if (href === "#") return; // ignore to top placeholder

      const target = document.querySelector(decodeURIComponent(href)) as HTMLElement | null;
      if (!target) return;

      // Prevent native jump
      e.preventDefault?.();
      // Update URL (keeps back/forward navigation)
      const hash = href.startsWith("#") ? href : `#${href.split("#")[1] ?? ""}`;
      if (hash && hash !== window.location.hash) {
        history.pushState(null, "", hash);
      }
      // Scroll via locomotive
      scrollTo(target);
    };

    root.addEventListener("click", onClick as EventListener, { passive: false } as AddEventListenerOptions);
    return () => {
      root.removeEventListener("click", onClick as EventListener);
    };
  }, [scrollTo]);

  // Handle back/forward navigation to hashes
  React.useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          scrollTo(el, { duration: 600, disableLerp: true });
        }
      } else {
        scrollTo(0, { duration: 600, disableLerp: true });
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [scrollTo]);

  // Initialize Locomotive (desktop only by default), with progressive enhancement
  React.useEffect(() => {
    if (isInitRef.current) return;
    isInitRef.current = true;

    const root = containerRef.current;
    if (!root) return;

    // Reduced motion disables smoothing/parallax
    const allowSmooth = !isReducedMotion;
    const allowOnCoarse = enableCoarseSmooth && allowSmooth;
    const shouldSmooth = allowSmooth && (!isCoarsePointer || allowOnCoarse);

    // If we won't use locomotive, set up a11y/reveal fallback and exit
    if (!shouldSmooth) {
      setIsSmooth(false);
      setupIntersectionFallback(root);
      updateHtmlFlags(false);
      // Deep link on load with native
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          // Delay to ensure layout ready
          requestAnimationFrame(() => {
            nativeScrollTo(el, { behavior: "smooth", offset: defaultOffset, focus: nativeFocusIntoView });
          });
        }
      }
      return;
    }

    let mounted = true;

    (async () => {
      try {
        // @ts-ignore - dynamic import; module declared in src/types/locomotive-scroll.d.ts
        const mod: any = await import("locomotive-scroll");
        if (!mounted) return;

        const loco = new (mod as any).default({
          el: root,
          smooth: true,
          lerp,
          direction: "vertical",
          getDirection: true,
          smartphone: { smooth: false },
          tablet: { smooth: false },
          reloadOnContextChange: true,
        });

        instanceRef.current = loco;
        setIsSmooth(true);
        updateHtmlFlags(true);

        // Expose minimal global helpers (useful for devtools and integrations)
        (window as any).__loco_scroll = {
          scrollTo,
          update,
          stop,
          start,
          destroy,
          instance: loco,
        };

        // Direction/scroll event
        loco.on("scroll", (args: any) => {
          if (args?.direction === "up" || args?.direction === "down") {
            setDirection(args.direction);
            document.documentElement.setAttribute("data-scroll-direction", args.direction);
          }
          // Keep GSAP in sync if active
          if ((window as any).ScrollTrigger) {
            (window as any).ScrollTrigger.update();
          }
        });

        // Optional GSAP ScrollTrigger integration
        setupGsapProxy(loco, root);

        // Resize/update management
        setupResizeUpdate(loco, update);
        // Reveal fallback not required when locomotive is active (it handles data-scroll-class)

        // Initial deep link handling without jump
        const onLoadHash = () => {
          if (window.location.hash) {
            const el = document.querySelector(window.location.hash);
            if (el) {
              // Ensure loco computed sizes
              setTimeout(() => {
                try {
                  loco.update();
                } catch {}
                scrollTo(el, { duration: 0, disableLerp: true });
              }, 0);
            }
          }
        };
        // Run after a tick
        setTimeout(onLoadHash, 0);
      } catch (err) {
        // Locomotive not available or failed; fallback to IO
        console.warn("[ScrollProvider] Locomotive not loaded; using native scroll.", err);
        setIsSmooth(false);
        setupIntersectionFallback(root);
        updateHtmlFlags(false);
      }
    })();

    return () => {
      mounted = false;
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableCoarseSmooth, isReducedMotion, isCoarsePointer, lerp, defaultOffset]);

  // Re-sync on route changes (App Router)
  React.useEffect(() => {
    // Update measurements
    if (instanceRef.current) {
      setTimeout(() => {
        try {
          instanceRef.current?.update();
        } catch {}
        // Deep-link on route change without jump
        if (window.location.hash) {
          const el = document.querySelector(window.location.hash);
          if (el) {
            scrollTo(el, { duration: 0, disableLerp: true });
          }
        }
      }, 0);
    } else {
      // Native fallback: ensure hash is scrolled into view
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          requestAnimationFrame(() => {
            nativeScrollTo(el, { behavior: "smooth", offset: defaultOffset, focus: nativeFocusIntoView });
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Update on font/image layout changes using ResizeObserver
  const setupResizeUpdate = (loco: LocoInstance, throttledUpdate: () => void) => {
    try {
      if ("ResizeObserver" in window) {
        const ro = new ResizeObserver(() => throttledUpdate());
        ro.observe(containerRef.current as Element);
        resizeObsRef.current = ro;
      } else {
        (window as Window).addEventListener(
          "resize",
          throttledUpdate as EventListenerOrEventListenerObject,
          { passive: true } as AddEventListenerOptions
        );
      }
    } catch {
      (window as Window).addEventListener(
        "resize",
        throttledUpdate as EventListenerOrEventListenerObject,
        { passive: true } as AddEventListenerOptions
      );
    }
  };

  // Reveal fallback for [data-scroll] when locomotive is not used
  const setupIntersectionFallback = (root: HTMLElement) => {
    try {
      if (!("IntersectionObserver" in window)) return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const repeat = parseBool(el.getAttribute("data-scroll-repeat"));
            const revealClass = el.getAttribute("data-scroll-class") || "is-inview";
            if (entry.isIntersecting) {
              el.classList.add(revealClass);
            } else if (repeat) {
              el.classList.remove(revealClass);
            }
          }
        },
        { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
      );
      root.querySelectorAll("[data-scroll]").forEach((el) => io.observe(el));
      intersectionRef.current = io;
    } catch {
      // no-op
    }
  };

  const teardownIntersectionFallback = () => {
    try {
      intersectionRef.current?.disconnect();
      intersectionRef.current = null;
    } catch {
      // no-op
    }
  };

  const value = React.useMemo<ScrollContextValue>(
    () => ({
      containerRef,
      instance: instanceRef.current,
      direction,
      isSmooth,
      isReducedMotion,
      isCoarsePointer,
      update,
      scrollTo,
      stop,
      start,
      destroy,
    }),
    [direction, isSmooth, isReducedMotion, isCoarsePointer, update, scrollTo, stop, start, destroy]
  );

  return (
    <ScrollContext.Provider value={value}>
      <div id="scroll-root" data-scroll-container ref={containerRef} className="scroll-root">
        {children}
      </div>
    </ScrollContext.Provider>
  );
}

/* ----------------------------- Helpers ------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mql?.matches);
    onChange();
    mql?.addEventListener?.("change", onChange);
    return () => mql?.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useCoarsePointer() {
  const [coarse, setCoarse] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia?.("(pointer: coarse)");
    const onChange = () => setCoarse(!!mql?.matches);
    onChange();
    mql?.addEventListener?.("change", onChange);
    return () => mql?.removeEventListener?.("change", onChange);
  }, []);
  return coarse;
}

function nativeScrollTo(
  target: number | string | Element,
  opts: { behavior: ScrollBehavior; offset?: number; focus?: (el: Element) => void }
) {
  const { behavior, offset = 0, focus } = opts;
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }
  let el: Element | null = null;
  if (typeof target === "string") {
    el = document.querySelector(target);
  } else {
    el = target;
  }
  if (el) {
    const rect = (el as HTMLElement).getBoundingClientRect();
    const top = rect.top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior });
    if (focus) focus(el);
  }
}

function parseBool(v: string | null): boolean {
  if (!v) return false;
  const s = v.trim().toLowerCase();
  return s === "" || s === "true" || s === "1" || s === "yes";
}

// Optional GSAP integration without hard dependency
function setupGsapProxy(loco: LocoInstance, scroller: HTMLElement) {
  const w = window as any;
  const gsap = w.gsap;
  if (!gsap) return;
  const ScrollTrigger = gsap.ScrollTrigger || w.ScrollTrigger;
  if (!ScrollTrigger) return;

  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch {
    // already registered
  }

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value?: number) {
      if (arguments.length) {
        try {
          // disableLerp + duration 0 for immediate sync
          loco.scrollTo(value as number, { duration: 0, disableLerp: true });
        } catch {}
      }
      try {
        return (loco.scroll?.instance?.scroll?.y as number) ?? window.pageYOffset;
      } catch {
        return window.pageYOffset;
      }
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: (scroller.style as any).transform ? "transform" : "fixed",
  });

  loco.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => {
    try {
      loco.update();
    } catch {}
  });
  setTimeout(() => ScrollTrigger.refresh(), 0);
}
