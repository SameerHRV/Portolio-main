# Theme System — Integration Guide

This repository now uses a robust, framework-agnostic dark/light theme system with a single source of truth on the root element (`data-theme="light" | "dark"`), CSS custom properties, SSR-safe initialization, persistence, and no-flash before paint.

Core files:
- [src/app/layout.tsx](src/app/layout.tsx)
- [src/app/globals.css](src/app/globals.css)
- [src/components/ui/theme-provider.tsx](src/components/ui/theme-provider.tsx)
- [src/components/ui/theme-toggle.tsx](src/components/ui/theme-toggle.tsx)
- [tailwind.config.ts](tailwind.config.ts)
- Vanilla drop-in:
  - [docs/theme/vanilla/index.html](docs/theme/vanilla/index.html)
  - [docs/theme/vanilla/styles.css](docs/theme/vanilla/styles.css)
  - [docs/theme/vanilla/theme.js](docs/theme/vanilla/theme.js)

## Design Goals

- Single source of truth: `html[data-theme="light" | "dark"]`
- Light is default; dark overrides with `[data-theme="dark"]`
- CSS variables for all colors, borders, focus, code blocks
- Respect OS preference when no user choice exists
- Persist user choice in localStorage + SSR cookie fallback
- Apply the effective theme before first paint to avoid flash
- Accessible toggle with keyboard/ARIA; visible focus; reduced motion respected
- Update `<meta name="theme-color">` to match theme for mobile UIs
- Tailwind dark variants work with either `.dark` or `[data-theme="dark"]`
- Compatible with common UI libraries

---

## Quick Start

1) Add the data-theme attribute and inline pre-paint script in your HTML head (Next.js App Router already wired in [src/app/layout.tsx](src/app/layout.tsx)):

```html
<meta name="theme-color" content="#ffffff" />
<script>
  (function(){try{
    var d=document.documentElement;
    var ls=null;try{ls=localStorage.getItem('theme');}catch(_){}
    var pref=(ls==='light'||ls==='dark')?ls:null;
    var m=document.cookie.match(/(?:^|; )theme=([^;]+)/);
    var cs=m?decodeURIComponent(m[1]):null; cs=(cs==='light'||cs==='dark'||cs==='system')?cs:null;
    var sys=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
    var t=(pref||cs||'system'); var eff=t==='system'?sys:t;
    d.setAttribute('data-theme',eff); d.style.colorScheme=eff;
    var meta=document.querySelector('meta[name="theme-color"]');
    if(meta){meta.setAttribute('content',eff==='dark'?'#0b1220':'#ffffff');}
  }catch(e){}})();
</script>
```

2) Ensure your Tailwind config allows the data attribute selector:
- [tailwind.config.ts](tailwind.config.ts)

```ts
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  // ...
};
```

3) Define CSS variables for both themes:
- [src/app/globals.css](src/app/globals.css)

Light defaults under `:root`, dark overrides under `[data-theme="dark"]`. No-JS fallback respects OS with `@media (prefers-color-scheme: dark) :root:not([data-theme]) { ... }`.

4) Use the theme provider and toggle:
- [src/components/ui/theme-provider.tsx](src/components/ui/theme-provider.tsx)
- [src/components/ui/theme-toggle.tsx](src/components/ui/theme-toggle.tsx)

The provider syncs cookies, meta theme-color, color-scheme, and emits a `window` "themechange" event for app-wide updates.

---

## Framework Integration

### React (Create React App / Vite)
- Include the inline pre-paint script in `public/index.html` <head>.
- Import CSS variables (or your equivalent) at app root.
- Use any state/store to call `window.ThemeController.setTheme('light'|'dark'|'system')` if using the vanilla controller (see [docs/theme/vanilla/theme.js](docs/theme/vanilla/theme.js)).

### Next.js (App Router)
- Already integrated in [src/app/layout.tsx](src/app/layout.tsx):
  - Sets `data-theme` on `<html>` from an SSR cookie to avoid hydration mismatch/FOUC.
  - Adds the pre-paint inline script and meta theme-color.
  - Wraps children with the ThemeProvider (from next-themes) using `attribute="data-theme"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.

### Next.js (Pages Router)
- Add the head pre-paint script in `_document.tsx`.
- Wrap app in provider in `_app.tsx`.
- Set Tailwind darkMode to include `[data-theme="dark"]`.

### Vue
- In `index.html`, add the pre-paint inline script and meta theme-color.
- In a Pinia/store or simple reactive store:
  - Read current `document.documentElement.getAttribute('data-theme')`.
  - Set with `document.documentElement.setAttribute('data-theme', v)` and persist (localStorage + cookie) similar to vanilla controller.
- Call this in `onMounted()`; listen to `matchMedia('(prefers-color-scheme: dark)')` when the selected mode is "system".

### Svelte
- Add pre-paint inline script and meta tag in `app.html`.
- In a Svelte store, expose `theme` and `setTheme` to update `data-theme` and persistence.
- In `onMount`, initialize from storage/cookie and add a listener for OS changes when on "system".

---

## Tailwind Usage

- Configure selectors: [tailwind.config.ts](tailwind.config.ts) includes both `.dark` and `[data-theme="dark"]` so existing `dark:` utilities continue to work after switching to the data attribute.
- Replace hard-coded colors with variables using `hsl(var(--...))`. Already wired in Tailwind theme extension so classes like `bg-background` map to CSS variables in [src/app/globals.css](src/app/globals.css).

Example:
```tsx
<div className="bg-background text-foreground border border-border">
  ...
</div>
```

---

## UI Libraries

- MUI: Use a theme factory that switches palettes based on `document.documentElement.getAttribute('data-theme')`. Subscribe to the global "themechange" event to update the MUI theme in your provider.
- Chakra UI: Set `config.initialColorMode = 'system'`, `useSystemColorMode = true`, but prefer syncing with the root `data-theme` to avoid double theming. Update Chakra’s color mode when "themechange" fires.
- Ant Design: Similar approach; you can toggle `theme` algorithm between `defaultAlgorithm` and `darkAlgorithm` based on the root attribute and listen to "themechange".

Avoid dueling themers: make the library follow your root attribute; don’t let both try to infer independently.

---

## Accessibility

- Contrast: Primary text/background pairs in the provided palettes meet WCAG AA 4.5:1 in both themes (based on typical shadcn/ui scales). Verify with tooling (axe, Lighthouse) for your exact UI composition.
- Focus: Uses visible high-contrast focus ring via `--ring`/`--focus-ring`.
- Keyboard and screen reader:
  - The toggle button includes proper label and supports keyboard.
  - For a menu-based selector, use semantic menu items and `aria-pressed` on the main button when dark is active.
- Reduced Motion: Animations/transitions disabled on change when user prefers reduced motion.

---

## Migration Guide (from hard-coded styles)

1) Replace literal colors in components with semantic tokens:
   - `text-black` → `text-foreground`
   - `bg-white` → `bg-background`
   - Hard-coded hex in CSS → `color: hsl(var(--foreground));` or appropriate token
2) For SVG icons, prefer `currentColor` for `fill`/`stroke` or supply theme-aware assets.
3) Replace `:root` literals in custom CSS with the defined variables; override under `[data-theme="dark"]`.
4) If you previously used `.dark` class toggling, keep your `dark:` utilities — the config now supports both `.dark` and `[data-theme="dark"]`.

---

## Test Plan

Scenarios:
- Initial load with no stored preference picks OS theme.
- Toggling immediately updates UI and persists across reloads.
- No flash of incorrect theme on first paint.
- All components reflect variables (background, text, borders, focus).
- Works in Chrome, Safari (iOS), Firefox, Edge.
- Private mode/localStorage limitations handled; cookie fallback keeps SSR consistent.
- OS theme change updates app automatically when user has not chosen manual override (i.e., "system").

Steps:
1) Clear localStorage and cookies, set OS theme to light; reload — should be light with no flash.
2) Change OS theme to dark, reload — should be dark with no flash.
3) Click toggle to dark; reload — should persist dark regardless of OS.
4) Select "System" in the menu; change OS theme — app follows OS again.
5) Verify meta theme-color changes (mobile devtools).
6) Run axe/Lighthouse; confirm WCAG AA on key text/background pairs and visible focus rings.

---

## Common Pitfalls Avoided

- CSS specificity/order: variables are scoped to `:root` and overridden last by `[data-theme="dark"]`.
- Hard-coded third-party styles: provide overrides using your CSS variables, or wrap components with variable-driven classes.
- SSR hydration mismatch: server sets `data-theme` from cookie; head inline script applies pre-paint on the client.
- Icon assets with baked colors: prefer `currentColor` or provide separate assets.
- color-scheme property is set on root for correct form controls/scrollbars.

## Component: CometCard — Theming Contract

CometCard has been refactored to consume app-wide theme tokens and CSS variables instead of hard-coded colors. It now follows the same `data-theme="light" | "dark"` mechanism used elsewhere.

### Tokens and classes

Defined in `globals.css`:
- `--comet-shadow` — theme-aware layered shadow
- `--comet-glare-rgb`, `--comet-glare-1`, `--comet-glare-2`, `--comet-glare-opacity` — glare highlight color/alpha
- `--comet-surface-from`, `--comet-surface-to` — gradient endpoints for the card surface

Utility classes:
- `.comet-shadow` — applies `box-shadow: var(--comet-shadow)`
- `.comet-surface` — applies a theme-variable gradient for the surface background

### Usage

1) Wrap your contents inside the CometCard container (3D/tilt + glare provided by the component). Inside, use the utility classes and theme tokens for all colors.
2) Prefer Tailwind semantic tokens already mapped to CSS variables: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-secondary`, etc.
3) For CTA buttons use the shared Button variants (`default` or `outline`) which are already theme-token driven.

Example structure:
- Outer: CometCard (3D + glare)
- Inner: `div.rounded-2xl.comet-surface.border.border-border/60`
- Text: `text-foreground`, meta: `text-muted-foreground`
- Stat blocks: `bg-secondary/50 text-foreground/80 border border-border/50`
- Icons: rely on `currentColor` + token classes (e.g., `text-primary`)

### Why this avoids theme drift

- No literal color values are used; all derive from CSS variables under `:root` for light and `[data-theme="dark"]` for dark.
- Glare uses `rgb(var(--comet-glare-rgb) / alpha)` so only alpha changes per theme.
- Shadow is a single variable per theme to ensure consistent elevation.

### Testing checklist

- Initial load under OS light/dark with no stored preference: no flash, correct theme.
- Toggle light ↔ dark: background, text, borders, icons, buttons update consistently with no hydration warnings.
- Hover/focus/active states: visible and meet WCAG AA contrast.
- Keyboard focus ring visible on interactive elements inside the card.
- No specificity creep: utility classes + tokens only.
- Cross-browser: Chrome, Firefox, Safari, Edge; common breakpoints.
