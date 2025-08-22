"use client";

/**
 * Lightweight analytics utilities: section impressions, scroll depth (post-Projects),
 * CTA/link tracking, and outbound events. Falls back to console if no dataLayer.
 */

type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const getDL = () => (typeof window !== "undefined" ? window.dataLayer : undefined);

const once = <T extends string | number>() => {
  const seen = new Set<T>();
  return (key: T) => {
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  };
};

const sectionSeen = once<string>();
const depthSeen = once<string>();

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  const dl = getDL();
  const data = { event, ...payload, ts: Date.now() };
  if (dl) {
    dl.push(data);
  } else {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", data);
  }
  // Also dispatch a CustomEvent for optional listeners
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("analytics:event", { detail: data }));
  }
}

export function trackSectionView(sectionId: string, payload: AnalyticsPayload = {}) {
  if (!sectionSeen(sectionId)) return;
  trackEvent("section_view", {
    section: sectionId,
    ...payload,
  });
}

export function trackCTAClick(label: string, sectionId: string, href: string) {
  trackEvent("cta_click", {
    label,
    section: sectionId,
    href,
  });
}

export function trackOutbound(label: string, href: string, context?: string) {
  trackEvent("outbound_click", {
    label,
    href,
    context,
  });
}

/**
 * Initialize scroll-depth tracking for content AFTER the Projects section.
 * Emits at 25/50/75/100% depth (once each).
 */
export function initScrollDepthAfterProjects() {
  if (typeof window === "undefined") return;
  const projects = document.getElementById("projects");
  if (!projects) return;

  const projectsBottom = projects.getBoundingClientRect().bottom + window.scrollY;
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  // Region from projectsBottom to end of document
  const regionHeight = Math.max(1, docHeight - projectsBottom);
  const thresholds = [25, 50, 75, 100];

  const onScroll = () => {
    const y = window.scrollY + window.innerHeight;
    const progressed = Math.max(0, y - projectsBottom);
    const pct = Math.min(100, Math.max(0, Math.round((progressed / regionHeight) * 100)));

    thresholds.forEach((t) => {
      const key = `depth_${t}`;
      if (pct >= t && depthSeen(key)) {
        trackEvent("scroll_depth_after_projects", { percent: t });
      }
    });
  };

  // Debounce with rAF
  let ticking = false;
  const onScrollRAF = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScrollRAF, { passive: true });
  // Fire once
  onScroll();
}

/**
 * Observe a section and fire a one-time section_view when at least 50% visible.
 */
export function observeSectionImpression(sectionId: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(sectionId);
  if (!el) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          trackSectionView(sectionId);
          observer.disconnect();
        }
      });
    },
    { threshold: [0.5] }
  );

  observer.observe(el);
  return () => observer.disconnect();
}
