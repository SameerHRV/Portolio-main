# Locomotive Scroll v4+ Integration (Progressive Enhancement)

This project integrates Locomotive Scroll v4 with accessibility-first, progressive enhancement. Desktop gets smooth inertia scrolling; mobile/tablet use native scrolling by default. Users with reduced motion keep native scroll with reveal fallbacks. Hash links, focus management, keyboard navigation, and skip links remain functional.

## What was added

- Scroll provider: client-only initializer that progressively enhances native scroll on desktop and exposes utilities and direction.
  - [ScrollProvider](src/components/scroll/scroll-provider.tsx)
  - Types shim for TS: [locomotive-scroll.d.ts](src/types/locomotive-scroll.d.ts)
- Global styles for the scroll container, reveal helpers, skip link, and reduced-motion:
  - [globals.css](src/app/globals.css)
- App layout wraps content with ScrollProvider and adds main landmark target:
  - [layout.tsx](src/app/layout.tsx)
  - [page.tsx](src/app/page.tsx)
- Components annotated for reveal/parallax:
  - [hero-section.tsx](src/components/hero-section.tsx)
  - [projects-section.tsx](src/components/projects-section.tsx)
  - [about-section.tsx](src/components/about-section.tsx)
  - [pricing-section.tsx](src/components/pricing-section.tsx)
  - [contact-section.tsx](src/components/contact-section.tsx)
- Scroll-to-top uses Locomotive when active, falls back to native:
  - [scroll-to-top.tsx](src/components/scroll-to-top.tsx)

## Initialization & Container

- The ScrollProvider creates and manages a Locomotive instance on a single container that wraps the main app content:

  - The container is a div with data-scroll-container and id="scroll-root", rendered by ScrollProvider.
  - It sets html.has-scroll-smooth and html.has-locomotive during enhancement only.
  - On desktop (fine pointer) and not prefers-reduced-motion, it initializes Locomotive with:
    - smooth: true, lerp: 0.08 (configurable)
    - smartphone.smooth: false, tablet.smooth: false (native mobile default)
    - direction and getDirection enabled
  - On mobile/tablet by default or when prefers-reduced-motion is active, no smoothing is initialized; a reveal fallback uses IntersectionObserver.

See [ScrollProvider](src/components/scroll/scroll-provider.tsx) for implementation.

## Accessibility

- Hash links, focus, keyboard navigation preserved:
  - In smooth mode, same-page anchor clicks are intercepted within the container and scrolled via Locomotive. URL hash is updated via history.pushState.
  - On popstate (back/forward), we scroll to the hash target or to 0 if no hash.
  - Focus management:
    - After programmatic scroll to an element, it is temporarily made focusable (tabindex=-1), focused with preventScroll, and restored on blur to maintain correct tab order.
- Skip link:
  - The layout provides an always-available “Skip to content” anchor and the main landmark has id="main-content".
  - The skip link becomes visible on focus. Styles in [globals.css](src/app/globals.css).
- prefers-reduced-motion:
  - When reduce is active, smoothing/parallax are disabled, transitions/animations are turned off for reveal, and content remains readable with native scroll.

## Attribute conventions

Annotate elements that should reveal or parallax:

- data-scroll: opt-in for reveal/parallax.
- data-scroll-class="is-inview": class to add when entering viewport (default: is-inview).
- data-scroll-repeat: add to allow repeated enter/leave reveal toggling.
- data-scroll-speed="[number]": negative values move slower (background-like), positive move faster.
- data-scroll-delay="[0..1]": optional easing delay per element (Locomotive controlled).
- data-scroll-section: not required here; using a single scroll container.

Common reveal helper:

- Add reveal-up utility class to start hidden and slide up when is-inview is added.

Example:

```html
<section id="about" data-scroll data-scroll-class="is-inview" class="reveal-up">
  <div data-scroll data-scroll-speed="-0.25" class="will-change-transform">
    <!-- parallax background layer -->
  </div>
  <h2 class="section-title">About</h2>
  ...
</section>
```

## Using the Scroll API

The ScrollProvider’s context exposes:

- instance: the Locomotive instance when active (or null if native).
- direction: "up" | "down" (from Locomotive when active, else last known).
- isSmooth: whether Locomotive is active.
- isReducedMotion, isCoarsePointer: flags to tailor effects.
- update(): throttled update via requestAnimationFrame.
- scrollTo(target, opts): target is number | string | Element.
  - opts: { duration?: number; offset?: number; disableLerp?: boolean }
  - Auto accounts for sticky header height using [data-sticky-header] element.
- stop(), start(), destroy(): control Locomotive lifecycle.

Quick usage (client components):

```tsx
"use client";
import * as React from "react";
import { useScroll } from "@/components/scroll/scroll-provider";

export function GoToPricingButton() {
  const { scrollTo } = useScroll();
  return (
    <button onClick={() => scrollTo("#pricing", { duration: 800 })}>
      See Pricing
    </button>
  );
}
```

A lightweight global for diagnostics is also exposed when smooth mode is active:

- window.__loco_scroll: { scrollTo, update, stop, start, destroy, instance }

## Hash links and deep linking

- Same-page anchors via Next Link or a element work normally:
  - Intercepted in smooth mode to prevent native jumps and double scroll.
  - URL hash is updated; back/forward navigations are handled.
- Deep linking:
  - On initial load or after route changes, if window.location.hash exists, we scroll to the target without jump and maintain focus.

## SPA route changes (Next.js App Router)

- The provider listens to pathname changes and updates measurements, then scrolls to the hash if present.
- For dynamic re-layouts, call update() after you add/remove large content.

## GSAP ScrollTrigger integration (optional)

- If window.gsap and window.ScrollTrigger exist, scrollerProxy is configured automatically:
  - ScrollTrigger.scrollerProxy is bound to the Locomotive container.
  - Locomotive scroll events update ScrollTrigger; on refresh, Locomotive.update() is called.
- No hard dependency: if GSAP is not present, nothing is changed.

## Performance guidelines

- Keep 60fps:
  - Parallax layers use translate3d / will-change: transform to stick to the compositor.
  - Avoid layout thrash in scroll handlers; updates are throttled via rAF; Locomotive handles most work.
  - Use image lazy-loading and reserve space via width/height or CSS aspect-ratio to prevent CLS.
  - Prefer small data-scroll-speed magnitudes for subtle parallax; reserve it for decor layers.
- Mobile:
  - smooth disabled by default (native scroll).
  - If you must enable on mobile/tablet, pass enableCoarseSmooth to ScrollProvider, but validate battery/perf.
- Reduced motion:
  - Animations/transitions are disabled for reveal, parallax is off, content is static and readable.

## Authoring tips

- Stick parallax to background/decor elements:
  - data-scroll-speed negative for background layers to move slower than content.
  - Add will-change-transform to help the compositor.
- Use reveal-up on major section wrappers to stagger content naturally via simple CSS.
- If using fixed headers, mark them with data-sticky-header so scrollTo offsets correctly.

## Troubleshooting

- “Cannot find module 'locomotive-scroll' types”:
  - We include a local types shim: [locomotive-scroll.d.ts](src/types/locomotive-scroll.d.ts). Ensure tsconfig.json includes **/*.d.ts (done).
- Double smoothing or odd jumps:
  - Check html.has-locomotive body { scroll-behavior: auto } in [globals.css](src/app/globals.css).
  - Ensure only one data-scroll-container exists (the ScrollProvider’s).
- Content not revealing on reduced motion:
  - IntersectionObserver fallback reveals elements with data-scroll + data-scroll-class or default is-inview.
- Integrating with ScrollTrigger:
  - Ensure gsap and ScrollTrigger are loaded before ScrollProvider initializes, or call window.gsap.registerPlugin(ScrollTrigger) early.

## Acceptance checklist

- Desktop: smooth inertia scroll active, no frame drops during normal usage.
- Mobile/tablet: native scroll by default unless specifically enabled.
- Reduced motion: smoothing/parallax disabled, content readable, reveal immediate.
- Anchors: no jump, URL updates, back/forward and focus order preserved.
- No CLS: images/media have reserved space, no layout shifts introduced.
- Lighthouse: perf and a11y remain 90+ (subject to content/imagery).
- No-JS: site remains readable and scrollable with native scrolling.
